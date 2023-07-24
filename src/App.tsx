import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Calendar from "./pages/Calendar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./config/theme";
import { ImageProvider } from "./components/ImageContext";

function BackgroundWrapper() {
  const location = useLocation();

  const getBackgroundImage = () => {
    switch (location.pathname) {
      case "/":
        return "url(/public/images/bg-pricing.PNG)";
      case "/cennik":
        return "url(/public/images/bg-pricing.PNG)";
      case "/kalendarz":
        return "url(/public/images/bg-calendar.PNG)";
      case "/zaloguj":
        return "url(/public/images/bg-login.PNG)";
      default:
        return "";
    }
  };

  return (
    <div
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cennik" element={<Pricing />} />
        <Route path="/kalendarz" element={<Calendar />} />
        <Route path="/zaloguj" element={<Login />} />
      </Routes>
    </div>
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
