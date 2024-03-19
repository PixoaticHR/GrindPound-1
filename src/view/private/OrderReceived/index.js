import { useSelector } from "react-redux";
import Review from "../../../view/private/Shipping/review";
import { useMemo } from 'react';
import { useLocation } from "react-router-dom";
import { calculateThreeDaysLater, getCurrentDate } from "../../../services/utils/function";

const OrderReceived = (props) => {
    const cartStore = useSelector(state => state.cartReducer.cart);
    const location = useLocation();
    const data = location.state;
    const total = useMemo(() => cartStore.reduce((t, val) => t + (parseFloat(val.master_price) * val.quantity), 0));
    const discount = useMemo(() => ((total * 15) / 100));

    console.log('data recived ==> ',data);

    const linkPage = (url) => {
        window.location.replace(window.location.origin + url);
    };

    return (
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-5 mt-36">
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-lg font-articulat font-semibold .tracking-tighter"><i className="fa fa-check-circle text-[#4ECE00]" aria-hidden="true"></i>Thank you. Your order has been received. Your oder will be delivered on {calculateThreeDaysLater(new Date())} </div>

            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-lg font-articulat font-semibold"><hr /></div>

            <div className="lg:col-span-2 md:col-span-3 sm:col-span-3 text-sm mt-2"><div className="font-normal text-[#999999]">Order ID</div><div className="font-semibold mt-1">#{data?.orderId}</div></div>
            <div className="lg:col-span-2 md:col-span-3 sm:col-span-3 text-sm mt-2"><div className="font-normal text-[#999999]">Order Date</div><div className="font-semibold mt-1">{getCurrentDate(new Date())}</div></div>
            <div className="lg:col-span-2 md:col-span-3 sm:col-span-3 text-sm mt-2"><div className="font-normal text-[#999999]">Total</div><div className="font-semibold mt-1">₹ {data?.amount}</div></div>
            <div className="lg:col-span-2 md:col-span-3 sm:col-span-3 text-sm mt-2"><div className="font-normal text-[#999999]">Payment method</div><div className="font-semibold mt-1">{data?.pay}</div></div>
            <div className="lg:col-span-4 md:col-span-6 sm:col-span-6 text-sm mt-2"><div className="font-normal text-[#999999]">Address</div><div className="font-semibold mt-1"><span>Address - </span><span className='text-[#FF0000]'>{data?.address}</span> </div></div>

            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-lg font-articulat font-semibold"><hr /></div>

            <div className="lg:col-span-9 md:col-span-8 sm:col-span-8 mt-1 text-lg font-articulat font-semibold m-2">
                <Review order={true} />
            </div>
            <div className="lg:col-span-3 md:col-span-4 sm:col-span-4 mt-1 text-sm font-articulat font-semibold m-2">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                    <div className='lg:col-span-12 md:col-span-12 sm:col-span-12 p-3'></div>
                    <div className='lg:col-span-12 md:col-span-12 sm:col-span-12 bg-[#FBF5F1] p-2 text-lg'>Payment Detail</div>
                    <div className='lg:col-span-8 md:col-span-8 sm:col-span-8 p-2 text-sm'>Sub Total</div>
                    <div className='lg:col-span-4 md:col-span-4 sm:col-span-4 text-xs font-articulat font-normal p-2'>₹{total}</div>
                    <div className='lg:col-span-8 md:col-span-8 sm:col-span-8 p-2 text-sm'>Discount</div>
                    <div className='lg:col-span-4 md:col-span-4 sm:col-span-4 text-xs font-articulat font-normal p-2'>- ₹{discount}</div>
                    <div className='lg:col-span-8 md:col-span-8 sm:col-span-8 p-2 text-sm'>Shipping Cost</div>
                    <div className='lg:col-span-4 md:col-span-4 sm:col-span-4 text-xs font-articulat font-normal p-2'>Free</div>
                    <div className='lg:col-span-8 md:col-span-8 sm:col-span-8 p-2 text-sm'>Tax Included</div>
                    <div className='lg:col-span-4 md:col-span-4 sm:col-span-4 text-xs font-articulat font-normal p-2'>₹ 0.00</div>
                    <div className='lg:col-span-8 md:col-span-8 sm:col-span-8 bg-[#FBF5F1] p-2 text-lg'>Grand Total</div>
                    <div className='lg:col-span-4 md:col-span-4 sm:col-span-4 text-sm font-articulat font-semibold bg-[#FBF5F1] p-2'>₹{total - discount}</div>
                </div>
            </div>
            <div className='lg:col-span-12 md:col-span-12 sm:col-span-12 mt-2'><hr /></div>

            <div className='lg:col-span-4 md:col-span-3 sm:col-span-3'></div>
            <button className="mt-2 lg:col-span-4 md:col-span-6 sm:col-span-6 focus:outline-none focus:ring-4 font-md w-full rounded-lg text-sm px-5 py-2.5 p-1 bg-[#009898] border-[#005956] focus:ring-4 focus:ring-[#005956] text-white" onClick={() => linkPage("/home")}>Back to home</button>
            <div className='lg:col-span-4 md:col-span-3 sm:col-span-3'></div>

        </div>
    )
};

export default OrderReceived;
