import { useState } from "react";
import TextInput from "../../../components/TextInput";
import TextInputWithIcon from "../../../components/Shared/TextInputWithIcon";
import HomeSubscribe from "../Home/homeSubsrice";

const OrderStatus = () => {

    const [number, setNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [order, setOrder] = useState("");
    const [code, setCode] = useState("+91");

    return (
        <>
            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-4 mt-28">
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xl p-2 font-articulat font-semibold">Order Status</div>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 mt-2 font-articulat font-semibold">Home / <span className="text-[#009898]">Order Status</span></div>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                        <div className="lg:col-span-7 md:col-span-6 sm:col-span-12 mr-3">
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xs p-2 font-articulat font-normal">To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</div>
                            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-3">
                                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                                    <TextInputWithIcon
                                        onChange={(e) => setPhone(e.target.value)}
                                        defaultValue={phone}
                                        icon={<i className="fa fa-phone" aria-hidden="true"></i>}
                                        type="text"
                                        id="phone"
                                        pattern="[0-9]*"
                                        maxlength="10"
                                        placeholder="Enter Phone Number"
                                        isLabelShow={true}
                                        showLabel="Phone Number"
                                        errorMessage="Phone Number is Required."
                                    />
                                </div>
                                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                                    <TextInputWithIcon
                                        onChange={(e) => setOrder(e.target.value)}
                                        defaultValue={order}
                                        icon={<i className="fa fa-list-ol" aria-hidden="true"></i>}
                                        type="text"
                                        id="order"
                                        placeholder="Enter Order Number"
                                        isLabelShow={true}
                                        showLabel="Order Number"
                                        errorMessage="Order Number is Required."
                                    />
                                </div>
                                <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 text-center mt-4">
                                    <button
                                        className="rounded-lg bg-[#009898] w-full font-articulat text-xs text-white p-3 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                        type="button">
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-5 md:col-span-6 sm:col-span-12 ">
                            <div className="text-xl p-2 font-articulat font-semibold">Login Account</div>
                            <div className="mt-2 text-xs p-2 font-articulat font-semibold">Welcome back. Sign in to access your personalised experience, saved preferences, and more. We're thrilled to have you with us again!</div>
                            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 mt-2">
                                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                                    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 divide-x border rounded-xl">
                                        <span className="lg:col-span-2 md:col-span-2 sm:col-span-2 text-center p-2">+91</span>
                                        <div className="lg:col-span-10 md:col-span-10 sm:col-span-10 font-articulat">
                                            <TextInput
                                                showLabel={false}
                                                defaultValue={number}
                                                value={number}
                                                type="text"
                                                label="Phone"
                                                name="phone_number"
                                                id="phone_number"
                                                pattern="[0-9]*"
                                                maxlength="10"
                                                placeholder="Phone Number"
                                                error={false}
                                                errorMessage="Phone is required"
                                                onChange={(e) => setNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-5 md:col-span-6 sm:col-span-12 text-center mt-4">
                                    <button
                                        className="rounded-lg bg-[#009898] w-full font-articulat text-xs text-white p-3 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                        type="button">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HomeSubscribe />
        </>
    )
}
export default OrderStatus;