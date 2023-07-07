import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Calendar from "./pages/Calendar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { CSSReset, ChakraProvider, Image } from "@chakra-ui/react";
import theme from "./config/theme";

function App() {
  return (
    <div>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Image
          src="/public/images/pink_blob.png"
          alt="Pink Blob"
          objectFit="cover"
          w="60vw"
          h="60vh"
          position="fixed"
          top={20}
          left={0}
          zIndex={-1}
          opacity={0.5}
        />
        <Image
          src="/public/images/pink_blob.png"
          alt="Pink Blob"
          objectFit="cover"
          w="60vw"
          h="60vh"
          position="fixed"
          bottom={0}
          right={0}
          zIndex={-1}
          opacity={0.5}
        />
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
