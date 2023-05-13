import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="text-white py-4 px-8 items-center flex justify-between bg-gray-800">
      <Link to="/" className="text-5xl">
        Home
      </Link>
      <div className="h-full">
        <Link
          to="/kalendarz"
          className="py-4 px-8 text-4xl  h-full hover:bg-gray-600"
        >
          Kalendarz
        </Link>
        <Link
          to="/cennik"
          className="py-4 px-8 text-4xl h-full hover:bg-gray-600"
        >
          Cennik
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
