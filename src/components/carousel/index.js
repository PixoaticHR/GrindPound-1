import React, { useEffect, useState } from "react";
import "./carousel.css";

const CarouselBaneer = ({ data }) => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(slide === data.length - 1 ? 0 : slide + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [slide, data.length]);

  return (
    <div className="carousel1">
      {data.map((item, idx) => {
        return (
          <div key={idx}>
            < img
              src={item.image_url}
              alt={item.image_url}
              key={idx}
              className={slide === idx ? "slide object-cover w-full h-full" : "slide slide-hidden object-cover w-full h-full"}
            />
          </div>
        );
      })}
      <div className="inditext1">
        <span className="text-2xl font-semibold"> Elevate Morning With 100% </span>
      </div>
      <div className="inditext2">
        <span className=" text-2xl font-semibold">Unpolished Daliya</span><br />
      </div>
      <div className="inditext3">
        <button className="focus:outline-none text-white bg-[#009898] w-48 hover:bg-[#009898] focus:ring-4 focus:ring-[#009898] font-medium rounded-lg text-sm px-5 py-2.5 p-3"
          onClick={() => window.location.replace(window.location.origin + '/product?id=0')}>Shop Now</button>
      </div>
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={"circle" + idx}
              className={`rounded-lg m-1 w-12 h-1 cursor-pointer  ${idx == slide ? "bg-[#009898]" : "bg-[#95D5D1]"}`}
              onClick={() => setSlide(idx)}
            >
            </button>
          );
        })}
      </span>
    </div >
  );
};
export default CarouselBaneer;