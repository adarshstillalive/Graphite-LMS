export const checkFirstName = (firstName: string): string => {
  const isValid = /^[a-zA-Z ]{3,30}$/.test(firstName);
  return isValid
    ? ''
    : 'First name must be 3-30 characters long and contain only letters and spaces.';
};

export const checkLastName = (lastName: string): string => {
  const isValid = /^[a-zA-Z ]{3,30}$/.test(lastName);
  return isValid
    ? ''
    : 'Last name must be 3-30 characters long and contain only letters and spaces.';
};

export const checkEmail = (email: string): string => {
  const isValid = /^[\w._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(email);
  return isValid
    ? ''
    : 'Enter a valid email address (e.g., example@domain.com).';
};

export const checkPassword = (password: string): string => {
  const isValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      password
    );
  return isValid
    ? ''
    : 'Password must be 6-16 characters long, include at least one uppercase letter, one number, and one special character.';
};

export const checkConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  return password === confirmPassword ? '' : 'passwords mismatch';
};
