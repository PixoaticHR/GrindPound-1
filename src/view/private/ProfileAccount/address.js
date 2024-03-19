import { useEffect, useState } from "react";
import { getAddressList, deleteAddress } from "../../../services/shipping";
import { notificationService } from "../../../services/notifications/notificationService";
import DeleteConfirm from "./deleteConfirm";

const Address = () => {

    const [address, setAddress] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    const getAllAddress = () => {
        getAddressList()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj;
                    setAddress(data)
                    // notificationService.sendMessage({ type: "success", title: "Address Data", text: data.message })
                }
            })
            .catch((error) => {
                console.log(error)
                setAddress([])
                notificationService.sendMessage({ type: "error", title: "Address Data", text: error.receiveObj?.message
                 })
            });
    }
    const deleteAddressHandler = (val) => {
        if (val) {
            deleteAddress(deleteId)
                .then((response) => {
                    if (response.success && response.receiveObj) {
                        const data = response.receiveObj;
                        getAllAddress();
                        setDeleteId(null);
                        notificationService.sendMessage({ type: "success", title: "Address Data", text: data.error })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    notificationService.sendMessage({ type: "error", title: "Address Data", text:error.receiveObj.message})
                });
        } else {
            setDeleteId(null);
        }
    }
    useEffect(() => {
        getAllAddress();
    }, []);

    return (<>
        <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-lg font-articulat font-semibold mt-4">Address</div>
        {address.map(ele => {
            return <div className="lg:col-span-5 md:col-span-6 sm:col-span-12 font-articulat mt-2 bg-[#FBF5F1] p-3 m-2 rounded-lg">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                    <div className="lg:col-span-9 md:col-span-9 sm:col-span-9 text-sm font-semibold">{(ele.title ? ele.title : "") + " " + (ele.first_name ? ele.first_name : "") + " " + (ele.last_name ? ele.last_name : "")}</div>
                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 text-right text-xl"><i className="fa fa-trash text-[#FF0000] cursor-pointer" aria-hidden="true" onClick={() => setDeleteId(ele.id)}></i></div>
                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xs font-normal">{(ele.address_line_1 ? ele.address_line_1 : "") + " " + (ele.address_line_2 ? ele.address_line_2 : "") + " " + (ele.city ? ele.city : "") + " " + (ele.state ? ele.state : "") + " " + (ele.country ? ele.country : "") + " " + (ele.postal_code ? ele.postal_code : "")}</div>
                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xs font-normal">{ele.country_code + "-" + ele.phone_number}</div>
                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xs font-normal">{ele.mail}</div>
                </div>
            </div>
        }
        )}
        {deleteId && <DeleteConfirm setShowModal={(val) => deleteAddressHandler(val)} message="Are You Sure.You want to delete ?" />}
    </>
    )
}
export default Address;