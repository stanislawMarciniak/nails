import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { homeImages } from "../config/data";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
} from "@chakra-ui/react";
import "./Home.css";
import { RESPONSIVENESS_1, RESPONSIVENESS_2 } from "../constants/config";

const Home = () => {
  const [clickedImage, setClickedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const handleImageMouseDown = (event, image) => {
    setStartX(event.clientX);
    setClickedImage(image);
  };

  const handleImageMouseUp = (event) => setEndX(event.clientX);

  useEffect(() => {
    if (endX - startX === 0) {
      setSelectedImage(clickedImage);
    }
  }, [endX, startX]);

  const handleCloseModal = () => setSelectedImage(null);

  return (
    <Box className="flex justify-center h-screen">
      <Box
        className="w-full carousel-container"
        style={{ position: "relative" }}
      >
        {/* Karuzela główna z efektem parallaksy */}
        <Carousel
          responsive={RESPONSIVENESS_1}
          infinite={true}
          autoPlay={true}
          centerMode={true}
          containerClass="carousel-top"
          swipeable={true}
          speed={500} // Dostosuj prędkość slidowania dla efektu parallaksy
        >
          {homeImages.map((image, id) => (
            <Box
              className="flex flex-col items-center pb-20 mx-10 my-16 shadow-2xl photoram"
              key={id}
            >
              <Image
                src={image.imgUrl}
                _hover={{ transform: "scale(0.9)" }}
                transition="transform 0.3s"
                draggable={false}
                onMouseDown={(event) => handleImageMouseDown(event, image)}
                onMouseUp={handleImageMouseUp}
              />
            </Box>
          ))}
        </Carousel>

        {/* Karuzela tła z mniejszą wartością speed */}
        <Carousel
          responsive={RESPONSIVENESS_1}
          infinite={true}
          autoPlay={true}
          centerMode={true}
          containerClass="carousel-bg"
          swipeable={true}
          speed={1000} // Dostosuj mniejszą wartość prędkości slidowania dla tła
        >
          {homeImages.map((image, id) => (
            <Box
              className="flex flex-col items-center pb-20 mx-10 my-16 shadow-2xl photoram"
              key={id}
            >
              <Image
                src={image.imgUrl}
                _hover={{ transform: "scale(0.9)" }}
                transition="transform 0.3s"
                draggable={false}
                // Zablokuj interakcje z tłem (opcjonalnie)
                pointerEvents="none"
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
