import { Box, Center, Image } from "@chakra-ui/react";
import { homeImages } from "../../config/data";
import { useImageContext } from "../ImageContext";

const Gallery = () => {
  const { setSelectedImage } = useImageContext();

  return (
    <Center
      flexWrap={"wrap"}
      gap={{ base: 7, lg: 12 }}
      mx={"16"}
      py={{ base: 7, lg: 16 }}
    >
      {homeImages.map((image, id) => (
        <Box p={6} bg={"white"} shadow={"xl"} key={id}>
          <Image
            w={"xs"}
            src={image.imgUrl}
            _hover={{ transform: "scale(0.96)", cursor: "pointer" }}
            onClick={() => setSelectedImage(image)}
          />
        </Box>
      ))}
    </Center>
  );
};

export default Gallery;
