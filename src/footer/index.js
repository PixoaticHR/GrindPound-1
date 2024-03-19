
const Footer = () => {
  const linkPage = (url) => {
    window.location.replace(window.location.origin + url);
}
  return (
    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 bg-black p-2">
      <div className="text-sm lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 text-base font-articulat text-white font-semibold"> Help</div>
      <div className="text-sm lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 text-base font-articulat text-white font-semibold"> ABOUT</div>
      <div className="text-sm lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 text-base font-articulat text-white font-semibold"> RESOURCES</div>
      <div className="text-sm lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 text-base font-articulat text-white font-semibold"> SUPPORT</div>

      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-[#FBF5F1] text-sm font-normal cursor-pointer inline-block rounded-t-lg hover:text-[#009898] dark:hover:text-[#009898]" onClick={()=>linkPage("/order_status")}> Order Status</div>
      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-[#FBF5F1] text-sm font-normal cursor-pointer inline-block rounded-t-lg hover:text-[#009898] dark:hover:text-[#009898]" onClick={()=>linkPage("/our_story")}> Our Story</div>
      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-[#FBF5F1] text-sm font-normal cursor-pointer inline-block rounded-t-lg hover:text-[#009898] dark:hover:text-[#009898]"  onClick={()=>linkPage("/nutritionist_consultation")}> Nutritionist</div>
      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-sm font-normal text-[#D7B57F]"> Got Questions ? Call us 24/7!</div>

      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-[#FBF5F1] text-sm font-normal cursor-pointer inline-block rounded-t-lg hover:text-[#009898] dark:hover:text-[#009898]" onClick={()=>linkPage("/dispatch_delivery")}>Dispatch and Delivery Returns,</div>
      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-[#FBF5F1] text-sm font-normal cursor-pointer inline-block rounded-t-lg hover:text-[#009898] dark:hover:text-[#009898]"  onClick={()=>linkPage("/our_blogs")}> Our Blogs</div>
      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-[#FBF5F1] text-sm font-normal cursor-pointer inline-block rounded-t-lg hover:text-[#009898] dark:hover:text-[#009898]"  onClick={()=>linkPage("/Subscribe")}> Subscribe</div>
      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-[#FBF5F1] text-sm font-normal "> (+91)9876543210, (+91) 123456789</div>


      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-[#FBF5F1] text-sm font-normal cursor-pointer inline-block rounded-t-lg hover:text-[#009898] dark:hover:text-[#009898]"  onClick={()=>linkPage("/refund_cancellation_policy_feedback")}>Refund and Cancellation Policy Feedback</div>
      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-[#FBF5F1] text-sm font-normal cursor-pointer inline-block rounded-t-lg hover:text-[#009898] dark:hover:text-[#009898]"  onClick={()=>linkPage("/reviews")}> Reviews</div>
      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-[#FBF5F1] text-sm font-normal cursor-pointer inline-block rounded-t-lg hover:text-[#009898] dark:hover:text-[#009898]"  onClick={()=>linkPage("/refer_friend")}>Refer a Friend</div>
      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-sm font-normal text-[#D7B57F]"> Contact info</div>

      <div className="text-xs lg:col-span-9 md:col-span-9 sm:col-span-6 p-2 font-articulat"><div className="text-[#FBF5F1] text-xs font-normal cursor-pointer inline-block rounded-t-lg hover:text-[#009898] dark:hover:text-[#009898]" onClick={()=>linkPage("/feedback")}>Feedback</div><br /><div className=" mt-3 text-[#FBF5F1] text-xs font-normal cursor-pointer inline-block rounded-t-lg hover:text-[#009898] dark:hover:text-[#009898]" onClick={()=>linkPage("/faq")}>FAQ</div></div>
      <div className="text-xs lg:col-span-3 md:col-span-3 sm:col-span-6 p-2 font-articulat text-[#FBF5F1] text-sm font-normal"> 40 1st Floor, Harisiddha Chambers, Ashram Road, Nr Income Tax Circle, Ashram Road</div>

      <hr className="lg:col-span-12  md:col-span-12 sm:col-span-12 " />

      <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 bg-black p-2 mt-3">
          <div className="text-xs lg:col-span-6 md:col-span-6 sm:col-span-6 font-articulat text-white font-normal text-xs text-left">
            <span>Privacy Policy</span>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <span>Terms of Sale</span>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <span>Terms of Use</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <span className="text-xs lg:col-span-6 md:col-span-6 sm:col-span-6 font-articulat text-white font-normal lg:text-right md:text-right sm:text-left mr-2">Copyright @2024. All rights reserved</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </div>
  );
}

export default Footer;
