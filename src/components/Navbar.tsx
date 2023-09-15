import { Link } from "react-router-dom";
import { BiHomeHeart } from "react-icons/bi";
import { PiPencilThin } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import "./Navbar.css";
import { useEffect, useState } from "react";
import supabase, { getUser } from "../config/supabaseClient";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);

  const fetchUserData = async () => {
    try {
      const user = await getUser();

      user && setIsLogged(true);
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLogged(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="flex justify-between px-8 josefin-light navbar">
      <Link to="/" className="flex items-center gap-2 text-lg">
        <BiHomeHeart className="text-2xl" />
        <span>STRONA GŁÓWNA</span>
      </Link>
      <div className="flex">
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
          <Link
            to="/zaloguj"
            onClick={handleLogout}
            className="flex items-center gap-2 px-8 text-lg"
          >
            <MdOutlineAccountCircle className="text-2xl" />
            <span>WYLOGUJ SIĘ</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
