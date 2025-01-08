import { useToast } from '@/hooks/use-toast';
import { IWallet } from '@/interfaces/Wallet';
import { fetchWallet } from '@/services/user/profileService';
import { useState, useEffect } from 'react';

const Wallet = () => {
  const { toast } = useToast();
  const [wallet, setWallet] = useState<IWallet>();

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await fetchWallet();
        setWallet(response.data);
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Loading failed, Refresh the page',
        });
      }
    };

    fetchWalletData();
  }, []);

  return (
    wallet && (
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">My Wallet</h1>
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-6">
            <span className="text-lg text-gray-600">Balance</span>
            <span className="text-2xl font-bold text-gray-600">
              ₹{wallet.balance.toFixed(2)}
            </span>
          </div>

          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Transaction History
          </h2>
          {wallet.transaction.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {wallet.transaction.map((transaction, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-md"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {transaction.type}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toDateString()}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-bold ${
                      transaction.type === 'Debit'
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}
                  >
                    {transaction.type === 'Debit' ? '-' : '+'}₹
                    {transaction.amount}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No transactions found.</p>
          )}
        </div>
      </div>
    )
  );
};

export default Wallet;
