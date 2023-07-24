import "react-multi-carousel/lib/styles.css";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
} from "@chakra-ui/react";
import CarouselContainer from "../components/CarouselContainer";
import { useImageContext } from "../components/ImageContext";
import './Home.css'

const Home = () => {
  const { selectedImage, setSelectedImage } = useImageContext();

  const handleCloseModal = () => setSelectedImage(null);

  return (
    <Box className="flex justify-center h-screen">
      <Box w={"full"} className="logos">
        <CarouselContainer />
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
