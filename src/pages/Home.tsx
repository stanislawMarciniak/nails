import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { homeImages } from "../config/data";
import { Image } from "@chakra-ui/react";
import "./Home.css";

const Home = () => {
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

  return (
    <section className="flex justify-center">
      <div className="container">
        <div className=" py-14 photo-bx">
          <Carousel
            responsive={responsive}
            infinite={true}
            className=" photo-slider"
          >
            {homeImages.map((image, id) => (
              <div
                className="flex flex-col items-center mx-10 my-16 shadow-2xl photoram"
                key={id}
              >
                <Image src={image.imgUrl} w={"sm"} h={"sm"} />
                <span className="flex items-center h-16 text-2xl">
                  {image.service}
                </span>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Home;
