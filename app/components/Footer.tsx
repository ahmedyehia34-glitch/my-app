const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold mb-2">DND Design</h4>
          <p></p>
        </div>
        <div>
          <h4 className="font-bold mb-2"></h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-gray-300">Joy Eid Collection</a></li>
            <li><a href="#" className="hover:text-gray-300">Shop By Categories</a></li>
            <li><a href="#" className="hover:text-gray-300">The Brand</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2"></h4>
          <p>info@dnddesign.com</p>
          <p>+20 123 456 7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;