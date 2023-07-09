import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Home = () => {
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
            <div className="px-16 py-14 bg-darkCustom skill-bx zoomIn">
              <h2 className="mb-8 text-5xl font-bold">Skills</h2>
              <p className="mb-8 text-lg tracking-wider text-gray-400">
                I believe I have what it takes to become a web developer. Most
                of my projects are done using Next.js and its SSR. However, I am
                now considering switching to Vite because of its fast
                development experience. Currently, I am making my projects
                increasingly complex, so I am learning TypeScript and Docker.
              </p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                {skillsData.map((skill, id) => (
                  <div className="flex flex-col items-center" key={id}>
                    <div className="p-4 rounded-full">
                      <skill.Icon
                        style={{ fill: "url(#blue-gradient)" }}
                        className="text-9xl"
                      />
                    </div>
                    <span className="text-2xl">{skill.name}</span>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
