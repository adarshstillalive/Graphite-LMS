import nodemailer from 'nodemailer';

class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.NODEMAILER_USER,
      clientId: process.env.NODEMAILER_CLIENT_ID,
      clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
      refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
    },
  });

  async sendOtp(email: string, otp: string): Promise<void> {
    try {
      console.log('Attempting to send OTP...');
      await this.transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: 'Your Verification OTP',
        text: `Your verification OTP is ${otp}`,
      });
      console.log('OTP sent successfully');
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP. Please try again later.');
    }
  }
}

export default EmailService;
