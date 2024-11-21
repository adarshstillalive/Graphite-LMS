import SignUpForm from '../components/auth/SignupForm';

const Signup = () => {
  return (
    <div className="min-h-full flex flex-col md:flex-row pt-16">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <SignUpForm />
      </div>
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-4 md:p-8 lg:p-16">
        <img
          alt="Signup ad"
          src="/display/auth_signup.png"
          className="md:max-h-96-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Signup;
