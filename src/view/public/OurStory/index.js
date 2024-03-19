import { useEffect, useState } from "react";
import StoryImg from "../../../images/storyImg.png";
import HomeSubscribe from "../Home/homeSubsrice";
import CarouselBaneer from "../../../components/carousel";
import C1 from "../../../images/c1.png";
import C2 from "../../../images/c2.png";
import C3 from "../../../images/c3.png";
import CarousalMulti from "../Home/slider";
import { getBaneerImg } from "../../../services/index";
import { notificationService } from '../../../services/notifications/notificationService';
import { getOurStoryList, getOurStoryShow } from "../../../services/footer";

const OurStory = (props) => {
    const [bannerList, setBannerList] = useState([]);
    const [ourStoryList, setOurStory] = useState([]);
    const [ourStoryDetails, setOurStoryDetails] = useState({});
    const [promotionList, setPromotionList] = useState([]);
    const [advertiseList, setAdvertiseList] = useState([]);

    const getOurStoryDetails = (id) => {
        getOurStoryShow(id)
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj.banners;
                    setOurStoryDetails(data)
                }
            })
            .catch((error) => {
                setOurStoryDetails([])
                notificationService.sendMessage({ type: "error", title: "Our Story Details", text: error.receiveObj.message })
            });
    }
    const getBannerList = () => {
        getBaneerImg()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj.banners;
                    const banner = data.filter(ele => ele.banner_type === 'banner');
                    const advertise = data.filter(ele => ele.banner_type === 'advertise');
                    const promotion = data.filter(ele => ele.banner_type === 'promotion');
                    setAdvertiseList(advertise);
                    setPromotionList(promotion);
                    setBannerList(banner);
                }
            })
            .catch((error) => {
                setBannerList([])
                setAdvertiseList([]);
                setPromotionList([]);
                notificationService.sendMessage({ type: "error", title: "Banner List", text: error.receiveObj.message })
            });
        getOurStoryList()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj.banners;
                    setOurStory(data)
                }
            })
            .catch((error) => {
                setOurStory([])
                notificationService.sendMessage({ type: "error", title: "Our Story List", text: error.receiveObj.message })
            });
    }
    useEffect(() => {
        getBannerList();
    }, []);

    return (
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 mt-28">
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-2">
                <CarouselBaneer data={bannerList} />
            </div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-center text-lg p-2 font-articulat font-semibold">What is Lorem Ipsum?</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-2 text-center text-sm p-2 font-articulat font-normal">
                orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br /><br />
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </div>
            <img src={StoryImg} className="lg:col-span-6 md:col-span-6 sm:col-span-12 mt-5 w-full m-2" />
            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 mt-5 m-2">
                <div className="text-lg p-2 font-articulat font-semibold">Why do we use it?</div>
                <div className="text-xs p-2 font-articulat font-normal">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). <br /><br />
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </div>
            </div>

            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-center text-lg p-2 font-articulat font-semibold">We’re solving the biggest problems</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 bg-black text-white">
                    <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-5 border">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-5">
                                <img src={C1} className="object-cover mt-1 w-full" />
                            </div>
                            <div className="lg:col-span-8 md:col-span-8 sm:col-span-8 p-5">
                                <div className="text-center text-lg font-articulat font-semibold">Freshly Milled Grains</div>
                                <div className="text-center text-xs font-articulat font-semibold">We do not stock products in our warehouse.​ Every grain is freshly milled and delivered promptly to you to ensure peak quality</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-5 border">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-5">
                                <img src={C2} className="object-cover mt-1 w-full" />
                            </div>
                            <div className="lg:col-span-8 md:col-span-8 sm:col-span-8 p-5">
                                <div className="text-center text-lg font-articulat font-semibold">Eco-friendly Packaging</div>
                                <div className="text-center text-xs font-articulat font-semibold">Our pack is made of 100% biodegradable, enzyme based material. Making each order a bundle of goodness, both on the inside and out.</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-5 border">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-5">
                                <img src={C3} className="object-cover mt-1 w-full" />
                            </div>
                            <div className="lg:col-span-8 md:col-span-8 sm:col-span-8 p-5">
                                <div className="text-center text-lg font-articulat font-semibold">Customised Flours</div>
                                <div className="text-center text-xs font-articulat font-semibold">Our products are made to order, which guarantees that your Floryo experience is going to be personalised like non other. Don’t be shy and state your preferences</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-center text-lg p-2 font-articulat font-semibold">Fresh Mill, delivered at your convenience</div>

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
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-12 text-center text-2xl p-2 font-articulat font-semibold">Fresh Mill, delivered at your convenience</div>

                <CarousalMulti data={advertiseList} />

                <HomeSubscribe />
            </div>
        </div>
    );
}

export default OurStory;