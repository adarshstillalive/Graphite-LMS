const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 bottom-0 left-0 right-0">
      <div className="flex flex-col md:flex-row justify-between items-start p-6 border-b border-gray-700">
        <div className="mb-4 md:mb-0">
          <img
            src="/logos/graphite_white.png"
            alt="Graphite Logo"
            className="h-12 object-contain"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:text-white">
            About Us
          </a>
          <a href="#" className="hover:text-white">
            Services
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
        </div>
      </div>

      <div className="py-4 text-center text-sm">
        <p>© 2024 Graphite. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
