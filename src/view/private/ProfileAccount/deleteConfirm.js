import React from "react";

const DeleteConfirm = (props) => {
    const { setShowModal, message } = props;

    return (
        <>
            <div className="justify-right items-right flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-80 bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <span className="text-sm text-[#FF0000]">{message}</span>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            <button
                                className="text-[#FF0000] border lg:col-span-6 md:col-span-6 sm:col-span-6 border bg-white font-bold px-6 py-2 text-sm rounded shadow hover:shadow-lg focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="lg:col-span-6 md:col-span-6 sm:col-span-6 bg-[#009898] border-red text-white font-bold text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => setShowModal(true)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default DeleteConfirm;
