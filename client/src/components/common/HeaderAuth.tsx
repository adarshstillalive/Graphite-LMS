import { useNavigate } from 'react-router-dom';

const HeaderAuth = () => {
  const navigate = useNavigate();
  return (
    <header className="h-16 w-screen bg-white border-b border-gray-400 flex justify-center items-center fixed top-0 z-50">
      <div
        className="h-full w-auto py-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          className="h-full object-contain"
          alt="Graphite logo"
          src="/logos/graphite_black.png"
        />
      </div>
    </header>
  );
};

export default HeaderAuth;
