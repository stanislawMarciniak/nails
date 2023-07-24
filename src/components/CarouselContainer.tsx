import "./CarouselContainer.css";
import Carousel from "react-multi-carousel";
import { RESPONSIVENESS_1 } from "../constants/config";
import CarouselItem from "./CarouselItem";
import { Box, Flex } from "@chakra-ui/react";

const CarouselContainer = () => {
  return (
    <Carousel
      infinite={true}
      responsive={RESPONSIVENESS_1}
      itemClass="h-screen relative"
      containerClass="h-screen"
    >
      <Flex>
        <CarouselItem id={0} top="35%" left="-2%" zIndex={3} size="2xs" />
        <CarouselItem id={1} top="10%" left="3%" zIndex={2} size="sm" />
        <CarouselItem id={2} top="35%" left="17%" />
        <CarouselItem id={3} top="7%" left="25%" zIndex={-1} size="sm" />
        <CarouselItem id={4} top="35%" left="40%" />
        <CarouselItem id={5} top="24%" left="51%" size="2xs" />
        <CarouselItem id={6} top="20%" left="59%" size="sm" zIndex={-1} />
        <CarouselItem id={7} top="4%" left="72%" size="sm" />
        <CarouselItem id={8} top="35%" left="85%" />
      </Flex>
      <CarouselItem id={9} />
      <CarouselItem id={10} />
      <CarouselItem id={11} />
      <CarouselItem id={12} />
      <CarouselItem id={13} />
      <CarouselItem id={14} />
      <CarouselItem id={15} />
      <CarouselItem id={16} />
      <CarouselItem id={17} />
    </Carousel>
  );
};

export default CarouselContainer;
