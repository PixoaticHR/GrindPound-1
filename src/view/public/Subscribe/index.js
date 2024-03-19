import { useEffect, useState } from "react";
import HomeSubscribe from "../Home/homeSubsrice";
import CarouselBaneer from "../../../components/carousel";
import C1 from "../../../images/c1.png";
import C2 from "../../../images/c2.png";
import C3 from "../../../images/c3.png";
import CarousalMulti from "../Home/slider";
import { getBaneerImg, getSubscribe } from "../../../services/index";
import { notificationService } from '../../../services/notifications/notificationService';

const Subscribe = () => {
    const [bannerList, setBannerList] = useState([]);
    const [subscription, setSubscription] = useState([]);
    const [advertise, setAdvertise] = useState([]);

    const getList = () => {
        Promise.all([getBaneerImg(), getSubscribe()])
            .then(([bannerResponse, subscribeResponse]) => {
                const bannerData = bannerResponse.receiveObj.banners;
                const banner = bannerData.filter(ele => ele.banner_type === 'banner');
                const advertise = bannerData.filter(ele => ele.banner_type === 'advertise');
                const subscribeData = subscribeResponse.receiveObj;
                setBannerList(banner);
                setAdvertise(advertise)
                setSubscription(subscribeData);
            })
            .catch((error) => {
                setBannerList([]);
                setAdvertise([])
                setSubscription([]);
                notificationService.sendMessage({ type: "error", title: "Banner List and Subscription List", text: error.receiveObj.message})
            });
    }
    useEffect(() => {
        getList();
    }, []);

    return (
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 mt-28">
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-2">
                <CarouselBaneer data={bannerList} />
            </div>


            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-center text-lg p-2 font-articulat font-semibold">Why Choose us?</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                    <div className="lg:col-span-4 md:col-span-6 sm:col-span-12 p-5 border">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4"></div>
                            <img src={C1} className="object-cover mt-1 h-24 lg:col-span-4 md:col-span-4 sm:col-span-4" />
                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4"></div>
                            <div className="text-center text-lg font-articulat font-semibold lg:col-span-12 md:col-span-12 sm:col-span-12 mr-5 mt-2">Freshly Milled Grains</div>
                            <div className="text-center text-xs font-articulat font-semibold lg:col-span-12 md:col-span-12 sm:col-span-12">We do not stock products in our warehouse.​ Every grain is freshly milled and delivered promptly to you to ensure peak quality</div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 md:col-span-6 sm:col-span-12 p-5 border">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4"></div>
                            <img src={C2} className="object-cover mt-1 h-24 lg:col-span-4 md:col-span-4 sm:col-span-4" />
                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4"></div>
                            <div className="text-center text-lg font-articulat font-semibold lg:col-span-12 md:col-span-12 sm:col-span-12 mr-5 mt-2">Freshly Milled Grains</div>
                            <div className="text-center text-xs font-articulat font-semibold lg:col-span-12 md:col-span-12 sm:col-span-12">We do not stock products in our warehouse.​ Every grain is freshly milled and delivered promptly to you to ensure peak quality</div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 md:col-span-6 sm:col-span-12 p-5 border">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4"></div>
                            <img src={C3} className="object-cover mt-1 h-24 lg:col-span-4 md:col-span-4 sm:col-span-4" />
                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4"></div>
                            <div className="text-center text-lg font-articulat font-semibold lg:col-span-12 md:col-span-12 sm:col-span-12 mr-5 mt-2">Freshly Milled Grains</div>
                            <div className="text-center text-xs font-articulat font-semibold lg:col-span-12 md:col-span-12 sm:col-span-12">We do not stock products in our warehouse.​ Every grain is freshly milled and delivered promptly to you to ensure peak quality</div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-center text-lg p-2 font-articulat font-semibold">Subscription Plans</div>

                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 text-center">
                        {subscription.map(ele => {
                            return <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 mt-2 p-4 m-2 bg-[#FBF5F1] font-articulat rounded-xl">
                                <button className="bg-black text-white font-semibold text-sm p-1 rounded-lg w-24">{ele.name}</button>
                                <div className="font-semibold text-3xl mt-4">₹ {ele.price}</div>
                                <div className="font-semibold text-sm mt-2 text-[#D7B57F]">User/{ele.name}</div>
                                <button className="bg-[#009898] text-white font-semibold text-sm p-3 rounded-lg w-36 mt-2">Buy Now</button>
                                <div className="font-semibold text-xl mt-3"><hr /></div>
                                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                    {ele.features?.split(".")?.map((p, i) => {
                                        if ((i + 1) < (ele.features?.split(".").length))
                                            return <><div className="font-normal text-sm mt-1 p-1 lg:col-span-1 md:col-span-1 sm:col-span-1"><i className="fa fa-check text-[#009898]" aria-hidden="true"></i> </div><div className="lg:col-span-11 md:col-span-11 sm:col-span-11 mt-1 p-1 text-left text-[#999999]"> {p}.</div></>
                                    })}
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-center text-lg p-2 font-articulat font-semibold">Fresh Mill, delivered at your convenience</div>

                <CarousalMulti data={advertise}  />

                <HomeSubscribe />
            </div>
        </div>
    );
}

export default Subscribe;