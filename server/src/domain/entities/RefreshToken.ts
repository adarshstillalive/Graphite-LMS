class RefreshToken {
  constructor(
    public email: string,
    public token: string,
    public expiresAt: Date,
  ) {}
}

export default RefreshToken;
