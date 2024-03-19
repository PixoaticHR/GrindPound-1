import "./style.css";
import Carousel from "../../../components/carouselMulti";
import { useEffect, useState } from "react";

const Slider = (props) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < props.data.length; i++) {
      if (i % 2 !== 0) {
        arr.push({img1:props.data[i - 1],img2:props.data[i]})
      }
    }
    setData(arr)
  }, [props.data]);

  return (
    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 p-5 mt-5 w-[100%]">
      <Carousel slides={data} />
    </div>
  );
}

export default Slider;