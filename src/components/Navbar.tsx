import { Link, useNavigate } from "react-router-dom";
import { BiHomeHeart } from "react-icons/bi";
import { PiPencilThin } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { BiSolidLockOpen } from "react-icons/bi";
import "./Navbar.css";
import { useEffect, useState } from "react";
import supabase, { getUser } from "../config/supabaseClient";
import {
  Flex,
  VStack,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

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
        setIsAdmin(false);
      }
    });

    return () => {
      sessionListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <Flex
      alignItems="center"
      className="justify-between px-8 josefin-light navbar"
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-lg"
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <BiHomeHeart fontSize="2xl" />
        <span>STRONA GŁÓWNA</span>
      </Link>
      {isLargerThan1000 ? (
        <div className="flex">
          {isAdmin && (
            <Link to="/admin" className="flex items-center gap-2 px-8 text-lg">
              <BiSolidLockOpen fontSize="2xl" style={{ color: "#E1DDDD" }} />
              <span>PANEL ADMINA</span>
            </Link>
          )}
          <Link
            to="/kalendarz"
            className="flex items-center gap-2 px-8 text-lg"
          >
            <PiPencilThin fontSize="2xl" />
            <span>UMÓW SIĘ</span>
          </Link>
          <Link to="/cennik" className="flex items-center gap-2 px-8 text-lg">
            <LiaMoneyBillWaveSolid fontSize="2xl" />
            <span>CENNIK</span>
          </Link>
          {!isLogged ? (
            <Link
              to="/zaloguj"
              className="flex items-center gap-2 px-8 text-lg"
            >
              <MdOutlineAccountCircle fontSize="2xl" />
              <span>ZALOGUJ SIĘ</span>
            </Link>
          ) : (
            <Link to="/konto" className="flex items-center gap-2 px-8 text-lg">
              <MdOutlineAccountCircle fontSize="2xl" />
              <span>MOJE KONTO</span>
            </Link>
          )}
        </div>
      ) : (
        <>
          <Menu isOpen={isMenuOpen}>
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} h={1}>
              <HamburgerIcon />
            </MenuButton>
            <MenuList className="menu-list">
              <VStack spacing={0}>
                <MenuItem
                  className="menu-item"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/kalendarz");
                  }}
                >
                  <Box className="flex items-center gap-2">
                    <PiPencilThin />
                    <span>UMÓW SIĘ</span>
                  </Box>
                </MenuItem>
                <Divider />
                <MenuItem
                  className="menu-item"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/cennik");
                  }}
                >
                  <Box className="flex items-center gap-2 ">
                    <LiaMoneyBillWaveSolid />
                    <span>CENNIK</span>
                  </Box>
                </MenuItem>
                <Divider />

                {!isLogged ? (
                  <MenuItem
                    className="menu-item"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/zaloguj");
                    }}
                  >
                    <Box className="flex items-center gap-2">
                      <MdOutlineAccountCircle />
                      <span>ZALOGUJ SIĘ</span>
                    </Box>
                  </MenuItem>
                ) : (
                  <MenuItem
                    className="menu-item"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/konto");
                    }}
                  >
                    <Box className="flex items-center gap-2">
                      <MdOutlineAccountCircle />
                      <span>MOJE KONTO</span>
                    </Box>
                  </MenuItem>
                )}

                {isAdmin && (
                  <>
                    <Divider />
                    <MenuItem
                      className="menu-item"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/admin");
                      }}
                    >
                      <Box className="flex items-center gap-2">
                        <BiSolidLockOpen
                          fontSize="2xl"
                          style={{ color: "#E1DDDD" }}
                        />
                        <span>PANEL ADMINA</span>
                      </Box>
                    </MenuItem>
                  </>
                )}
              </VStack>
            </MenuList>
          </Menu>
        </>
      )}
    </Flex>
  );
};

export default Navbar;
