import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav bg-slate-800">
      <Link to="/" className="text-3xl">
        Home
      </Link>
      <Link to="/kalendarz" className="hover:bg-gray-600">
        Kalendarz
      </Link>
      <Link to="/cennik" className="hover:bg-gray-600">
        Cennik
      </Link>
    </nav>
  );
};
export default Navbar;
