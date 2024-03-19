import { useState } from "react";
import TextInputWithRightIcon from "../../../components/Shared/TextInputWithRightIcon";
import TextInputWithIcon from "../../../components/Shared/TextInputWithIcon";
import { DateFormatter } from "../../../components/Shared/date_formatter";

const Payment = () => {
    const [paymentMode, setPaymentMode] = useState("upi");
    const [payload, setPayload] = useState({});
    

    const addCardDetailsHandler = (mode) => {
        console.log(mode)
    };

    return (<>
        <div className='text-lg font-articulat font-semibold mt-3'>Choose payment Option:</div>
        <div className="flex grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
            {/* <div className="inline-flex items-center bg-[#FBF5F1] rounded-lg lg:col-span-12 md:col-span-12 sm:col-span-12 m-1 mt-1">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="subscription">
                    <input name="type" type="radio"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#009898] before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-[#009898] hover:before:opacity-10"
                        id="subscription" checked={paymentMode === "subscription"}
                    // onChange={(e) => setPaymentMode(e.target.checked && "subscription")} 
                    />
                    <span
                        className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                        </svg>
                    </span>
                </label>
                <label className="mt-px font-light text-gray-700 cursor-pointer select-none text-sm font-articulat" htmlFor="subscription">
                    Use <span className="font-semibold">₹ 255 of your ₹ 3000 </span>balance in subscription amount
                </label>
            </div>
            <div className="inline-flex items-center bg-[#FBF5F1] rounded-lg lg:col-span-12 md:col-span-12 sm:col-span-12 m-1 mt-2">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
                    <input name="type" type="radio"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-500 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#009898] before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-[#009898] hover:before:opacity-10"
                        id="html" checked={paymentMode === "creditCart"}
                    // onChange={(e) => setPaymentMode(e.target.checked && "creditCart")} 
                    />
                    <span
                        className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                        </svg>
                    </span>
                </label>
                <label className="mt-px font-light text-gray-700 cursor-pointer select-none text-sm font-articulat font-semibold" htmlFor="html">
                    Credit Cart
                </label>
            </div>
            {paymentMode === "creditCart" && <>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 m-1">
                    <TextInputWithRightIcon
                        onChange={(e) => setPayload({ ...payload, cCardNumber: e.target.value })}
                        defaultValue={payload.cCardNumber}
                        icon={<i className="fa fa-credit-card-alt" aria-hidden="true"></i>}
                        type="text"
                        id="cCardNumber"
                        maxlength="16"
                        placeholder="Enter Card Number"
                        isLabelShow={true}
                        showLabel="Card Number"
                        errorMessage="Card Number is Required."
                    />
                </div>
                <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 m-1 mt-1">
                    <TextInputWithRightIcon
                        onChange={(e) => setPayload({ ...payload, cCvv: e.target.value })}
                        defaultValue={payload.cCvv}
                        icon={<i className="fa fa-credit-card-alt" aria-hidden="true"></i>}
                        type="text"
                        id="cCvv"
                        maxlength="3"
                        placeholder="Enter CVV"
                        isLabelShow={true}
                        showLabel="CVV"
                        errorMessage="CVV is Required."
                    />
                </div>
                <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 m-1 mt-1">
                    <TextInputWithIcon
                        defaultValue={payload.cExpiry_date ? DateFormatter(payload.cExpiry_date) : null}
                        onChange={(e) => setPayload({ ...payload, cExpiry_date: e.target.value })}
                        icon={<i className="fa fa-calendar-check" aria-hidden="true"></i>}
                        type="date"
                        id="cExpiry_date"
                        placeholder="Enter Expiry Date"
                        isLabelShow={true}
                        showLabel="Expiry Date"
                        errorMessage="Expiry Date is Required."
                    />
                </div>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 m-3 text-center"><button
                    className="mr-3 select-none w-24 rounded-lg font-articulat bg-[#009898] text-center text-xs text-white p-2 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button" onClick={() => addCardDetailsHandler('credit')}>
                    Proceed
                </button>
                </div>
            </>
            }
            <div className="inline-flex items-center bg-[#FBF5F1] rounded-lg lg:col-span-12 md:col-span-12 sm:col-span-12 m-1 mt-1">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="react">
                    <input name="type" type="radio"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#009898] before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-[#009898] hover:before:opacity-10"
                        id="react" checked={paymentMode === "debitCart"}
                    // onChange={(e) => setPaymentMode(e.target.checked && "debitCart")}
                    />
                    <span
                        className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                        </svg>
                    </span>
                </label>
                <label className="mt-px font-light text-gray-700 cursor-pointer select-none text-sm font-articulat font-semibold" htmlFor="react">
                    Debit Card
                </label>
            </div>
            {paymentMode === "debitCart" && <>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 m-1">
                    <TextInputWithRightIcon
                        onChange={(e) => setPayload({ ...payload, dCardNumber: e.target.value })}
                        defaultValue={payload.dCardNumber}
                        icon={<i className="fa fa-credit-card-alt" aria-hidden="true"></i>}
                        type="text"
                        id="dCardNumber"
                        maxlength="16"
                        placeholder="Enter Card Number"
                        isLabelShow={true}
                        showLabel="Card Number"
                        errorMessage="Card Number is Required."
                    />
                </div>
                <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 m-1 mt-1">
                    <TextInputWithRightIcon
                        onChange={(e) => setPayload({ ...payload, dCvv: e.target.value })}
                        defaultValue={payload.dCvv}
                        icon={<i className="fa fa-credit-card-alt" aria-hidden="true"></i>}
                        type="text"
                        id="dCvv"
                        maxlength="3"
                        placeholder="Enter CVV"
                        isLabelShow={true}
                        showLabel="CVV"
                        errorMessage="CVV is Required."
                    />
                </div>
                <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 m-1 mt-1">
                    <TextInputWithIcon
                        defaultValue={payload.dExpiry_date ? DateFormatter(payload.dExpiry_date) : null}
                        onChange={(e) => setPayload({ ...payload, dExpiry_date: e.target.value })}
                        icon={<i className="fa fa-calendar-check" aria-hidden="true"></i>}
                        type="date"
                        id="dExpiry_date"
                        placeholder="Enter Expiry Date"
                        isLabelShow={true}
                        showLabel="Expiry Date"
                        error={false}
                    />
                </div>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 m-3 text-center"><button
                    className="mr-3 select-none w-24 rounded-lg font-articulat bg-[#009898] text-center text-xs text-white p-2 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button" onClick={() => addCardDetailsHandler('debit')}>
                    Proceed
                </button>
                </div>
            </>
            } */}
            <div className="inline-flex items-center bg-[#FBF5F1] rounded-lg lg:col-span-12 md:col-span-12 sm:col-span-12 m-1 mt-5 mb-5">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="upi">
                    <input name="type" type="radio"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#009898] before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-[#009898] hover:before:opacity-10"
                        id="upi" checked={true} onChange={(e) => setPaymentMode(e.target.checked && "upi")} />
                    <span
                        className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                        </svg>
                    </span>
                </label>
                <label className="mt-px font-light text-gray-700 cursor-pointer select-none text-sm font-articulat font-semibold" htmlFor="upi">
                    UPI
                </label>
            </div>
        </div>
        <div className='text-sm font-articulat font-semibold mt-3'><i className="fa fa-lock" aria-hidden="true"></i>  Payments are secure & encrypted.</div>
    </>)
}
export default Payment;