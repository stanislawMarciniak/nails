import "react-multi-carousel/lib/styles.css";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Center,
  useMediaQuery,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import CarouselContainer from "../components/home/CarouselContainer";
import { useImageContext } from "../components/ImageContext";
import "./Home.css";
import { HiOutlineSquare2Stack, HiOutlineSquares2X2 } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Gallery from "../components/home/Gallery";

const Home = () => {
  const { selectedImage, setSelectedImage } = useImageContext();
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const [isGallery, setIsGallery] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isLargerThan1000 ? setIsGallery(false) : setIsGallery(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [isLargerThan1000]);

  const handleCloseModal = () => setSelectedImage(null);

  return (
    <>
      {isLoading ? (
        <Center
          position="fixed"
          top={0}
          bottom={0}
          left={0}
          right={0}
          zIndex="1000"
        >
          <Spinner size="xl" color="secondColor" />
        </Center>
      ) : (
        <Box display={isLoading ? "none" : "initial"}>
          <Center>
            <Center
              background={"#E1DDDD"}
              w={"40"}
              className="fixed z-10 mt-6 text-4xl border-4 rounded-full shadow-xl bottom-10 border-secoundColor"
              _hover={{ cursor: "pointer" }}
            >
              <HiOutlineSquare2Stack
                onClick={() => setIsGallery(false)}
                className={`flex-grow rounded-l-full ${
                  !isGallery && "text-firstColor bg-secoundColor"
                }`}
              />
              <HiOutlineSquares2X2
                onClick={() => setIsGallery(true)}
                className={`flex-grow rounded-r-full ${
                  isGallery && "text-firstColor bg-secoundColor"
                }`}
              />
            </Center>
          </Center>

          {isGallery ? (
            <Gallery />
          ) : (
            <Box w={"full"} className="carousel-container">
              <CarouselContainer />
            </Box>
          )}

          {selectedImage && (
            <Modal
              isOpen={true}
              onClose={handleCloseModal}
              size={{ base: "xs", lg: "lg" }}
              isCentered
            >
              <ModalOverlay
                bg="none"
                backdropFilter="auto"
                backdropBlur="4px"
              />
              <ModalContent>
                <ModalBody>
                  <Image
                    src={selectedImage.imgUrl}
                    w={"100%"}
                    h={"100%"}
                    alt="Selected Image"
                  />
                  <Text
                    fontSize={{ base: "xl", lg: "2xl" }}
                    className="flex items-center justify-center h-24"
                  >
                    {selectedImage.service}
                  </Text>
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </Box>
      )}{" "}
    </>
  );
};

export default Home;
