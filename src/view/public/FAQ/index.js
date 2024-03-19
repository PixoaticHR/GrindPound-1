import { useEffect, useState } from "react";
import HomeSubscribe from "../Home/homeSubsrice";
import { getFaq } from "../../../services/footer";
import { notificationService } from '../../../services/notifications/notificationService';

const FAQ = () => {
    const [coll, setColl] = useState({});
    const [faq, setFaq] = useState([]);

    const getFaqList = () => {
        getFaq()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj;
                    setFaq(data)
                }
            })
            .catch((error) => {
                setFaq({});
                notificationService.sendMessage({ type: "error", title: "FAQ List", text: error.receiveObj.message })
            });
    }
    useEffect(() => {
        getFaqList();
    }, []);

    return (
        <>
            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-4 mt-28">
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xl p-2 font-articulat font-semibold">FAQ</div>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 mt-2 font-articulat font-semibold cursor-pointer" onClick={() => (window.location.replace(window.location.origin + '/home'))}> Home / <span className="text-[#009898]">FAQ</span></div>

                <div className="lg:col-span-2 md:col-span-3 sm:col-span-4">
                    <div className={(coll.isCollR1 ? "font-semibold" : "font-normal") + " cursor-pointer text-sm p-1 mt-1 font-articulat"} onClick={() => setColl({ ...coll, isCollR1: !coll.isCollR1 })}>Returns</div>
                    <div className={(coll.isCollR2 ? "font-semibold" : "font-normal") + " cursor-pointer text-sm p-1 mt-1 font-articulat"} onClick={() => setColl({ ...coll, isCollR2: !coll.isCollR2 })}>Payment Methods</div>
                    <div className={(coll.isCollR3 ? "font-semibold" : "font-normal") + " cursor-pointer text-sm p-1 mt-1 font-articulat"} onClick={() => setColl({ ...coll, isCollR3: !coll.isCollR3 })}>Delivery</div>
                    <div className={(coll.isCollR4 ? "font-semibold" : "font-normal") + " cursor-pointer text-sm p-1 mt-1 font-articulat"} onClick={() => setColl({ ...coll, isCollR4: !coll.isCollR4 })}>Exchanges & Returns</div>
                    <div className={(coll.isCollR5 ? "font-semibold" : "font-normal") + " cursor-pointer text-sm p-1 mt-1 font-articulat"} onClick={() => setColl({ ...coll, isCollR5: !coll.isCollR5 })}>Registration</div>
                    <div className={(coll.isCollR6 ? "font-semibold" : "font-normal") + " cursor-pointer text-sm p-1 mt-1 font-articulat"} onClick={() => setColl({ ...coll, isCollR6: !coll.isCollR6 })}>Contacts</div>
                </div>
                <div className="lg:col-span-10 md:col-span-9 sm:col-span-8">
                    {faq.map((ele, i) =>
                        <div className="p-3 mt-3 font-articulat bg-[#FBF5F1] rounded-xl" onClick={() => setColl({ ...coll, [ele.question]: !(coll[ele.question]) })}>
                            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                <div className="lg:col-span-11 md:col-span-10 sm:col-span-9 text-sm font-semibold">{ele.question}</div>
                                <div className="lg:col-span-1 md:col-span-2 sm:col-span-3 text-right text-lg font-semibold"><i className={((coll[ele.question]) ? "fa-chevron-down" : "fa-chevron-right") + " fa cursor-pointer"} aria-hidden="true"></i></div>
                                {coll[ele.question] &&
                                    <div className="lg:col-span-11 md:col-span-10 sm:col-span-9 text-xs mt-2 font-normal">{ele.answer}</div>
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <HomeSubscribe />
        </>
    )
}
export default FAQ;