import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const isTokenExpired = (token: string) => {
  const decoded = jwtDecode<DecodedToken>(token);
  return decoded.exp * 1000 < Date.now();
};

export default isTokenExpired;
