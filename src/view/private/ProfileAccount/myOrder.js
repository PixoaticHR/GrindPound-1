import { useEffect, useState } from "react";
import { orderHistory } from "../../../services/checkout";
import { getCurrentDate } from "../../../services/utils/function";

const MyOrder = () => {
    const [extnd, setExtnd] = useState({ id: null, show: false });
    const [data, setData] = useState([]);


    const extendedOrder = (index, value) => {
        const arr = [...data];
        const obj = arr[index];
        obj['coll'] = value;
        arr.splice(index, 0, obj);
        arr.splice(index + 1, 1);
        setData(arr);
    }

    const fetchOrders = () => {
        orderHistory()
            .then(res => {
                console.log('order list res ==> ', res);
                if (res?.constructor === Array) {
                    setData(res);
                };
            })
            .catch(error => {
                console.log('order list error ==> ', error);
            })
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    console.log('EXT ==> ', extnd);

    return (<>
        <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-lg font-articulat font-semibold mt-4">Order History</div>
        {data.map((ele, index) => {
            return <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 font-articulat mt-2 bg-[#FBF5F1] p-3 m-2 rounded-lg">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 text-sm"><div className="font-normal text-[#999999]">Order ID</div><div className="font-semibold mt-1">#{ele?.id}</div></div>
                    <div className="lg:col-span-2 md:col-span-2 sm:col-span-2 text-sm"><div className="font-normal text-[#999999]">Order Date</div><div className="font-semibold mt-1">{getCurrentDate(ele?.created_at)}</div></div>
                    <div className="lg:col-span-2 md:col-span-2 sm:col-span-2 text-sm"><div className="font-normal text-[#999999]">Delivery Date</div><div className="font-semibold mt-1">{getCurrentDate(ele?.delivery_date)}</div></div>
                    <div className="lg:col-span-2 md:col-span-2 sm:col-span-2 text-sm"><div className="font-normal text-[#999999]">Status</div><div className={(ele.status === "In Progress" ? "text-[#FFC700]" : (ele?.status === "Delivered" ? "text-[#4ECE00]" : "text-[#FF0000]")) + " font-semibold mt-1"}>{ele?.status}</div></div>
                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 text-right text-xl">{extnd?.id == index && extnd.show ? <i className="fa fa-chevron-up cursor-pointer" aria-hidden="true" onClick={() => setExtnd({ id: index, show: false })}></i> : <i className="fa fa-chevron-down cursor-pointer" aria-hidden="true" onClick={() => setExtnd({ id: index, show: true })}></i>}</div>

                    {extnd?.id == index && extnd.show && (
                        <>
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm font-articulat font-semibold mt-2"><hr /></div>
                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-sm font-articulat font-semibold mt-4">Delivery Address</div>
                            <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 text-sm font-articulat font-semibold mt-4">Order Summary</div>
                            <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 text-sm font-articulat font-semibold mt-4 text-[#009898] text-center">Download Invoice</div>
                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-sm font-articulat font-normal mt-2 mr-10">{`${ele?.shipping_address?.address_line_1}, ${ele?.shipping_address?.city}, ${ele?.shipping_address?.state}, ${ele?.shipping_address?.country}. ${ele?.shipping_address?.postal_code}`}</div>
                            <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 text-sm font-articulat font-normal mt-2">
                                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6">Item(s) Subtotal:</div>
                                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-right">₹{ele?.sub_total}</div>
                                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6">Discount:</div>
                                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-right">₹{ele?.discount_amount}</div>
                                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6">Shipping:</div>
                                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-right">₹{ele?.shipping_fee}</div>
                                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6">Total:</div>
                                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-right">₹{ele?.total_amount}</div>
                                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 font-semibold">Grand Total:</div>
                                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-right font-semibold">₹{ele?.total_amount}</div>
                                </div>
                            </div>
                            {ele.status !== "Cancelled" &&
                                <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 text-xl font-articulat font-semibold mt-2 text-[#009898] text-center"><i className="fa fa-download cursor-pointer" aria-hidden="true"></i></div>
                            }
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm font-articulat font-semibold mt-2"><hr /></div>

                            {ele?.order_items.map((prod, i) => {
                                return <>
                                    <img src={prod?.product?.attachment_url[0]} className="object-cover rounded-full h-12 lg:col-span-1 md:col-span-2 sm:col-span-3 mt-2" />
                                    <div className="lg:col-span-10 md:col-span-8 sm:col-span-6 text-sm font-articulat font-normal mt-2"><div>{prod?.product?.name}</div>
                                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 mt-3">
                                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 font-semibold"><span className="text-[#999999]">Net wt. : </span><span>{prod?.product?.net_wt + ' ' + prod?.product?.unit}</span></div>
                                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 font-semibold"><span className="text-[#999999]">MRP:</span><span> ₹ {prod?.product?.master_price}</span><span className="text-[#999999] line-through"> ₹ {prod?.product?.cost_price}</span></div>
                                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 font-semibold"><span className="text-[#999999]">QTY: </span><span>{prod?.quantity}</span></div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }} className="lg:col-span-1 md:col-span-2 sm:col-span-3 text-right text-sm font-articulat font-semibold mt-5">
                                        <button className="border border-[#4ECE00] text-[#4ECE00] rounded-xl text-center p-3">₹{prod?.product?.master_price}</button>
                                        <br /><br />
                                        <span className="text-[#009898]">Leave review</span>
                                        <br /><br />
                                    </div>

                                    {(ele?.order_items.length - 1) !== i && <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm font-articulat font-semibold mt-2"><hr /></div>}
                                </>
                            })}
                        </>
                    )}
                </div>
            </div>
        }
        )}
    </>
    )
}
export default MyOrder;