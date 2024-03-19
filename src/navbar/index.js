import DrawerAppBar from "./Navbar";
import './navbar.css';

const Navbar = () => {
  const linkPage = (url) => {
    window.location.replace(window.location.origin + url);
  }
 
  return (
    <nav className="bg-white shadow fixed top-0 left-0 w-full z-10">
      <div className="mx-auto space-x-4">
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 bg-black">
          <div className="text-xs lg:col-span-6 md:col-span-12 ml-2 sm:col-span-12 lg:p-4 md:p-4 sm:p-4 xs:p-4 text-center lg:text-left font-articulat text-white font-normal cursor-pointer text-xs">
            Made to order, <span className="font-bold text-sm">Freshly milled flours.</span> Order before <span className="font-bold text-sm">7:00 PM</span> for day after delivery in <span className="font-bold text-sm">Hyderabad</span>.
          </div>
          <div className="lg:col-span-6 navbarHeaderDiv p-2 font-articulat text-white font-light text-right">
            <div className=" p-1 m-2 cursor-pointer font-normal inline-block inline-block p-1 rounded-t-lg hover:text-[#009898] hover:border-[#009898] dark:hover:text-[#009898] text-xs" onClick={() => linkPage("/help")}>Help</div>
            <div className=" p-1 m-2 cursor-pointer font-normal inline-block inline-block p-1 rounded-t-lg hover:text-[#009898] hover:border-[#009898] dark:hover:text-[#009898] text-xs" onClick={() => linkPage("/nutritionist_consultation")}>Nutritionist Consultation</div>
            <div className=" p-1 m-2 cursor-pointer font-normal inline-block inline-block p-1 rounded-t-lg hover:text-[#009898] hover:border-[#009898] dark:hover:text-[#009898] text-xs" onClick={() => linkPage("/Subscribe")}>Subscribe</div>
            <div className=" p-1 m-2 cursor-pointer font-normal inline-block inline-block p-1 rounded-t-lg hover:text-[#009898] hover:border-[#009898] dark:hover:text-[#009898] text-xs" onClick={() => linkPage("/refer_friend")}>Refer Friends</div>
            <div className=" p-1 m-2 cursor-pointer font-normal inline-block inline-block p-1 rounded-t-lg hover:text-[#009898] hover:border-[#009898] dark:hover:text-[#009898] text-xs" onClick={() => linkPage("/about")}>About</div>
          </div>
        </div>
       <DrawerAppBar />
        <div className="mt-2"></div>
      </div>
    </nav>
  );
}

export default Navbar;
