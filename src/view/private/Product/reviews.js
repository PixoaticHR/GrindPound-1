import { useState } from "react";
import { DateFormatter } from "../../../components/Shared/date_formatter";
import AddUpdateReview from "./addUpdateReview";

const Reviews = (props) => {
    const [show, setShow] = useState(false);

    const rating = (n) => {
        const arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(i)
        }
        return arr;
    }
    //     const isNumeric=(value)=> { 
    //         return /^-?\d+(\.\d+)?$/.test(value); 
    //   }

    console.log('props ==> ', props);
    return (
        <>
            {show && <AddUpdateReview productId={props.productId} refresh={() => { setShow(!show); props.refresh() }} setShowModal={() => setShow(!show)} />}
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 ml-2">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 mt-3 text-sm font-articulat font-semibold">
                        Customers Review
                    </div>
                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 mt-3 lg:text-right">
                        <button className="focus:outline-none focus:ring-4 font-md rounded-lg text-sm px-5 py-2.5 p-1 text-white bg-[#009898] hover:bg-[#009898] focus:ring-4 focus:ring-[#009898]"
                            onClick={() => setShow(!show)}
                        >Add your Review</button>
                    </div>
                </div>
            </div>
            {props.reviews?.map(ele =>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 p-2">
                    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                        {ele?.user?.profile_pic ? <img src={ele?.user?.profile_pic} className=" h-16 lg:col-span-1 md:col-span-3 sm:col-span-6" style={{ "borderRadius": "100%" }} /> : <i class="fa-solid fa-circle-user" style={{fontSize: '64px'}}></i>}
                        <div className="lg:col-span-11 md:col-span-9 sm:col-span-6 text-left mt-2">
                            <div className="text-base font-articulat font-semibold">{ele.user?.name}</div>
                            <div className="text-sm font-articulat font-normal mt-3">{rating(ele.rating).map(r => <i className="fa fa-star text-[#E9C400]" aria-hidden="true">&nbsp;</i>)}<span>&nbsp;&nbsp;(Posted on {DateFormatter(ele.created_at, 'LL')})</span></div>
                        </div>
                    </div>
                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm font-articulat font-normal mt-3">{ele.content}</div>
                </div>
            )}
            <br />
        </>
    )
}
export default Reviews;