import React, { useEffect, useState } from "react";
import "./carouselMulti.css";

const CarouselMulti = ({ slides }) => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(slide === slides.length - 1 ? 0 : slide + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [slide, slides.length]);

  return (
    <div className="carousel">
      {slides.map((item, idx) => {
        return (
          <div
            key={idx} className={slide === idx ? "slide grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12" : "slide slide-hidden grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12"}
          >
            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 m-2 cursor-pointer">
              <img
                src={item.img1.image_url}
                alt={item.img1.id}
                key={idx}
                className="object-cover w-full h-full" />
            </div>
            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 m-2 cursor-pointer">
              <img
              src={item.img2.image_url}
              alt={item.img2.id}
                key={idx}
                className="object-cover w-full h-full" />
            </div>
          </div>
        );
      })}
      <span className="indicate">
        {slides.map((_, idx) => {
          return (
            <button
              key={"circle" + idx}
              className={`rounded-lg m-1 h-1 cursor-pointer  ${idx == slide ? "bg-[#009898] w-12" : "bg-[#95D5D1] w-8"}`}
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};
export default CarouselMulti;