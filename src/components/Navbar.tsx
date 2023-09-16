import { Link } from "react-router-dom";
import { BiHomeHeart } from "react-icons/bi";
import { PiPencilThin } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { BiSolidLockOpen } from "react-icons/bi";
import "./Navbar.css";
import { useEffect, useState } from "react";
import supabase, { getUser } from "../config/supabaseClient";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserData = async () => {
    try {
      const user = await getUser();

      user && setIsLogged(true);
      user.role === "admin" && setIsAdmin(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLogged(false);
    }
  };
  useEffect(() => {
    fetchUserData();
    const sessionListener = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        fetchUserData();
      } else if (event === "SIGNED_OUT") {
        setIsLogged(false);
      }
    });

    return () => {
      sessionListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="flex justify-between px-8 josefin-light navbar">
      <Link to="/" className="flex items-center gap-2 text-lg">
        <BiHomeHeart className="text-2xl" />
        <span>STRONA GŁÓWNA</span>
      </Link>
      <div className="flex">
        {isAdmin && (
          <Link to="/admin" className="flex items-center gap-2 px-8 text-lg">
            <BiSolidLockOpen
              className="text-2xl"
              style={{ color: "#E1DDDD" }}
            />
            <span>PANEL ADMINA</span>
          </Link>
        )}
        <Link to="/kalendarz" className="flex items-center gap-2 px-8 text-lg">
          <PiPencilThin className="text-2xl" />
          <span>UMÓW SIĘ</span>
        </Link>
        <Link to="/cennik" className="flex items-center gap-2 px-8 text-lg">
          <LiaMoneyBillWaveSolid className="text-2xl" />
          <span>CENNIK</span>
        </Link>
        {!isLogged ? (
          <Link to="/zaloguj" className="flex items-center gap-2 px-8 text-lg">
            <MdOutlineAccountCircle className="text-2xl" />
            <span>ZALOGUJ SIĘ</span>
          </Link>
        ) : (
          <Link to="/konto" className="flex items-center gap-2 px-8 text-lg">
            <MdOutlineAccountCircle className="text-2xl" />
            <span>MOJE KONTO</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
