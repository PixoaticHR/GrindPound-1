import { useEffect, useMemo, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import AddressPage from "./address";
import Payment from './payment';
import Review from './review';
import { checkAuth } from "../../../app/checkAuth";
import { notificationService } from "../../../services/notifications/notificationService";
import { createOrder, displayRazorpay, proceedPayment } from '../../../services/checkout';
import { getProfileList } from '../../../services/profile';
import Loader from '../../../app/loader/loader';
import { useNavigate } from 'react-router-dom';
import { fetchCartList } from '../../public/Home';

const Shipping = ({ navigation }) => {
    const [tab, setTab] = useState({ home: true, payment: false, review: false });
    const [currentTab, setCurrentTab] = useState("home");
    const [selectAddress, setSelectAddress] = useState(null);
    const [selectPayment, setSelectPayment] = useState(null);
    const [selectReview, setSelectReview] = useState(null);
    const [selectAdd, setSelectAdd] = useState(false);
    const cartStore = useSelector(state => state.cartReducer.cart);
    const dispatch = useDispatch();
    const childRef = useRef();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [profile, setProfile] = useState('');
    const navigate = useNavigate();

    console.log('currentTab ==> ', currentTab);
    console.log('selectedAddress ==> ', selectedAddress);

    const total = useMemo(() => cartStore.reduce((t, val) => t + (parseFloat(val.master_price) * val.quantity), 0));

    const linkPage = (url) => {
        window.location.replace(window.location.origin + url);
    };

    const redirectPage = (url, data) => {
        // Construct the URL with query parameters
        const queryParams = new URLSearchParams(data).toString();
        const fullUrl = `${window.location.origin}${url}?${queryParams}`;
        // Redirect to the new URL
        window.location.replace(fullUrl);
    };

    const gotoPayment = (value, flag) => {
        if (value) {
            if (value.type === "ship") {
                setCurrentTab("payment");
                setTab({ ...tab, payment: true })
            }
            else if (flag && value.type === "pickup") {
                setCurrentTab("payment");
                setTab({ ...tab, payment: true })
            }
        } else {
            notificationService.sendMessage({ type: "error", title: "Select Address", text: "Please Choose Address." })
        }
    };

    useEffect(() => {
        fetchCartList(dispatch);
        checkAuth();
        getProfile();
    }, []);

    console.log('profile ==> ', profile);

    const getProfile = () => {
        getProfileList()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj;
                    setProfile(data)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const submitHandler = async () => {
        setLoader(true);
        const totalAmount = total - ((total * 15) / 100);
        const dis = (total * 15) / 100;
        const gTotal = total - ((total * 15) / 100);
        try {
            const orderData = {
                "shipping_address_id":selectedAddress?.id, 
                "sub_total":total,
                "grand_total":gTotal,
                "discount_amount":dis, 
                "shipping_fee":"0",
                "total_amount":totalAmount, 
                "status":"intital", 
                "payment_method":"UPI",
                "delivery_method":"ship",
                "notes":`Flour order with ${cartStore?.length} item`
            };

            const createdOrder = await createOrder(orderData);
            console.log('createdOrder ==> ', createdOrder.id);

            const paymentData = {
                "order_id": createdOrder.id
            };

            const paymentResponse = await proceedPayment(paymentData);
            console.log('paymentResponse ==> ', paymentResponse);

            const finalDetails = {
                order_id: paymentResponse.razorpay_order_id,
                order_id_backend: createdOrder.id,
                amount: totalAmount,
                subTotal:total,
                name: profile?.first_name + profile?.last_name,
                email: profile?.email,
                contact: profile?.phone_number,
                address: `${selectedAddress?.address_line_1}, ${selectedAddress?.city}, ${selectedAddress?.state}, ${selectedAddress?.country}. ${selectedAddress?.postal_code}`,
                linkPage: navigate,
                setLoader: setLoader
            };

            await displayRazorpay(finalDetails);
        } catch (error) {
            setLoader(false);
            console.error('Error occurred:', error);
        }
    };

    console.log('selectedAddress 44444 ==> ', selectedAddress)

    return (<>
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-4 mt-40">
            <div className="lg:col-span-9 md:col-span-8 sm:col-span-12 m-1 mt-1">
                <span className='text-lg font-articulat font-semibold'>Shipping</span>
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 m-1 mt-1">
                    <span className={(tab.home ? "text-[#009898]" : "") + ' cursor-pointer text-2xl lg:text-left md:text-left sm:text-center lg:col-span-4 md:col-span-4 sm:col-span-4 m-4 mt-3'}><i className="fa fa-home ml-5" aria-hidden="true" onClick={() => { setCurrentTab("home"); setTab({ ...tab, home: true, payment: false, review: false }) }}></i><br /><span className='text-sm font-articulat font-semibold text-black'>Shipping</span></span>
                    <span className={(tab.review ? "text-[#009898]" : "") + ' cursor-pointer text-2xl lg:text-center md:text-center sm:text-center lg:col-span-4 md:col-span-4 sm:col-span-4 m-4 mt-3'}><i className="fa fa-address-card" aria-hidden="true" onClick={() => {
                        if (tab.home == true && tab.review == true) {
                            setMsg('');
                            setCurrentTab("review");
                            setTab({ ...tab, home: true, payment: false, review: true });
                        };
                    }}></i><br /><span className='text-sm font-articulat font-semibold text-black'>Review</span></span>
                    <span className={(tab.payment ? "text-[#009898]" : "") + ' cursor-pointer text-2xl lg:text-right md:text-right sm:text-center lg:col-span-4 md:col-span-4 sm:col-span-4 m-4 mt-3'}><i className="fa fa-credit-card-alt mr-3" aria-hidden="true"
                        onClick={() => {
                            if (tab.review == true && tab.payment == true) {
                                setCurrentTab("payment");
                                setTab({ ...tab, home: true, review: true, payment: true })
                            };
                        }}
                    ></i><br />
                        <span className='text-sm font-articulat font-semibold text-black'>Payment</span>
                    </span>
                </div>
                {currentTab === "home" && <AddressPage msg={msg} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} selectAddress={selectAddress} chengeTab={(val) => { setCurrentTab("review"); setTab({ ...tab, home: true, review: true, payment: false }) }} />}
                {currentTab === "review" && <Review />}
                {currentTab === "payment" && <Payment />}
            </div>
            <div className="lg:col-span-3 md:col-span-4 sm:col-span-12">
                <div className='m-1 mt-1 bg-[#000000] text-[#FF0000] p-1 rounded text-sm p-2 font-articulat font-semibold'>Free home delivery above Rs.399</div>
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-2">
                    <span className='text-sm font-articulat font-semibold lg:col-span-8 md:col-span-8 sm:col-span-8'>Subtotal</span>
                    <span className='text-sm font-articulat font-semibold text-right lg:col-span-4 md:col-span-4 sm:col-span-4'>₹{total}</span>
                    <span className='text-sm font-articulat font-semibold lg:col-span-8 md:col-span-8 sm:col-span-8 mt-2'><span>Enter Discount Code</span><br /><span className='text-xs font-normal'>You’re getting 15% discount</span></span>
                    <span className='text-xl font-articulat font-normal text-right lg:col-span-4 md:col-span-4 sm:col-span-4 mt-3 cursor-pointer'>X</span>
                    <span className='text-sm font-articulat font-semibold lg:col-span-8 md:col-span-8 sm:col-span-8 mt-2'>Discount (Flat15)</span>
                    <span className='text-sm font-articulat font-semibold text-right lg:col-span-4 md:col-span-4 sm:col-span-4 mt-2'>- ₹ {(total * 15) / 100}</span>
                    <span className='text-sm font-articulat font-semibold lg:col-span-8 md:col-span-8 sm:col-span-8 mt-2'>Total</span>
                    <span className='text-sm font-articulat font-semibold text-right lg:col-span-4 md:col-span-4 sm:col-span-4 mt-2'>₹ {total - ((total * 15) / 100)}</span>
                    <span className='text-sm font-articulat font-semibold lg:col-span-8 md:col-span-8 sm:col-span-8 mt-2'>Shipping Cost</span>
                    <span className='text-sm font-articulat font-semibold text-right lg:col-span-4 md:col-span-4 sm:col-span-4 mt-2'>₹ 0.0</span>
                    <span className='text-lg font-articulat font-semibold lg:col-span-8 md:col-span-8 sm:col-span-8 mt-3'>Grand Total</span>
                    <span className='text-lg font-articulat font-semibold text-right lg:col-span-4 md:col-span-4 sm:col-span-4 mt-3'>₹ {total - ((total * 15) / 100)}</span>
                    <button className="lg:col-span-12 md:col-span-12 sm:col-span-12 m-1 mt-3 bg-[#009898] text-white rounded text-sm p-3 font-articulat font-semibold text-center cursor-pointer focus:ring-blue-200 dark:focus:ring-[#009898] dark:ring-offset-blue-800 focus:ring-2 dark:bg-blue-700 dark:border-blue-600"
                        onClick={() => {
                            if (selectedAddress == null) {
                                setMsg('Please select delivery address!')
                            } else if (selectedAddress !== null && currentTab == "home") {
                                setCurrentTab("review");
                                setTab({ ...tab, home: true, review: true, payment: false })
                            } else if (selectedAddress !== null && currentTab == "review") {
                                setCurrentTab("payment");
                                setTab({ ...tab, home: true, review: true, payment: true });
                            } else if (currentTab == "payment") {
                                submitHandler();
                            }
                            // if () {
                            //     linkPage("/order_received")
                            // } else {
                            //     setCurrentTab("review"); setTab({ ...tab, home: false, payment: false, review: true })
                            // }
                        }}
                    >

                        {/* {loading && <Spinner animation="border" role="status" size="sm" style={{ marginRight: '10px' }}></Spinner>} */}

                        <span>Proceed</span>
                    </button>
                </div>
            </div>
        </div>
        {loader && <Loader />}
    </>
    )
}

export default Shipping;