import { Center, Image } from "@chakra-ui/react";
import { homeImages } from "../config/data";
import { useImageContext } from "./ImageContext";

const Gallery = () => {
  const { setSelectedImage } = useImageContext();

  return (
    <Center flexWrap={"wrap"} gap={12} mx={"16"} mt={16}>
      {homeImages.map((image) => (
        <Image
          bg={"white"}
          p={6}
          w={"xs"}
          src={image.imgUrl}
          shadow={"xl"}
          _hover={{ transform: "scale(0.96)", cursor: "pointer" }}
          onClick={() => setSelectedImage(image)}
        />
      ))}
    </Center>
  );
};

export default Gallery;
