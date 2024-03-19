import FaceBook from "../../../images/facebook.png";
import Insta from "../../../images/insta.png";
import Twitter from "../../../images/twitter.png";
import Youtube from "../../../images/youtube.png";
import TextInput from "../../../components/TextInput";

const HomeSubscribe = () => {
  return (
    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-7 bg-[#EBC794]">
      <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 mt-4">
        <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 text-center p-2 ml-5 mt-9 mb-9">
          <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 divide-x border border-['#FBF5F1'] rounded-lg">
            <div className="lg:col-span-9 md:col-span-9 sm:col-span-9 font-articulat">
              <input
                type="text"
                label="Email"
                name="email"
                id="email"
                className="h-full w-full bg-white text-sm font-normal p-2 mr-2 font-articulat p-3"
                placeholder="Enter your Email to get news letter for update, sale and other offers"
              />
            </div>
            <span className="lg:col-span-3 md:col-span-3 sm:col-span-3 text-center p-2 bg-[#009898] font-articulat font-normal text-lg text-white 
            focus:outline-none focus:ring-[#009898] focus:ring-4 rounded-lg hover:bg-[#009898] focus:ring-4 focus:ring-[#009898] cursor-pointer"> Subcribe Now</span>
          </div>
          {/* <div className="relative flex w-full max-w-[60rem]">
            <div className="h-10 w-full min-w-[200px]">
              <input type="email"
                className="h-full w-full bg-white border border-[#FBF5F1] rounded-lg text-sm font-normal p-2 mr-2 font-articulat"
                placeholder="Enter your Email to get news letter for update, sale and other offers"
              />
            </div>
            <button
              className="!absolute right-0 w-48 h-full select-none font-articulat rounded-lg bg-[#009898] text-center text-xs text-white p-2 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button">
              Subcribe Now
            </button>
          </div> */}
        </div>
        <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 text-right mt-9">
          <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-4 ">
            <span className="lg:col-span-8 md:col-span-4 sm:col-span-1"></span>
            <span className="lg:col-span-1 md:col-span-2 sm:col-span-2 text-center mt-1  cursor-pointer"><img src={FaceBook} className="object-cover mt-1 w-5" /></span>
            <span className="lg:col-span-1 md:col-span-2 sm:col-span-3 text-center mt-1  cursor-pointer"><img src={Twitter} className="object-cover mt-1 w-6" /></span>
            <span className="lg:col-span-1 md:col-span-2 sm:col-span-3 text-center mt-1  cursor-pointer"><img src={Insta} className="object-cover mt-1 w-5" /></span>
            <span className="lg:col-span-1 md:col-span-2 sm:col-span-3 text-center mt-1  cursor-pointer"><img src={Youtube} className="object-cover mt-1 w-6" /></span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomeSubscribe;