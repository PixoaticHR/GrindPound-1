import { useEffect, useState } from "react";
import StoryImg from "../../../images/storyImg.png";
import HomeSubscribe from "../Home/homeSubsrice";
import C1 from "../../../images/c1.png";
import C2 from "../../../images/c2.png";
import C3 from "../../../images/c3.png";
import CarousalMulti from "../Home/slider";
import TextInput from "../../../components/Shared/TextInput";
import { notificationService } from "../../../services/notifications/notificationService";
import { getBaneerImg } from "../../../services";

const ReferFriend = () => {
    const [email, setEmail] = useState("");
    const [auth, setAuth] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    const [advertiseList, setAdvertiseList] = useState([]);
    const [promotionList, setPromotionList] = useState([]);

    const handleSubmit = () => {
        if (emailValidate(email)) {
            setSendEmail(!sendEmail);
        } else {
            notificationService.sendMessage({ type: "error", title: "Email", text: "Please Enter Valid Email ." })
        }
    }
    const emailValidate = (email) => {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
        if (email?.match(pattern) && email) {
            return true;
        } else {
            return false;
        }
    }
    const getBannerList = () => {
        getBaneerImg()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj.banners;
                    const advertise = data.filter(ele => ele.banner_type === 'advertise');
                    const promotion = data.filter(ele => ele.banner_type === 'promotion');
                    setPromotionList(promotion);
                    setAdvertiseList(advertise);
                }
            })
            .catch((error) => {
                setAdvertiseList([]);
                setPromotionList([]);
                notificationService.sendMessage({ type: "error", title: "Banner List", text: error.receiveObj.message })
            });
    }
    useEffect(() => {
        var token = localStorage.getItem('token');
        if (token?.length > 0) {
            setAuth(!auth);
        }
        getBannerList();
    }, []);

    return (
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-2 mt-28">
            <img src={StoryImg} className="lg:col-span-6 md:col-span-6 sm:col-span-12 mt-5 w-full m-2" />
            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 mt-5 m-2 p-2">
                {sendEmail ? <>
                    <div className="text-2xl p-2 font-articulat font-semibold">Thanks for sharing G&P</div>
                    <div className="text-xs p-2 font-articulat font-normal">
                        After your friend makes their first Burrow purchase over rs. 5000, you’ll find your 10% gift card in your inbox. <br /><br />   Don’t stop there! The more you share the more rewards you’ll get!</div>
                    <div className="p-2">
                        <button
                            className="mt-5 rounded-lg bg-[#009898] w-48 font-articulat text-xs text-white p-3 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button" onClick={() => window.location.reload()}>
                            Share Again
                        </button>
                    </div>
                </> : <>
                    <div className="text-lg p-2 font-articulat font-semibold">Get rewarded for sharing your style</div>
                    <div className="text-xs p-2 font-articulat font-normal">
                        Let a friend know that G&P is having a sale, and if they spend over rs 5000, we’ll give you a 10% gift voucher. They save, you earn, everyone wins. </div>
                    <div className="p-2">
                        <TextInput
                            isLabelShow={true}
                            type="text"
                            showLabel={auth ? "Your friend Email" : "Your Email"}
                            name="email"
                            id="email"
                            placeholder={auth ? "Enter your friend email here" : "Enter your email here"}
                            error={false}
                            errorMessage="Email is required"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {auth &&
                            <div className="text-xs p-5 font-articulat font-normal">
                                Check out G&P Presidents’ Day! They sell best food and premium quality, and ships free. You can also collect for their near buy store </div>
                        }
                        <button
                            className="mt-5 rounded-lg bg-[#009898] w-48 font-articulat text-xs text-white p-3 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button" onClick={handleSubmit}>
                            {auth ? "Send" : "Next"}
                        </button>
                    </div>
                </>}
            </div>

            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-12 text-center text-2xl p-2 font-articulat font-semibold ">We’re solving the biggest problems</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-12">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 bg-black text-white divide-x">
                    <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-10">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 h-64 p-10">
                            <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 text-right mt-10">
                                <img src={C1} className="object-cover mt-1 h-16 cursor-pointer" />
                            </div>
                            <div className="lg:col-span-9 md:col-span-9 sm:col-span-8 text-left mt-10">
                                <div className="text-center text-lg font-articulat font-semibold ">Freshly Milled Grains</div>
                                <div className="text-center text-xs font-articulat font-semibold">We do not stock products in our warehouse.​ Every grain is freshly milled and delivered promptly to you to ensure peak quality</div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-5">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-10">
                            <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 text-right mt-16">
                                <img src={C2} className="object-cover mt-1 h-16 cursor-pointer" />
                            </div>
                            <div className="lg:col-span-9 md:col-span-9 sm:col-span-8 text-left mt-16">
                                <div className="text-center text-lg font-articulat font-semibold">Eco-friendly Packaging</div>
                                <div className="text-center text-xs font-articulat font-semibold ">Our pack is made of 100% biodegradable, enzyme based material. Making each order a bundle of goodness, both on the inside and out.</div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-5">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-10">
                            <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 text-right mt-16">
                                <img src={C3} className="object-cover h-16 cursor-pointer" />
                            </div>
                            <div className="lg:col-span-9 md:col-span-9 sm:col-span-8 text-left mt-16">
                                <div className="text-center text-lg font-articulat font-semibold">Customised Flours</div>
                                <div className="text-center text-xs font-articulat font-semibold ">Our products are made to order, which guarantees that your Floryo experience is going to be personalised like non other. Don’t be shy and state your preferences</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-10 text-center text-2xl p-2 font-articulat font-semibold">Fresh Mill, delivered at your convenience</div>

                {promotionList.map(ele => {
                    return <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-12" style={{ display: "flex", position: "relative", textAlign: "center", height: "521px" }}>
                        <img src={ele.image_url} className="w-full cursor-pointer" />
                        <span className="text-center text-xl  font-articulat">
                            <div className="" style={{ color: ele.text_color, display: "flex", position: "absolute", textAlign: "center", top: "12rem", left: "20rem", right: "20rem" }}>{ele.title}</div>
                            <span style={{ display: "flex", position: "absolute", textAlign: "center", top: "16rem", left: "40rem" }}>
                                <button className="focus:outline-none text-white bg-[#009898] hover:bg-[#009898] mt-5 focus:ring-4 focus:ring-[#009898] font-medium rounded-lg text-sm px-5 py-2.5 p-3">Find Out More </button>
                            </span>
                        </span>
                    </div>
                })}

                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-10 text-center text-2xl p-2 font-articulat font-semibold">Fresh Mill, delivered at your convenience</div>

                <CarousalMulti data={advertiseList} />

                <HomeSubscribe />
            </div>
        </div>
    );
}

export default ReferFriend;