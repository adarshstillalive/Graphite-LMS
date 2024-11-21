import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-full flex flex-col md:flex-row pt-16">
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-4 md:p-8 lg:p-16">
        <img
          alt="Login ad"
          src="/display/auth_login.png"
          className="md:max-h-96-full max-w-full object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
