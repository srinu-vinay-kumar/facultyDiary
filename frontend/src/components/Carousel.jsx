import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import carouselimg1 from "../assets/carouselimg1.jpg";
import carouselimg2 from "../assets/carouselimg2.jpg";
import carouselimg3 from "../assets/carouselimg3.jpg";
import carouselimg4 from "../assets/carouselimg4.jpg";

const Carousel = () => {
  const sliderData = [
    { image: carouselimg1 },
    { image: carouselimg2 },
    { image: carouselimg3 },
    { image: carouselimg4 },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <img src={slide.image} alt="slide" className="image" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
