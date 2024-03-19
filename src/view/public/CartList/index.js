import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from "../../../reducers/cart/actions";
import { deleteCartItem } from "../../../services/checkout";
import { fetchCartList } from "../Home";

const CartList = (props) => {
    const { setShowModal } = props;
    const [deleteId, setDeleteId] = useState(null);
    const cartStore = useSelector(state => state.cartReducer.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        deleteCartItem(productId)
            .then(() => { fetchCartList(dispatch) });
        dispatch(removeFromCart(productId));
    };

    const linkPage = (url) => {
        window.location.replace(window.location.origin + url);
    }
    const deleteHandler = (val) => {
        console.log(val)
        if (val) {
            props.setProductCart(deleteId, true);
        }
        setDeleteId(null)
    };

    return (
        <>
            {/* {deleteId && <DeleteConfirm setShowModal={(val) => deleteHandler(val)} message="Are You Sure.You want to delete ?" />} */}

            <div className="justify-center items-right flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto ml-auto mr-2 max-w-3xl" style={{ "marginTop": "80px" }}>
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-80 bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="relative p-1 flex-auto">
                            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                <div className="lg:col-span-9 md:col-span-9 sm:col-span-9 p-2 mt-1 text-sm font-semibold">
                                    {cartStore.length <= 0 ?
                                        <span className='text-sm text-[#FF0000] p-2'>Your Cart List is empty.</span>
                                        :
                                        cartStore.length + " Item added in your cart"
                                    }
                                </div>
                                <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 mr-2 text-xl font-semibold text-right cursor-pointer text-[#FF0000]" onClick={() => setShowModal(false)}><i className="fa fa-times-circle" aria-hidden="true"></i></div>
                                {cartStore.map(ele => <>
                                    <div className="lg:col-span-3 md:col-span-4 sm:col-span-4 m-1 mt-1"><img src={ele.attachment_url[0]} className="object-cover h-12 rounded-xl" /></div>
                                    <div className="lg:col-span-8 md:col-span-6 sm:col-span-6 m-1 mt-1">
                                        <div>{ele.name}</div>
                                        <span className="text-[#009898]">{ele.quantity} X ₹{ele.master_price} </span>
                                        <span className="text-[#999999] font-articulat font-light line-through">₹{ele.cost_price}</span>
                                    </div>
                                    <div className="lg:col-span-1 md:col-span-2 sm:col-span-2 mr-3 text-xl text-[#FF0000] font-semibold text-right cursor-pointer" onClick={() => handleRemoveFromCart(ele.id)}>x</div>
                                </>
                                )}
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            {cartStore.length !== 0 && <>  <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 mb-2 ml-1 font-semibold">  Total </div>
                                <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 mb-2 mr-2 text-right font-semibold">₹{cartStore.reduce((t, val) => t + (parseFloat(val.master_price) * val.quantity), 0)}</div>
                            </>}
                            <button
                                className="text-[#FF0000] border lg:col-span-6 md:col-span-6 sm:col-span-6 border bg-white font-bold px-6 py-2 text-sm rounded shadow hover:shadow-lg focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            {cartStore.length !== 0 &&
                                <button
                                    className="lg:col-span-6 md:col-span-6 sm:col-span-6 bg-[#009898] border-red text-white font-bold text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    onClick={() => linkPage('/checkout')}
                                >
                                    Goto Cart
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default CartList;
