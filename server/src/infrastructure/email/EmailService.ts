import nodemailer from 'nodemailer';

class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'papasmenauth@gmail.com',
      clientId: process.env.NODEMAILER_CLIENT_ID,
      clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
      refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
    },
  });

  async sendOtp(email: string, otp: string) {
    await this.transporter.sendMail({
      from: 'papasmenauth@gmail.com',
      to: email,
      subject: 'Hello, PapasMenAuth Mail',
      text: `Your verification OTP is ${otp}`,
    });
  }
}

export default EmailService;
