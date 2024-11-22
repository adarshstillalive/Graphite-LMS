class EmailOtp {
  constructor(
    public email: string,
    public code: string,
    public expiresAt: Date,
  ) {}
}
export default EmailOtp;
