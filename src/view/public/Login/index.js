import { useEffect, useState } from "react";
import TextInput from "../../../components/TextInput";
import HomeSubscribe from "../Home/homeSubsrice";
import OTPValidation from "./otpValid";
import { notificationService } from '../../../services/notifications/notificationService';
import { setPhoneNumber, verifyOTP } from "../../../services/login";
import { Tooltip } from "react-tooltip";

const Login = () => {
    const [isValid, setisValid] = useState(false);
    const [number, setNumber] = useState('');
    const [code, setCode] = useState("+91");
    const [numberError, setNumberError] = useState(false);
    const [otpErrorMessage, setOtpErrorMessage] = useState(null);
    const [numberErrorMessage, setNumberErrorMessage] = useState('Invalid Phone Number.');

    const onOtpSubmit = (otp) => {
        const payload = {
            phone_number: number,
            otp: otp
        }
        verifyOTP(payload)
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj;
                    setOtpErrorMessage(null);
                    notificationService.sendMessage({ type: "success", title: "OTP Verify", text: data.message })
                    setTimeout(() => {
                        if (data.authorization) {
                            const obj = data?.authorization;
                            localStorage.clear();
                            localStorage.setItem("token", JSON.stringify(obj));
                            redirectPage('/home');
                        } else {
                            redirectPage('/profile?phone=' + code + "-" + number);
                        }
                    }, 100);
                }
            })
            .catch((error) => {
                console.log(error)
                setOtpErrorMessage(error.receiveObj.message)
            });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const regex = /[^0-9]/g;
        if (number?.length !== 10 || regex?.test(number)) {
            setNumberError(true)
            setNumberError("Invalid Phone Number.")
            // notificationService.sendMessage({ type: "error", title: "Phone Number", text: "Invalid Phone Number." })
            return;
        }
        else {
            const payload = {
                user: {
                    country_code: code,
                    phone_number: number
                }
            }
            setPhoneNumber(payload)
                .then((response) => {
                    if (response.success && response.receiveObj) {
                        const data = response.receiveObj;
                        notificationService.sendMessage({ type: "success", title: "Phone Number", text: data.message })
                        setisValid(true);
                        setNumber(number);
                        setNumberError(false)
                    }
                })
                .catch((error) => {
                    setNumber('')
                    console.log(error)
                    setNumberErrorMessage(error.receiveObj.message)
                    setNumberError(true)
                });
        }
    }
    const redirectPage = (url) => {
        window.location.replace(window.location.origin + url);
    }
    return (
        <>
            {isValid ? <OTPValidation error={otpErrorMessage} number={code + " " + number} 
            onOtpSubmit={(val) => onOtpSubmit(val)} editNumber={() => { setisValid(false); setNumber(number) }}
            callBackMessage={()=>setOtpErrorMessage(null)} /> :
                <>
                    <form className="commentForm" onSubmit={onSubmitHandler}>
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-10 mt-28">
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-center text-xl p-2 font-articulat font-semibold">Login Account </div>
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-center text-sx p-2 font-articulat font-normal">Please enter your mobile number to get OTP</div>
                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-12"></div>
                            <div className="lg:col-span-5 md:col-span-4 sm:col-span-12 mt-2">
                                <div className={(numberError ? "errorMessage border-red-200 " : "") + "grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 divide-x border rounded-xl"}>
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
                                            error={numberError}
                                            errorMessage="Invalid Phone Number."
                                            onChange={(e) => { setNumber(e.target.value); (e.target.value.length === 10 && setNumberError(false))}}
                                        />
                                    </div>
                                </div>
                                {numberError && <span className="text-sm font-normal text-[#FF0000]">{numberErrorMessage}</span>}

                            </div>
                            <div className="lg:col-span-4 md:col-span-6 sm:col-span-12">
                            </div>
                            <div className="lg:col-span-5 md:col-span-6 sm:col-span-12 text-center mt-3">
                                <button
                                    className="rounded-lg bg-[#009898] mt-3 w-full font-articulat text-xs text-white p-2 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] h-10 focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="submit">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                    <HomeSubscribe />
                </>
            }
        </>
    );
}

export default Login;
