import { useEffect, useState, useMemo } from "react";
import { useLocation } from 'react-router-dom';
import ProfileInput from "../../../components/Shared/ProfileInput";
import TextInput from "../../../components/Shared/TextInput";
import TextInputWithIcon from "../../../components/Shared/TextInputWithIcon";
import SelectInput from "../../../components/Shared/SelectInput";
import HomeSubscribe from "../../public/Home/homeSubsrice";
import Vector from "../../../images/Vector.png";
import { setUserProfile } from "../../../services/profile";
import { notificationService } from "../../../services/notifications/notificationService";
// import { DateFormatter } from "../../../components/Shared/date_formatter";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState({});
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [checkbox, setCheckbox] = useState(null);
  const [checkboxError, setCheckboxError] = useState(false);
  
  const { search } = useLocation();
  const queryParams = useMemo(() => search.substring(7, search.length), [search]);

  const redirectHandler = (url) => {
    window.location.replace(window.location.origin + url);
  }
  const submitHandler = () => {
    var error = false;
    const formData = new FormData();
    if (name.first_name) {
      formData.append("first_name", name.first_name);
    } else {
      setName({ ...name, first_name_error: true })
      error = true;
    }
    const isEmail = emailValidate(email);
    if (isEmail) {
      formData.append("email", email);
    } else {
      setEmailError(true)
      error = true;
    }
    if (name.title && name.title !== "Choose Title") {
      formData.append("title", name.title);
    } else {
      setName({ ...name, title_error: true })
      error = true;
    }
    if (checkbox) {
      formData.append("acceptance", checkbox);
    } else {
      setCheckboxError(true)
      error = true;
    }
    if (!error) {
      formData.append("last_name", name.last_name);
      formData.append("attachment", profile);
      formData.append("phone_number", profileData.phone_number);

      setUserProfile(formData)
        .then((response) => {
          if (response.success && response.receiveObj) {
            redirectHandler("/home");
            // notificationService.sendMessage({ type: "success", title: "Create Profile", text: response.receiveObj?.message })
            setProfileData({ ...profileData, })
          }
        })
        .catch((error) => {
          console.log(error)
          notificationService.sendMessage({ type: "error", title: "Create Profile", text: error.receiveObj?.message })
        });
    }
  }
  const handleFile = (e) => {
    const content = e.target.result;
    setProfile(content)
  }
  const setProfileHandler = (e) => {
    //   let fileData = new FileReader();
    // fileData.onloadend = handleFile;
    // fileData.readAsText(e);
    setProfile(e.target.files[0])
  }

  const emailValidate = (email) => {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    if (email?.match(pattern) && email) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (queryParams) {
      const phone = queryParams.split("-");
      setProfileData({ country_code: phone[0], phone_number: phone[1] });
    }
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-8 mt-28">
        <div className="lg:col-span-5 md:col-span-3 sm:col-span-1 mt-3 text-lg p-2 font-articulat font-semibold"></div>
        <div className="lg:col-span-2 md:col-span-6 sm:col-span-10 mt-3"><ProfileInput defaultValue={profile} onChange={(e) => setProfileHandler(e)} /></div>
        <div className="lg:col-span-5 md:col-span-3 sm:col-span-1 mt-3 text-lg p-2 font-articulat font-semibold"></div>

        <div className="lg:col-span-3 md:col-span-2 sm:col-span-1 mt-3 text-lg p-2 font-articulat font-semibold"></div>
        <div className="lg:col-span-6 md:col-span-8 sm:col-span-10 mt-3 text-lg p-2">
          <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
            <div className="lg:col-span-2 md:col-span-2 sm:col-span-2 m-1">
              <SelectInput
                onChange={(e) => setName({ ...name, title: e.target.value, title_error: false })}
                defaultValue={name?.title}
                type="text"
                id="title"
                placeholder="Enter Title"
                isLabelShow={true}
                showLabel="Title"
                options={["Choose Title", "Mr.", "Mrs.", "Other"]}
                error={name.title_error}
              />
              {name.title_error && <span className="text-sm font-normal text-[#FF0000]">Title is Required.</span>}
            </div>
            <div className="lg:col-span-5 md:col-span-5 sm:col-span-5 m-1">
              <TextInput
                onChange={(e) => setName({ ...name, first_name: e.target.value, first_name_error: false })}
                defaultValue={name?.first_name}
                type="text"
                id="first_name"
                errorMessage="First Name is Required."
                placeholder="Enter First Name"
                isLabelShow={true}
                showLabel="First Name"
                error={name.first_name_error}
              />
              {name.first_name_error && <span className="text-sm font-normal text-[#FF0000]">First Name is Required.</span>}
            </div>
            <div className="lg:col-span-5 md:col-span-5 sm:col-span-5 m-1">
              <TextInput
                onChange={(e) => setName({ ...name, last_name: e.target.value })}
                defaultValue={name?.last_name}
                type="text"
                id="last_name"
                errorMessage="Last Name is Required."
                placeholder="Enter Last Name"
                isLabelShow={true}
                showLabel="Last Name"
                error={name?.lastNameError}
              />
            </div>
          </div>
          <TextInputWithIcon
            onChange={(e) => { setEmail(e.target.value); setEmailError(false) }}
            defaultValue={email}
            icon={<i className="fa fa-envelope" aria-hidden="true"></i>}
            type="text"
            id="email"
            placeholder="Enter Email Address"
            isLabelShow={true}
            error={emailError}
            showLabel="Email"
            errorMessage="Email Address is Required."
          />
          {emailError && <span className="text-sm font-normal text-[#FF0000]">Invalid Email Address.</span>}
          <span className="block mb-2 text-sm font-sm font-articulat font-semibold text-xs mt-3">Phone</span>
          <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 mt-2 border-gray-200 border rounded-xl mt-3 p-1 bg-[#FBF5F1]">
            <div className="lg:col-span-1 md:col-span-3 sm:col-span-3 text-xs font-articulat font-normal p-1.5 text-center">{profileData.country_code}</div>
            <div className="lg:col-span-10 md:col-span-6 sm:col-span-6 text-xs font-articulat font-normal block w-full p-1.5">{profileData.phone_number}</div>
            <div className="lg:col-span-1 md:col-span-3 sm:col-span-3 text-xs font-articulat  font-normal p-1.5 text-right"><img src={Vector} className="object-cover" style={{ "height": "17px" }} /></div>
          </div>
          <div className="flex items-center mt-3 ml-1">
            <input
              id="active"
              name="active"
              type="checkbox"
              value={checkbox}
              onChange={(e) => { setCheckbox(e.target.checked); setCheckboxError(false) }}
              className="w-4 h-4 text-blue-600 border-gray-400 border-b rounded" />
            <label htmlFor="checkbox" className="ms-2 ml-3 text-sm  font-poppins text-[#1C1243]">I accept Terms & Conditions and Privacy Policy</label>
          </div>
          {checkboxError && <span className="text-sm font-normal text-[#FF0000]"> Please accept Terms & Conditions and Privacy Policy.</span>}

        </div>
        <div className="lg:col-span-3 md:col-span-2 sm:col-span-1 mt-3 text-lg p-2 font-articulat font-semibold"></div>
        <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-center">
          <button
            className="mr-3 select-none w-16 rounded-lg font-articulat bg-[#009898] text-center text-xs text-white p-2 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button" onClick={submitHandler}>
            Create
          </button>
          <button
            className="select-none border text-[#FF0000]  w-16 rounded-lg font-articulat bg-white text-center text-xs p-2 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button" onClick={() => redirectHandler("/home")}>
            Cancel
          </button>
        </div>
      </div>
      <HomeSubscribe />
    </>
  );
}

export default Profile;
