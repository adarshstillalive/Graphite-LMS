import nodemailer from 'nodemailer';

class EmailService {
  // private transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: process.env.NODEMAILER_USER,
  //     clientId: process.env.NODEMAILER_CLIENT_ID,
  //     clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
  //     refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
  //     accessToken: process.env.NODEMAILER_ACCESS_TOKEN,
  //   },
  // });
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_APP_PASSWORD,
    },
  });

  async sendOtp(email: string, otp: string): Promise<void> {
    // try {
    //   await this.transporter.sendMail({
    //     from: process.env.NODEMAILER_USER,
    //     to: email,
    //     subject: 'Your Verification OTP',
    //     text: `Your verification OTP is ${otp}`,
    //   });
    // } catch (error) {
    //   console.error('Error sending OTP:', error);
    //   throw new Error('Failed to send OTP. Please try again later.');
    // }
    try {
      await this.transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: 'Your Verification OTP',
        text: `Your verification OTP is ${otp}`,
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP. Please try again later.');
    }
  }
}

export default EmailService;
