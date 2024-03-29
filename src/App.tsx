import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Calendar from "./pages/Calendar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Box, CSSReset, ChakraProvider } from "@chakra-ui/react";
import theme from "./config/theme";
import { ImageProvider } from "./components/ImageContext";
import Account from "./pages/Account";
import Admin from "./pages/Admin";

function BackgroundWrapper() {
  const location = useLocation();

  const getBackgroundImage = () => {
    switch (location.pathname) {
      case "/":
        return "url(/images/bg-pricing.PNG)";
      case "/cennik":
        return "url(/images/bg-pricing.PNG)";
      case "/kalendarz":
        return "url(/images/bg-calendar.PNG)";
      case "/konto":
        return "url(/images/bg-calendar.PNG)";
      case "/admin":
        return "url(/images/bg-calendar.PNG)";
      case "/zaloguj":
        return "url(/images/bg-login.PNG)";
      default:
        return "";
    }
  };

  return (
    <Box
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="app-container"
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cennik" element={<Pricing />} />
        <Route path="/kalendarz" element={<Calendar />} />
        <Route path="/zaloguj" element={<Login />} />
        <Route path="/konto" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ImageProvider>
        <BrowserRouter>
          <BackgroundWrapper />
        </BrowserRouter>
      </ImageProvider>
    </ChakraProvider>
  );
}

export default App;
