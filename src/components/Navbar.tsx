import { Link } from "react-router-dom";
import { BiHomeHeart } from "react-icons/bi";
import { PiPencilThin } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

const Navbar = () => {
  return (
    <nav className="flex items-stretch justify-between h-10 px-8 text ">
      <Link to="/" className="flex items-center text-xl">
        <BiHomeHeart />
        STRONA GŁÓWNA
      </Link>
      <div className="flex">
        <Link to="/kalendarz" className="flex items-center gap-2 px-8 text-md">
          <PiPencilThin />
          ZAPISZ SIĘ
        </Link>
        <Link to="/zaloguj" className="flex items-center gap-2 px-8 text-md">
          <MdOutlineAccountCircle />
          ZALOGUJ SIĘ
        </Link>
        <Link to="/cennik" className="flex items-center gap-2 px-8 text-md">
          <LiaMoneyBillWaveSolid />
          CENNIK
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
