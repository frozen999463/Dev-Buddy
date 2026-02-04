import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="w-full bg-white ">
      {/* FULL WIDTH BAR */}
      <div className="w-full px-6 py-4">
        {/* CONSTRAINED CONTENT */}
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/images/Devbuddylogo2.png"
              className="h-7"
              alt="DevBuddy"
            />
            <span
              className="text-xl font-semibold text-[#2d3766]"
              style={{ fontFamily: '"Climate Crisis", cursive' }}
            >
              Devbuddy
            </span>
          </div>

          {/* Nav Links */}
          <ul className="hidden md:flex gap-8 font-medium text-gray-600">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <Link to="/about" className="hover:text-blue-600 cursor-pointer">
              about
            </Link>
            <li className="hover:text-blue-600 cursor-pointer">Services</li>
            <li className="hover:text-blue-600 cursor-pointer">Pricing</li>
            <Link to="/contact_us" className="hover:text-blue-600 cursor-pointer">
              contact us
            </Link>
          </ul>

          {/* Avatar */}
          <img
            className="w-8 h-8 rounded-full"
            src="/images/Devbuddylogo2.png"
            alt="user"
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
