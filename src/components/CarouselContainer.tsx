import { Box, Image } from "@chakra-ui/react";
import "./CarouselContainer.css";
import { homeImages } from "../config/data";
import { useEffect, useState } from "react";

function getRandomInt(min = 0, max = 10, mod = 1.3) {
  return min + Math.floor(Math.random() * (max - min + 1) * mod);
}

const CarouselContainer = ({ setSelectedImage }) => {
  const [shuffledArray, setShuffledArray] = useState([]);
  const [doubleShuffledArray, setDoubleShuffledArray] = useState([]);
  const [clickedImage, setClickedImage] = useState(null);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const initialShuffledArray = shuffleArray(homeImages);
    const initialDoubleShuffledArray = shuffleArray(homeImages);

    setShuffledArray(initialShuffledArray);
    setDoubleShuffledArray(initialDoubleShuffledArray);
  }, []);

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
    <Box className="logos pt-14">
      {arr.map(() => (
        <Box height={"full"} className="logos-slide speed0">
          {homeImages.map((image, id) => (
            <Box
              width={"sm"}
              height={"fit-content"}
              className="flex flex-col items-center pb-20 shadow-2xl photoram"
              key={id}
              style={{
                margin: `${getRandomInt(3, 6)}rem ${getRandomInt(7, 20)}rem  `,
              }}
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
          <Box height={"-webkit-fit-content"} className="flex speed1">
            {shuffledArray.map((image, id) => (
              <Box
                width={"xs"}
                height={"fit-content"}
                className="flex flex-col items-center pb-20 shadow-2xl photoram"
                key={id}
                style={{
                  margin: `${getRandomInt(3, 6)}rem ${getRandomInt(3, 15)}rem`,
                }}
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
          <Box height={"-webkit-fit-content"} className="flex speed2">
            {doubleShuffledArray.map((image, id) => (
              <Box
                width={"2xs"}
                height={"fit-content"}
                className="flex flex-col items-center pb-20 shadow-2xl photoram"
                key={id}
                style={{
                  margin: `${getRandomInt(4, 6)}rem ${getRandomInt(4, 16)}rem`,
                }}
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
