import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { checkAuth } from "../../../app/checkAuth";
import AccountInfo from "./accountInfo";
import Address from "./address";
import MyOrder from "./myOrder";
import Subscription from "./subscription";
import Vouchers from "./vouchers";
import { getProfileList } from "../../../services/profile";
import { logout } from "../../../services/login";
import { cleenStore } from "../../../services/redux";
import { notificationService } from "../../../services/notifications/notificationService";

const ProfileAccount = (props) => {
    const [tab, setTab] = useState(0);
    const [profile, setProfile] = useState({});

    const currentComponent = (tab) => {
        switch (tab) {
            case 0: return <AccountInfo profile={profile} getProfile={getProfile} />;
            case 1: return <MyOrder />;
            case 2: return <Address />;
            case 3: return <Vouchers />;
            case 4: return <Subscription />;
        }
    };

    const getProfile = () => {
        getProfileList()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj;
                    setProfile(data)
                    // notificationService.sendMessage({ type: "success", title: "Profile Data", text: data.message })
                }
            })
            .catch((error) => {
                console.log(error)
                notificationService.sendMessage({ type: "error", title: "Profile Data", text: error.receiveObj.message })
            });
    };

    const redirectPage = (url) => {
        window.location.replace(window.location.origin + url);
    };

    const logoutHandler = () => {
        logout()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    notificationService.sendMessage({ type: "success", title: "Logout", text: "Logout Succesfully." });
                    props.cleenCart();
                    setTimeout(() => {
                        localStorage.clear();
                        redirectPage('/login');
                    }, 200);
                }
            })
            .catch((error) => {
                console.log(error)
                notificationService.sendMessage({ type: "error", title: "Logout", text: error.receiveObj.message })
            });
    };

    useEffect(() => {
        checkAuth();
        getProfile();
    }, []);
    
    return (
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-12 mt-28">
            <div className="lg:col-span-2 md:col-span-2 sm:col-span-2"></div>
            <div className="lg:col-span-8 md:col-span-8 sm:col-span-8">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                    <div className="lg:col-span-10 md:col-span-10 sm:col-span-10 text-lg font-articulat font-semibold">Profile</div>
                    <div className="lg:col-span-2 md:col-span-2 sm:col-span-2 text-xs font-articulat font-semibold text-right"><button className="bg-[#FF0000] p-2 text-white rounded-lg hover:shadow-lg hover:border-blue-200 focus:border-blue-400" onClick={() => logoutHandler()}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</button></div>
                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-2">
                        <span className="text-sm font-articulat font-semibold">{profile.title + " " + profile.first_name + " " + (profile.last_name !== "undefined" ? profile.last_name : "")}</span>
                        <span className="text-xs font-articulat font-normal">, {profile.email}</span>
                        <span className="text-xs font-articulat font-normal">, {profile.country !== "null" ? profile.country : ""}</span>
                    </div>
                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-lg font-articulat font-semibold mt-3"><hr /></div>
                    <ul className="flex flex-wrap -mb-px lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm font-articulat font-semibold text-center cursor-pointer mt-2">
                        <li className="me-5" onClick={() => { setTab(0) }}>
                            <a className={tab === 0 ? "inline-block p-1 border-b-4 border-[#009898] rounded-t-lg active dark:text-[#009898] dark:border-[#009898]" :
                                "inline-block p-1 border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} aria-current="page">Account info</a>
                        </li>
                        <li className="me-5" onClick={() => { setTab(1) }}>
                            <a className={tab === 1 ? "inline-block p-1 border-b-4 border-[#009898] rounded-t-lg active dark:text-[#009898] dark:border-[#009898]" :
                                "inline-block p-1 border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} aria-current="page">My order</a>
                        </li>
                        <li className="me-5" onClick={() => { setTab(2) }}>
                            <a className={tab === 2 ? "inline-block p-1 border-b-4 border-[#009898] rounded-t-lg active dark:text-[#009898] dark:border-[#009898]" :
                                "inline-block p-1 border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} aria-current="page">Address</a>
                        </li>
                        <li className="me-5" onClick={() => { setTab(3) }}>
                            <a className={tab === 3 ? "inline-block p-1 border-b-4 border-[#009898] rounded-t-lg active dark:text-[#009898] dark:border-[#009898]" :
                                "inline-block p-1 border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} aria-current="page">Vouchers</a>
                        </li>
                        <li className="me-5" onClick={() => { setTab(4) }}>
                            <a className={tab === 4 ? "inline-block p-1 border-b-4 border-[#009898] rounded-t-lg active dark:text-[#009898] dark:border-[#009898]" :
                                "inline-block p-1 border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} aria-current="page">Subscription</a>
                        </li>
                    </ul>

                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-lg font-articulat font-semibold"><hr /></div>

                    {currentComponent(tab)}</div>
            </div>
            <div className="lg:col-span-2 md:col-span-2 sm:col-span-2"></div>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        cleenCart: () => dispatch(cleenStore()),
    }
}

export default connect(null, mapDispatchToProps)((ProfileAccount));