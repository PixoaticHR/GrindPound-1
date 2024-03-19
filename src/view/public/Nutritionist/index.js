import Nutrition from "../../../images/nutrition.png";
import HomeSubscribe from "../../public/Home/homeSubsrice";

const Nutritionist = () => {
    const linkPage = (url) => {
        window.location.replace(window.location.origin + url);
    }
    return (<>
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-8 mt-28">
            <div className="lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
            <div className="lg:col-span-4 md:col-span-6 sm:col-span-8 text-center">
                <img src={Nutrition} className="object-cover mt-1 h-64 mx-2" />
                <div className="text-sm p-1 font-articulat font-semibold">Great things coming soon.</div>
                <div className="text-xs p-1 font-articulat font-normal">We are a small and growing consulting firm with big ideas.</div>
                <button className="mt-2 focus:outline-none focus:ring-4 font-md w-full rounded-lg text-sm px-5 py-2.5 p-1 bg-[#009898] border-[#005956] focus:ring-4 focus:ring-[#005956] text-white" onClick={() => linkPage("/home")}>Back to home</button>
            </div>
            <div className="lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
        </div>
          <HomeSubscribe />
          </>
    )
}
export default Nutritionist;