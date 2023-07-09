import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Calendar from "./pages/Calendar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./config/theme";

function App() {
  return (
    <div>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cennik" element={<Pricing />} />
            <Route path="/kalendarz" element={<Calendar />} />
            <Route path="/zaloguj" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
