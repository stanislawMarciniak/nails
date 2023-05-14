import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-stretch justify-between h-20 px-8 text-white bg-gray-800">
      <Link to="/" className="flex items-center text-5xl">
        Home
      </Link>
      <div className="flex">
        <Link
          to="/kalendarz"
          className="flex items-center px-8 text-4xl hover:bg-gray-600"
        >
          Kalendarz
        </Link>
        <Link
          to="/cennik"
          className="flex items-center px-8 text-4xl hover:bg-gray-600"
        >
          Cennik
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
