import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  clientPassword: string,
  serverPassword: string,
): Promise<boolean> => {
  const comparedValue = await bcrypt.compare(clientPassword, serverPassword);
  return comparedValue;
};

export default hashPassword;
