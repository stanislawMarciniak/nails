import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { homeImages } from "../config/data";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  Text,
} from "@chakra-ui/react";
import "./Home.css";

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    largeDesktop: {
      breakpoint: { max: 3000, min: 1600 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Box className="flex justify-center">
      <Box className="container scale-90">
        <Carousel responsive={responsive} infinite={true}>
          {homeImages.map((image, id) => (
            <Box
              className="flex flex-col items-center pb-20 mx-10 my-16 shadow-2xl photoram"
              key={id}
            >
              <Image
                onClick={() => handleImageClick(image)}
                src={image.imgUrl}
                _hover={{ transform: "scale(0.9)" }}
                transition="transform 0.3s"
              />
            </Box>
          ))}
        </Carousel>
      </Box>
      {selectedImage && (
        <Modal isOpen={true} onClose={handleCloseModal} size={"lg"} isCentered>
          <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="4px" />
          <ModalContent>
            <ModalBody>
              <Image
                src={selectedImage.imgUrl}
                w={"100%"}
                h={"100%"}
                alt="Selected Image"
              />
              <Text className="flex items-center justify-center h-24 text-2xl">
                {selectedImage.service}
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Home;
