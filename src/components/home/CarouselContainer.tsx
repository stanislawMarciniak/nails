import "./CarouselContainer.css";
import Carousel from "react-multi-carousel";
import { RESPONSIVENESS_1 } from "../../config/constants";
import CarouselItem from "./CarouselItem";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { homeImages } from "../../config/data";

const CarouselContainer = () => {
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const length = Math.floor(homeImages.length / 3);

  return isLargerThan1000 ? (
    <Carousel
      infinite={true}
      responsive={RESPONSIVENESS_1}
      itemClass="carousel-item"
      swipeable={true}
      ssr={true}
    >
      <Flex>
        <CarouselItem id={0} top="40%" left="-3%" zIndex={3} size="2xs" />
        <CarouselItem id={1} top="12%" left="3%" zIndex={2} size="sm" />
        <CarouselItem id={2} top="36%" left="17%" />
        <CarouselItem id={3} top="7%" left="27%" zIndex={-1} size="sm" />
        <CarouselItem id={4} top="32%" left="40%" />
        <CarouselItem id={5} top="15%" left="51%" size="2xs" />
        <CarouselItem id={6} top="20%" left="59%" zIndex={-1} size="sm" />
        <CarouselItem id={7} top="8%" left="72%" size="sm" />
        <CarouselItem id={8} top="35%" left="85%" />
      </Flex>
      <Flex>
        <CarouselItem id={9} top="10%" left="-3%" zIndex={3} size="2xs" />
        <CarouselItem id={10} top="20%" left="3%" zIndex={2} size="sm" />
        <CarouselItem id={11} top="35%" left="17%" />
        <CarouselItem id={12} top="7%" left="25%" zIndex={-1} size="sm" />
        <CarouselItem id={13} top="32%" left="40%" />
        <CarouselItem id={14} top="24%" left="51%" size="2xs" />
        <CarouselItem id={15} top="15%" left="59%" zIndex={-1} size="sm" />
        <CarouselItem id={16} top="36%" left="72%" />
        <CarouselItem id={17} top="8%" left="83%" />
      </Flex>
    </Carousel>
  ) : (
    <Carousel
      infinite={true}
      responsive={RESPONSIVENESS_1}
      itemClass="carousel-item"
      swipeable={true}
      ssr={true}
    >
      {Array.from({ length }, (_, index) => (
        <Flex key={index}>
          <CarouselItem
            id={3 * index}
            top="23%"
            left="3%"
            zIndex={2}
            size="3xs"
          />
          <CarouselItem id={3 * index + 1} top="2%" right="3%" size="3xs" />
          <CarouselItem
            id={3 * index + 2}
            top="53%"
            left="28%"
            zIndex={3}
            size="3xs"
          />
        </Flex>
      ))}
    </Carousel>
  );
};

export default CarouselContainer;
