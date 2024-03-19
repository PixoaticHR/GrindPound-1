import React, { useState, useEffect } from "react";
import TextInput from "../../../components/Shared/TextInput";
import TextArea from "../../../components/Shared/TextArea";
import { addRating } from "../../../services";
import { notificationService } from "../../../services/notifications/notificationService";
import { checkAuth } from "../../../app/checkAuth";

const AddUpdateReview = (props) => {
    const { setShowModal, refresh } = props;
    const [payload, setPayload] = useState({});
    const [rating, setRating] = useState(0);

    const onSubmitHandler = () => {
        var error = false;
        const obj = {};
        if (rating > 0) {
            obj['rating'] = rating
        } else {
            notificationService.sendMessage({ type: "error", title: "Your Rating", text: "Your Rating is Required." })
            error = true;
        }
        if (payload.name && payload.name !== "") {
            obj['name'] = payload.name
        } else {
            notificationService.sendMessage({ type: "error", title: "Name", text: "Name is Required." })
            error = true;
        }
        obj['content'] = payload.review
        obj['product_id'] = props.productId
        if (!error) {
            addRating(obj)
                .then((response) => {
                    console.log('addRating response', response);
                    if (response.success && response.receiveObj) {
                        const data = response.receiveObj;
                        notificationService.sendMessage({ type: "success", title: "Add Rating", text: "Your rating has been submitted successfully!" })
                        refresh();
                    }
                })
                .catch((error) => {
                    console.log('addRating response errrr', error)
                    notificationService.sendMessage({ type: "error", title: "Add Rating", text: error.receiveObj.response?.data?.ExceptionMessage })
                });
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="relative p-2 flex-auto">
                            <div className="grid lg:grid-col-12 md:grid-col-12 sm:grid-col-12">
                                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-2 mt-2">
                                    <label for="rating" className="block mb-2 text-sm font-sm font-articulat font-semibold text-xs mt-2">Your Rating</label>
                                    <span className={"m-2 mt-2 " + (rating === 1 && "text-[#E9C400]")} onClick={() => setRating(1)}><i className="fa fa-star" aria-hidden="true"></i></span>
                                    <span className={"m-2 mt-2 " + (rating === 2 && "text-[#E9C400]")} onClick={() => setRating(2)}><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></span>
                                    <span className={"m-2 mt-2 " + (rating === 3 && "text-[#E9C400]")} onClick={() => setRating(3)}><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></span>
                                    <span className={"m-2 mt-2 " + (rating === 4 && "text-[#E9C400]")} onClick={() => setRating(4)}><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></span>
                                    <span className={"m-2 mt-2 " + (rating === 5 && "text-[#E9C400]")} onClick={() => setRating(5)}><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></span>
                                </div>
                                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-2">
                                    <TextInput
                                        onChange={(e) => setPayload({ ...payload, name: e.target.value })}
                                        value={payload.name}
                                        type="text"
                                        id="name"
                                        errorMessage="Full Name is Required."
                                        placeholder="Enter Full Name"
                                        isLabelShow={true}
                                        showLabel="Full Name"
                                        error={payload.nameError}
                                    />
                                </div>
                                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-2">
                                    <TextArea
                                        onChange={(e) => setPayload({ ...payload, review: e.target.value })}
                                        value={payload.review}
                                        type="textarea"
                                        id="review"
                                        errorMessage="Your Review is Required."
                                        placeholder="Enter Your Review"
                                        isLabelShow={true}
                                        showLabel="Your Review"
                                        error={payload.reviewError}
                                    />
                                </div>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            <button
                                className="lg:col-span-6 md:col-span-6 sm:col-span-6 bg-[#009898] border text-white font-bold text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={onSubmitHandler}
                            >
                                Create
                            </button>
                            <button
                                className="text-[#FF0000] border lg:col-span-6 md:col-span-6 sm:col-span-6 border bg-white font-bold px-6 py-2 text-sm rounded shadow hover:shadow-lg focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default AddUpdateReview;
