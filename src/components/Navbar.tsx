import { Link } from "react-router-dom";
import { BiHomeHeart } from "react-icons/bi";
import { PiPencilThin } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="flex items-stretch justify-between h-10 px-8 josefin-light navbar">
      <Link to="/" className="flex items-center text-md">
        <BiHomeHeart />
        STRONA GŁÓWNA
      </Link>
      <div className="flex">
        <Link to="/kalendarz" className="flex items-center gap-2 px-8 text-sm">
          <PiPencilThin />
          ZAPISZ SIĘ
        </Link>
        <Link to="/zaloguj" className="flex items-center gap-2 px-8 text-sm">
          <MdOutlineAccountCircle />
          ZALOGUJ SIĘ
        </Link>
        <Link to="/cennik" className="flex items-center gap-2 px-8 text-sm">
          <LiaMoneyBillWaveSolid />
          CENNIK
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
