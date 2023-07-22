import { Box, Flex, Image } from "@chakra-ui/react";
import "./CarouselContainer.css";
import { homeImages } from "../config/data";
import { useEffect, useState } from "react";

const CarouselContainer = ({ setSelectedImage }) => {
  const [clickedImage, setClickedImage] = useState(null);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

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

  const arr = [null, null];

  return (
    <Box className="logos mt-14">
      {arr.map(() => (
        <Box
          height={"-webkit-fit-content"}
          className="gap-48 logos-slide speed0"
        >
          {homeImages.map((image, id) => (
            <Box
              width={"sm"}
              className="flex flex-col items-center pb-20 mx-10 my-16 shadow-2xl photoram"
              key={id}
            >
              <Image
                src={image.imgUrl}
                _hover={{ transform: "scale(0.9)" }}
                draggable={false}
                onMouseDown={(event) => handleImageMouseDown(event, image)}
                onMouseUp={handleImageMouseUp}
              />
            </Box>
          ))}
        </Box>
      ))}
      <Box className="mt-32 ml-80 logos-slider">
        {arr.map(() => (
          <Box height={"-webkit-fit-content"} className="flex gap-52 speed1">
            {homeImages.map((image, id) => (
              <Box
                width={"xs"}
                className="flex flex-col items-center pb-20 mx-10 my-16 shadow-2xl photoram"
                key={id}
              >
                <Image
                  src={image.imgUrl}
                  _hover={{ transform: "scale(0.9)" }}
                  draggable={false}
                  onMouseDown={(event) => handleImageMouseDown(event, image)}
                  onMouseUp={handleImageMouseUp}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Box className="mt-20 ml-20 logos-slider">
        {arr.map(() => (
          <Box height={"-webkit-fit-content"} className="flex gap-80 speed2">
            {homeImages.map((image, id) => (
              <Box
                width={"2xs"}
                className="flex flex-col items-center pb-20 mx-10 my-16 shadow-2xl photoram"
                key={id}
              >
                <Image
                  src={image.imgUrl}
                  _hover={{ transform: "scale(0.9)" }}
                  draggable={false}
                  onMouseDown={(event) => handleImageMouseDown(event, image)}
                  onMouseUp={handleImageMouseUp}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CarouselContainer;
