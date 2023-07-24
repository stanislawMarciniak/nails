import { Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { homeImages } from "../config/data";
import { useImageContext } from "./ImageContext";

const CarouselItem = ({
  id,
  top = "",
  right = "",
  bottom = "",
  left = "",
  size = "xs",
  zIndex = 1,
}) => {
  const [clickedImage, setClickedImage] = useState(null);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const { setSelectedImage } = useImageContext();

  const handleImageMouseDown = (event, image) => {
    setStartX(event.clientX);
    setClickedImage(image);
  };

  const handleImageMouseUp = (event) => setEndX(event.clientX);

  useEffect(() => {
    if (endX - startX < 10 && endX - startX > -10) {
      setSelectedImage(clickedImage);
    }
  }, [endX, startX]);

  return (
    <Box
      width={size}
      className={`absolute flex flex-col items-center shadow-2xl photoram-${size}`}
      style={{ left, right, top, bottom, zIndex }}
    >
      <Image
        src={homeImages[id].imgUrl}
        _hover={{ transform: "scale(0.96)", cursor: "pointer" }}
        draggable={false}
        onMouseDown={(event) => handleImageMouseDown(event, homeImages[id])}
        onMouseUp={handleImageMouseUp}
      />
    </Box>
  );
};

export default CarouselItem;
