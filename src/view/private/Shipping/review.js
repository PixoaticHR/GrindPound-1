import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartItem } from '../../../reducers/cart/actions';
import { deleteCartItem, updateCartProducts } from '../../../services/checkout';
import { fetchCartList } from '../../public/Home';

const Review = (props) => {
    const cartStore = useSelector(state => state.cartReducer.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id) => {
        deleteCartItem(id);
        dispatch(removeFromCart(id));
    };

    const handleUpdateCartItem = (productId, quantity) => {
        updateCartProducts(productId, { "quantity": quantity });
        dispatch(updateCartItem(productId, quantity));
    };

    const linkPage = (url) => {
        window.location.replace(window.location.origin + url);
    };

    return (<>
        <div className="grid lg:grid-col-12 md:grid-col-12 sm:grid-col-12">
            <div className='text-lg font-articulat font-semibold mt-3 lg:col-span-12 md:col-span-12 sm:col-span-12'>{!props?.order && "Product List :"}</div>
            <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 mt-2 text-sm font-articulat font-semibold bg-[#FBF5F1] p-2">Product</div>
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 mt-2 text-sm font-articulat font-semibold bg-[#FBF5F1] p-2">Qty</div>
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 mt-2 text-sm font-articulat font-semibold bg-[#FBF5F1] p-2">Subotal</div>

            {cartStore.map(ele => {
                console.log('ele ==> ', ele);
                return <>
                    <div className="lg:col-span-1 md:col-span-2 sm:col-span-2 mt-5 text-xs font-articulat font-normal">
                        <img src={ele.attachment_url[0]} className="object-cover rounded-full h-12 " />
                    </div>
                    <div className="lg:col-span-5 md:col-span-4 sm:col-span-4 mt-5 text-xs font-articulat font-normal ml-3 display: grid"><span>{ele.name}</span><span>{ele.net_wt + ele.unit}</span></div>

                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 mt-5 text-xs font-articulat font-normal ml-3">
                        {props?.order ? (
                            <span style={{ padding: '10px' }}>{ele?.quantity}</span>
                        ) : (
                            <span style={{ border: "1px solid #000", borderRadius: "3px", padding: "5px 7px" }}>
                                <button onClick={() => {
                                    if (ele?.quantity == 1) {
                                        handleRemoveFromCart(ele?.id);
                                        linkPage('/home');
                                    } else {
                                        handleUpdateCartItem(ele?.id, (ele?.quantity - 1))
                                    };
                                }} style={{ lineHeight: "0px", fontSize: "25px", verticalAlign: "sub" }}>-</button>
                                <span style={{ padding: '10px' }}>{ele?.quantity}</span>
                                <button onClick={() => handleUpdateCartItem(ele?.id, (ele?.quantity + 1))} style={{ lineHeight: "0px", fontSize: "18px" }}>+</button>
                            </span>
                        )}
                    </div>
                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 mt-5 text-xs font-articulat font-normal ml-3">₹{ele.quantity * parseFloat(ele.master_price)}</div>
                </>
            })}
            {/* {!props.order && <>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-lg font-articulat font-semibold p-2">Payment Option:</div>
                <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-sm font-articulat font-semibold bg-[#FBF5F1] p-2">Credit Card</div>
                <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 text-xs font-articulat font-normal bg-[#FBF5F1] p-2 text-right">**** **** **** 7290</div>
            </>} */}
            {/* <button className={ "bg-[#009898] m-1 mt-10 text-white rounded text-sm p-3 font-articulat font-semibold text-center cursor-pointer lg:col-span-4 md:col-span-4 sm:col-span-4 focus:ring-blue-200 dark:focus:ring-[#009898] dark:ring-offset-blue-800 focus:ring-2 dark:bg-blue-700 dark:border-blue-600"} >Proceed to Payment</button> */}
        </div>
    </>)
};

export default Review;

