import { useEffect, useState } from "react";
import HomeSubscribe from "../Home/homeSubsrice"
import OtpInput from "./otp_input";
import { resendOTP } from "../../../services/login";
import { notificationService } from '../../../services/notifications/notificationService';

const OTPValidation = (props) => {

    const [otp, setOTP] = useState("");
    const [otpError, setOTPError] = useState(false);
    const [errorMessage, setErrorMeassage] = useState("Enter Valid OTP.");
    
    const onOtpSubmit = () => {
        if (otp.length === 4) {
            props.onOtpSubmit(otp);
        } else {
            setOTPError(true)
        }
    }
    const resendOTPHandler = () => {
        const num = props.number.split(" ");
        const obj = {}
        obj['country_code'] = num[0];
        obj['phone_number'] = num[1];
        resendOTP(obj)
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj;
                    notificationService.sendMessage({ type: "success", title: "Resend OTP", text: data.message })
                }
            })
            .catch((error) => {
                console.log(error)
                notificationService.sendMessage({ type: "error", title: "Resend OTP", text: error.receiveObj.message })
            });
    }
useEffect(()=>{
    if(props.error){
    setErrorMeassage(props.error);
    setOTPError(true)
    }
},[props.error])
    return (
        <>
            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-10 mt-28">
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-center text-xl p-2 font-articulat font-semibold">Enter OTP </div>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-center text-sx p-2 font-articulat font-normal mt-1">We have share a code of your phone number <br />{props.number} <span className="cursor-pointer text-[#009898] hover:text-[#009800]" onClick={() => props.editNumber()}>Edit</span></div>
                <div className="lg:col-span-4 md:col-span-4 sm:col-span-12"></div>
                <div className="lg:col-span-4 md:col-span-6 sm:col-span-12 mt-2 text-center">
                    <OtpInput length={4} onChange={(val) => { setOTP(val.join("")) }} onOtpSubmit={(val) => { setOTP(val); setOTPError(false);props.callBackMessage() }} />
                    {otpError && <span className="text-sm font-normal text-[#FF0000]">{errorMessage}</span>}
                </div>
                <div className="lg:col-span-4 md:col-span-6 sm:col-span-12"></div>
                <div className="lg:col-span-4 md:col-span-6 sm:col-span-12"></div>
                <div className="lg:col-span-4 md:col-span-6 sm:col-span-12 text-center mt-5">
                    <button
                        className="rounded-lg bg-[#009898] h-10 w-full font-articulat text-xs text-white p-2 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                        type="button" onClick={onOtpSubmit}>
                        Verify
                    </button>
                </div>
                <div className="lg:col-span-4 md:col-span-6 sm:col-span-12"></div>
                <div className="lg:col-span-4 md:col-span-6 sm:col-span-12"></div>
                <div className="lg:col-span-4 md:col-span-6 sm:col-span-12 text-center mt-5 text-[#009898] font-articulat text-xs cursor-pointer hover:text-[#009800]" onClick={() => resendOTPHandler()}>Resend OTP</div>
            </div>
            <HomeSubscribe />
        </>
    )
}
export default OTPValidation;