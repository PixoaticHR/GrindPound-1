import { useState, useEffect } from "react";
import { updateProfile } from "../../../services/profile";
import { checkAuth } from "../../../app/checkAuth";
import ProfileInput from "../../../components/Shared/ProfileInput";
import TextInput from "../../../components/Shared/TextInput";
import TextInputWithIcon from "../../../components/Shared/TextInputWithIcon";
import SelectInput from "../../../components/Shared/SelectInput";
import Vector from "../../../images/Vector.png";
import { notificationService } from "../../../services/notifications/notificationService";
import { DateFormatter } from "../../../components/Shared/date_formatter";

const AccountInfo = (props) => {
    const [profile, setProfile] = useState({});
    const [profileImge, setProfileImge] = useState(null);
    const [edit, setEdit] = useState(false);

    const redirectHandler = (url) => {
        window.location.replace(window.location.origin + url);
    };

    const submitHandler = (val) => {
        if (val) {
            var error = false;
            const formData = new FormData();
            if (profile.title && profile.title !== "Choose Title") {
                formData.append("title", profile.title);
            } else {
                setProfile({ ...profile, title_error: true })
                error = true;
            }
            if (profile.first_name) {
                formData.append("first_name", profile.first_name);
            } else {
                setProfile({ ...profile, first_name_error: true })
                error = true;
            }
            const isEmail = emailValidate(profile.email);
            if (isEmail) {
                formData.append("email", profile.email);
            } else {
                setProfile({ ...profile, email_error: true })
                error = true;
            }
            if (!error) {
                formData.append("user[last_name]", profile.last_name);
                formData.append("user[attachment]", profileImge);
                formData.append("user[dob]", profile.dob);
                formData.append("user[doa]", profile.doa);
                formData.append("user[state]", profile.state);
                formData.append("user[pin_code]", profile.pin_code);
                formData.append("user[country]", profile.country);
                formData.append("user[district]", profile.district);

                updateProfile(formData)
                    .then((response) => {
                        if (response.success && response.receiveObj) {
                            notificationService.sendMessage({ type: "success", title: "Profile Update", text: "Your Profile Updated" })
                            setEdit(!edit);
                            props.getProfile();
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        notificationService.sendMessage({ type: "error", title: "Profile Update", text: error.receiveObj.message })
                    });
            }
        }
        else {
            setEdit(!edit);
        }
    }
    const emailValidate = (email) => {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
        if (email?.match(pattern) && email) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        checkAuth();
        setProfile(props.profile);
        setProfileImge(props?.profile?.attachment_url)
    }, [props.profile]);

    console.log("profileImge ==> ", profileImge);
    console.log("profileImge props ==> ", props);

    return (<>
        <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-lg font-articulat font-semibold mt-4">Account Infomation</div>
        <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-lg font-articulat font-semibold mt-2">
            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                <div className="lg:col-span-2 md:col-span-3 sm:col-span-4 mt-3 text-lg p-2 font-articulat font-semibold"><ProfileInput disabled={!edit} defaultValue={profileImge} onChange={(e) => setProfileImge(e.target.files[0])} /></div>
                <div className="lg:col-span-10 md:col-span-9 sm:col-span-8 mt-3">
                    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                        <div className="lg:col-span-2 md:col-span-2 sm:col-span-2 m-1">
                            <SelectInput
                                onChange={(e) => setProfile({ ...profile, title: e.target.value, title_error: false })}
                                defaultValue={profile.title ? profile.title : ""}
                                type="text"
                                id="title"
                                disabled={!edit}
                                placeholder="Enter Title"
                                isLabelShow={true}
                                showLabel="Title"
                                options={["Choose Title", "Mr.", "Mrs.", "Other"]}
                                error={profile.title_error}
                            />
                            {profile.title_error && <span className="text-sm font-normal text-[#FF0000]">Title is Required.</span>}
                        </div>
                        <div className="lg:col-span-5 md:col-span-5 sm:col-span-5 m-1">
                            <TextInput
                                onChange={(e) => setProfile({ ...profile, first_name: e.target.value, first_name_error: false })}
                                value={profile.first_name ? profile.first_name : ""}
                                type="text"
                                id="first_name"
                                disabled={!edit}
                                errorMessage="First Name is Required."
                                placeholder="Enter First Name"
                                isLabelShow={true}
                                showLabel="First Name"
                                error={profile.first_name_error}
                            />
                            {profile.first_name_error && <span className="text-sm font-normal text-[#FF0000]">First Name is Required.</span>}
                        </div>
                        <div className="lg:col-span-5 md:col-span-5 sm:col-span-5 m-1">
                            <TextInput
                                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                                value={profile.last_name !== "undefined" ? profile.last_name : ""}
                                type="text"
                                id="last_name"
                                disabled={!edit}
                                errorMessage="Last Name is Required."
                                placeholder="Enter Last Name"
                                isLabelShow={true}
                                showLabel="Last Name"
                                error={profile.lastNameError}
                            />
                        </div>
                    </div>
                    <TextInputWithIcon
                        onChange={(e) => setProfile({ ...profile, email: e.target.value, email_error: false })}
                        defaultValue={profile.email ? profile.email : ""}
                        icon={<i className="fa fa-envelope" aria-hidden="true"></i>}
                        type="text"
                        id="email"
                        disabled={!edit}
                        placeholder="Enter Email Address"
                        isLabelShow={true}
                        showLabel="Email"
                        error={profile.email_error}
                        errorMessage="Email Address is Required."
                    />
                    {profile.email_error && <span className="text-sm font-normal text-[#FF0000]">Please Enter Valid Email .</span>}

                    <span className="block mb-2 text-sm font-sm font-articulat font-semibold text-xs mt-3">Phone</span>
                    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 mt-2 border-gray-200 border rounded-xl mt-3 p-1 bg-[#FBF5F1]">
                        <div className="lg:col-span-1 md:col-span-3 sm:col-span-3 text-xs font-articulat font-normal p-1.5 text-center">{profile.country_code}</div>
                        <div className="lg:col-span-10 md:col-span-6 sm:col-span-6 text-xs font-articulat font-normal block w-full p-1.5">{profile.phone_number}</div>
                        <div className="lg:col-span-1 md:col-span-3 sm:col-span-3 text-xs font-articulat  font-normal p-1.5 text-right"><img src={Vector} className="object-cover" style={{ "height": "17px" }} /></div>
                    </div>
                    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                        <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 m-1">
                            <TextInputWithIcon
                                defaultValue={DateFormatter(profile.doa)}
                                onChange={(e) => setProfile({ ...profile, doa: e.target.value })}
                                icon={<i className="fa fa-calendar-check" aria-hidden="true"></i>}
                                type="date"
                                id="doa"
                                disabled={!edit}
                                placeholder="Enter Date of Anniversary"
                                isLabelShow={true}
                                showLabel="Date of Anniversary"
                                error={false}
                            />
                        </div>
                        <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 m-1">
                            <TextInputWithIcon
                                defaultValue={DateFormatter(profile.dob)}
                                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                                icon={<i className="fa fa-calendar-check" aria-hidden="true"></i>}
                                type="date"
                                id="dob"
                                disabled={!edit}
                                placeholder="Enter Date of birth"
                                isLabelShow={true}
                                showLabel="Date of birth"
                                error={false}
                            />
                        </div>
                    </div>
                    {/* {!edit && <>
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 m-2">
                                <TextInputWithIcon
                                    onChange={(e) => setProfile({ ...profile, pin_code: e.target.value })}
                                    defaultValue={profile.pin_code !== "null" ? profile.pin_code : ""}
                                    icon={<i className="fa fa-location-dot" aria-hidden="true"></i>}
                                    type="text"
                                    id="pin_code"
                                    placeholder="Enter Pin Code"
                                    isLabelShow={true}
                                    showLabel="Pin Code"
                                    errorMessage="Pin Code is Required."
                                    error={profile.pinCodeError}
                                />
                            </div>
                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 m-2">
                                <TextInputWithIcon
                                    onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                                    defaultValue={profile.district !== "null" ? profile.district : ""}
                                    icon={<i className="fa fa-location-dot" aria-hidden="true"></i>}
                                    type="text"
                                    id="district"
                                    placeholder="Enter District"
                                    isLabelShow={true}
                                    showLabel="District"
                                    errorMessage="District is Required."
                                    error={profile.districtError}
                                />
                            </div>
                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 m-2">
                                <TextInputWithIcon
                                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                                    defaultValue={profile.state !== "null" ? profile.state : ""}
                                    icon={<i className="fa fa-location-dot" aria-hidden="true"></i>}
                                    type="text"
                                    id="state"
                                    placeholder="Enter State"
                                    isLabelShow={true}
                                    showLabel="State"
                                    errorMessage="State is Required."
                                    error={profile.stateError}
                                />
                            </div>
                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 m-2">
                                <TextInputWithIcon
                                    onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                                    defaultValue={profile.country !== "null" ? profile.country : ""}
                                    icon={<i className="fa fa-location-dot" aria-hidden="true"></i>}
                                    type="text"
                                    id="country"
                                    placeholder="Enter Country"
                                    isLabelShow={true}
                                    showLabel="Country"
                                    errorMessage="Country is Required."
                                    error={profile.countryError}
                                />
                            </div>
                        </div>
                    </>} */}
                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3">
                        <button
                            className="mr-3 select-none w-28 rounded-lg font-articulat bg-[#009898] text-center text-xs text-white p-3 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button" onClick={() => submitHandler(edit)}>
                            {!edit ? "Edit" : "Save"}
                        </button>
                        {edit &&
                            <button
                                className="select-none border  w-28 rounded-lg text-[#FF0000] font-articulat bg-white text-center text-xs p-3 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                type="button" onClick={() => setEdit(!edit)}>
                                Cancel
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default AccountInfo;