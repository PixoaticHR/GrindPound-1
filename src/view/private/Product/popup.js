const Popup = (props) => {
    const { product } = props;

    return (
        <>
            <div className="justify-center items-right flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto ml-auto mr-2 max-w-3xl" style={{ "marginTop": "80px" }}>
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-80 bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="relative p-1 flex-auto p-5">
                            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                    <div className="lg:col-span-3 md:col-span-4 sm:col-span-4 m-1 mt-1"><img src={product.attachment_url[0]} className="object-cover h-12 rounded-xl" /></div>
                                    <div className="lg:col-span-9 md:col-span-8 sm:col-span-8 m-1 mt-1">
                                        <div>{product.name}</div>
                                        <span className="text-[#009898]">{product.quantity} X ₹{product.master_price} </span>
                                        <span className="text-[#999999] font-articulat font-light line-through">₹{product.cost_price}</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}


export default Popup;
