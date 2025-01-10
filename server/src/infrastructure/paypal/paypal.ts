import axios from 'axios';

interface Items {
  name: string;
  unit_amount: {
    currency_code: string;
    value: string;
  };
}

export async function convert(price: number): Promise<number> {
  const host = 'api.frankfurter.app';

  try {
    const response = await axios.get(
      `https://${host}/latest?amount=${price}&from=INR&to=USD`,
    );

    if (!response.data?.rates?.USD) {
      throw new Error('Unexpected response format from exchange rate API');
    }

    return response.data.rates.USD;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw new Error('Exchange rate conversion failed');
  }
}

async function GenerateAccessToken(): Promise<string> {
  try {
    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      method: 'POST',
      data: 'grant_type=client_credentials',
      auth: {
        username: process.env.PAYPAL_CLIENT_ID || '',
        password: process.env.PAYPAL_CLIENT_SECRET || '',
      },
    });

    if (!response.data?.access_token) {
      throw new Error('Failed to fetch PayPal access token');
    }

    return response.data.access_token;
  } catch (error) {
    console.error('Error generating PayPal access token:', error);
    throw new Error('PayPal token generation failed');
  }
}

export async function createOrder(items: Items[]): Promise<string> {
  if (!items || items.length === 0) {
    throw new Error('No items provided for order creation');
  }

  const accessToken = await GenerateAccessToken();
  const itemTotal = items.reduce((acc, curr) => {
    return acc + parseFloat(curr.unit_amount.value);
  }, 0);

  const orderData = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: itemTotal.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: itemTotal.toFixed(2),
            },
          },
        },
        items: items.map((item) => ({
          name: item.name,
          quantity: '1',
          unit_amount: item.unit_amount,
        })),
      },
    ],
    application_context: {
      return_url: 'https://graphite-lms.vercel.app/profile/order',
      cancel_url: 'https://graphite-lms.vercel.app/profile/cart/checkout',
      shipping_preference: 'NO_SHIPPING',
      user_action: 'PAY_NOW',
      brand_name: 'Graphite',
    },
  };

  try {
    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: orderData,
    });

    const orderId = response.data.id;

    return orderId;
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    throw new Error('PayPal order creation failed');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function capturePayment(orderId: string): Promise<any> {
  try {
    const accessToken = await GenerateAccessToken();

    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error capturing payment:', error);
    throw new Error('PayPal payment capture failed');
  }
}
