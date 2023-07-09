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
    <section className="mb-20 -mt-4 skill" style={{ position: "relative" }}>
      <div className="transparent-element" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="flex justify-center px-16 py-14 bg-darkCustom skill-bx">
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                {homeImages.map((image, id) => (
                  <div
                    className="flex flex-col items-center mx-3 photoram"
                    key={id}
                  >
                    <Image src={image.imgUrl} w={"sm"} h={"sm"} />
                    <span className="text-2xl">{image.service}</span>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <div className="flex flex-wrap justify-center mt-20 gap-9">
    //   <Carousel
    //     responsive={responsive}
    //     infinite={true}
    //     className="owl-carousel owl-theme skill-slider"
    //   >
    //     {homeImages.map((image, id) => (
    //       <div className="flex flex-col items-center photoram" key={id}>
    //         <Image src={image.imgUrl} w={"sm"} h={"sm"} />
    //         <span className="text-2xl">{image.service}</span>
    //       </div>
    //     ))}
    //   </Carousel>
    // </div>
  );
};

export default Home;
