import { Link } from "react-router-dom";
import { BiHomeHeart } from "react-icons/bi";
import { PiPencilThin } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="flex justify-between h-20 px-8 josefin-light navbar">
      <Link to="/" className="flex items-center gap-2 text-lg">
        <BiHomeHeart className="mb-1 text-2xl" />
        <span>STRONA GŁÓWNA</span>
      </Link>
      <div className="flex">
        <Link to="/kalendarz" className="flex items-center gap-2 px-8 text-lg">
          <PiPencilThin className="mb-1 text-2xl" />
          <span>UMÓW SIĘ</span>
        </Link>
        <Link to="/cennik" className="flex items-center gap-2 px-8 text-lg">
          <LiaMoneyBillWaveSolid className="mb-1 text-2xl" />
          <span>CENNIK</span>
        </Link>
        <Link to="/zaloguj" className="flex items-center gap-2 px-8 text-lg">
          <MdOutlineAccountCircle className="mb-1 text-2xl" />
          <span>ZALOGUJ SIĘ</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
