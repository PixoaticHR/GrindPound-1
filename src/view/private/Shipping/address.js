import TextInput from "../../../components/Shared/TextInput";
import TextInputWithIcon from "../../../components/Shared/TextInputWithIcon";
import SelectInput from "../../../components/Shared/SelectInput";
import { useState, useEffect } from "react";
import { getAddressList, setAddressList } from "../../../services/shipping";
import { notificationService } from "../../../services/notifications/notificationService";
import { isNumber } from "../../../components/Shared/NumberLengthValid";
import './style.css';

const AddressPage = (props) => {
    const [addressForm, setAddressForm] = useState({ code: "+91", phone_number: "", pin_code: "" });
    const [modeShipping, setModeShipping] = useState("ship");
    const [address, setAddress] = useState([]);
    const [newAddress, setNewAddress] = useState(false);
    const pickUpAddress = '150 Lower Parker Hill Rd, Nipania, Indore, MP -012345';

    const redirectToMapByAddress = (address) => {
        window.open(`https://www.google.com/maps/search/+${address}/`, '_blank')
    };

    const addAddressHandler = () => {
        const payload = {};
        var error = false;
        if (addressForm.first_name) {
            payload['first_name'] = addressForm.first_name;
        } else {
            notificationService.sendMessage({ type: "error", title: "First Name", text: "First Name is Required." })
            error = true;
        }
        if (isNumber(addressForm.phone_number, 10)) {
            payload['phone_number'] = addressForm.phone_number;
        } else {
            notificationService.sendMessage({ type: "error", title: "Phone Number", text: "Phone Number is not Valid." })
            error = true;
        }
        if (addressForm.address) {
            payload['address_line_1'] = addressForm.address;
        } else {
            notificationService.sendMessage({ type: "error", title: "Full Address", text: "Full Address is Required." })
            error = true;
        }
        if (isNumber(addressForm.pin_code, 6)) {
            payload['postal_code'] = addressForm.pin_code;
        } else {
            notificationService.sendMessage({ type: "error", title: "Pin Code", text: "Pin Code is not Valid." })
            error = true;
        }
        const isEmail = emailValidate(addressForm.email);
        if (isEmail) {
            payload['mail'] = addressForm.email;
        } else {
            notificationService.sendMessage({ type: "error", title: "Email", text: "Please Enter Valid Email ." })
            error = true;
        }
        if (!error) {
            payload['last_name'] = addressForm.last_name;
            payload['country'] = addressForm.country;
            payload['state'] = addressForm.state;
            payload['country_code'] = addressForm.code;
            payload['title'] = addressForm.title;
            payload['city'] = addressForm.district;

            const payloadData = { shipping_address: payload };

            setAddressList(payloadData)
                .then((response) => {
                    if (response.success && response.receiveObj) {
                        notificationService.sendMessage({ type: "success", title: "Add Address", text: "Add Address Successfully" })
                        setTimeout(() => {
                            props.chengeTab({ address: response.receiveObj, type: "ship" });
                        }, 200);
                    }
                })
                .catch((error) => {
                    console.log(error)
                    notificationService.sendMessage({ type: "error", title: "Add Address", text: error.receiveObj.message })
                });
        }
    };

    const getAllAddress = () => {
        getAddressList()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj;
                    data.map(val => {
                        if (val.default == true) { props.setSelectedAddress(val) }
                    });
                    console.log("getAllAddress ==> ", response);
                    setAddress(data);
                }
            })
            .catch((error) => {
                console.log(error)
                notificationService.sendMessage({ type: "error", title: "Address Data", text: error.receiveObj.message })
            });
    };

    const emailValidate = (email) => {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
        if (email?.match(pattern) && email) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        getAllAddress();
        if (props.selectAddress) {
            (props.selectAddress.type === "ship" && props.setSelectedAddress(props.selectAddress.address))
            setModeShipping(props.selectAddress ? props.selectAddress.type : "ship");
        };
    }, []);

    console.log('selectedAddress', props.selectedAddress);
    console.log('setModeShipping', modeShipping);

    return (<>
        <div className='text-lg font-articulat font-semibold mt-3'>Delivery</div>
        <div className='text-sm font-articulat font-normal mt-1'>is this address you’d like to use display below? If so, click the corresponding “Deliver to this address” button. or you can enter a new address.</div>
        <div class="flex gap-10 grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
            <div class="inline-flex items-center bg-[#FBF5F1] rounded-lg lg:col-span-6 md:col-span-6 sm:col-span-6 m-1 mt-3">
                <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
                    <input name="type" type="radio"
                        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#009898] before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-[#009898] hover:before:opacity-10"
                        id="html" checked={modeShipping === "ship"} onChange={(e) => setModeShipping(e.target.checked && "ship")} />
                    <span
                        class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                        </svg>
                    </span>
                </label>
                <label class="mt-px font-light text-gray-700 cursor-pointer select-none text-sm font-articulat font-semibold" htmlFor="html">
                    Ship
                </label>
            </div>
            <div class="inline-flex items-center bg-[#FBF5F1] rounded-lg lg:col-span-6 md:col-span-6 sm:col-span-6 m-1 mt-3">
                <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="react">
                    <input name="type" type="radio"
                        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#009898] before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-[#009898] hover:before:opacity-10"
                        id="react" checked={modeShipping === "pickup"} onChange={(e) => { setModeShipping(e.target.checked && "pickup"); }} />
                    <span
                        class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                        </svg>
                    </span>
                </label>
                <label class="mt-px font-light text-gray-700 cursor-pointer select-none text-sm font-articulat font-semibold" htmlFor="react">
                    Pick up
                </label>
            </div>
            {/* props.chengeTab({ address: pickUpAddress, type: "pickup" }) */}
        </div>
        <div className='text-lg font-articulat font-semibold mt-3'>{modeShipping === "ship" ? "Select  a delivery address" : "Pickup locations"}</div>
        <div className='text-sm font-articulat font-normal mt-1'>{modeShipping === "ship" ? "is this address you’d like to use display below? If so, click the corresponding “Deliver to this address” button. or you can enter a new address." : "There is 1 store with stock close to your location."}</div>
        {modeShipping === "ship" ?
            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                {address.map(ele => {
                    console.log('ele ==> ', ele);
                    return <div className="lg:col-span-5 md:col-span-6 sm:col-span-12 font-articulat mt-2 bg-[#FBF5F1] p-3 m-2 rounded-lg">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            <div className="lg:col-span-11 md:col-span-10 sm:col-span-11 text-sm font-semibold">{(ele?.title ? ele?.title : "") + " " + (ele?.first_name ? ele?.first_name : "") + " " + (ele?.last_name ? ele?.last_name : "")}</div>
                            <div className="lg:col-span-1 md:col-span-2 sm:col-span-1 text-xl">
                                <div class="flex items-right mb-4">
                                    {/* <div class="inline-flex items-center bg-[#FBF5F1] rounded-lg lg:col-span-6 md:col-span-6 sm:col-span-6 m-1 mt-3"> */}
                                    {/* <label class="relative flex items-center rounded-full cursor-pointer" htmlFor={`${ele?.id}`}>
                                        <input
                                            name="type"
                                            type="radio"
                                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-500 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#009898] before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-[#009898] hover:before:opacity-10"
                                            id={`${ele?.id}`}
                                            checked={ele?.id === props.selectedAddress?.id}
                                            onChange={(e) => props.setSelectedAddress(e.target.checked ? ele : null)}
                                        />
                                        <span
                                            class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                            </svg>
                                        </span>
                                    </label> */}

                                    <label class="container">
                                        <input
                                            type="radio"
                                            name="radio"
                                            checked={ele?.id === props.selectedAddress?.id}
                                            onChange={(e) => props.setSelectedAddress(e.target.checked ? ele : null)}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                    {/* </div> */}

                                    {/* <input onChange={(e) => props.setSelectedAddress(e.target.checked ? ele : null)} id="default-checkbox" type="checkbox" checked={ele?.id === props.selectedAddress?.id} class="cursor-pointer w-4 h-4 text-[#009898] bg-gray-100 border-gray-500 rounded focus:ring-[#009898] dark:focus:ring-[#009898] dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600" /> */}
                                </div>
                            </div>
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xs font-normal">{(ele?.address_line_1 ? ele?.address_line_1 : "") + " " + (ele?.address_line_2 ? ele?.address_line_2 : "") + " " + (ele?.city ? ele?.city : "") + " " + (ele?.state ? ele?.state : "") + " " + (ele?.country ? ele?.country : "") + " " + (ele?.postal_code ? ele?.postal_code : "")}</div>
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xs font-normal">{ele?.country_code + "-" + ele?.phone_number}</div>
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xs font-normal">{ele?.mail}</div>
                        </div>
                    </div>
                })}
                {props.msg !== '' && <div style={{ margin: "5px 20px", color: "red", fontWeight: "bold" }} className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xs font-normal color:red">{props.msg}</div>}
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                    {/* <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                        <button className={(props.selectedAddress ? "bg-[#009898]" : "bg-[#ccc]") + " m-1 mt-1 text-white rounded text-sm p-3 font-articulat font-semibold text-center cursor-pointer lg:col-span-4 md:col-span-4 sm:col-span-4 focus:ring-blue-200 dark:focus:ring-[#009898] dark:ring-offset-blue-800 focus:ring-2 dark:bg-blue-700 dark:border-blue-600"} disabled={!props.selectedAddress} onClick={() => props.chengeTab({ address: props.selectedAddress, type: "ship" })}>Deliver Here</button>
                    </div> */}
                    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                        {!newAddress && <button className={(newAddress ? "bg-[#ccc]" : "bg-[#009898]") + " m-1 mt-1 text-white rounded text-sm p-3 font-articulat font-semibold text-center cursor-pointer lg:col-span-4 md:col-span-4 sm:col-span-4 focus:ring-blue-200 dark:focus:ring-[#009898] dark:ring-offset-blue-800 focus:ring-2 dark:bg-blue-700 dark:border-blue-600"} onClick={() => setNewAddress(e => !e)}>Add a New Address</button>}
                    </div>
                </div>
                {newAddress &&
                    (
                        <>
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 p-1"><hr /></div>
                            <div className='text-sm font-articulat font-semibold mt-3 lg:col-span-12 md:col-span-12 sm:col-span-12 p-1'>Add a new delivery address</div>
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 border rounded-xl p-2">
                                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3">
                                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                            <div className="lg:col-span-2 md:col-span-2 sm:col-span-2 m-1">
                                                <SelectInput
                                                    onChange={(e) => setAddressForm({ ...addressForm, title: e.target.value })}
                                                    defaultValue={addressForm.title}
                                                    type="text"
                                                    id="title"
                                                    placeholder="Enter Title"
                                                    isLabelShow={true}
                                                    showLabel="Title"
                                                    options={["Choose Title", "Mr.", "Mrs.", "Other"]}
                                                    error={false}
                                                />
                                            </div>
                                            <div className="lg:col-span-5 md:col-span-5 sm:col-span-5 m-1">
                                                <TextInput
                                                    onChange={(e) => setAddressForm({ ...addressForm, first_name: e.target.value })}
                                                    defaultValue={addressForm.first_name}
                                                    type="text"
                                                    id="first_name"
                                                    errorMessage="First Name is Required."
                                                    placeholder="Enter First Name"
                                                    isLabelShow={true}
                                                    showLabel="First Name"
                                                    error={addressForm.firstNameError}
                                                />
                                            </div>
                                            <div className="lg:col-span-5 md:col-span-5 sm:col-span-5 m-1">
                                                <TextInput
                                                    onChange={(e) => setAddressForm({ ...addressForm, last_name: e.target.value })}
                                                    defaultValue={addressForm.last_name}
                                                    type="text"
                                                    id="last_name"
                                                    errorMessage="Last Name is Required."
                                                    placeholder="Enter Last Name"
                                                    isLabelShow={true}
                                                    showLabel="Last Name"
                                                    error={addressForm.lastNameError}
                                                />
                                            </div>
                                        </div>
                                        <TextInputWithIcon
                                            onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                                            defaultValue={addressForm.email}
                                            icon={<i className="fa fa-envelope" aria-hidden="true"></i>}
                                            type="text"
                                            id="email"
                                            placeholder="Enter Email Address"
                                            isLabelShow={true}
                                            showLabel="Email"
                                            error={addressForm.emailError}
                                            errorMessage="Email Address is Required."
                                        />
                                        {/* <span className="block mb-2 text-sm font-sm font-articulat font-semibold text-xs mt-3">Phone</span>
                            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                 <div className="lg:col-span-2 md:col-span-2 sm:col-span-4 m-1">
                                    <SelectInput
                                        onChange={(e) => setAddressForm({ ...addressForm, code: e.target.value })}
                                        defaultValue={addressForm.title}
                                        type="text"
                                        id="code"
                                        placeholder="Enter Code"
                                        isLabelShow={false}
                                        showLabel="Code"
                                        options={["+91"]}
                                        error={false}
                                    />
                                </div>  */}
                                        <TextInputWithIcon
                                            onChange={(e) => setAddressForm({ ...addressForm, phone_number: e.target.value })}
                                            defaultValue={addressForm.phone_number}
                                            icon={<i className="fa fa-phone" aria-hidden="true"></i>}
                                            type="text"
                                            id="phone_number"
                                            pattern="[0-9]*"
                                            maxlength="10"
                                            placeholder="Enter Phone Number"
                                            isLabelShow={true}
                                            showLabel="Phone Number"
                                            errorMessage="Phone Number is Required."
                                        />
                                        <TextInputWithIcon
                                            onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                                            defaultValue={addressForm.address}
                                            icon={<i className="fa fa-location-dot" aria-hidden="true"></i>}
                                            type="text"
                                            id="address"
                                            placeholder="Enter Address"
                                            isLabelShow={true}
                                            showLabel="Address"
                                            errorMessage="Address is Required."
                                            error={addressForm.isAddress}
                                        />
                                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 m-2">
                                                <TextInputWithIcon
                                                    onChange={(e) => setAddressForm({ ...addressForm, pin_code: e.target.value })}
                                                    defaultValue={addressForm.pin_code}
                                                    icon={<i className="fa fa-location-dot" aria-hidden="true"></i>}
                                                    type="text"
                                                    id="pin_code"
                                                    pattern="[0-9]*"
                                                    maxlength="6"
                                                    value={addressForm?.pin_code}
                                                    placeholder="Enter Pin Code"
                                                    isLabelShow={true}
                                                    showLabel="Pin Code"
                                                    errorMessage="Pin Code is Required."
                                                    error={addressForm.pinCodeError}
                                                />
                                            </div>
                                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 m-2">
                                                <TextInputWithIcon
                                                    onChange={(e) => setAddressForm({ ...addressForm, district: e.target.value })}
                                                    defaultValue={addressForm.district}
                                                    icon={<i className="fa fa-location-dot" aria-hidden="true"></i>}
                                                    type="text"
                                                    id="district"
                                                    placeholder="Enter District"
                                                    isLabelShow={true}
                                                    showLabel="District"
                                                    errorMessage="District is Required."
                                                    error={addressForm.districtError}
                                                />
                                            </div>
                                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 m-2">
                                                <TextInputWithIcon
                                                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                                    defaultValue={addressForm.state}
                                                    icon={<i className="fa fa-location-dot" aria-hidden="true"></i>}
                                                    type="text"
                                                    id="state"
                                                    placeholder="Enter State"
                                                    isLabelShow={true}
                                                    showLabel="State"
                                                    errorMessage="State is Required."
                                                    error={addressForm.stateError}
                                                />
                                            </div>
                                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 m-2">
                                                <TextInputWithIcon
                                                    onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                                                    defaultValue={addressForm.country}
                                                    icon={<i className="fa fa-location-dot" aria-hidden="true"></i>}
                                                    type="text"
                                                    id="country"
                                                    placeholder="Enter Country"
                                                    isLabelShow={true}
                                                    showLabel="Country"
                                                    errorMessage="Country is Required."
                                                    error={addressForm.countryError}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-center">
                                        <button
                                            className="mr-3 select-none w-24 rounded-lg font-articulat bg-[#009898] text-center text-xs text-white p-2 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                            type="button" onClick={addAddressHandler}>
                                            Add address
                                        </button>
                                        <button
                                            className="mr-3 select-none w-24 rounded-lg font-articulat bg-[#009898] text-center text-xs text-white p-2 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                            type="button" onClick={() => setNewAddress(e => !e)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            :
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 bg-[#FBF5F1] rounded-xl p-2">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-sm font-articulat font-semibold mt-2">Indore (10 KM)</div>
                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-sm font-articulat font-semibold mt-2 text-right">Free</div>
                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-xs font-articulat font-normal mt-2 text-[#009898] underline cursor-pointer" onClick={() => redirectToMapByAddress(pickUpAddress)}>{pickUpAddress}</div>
                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-xs font-articulat font-normal text-[#FF0000] mt-2 text-right cursor-pointer">Usually ready in 24 hours</div>
                </div>
            </div>
        }
    </>)
};


export default AddressPage;