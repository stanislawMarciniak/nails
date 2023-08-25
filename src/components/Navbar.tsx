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
  const [isListening, setIsListening] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();
        user && setIsLogged(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLogged(false);
      }
    };

    if (isListening) {
      const sessionListener = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN") {
            fetchUserData();
          } else if (event === "SIGNED_OUT") {
            setIsLogged(false);
          }
        }
      );

      return () => {
        sessionListener.data.subscription.unsubscribe();
      };
    }
  }, [isListening]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // Sign out using Supabase
      setIsLogged(false); // Update the login status
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="flex justify-between px-8 josefin-light navbar">
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
        {!isLogged ? (
          <Link to="/zaloguj" className="flex items-center gap-2 px-8 text-lg">
            <MdOutlineAccountCircle className="mb-1 text-2xl" />
            <span>ZALOGUJ SIĘ</span>
          </Link>
        ) : (
          <Link
            to="/zaloguj" // Change this route to the desired route when the user is logged out
            onClick={handleLogout}
            className="flex items-center gap-2 px-8 text-lg"
          >
            <MdOutlineAccountCircle className="mb-1 text-2xl" />
            <span>WYLOGUJ SIĘ</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
