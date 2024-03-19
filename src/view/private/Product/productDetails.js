import { useState, useEffect, useMemo } from "react";
import { getProductDetails, checkAvailableZip } from "../../../services/index";
import Description from "./description";
import Reviews from "./reviews";
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from "react-tooltip";
import TextInput from "../../../components/Shared/TextInput";
import { notificationService } from '../../../services/notifications/notificationService';
import { useLocation } from 'react-router-dom';
import Popup from "./popup";
import { getFaq } from "../../../services/footer";
import { capitalizeWords } from "../../../services/utils/function";
import { fetchCartList } from "../../public/Home";
import { addToCart, removeFromCart, updateCartItem } from "../../../reducers/cart/actions";
import { addItemsToCart, deleteCartItem, updateCartProducts } from "../../../services/checkout";

const ProductDetails = (props) => {
    const { search } = useLocation();
    const queryParams = useMemo(() => search.substring(4, search.length), [search]);
    const queryData = queryParams?.split(",")
    let { id, category, subCategory } = "";

    if (queryData) {
        id = queryData[0];
        category = queryData[1]?.substring(4, queryData[1].length);
        subCategory = queryData[2]?.substring(4, queryData[2].length);
    };
    const [faq, setFaq] = useState([]);
    const [productDetail, setProductDetail] = useState(null);
    const [message, setMessage] = useState('');
    const [count, setCount] = useState(1);
    const [varient, setVarient] = useState(null);
    const [varientIndex, setVarientIndex] = useState(null);
    const [cost, setCost] = useState(null);
    const [disCost, setDisCost] = useState(null);
    const [addProduct, setAddProduct] = useState(false);

    const [tab, setTab] = useState(0);
    const [currentImg, setCurrentImg] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const [pinCode, setPinCode] = useState("");
    const [texture, setTexture] = useState(null);
    const [zipAvailability, setZipAvailability] = useState({ check: false, available: false });
    const dispatch = useDispatch();
    const cartStore = useSelector(state => state.cartReducer.cart);

    const getFaqList = () => {
        getFaq()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj;
                    setFaq(data)
                }
            })
            .catch((error) => {
                setFaq({});
                notificationService.sendMessage({ type: "error", title: "FAQ List", text: error.receiveObj.message })
            });
    };

    const getProductsList = (id) => {
        getProductDetails(id)
            .then((response) => {
                if (response.success && response.receiveObj) {
                    console.log('helllo ==> ', response);
                    const data = response.receiveObj;
                    setProductDetail(data);
                    setCost(data.product.master_price);
                    setDisCost(data.product.cost_price)
                    setVarient(data.product.net_wt + data.product.unit);
                    setVarientIndex({ price: data.product.master_price, unit: data.product.unit, net_wt: data.product.net_wt })
                    setCurrentImage(data.product.attachment_url[0])
                }
            })
            .catch((error) => {
                setProductDetail(null);
                notificationService.sendMessage({ type: "error", title: "Product Details", text: error.receiveObj.message })
            });
    };

    const checkPinHandler = () => {
        const regex = /[^0-9]/g;
        if (pinCode?.length !== 6 || regex?.test(pinCode)) {
            setMessage({ error: true, msg: 'Please enter a valid 6-digit PIN code number!' });
        } else {
            setMessage(null);
            const payload = {
                "id": id,
                "zip_code": pinCode
            };

            checkAvailableZip(payload)
                .then((response) => {
                    if (response.success && response.receiveObj) {
                        console.log('response.receiveObj zip==> ', response.receiveObj);
                        const data = response.receiveObj;
                        if (data.available) {
                            setMessage({ error: false, msg: "Delivery available | Free" });
                            setZipAvailability({ check: true, available: true });
                        } else {
                            setMessage({ error: false, msg: "We apologize, but we do not offer service in your area!" });
                            setZipAvailability({ check: true, available: false });
                        };
                    }
                })
                .catch((error) => {
                    console.log('checkAvailableZip ==> ', error);
                    if (!error?.success) {
                        setMessage({ error: true, msg: "We apologize, but we do not offer service in your area!" });
                        setZipAvailability({ check: true, available: false });
                    } else {
                        setMessage({ error: true, msg: "Something went wrong. Please try again!" });
                        setZipAvailability({ check: false, available: false });
                    };
                });
        }
    };

    const rating = (n = 0) => {
        const arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(i)
        }
        return arr;
    };

    const checkProductInCart = (id) => {
        const productInCart = cartStore.find(item => item.id === id);
        return productInCart;
    };

    const handleAddToCart = (product) => {
        console.log('product product ==> ', product);
        if (zipAvailability?.check && zipAvailability?.available) {
            setMessage(null);
            if (checkProductInCart(product?.id)) {
                deleteCartItem(product.id)
                    .then(() => { fetchCartList(dispatch) });
                dispatch(removeFromCart(product.id));
            } else {
                addItemsToCart({ "product_id": product.id, "quantity": count })
                    .then(() => { fetchCartList(dispatch) });
                dispatch(addToCart(product));
            };
        } else if (zipAvailability?.check == false) {
            setMessage({ error: true, msg: 'Please check pin code availability!' });
        } else if (zipAvailability?.check == true && zipAvailability?.available == false) {
            setMessage({ error: true, msg: "We apologize, but we do not offer service in your area!" });
        }
    };

    const handleRemoveFromCart = (val) => {
        setCount(val - 1);
        if (checkProductInCart(productDetail?.product?.id)) {
            deleteCartItem(productDetail?.product?.id)
                .then(() => { fetchCartList(dispatch) });
            dispatch(removeFromCart(productDetail?.product?.id));
        };
    };

    const handleUpdateCartItem = (val) => {
        setCount(val + 1);
        if (checkProductInCart(productDetail?.product?.id)) {
            updateCartProducts(productDetail?.product?.id, { "quantity": val }).then(() => { fetchCartList(dispatch) });
            dispatch(updateCartItem(productDetail?.product?.id, val));
        };
    };

    const linkPage = (url) => {
        window.location.replace(window.location.origin + url);
    };

    // const setCartHandler = (val) => {
    //     const arr = productDetail?.related_products;
    //     const index = arr.findIndex(ele => ele.id === val.id)
    //     arr.splice(index, 0, { ...val, cart: !arr[index].cart })
    //     arr.splice(index + 1, 1)
    //     props.setProductCart({ ...val, quantity: 1 }, !arr[index].cart);
    //     setAddProduct(true)
    //     setTimeout(() => {
    //         setAddProduct(false);
    //         setProductDetail({ ...productDetail, related_products: arr })
    //     }, 2000);
    // };

    const setCartHandler = (product) => {
        const productInCart = cartStore.find(item => item.id === product.id);
        if (productInCart) {
            deleteCartItem(product.id)
                .then(() => { fetchCartList(dispatch) });
            dispatch(removeFromCart(product.id));
        } else {
            addItemsToCart({ "product_id": product.id, "quantity": 1 })
                .then(() => { fetchCartList(dispatch) });
            dispatch(addToCart(product));
            setAddProduct(product);
            setTimeout(() => { setAddProduct(null) }, 2000);
        };
    };

    const current = (id) => {
        switch (id) {
            case "1":
                return "Fresh Milled"
            case "2":
                return "Powdered Spices"
            default:
                return "All"
        }
    };

    const gotoProductDetails = (id, tab, sub) => {
        linkPage('/product_details?id=' + id + ",cat=" + tab + ",sub=" + sub);
    };

    useEffect(() => {
        getProductsList(id);
        getFaqList();
    }, []);

    useEffect(() => {
        if (productDetail && checkProductInCart(productDetail?.product?.id)) {
            const obj = cartStore.find(element => element.id === productDetail?.product?.id);
            setCount(obj?.quantity);
        };
    }, [productDetail]);

    console.log('productDetail ==> ', productDetail)

    return (
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-2 mt-32">
            {addProduct && <Popup product={addProduct} />}
            {productDetail && (
                <>
                    <div className="lg:col-span-1 md:col-span-3 sm:col-span-6 mr-2">
                        {productDetail?.product?.attachment_url?.map((ele, i) =>
                            <img src={ele} className={(currentImg === i ? "border-[#009898] " : "") + " bg-[#FBF5F1] object-contain w-full h-28 border m-2 rounded-xl"} onClick={() => { setCurrentImage(ele); setCurrentImg(i) }} />
                        )}
                    </div>
                    <div className="lg:col-span-5 md:col-span-4 sm:col-span-6 mt-2 ml-5 mr-2 bg-[#FBF5F1] rounded-xl inset-0 flex pt-12 pb-12 h-auto mb-10">
                        <img src={currentImage} className="h-96 w-96 m-auto rounded-lg" />
                    </div>
                    <div className="lg:col-span-6 md:col-span-5 sm:col-span-12  m-2 ml-3">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                            {/* <div> */}
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm font-articulat font-semibold cursor-pointer">
                                <span onClick={() => linkPage("/home")}>Home  /  </span>
                                <span onClick={() => linkPage('/product?id=' + productDetail?.product?.category?.id)}>{productDetail?.product?.category?.name}  /  </span>
                                <span className="text-[#009898]">{productDetail?.product?.subcategory?.name}</span>
                            </div>
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-4 text-2xl font-articulat font-normal">
                                {capitalizeWords(productDetail?.product?.name)}
                            </div>
                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 mt-1 text-2xl font-articulat font-semibold ">
                                ₹{cost}  <span className="text-[#667479] font-normal line-through font-normal text-xl"> ₹{disCost}</span>
                            </div>
                            <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 mt-1 text-right">
                                {tab === 1 && <span className="text-xl font-articulat font-normal">{rating(productDetail?.product?.overall_average_rating).map(r => <i className="fa fa-star text-[#E9C400] " aria-hidden="true"></i>)}<span className="text-lg p-2 mb-2 font-base">&nbsp;&nbsp;{productDetail?.product?.overall_average_rating} (5 Reviews)</span></span>}
                            </div>
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-4 text-sm font-articulat font-normal">
                                {productDetail?.product?.description}
                            </div>

                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-5 text-sm font-articulat font-semibold">
                                Net wt:
                            </div>
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                    {productDetail?.product?.variants?.map(ele => (
                                        (ele.net_wt + ele.unit) != varient ?
                                            <button className="m-1 lg:col-span-2 md:col-span-4 sm:col-span-4 focus:outline-none focus:ring-[#009898] focus:ring-4 border border-['#FBF5F1'] rounded-lg hover:bg-[#009898] font-md text-sm px-4 py-2" onClick={() => { setVarient(ele.net_wt + ele.unit); setCost(ele.price); setDisCost(ele.discount_price); setVarientIndex(ele) }}>{ele.net_wt + ele.unit}</button>
                                            :
                                            <button className="m-1 lg:col-span-2 md:col-span-4 sm:col-span-4 focus:outline-none focus:ring-4 font-md rounded-lg text-sm px-4 py-2 text-white bg-[#009898] hover:bg-[#009898] focus:ring-4 focus:ring-[#009898] border" onClick={() => { setVarient(ele.net_wt + ele.unit); setCost(ele.price); setDisCost(ele.discount_price); setVarientIndex(ele) }}>{ele.net_wt + ele.unit}</button>
                                    ))}
                                </div>
                            </div>
                            {productDetail?.product?.is_texture &&
                                <>
                                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-sm font-articulat font-semibold">
                                        Texture:
                                    </div>
                                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-1">
                                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                            {productDetail?.product?.textures?.map(ele => (
                                                (texture?.name !== ele.name) ?
                                                    <button className="m-1 lg:col-span-3 md:col-span-4 sm:col-span-4 focus:outline-none focus:ring-[#009898] focus:ring-4 border border-['#FBF5F1'] rounded-lg hover:bg-[#009898] font-md text-sm px-4 py-2" onClick={() => setTexture(ele)}>{capitalizeWords(ele.name)}</button>
                                                    :
                                                    <button className="m-1 lg:col-span-3 md:col-span-4 sm:col-span-4 focus:outline-none focus:ring-4 font-md rounded-lg text-sm px-4 py-2 text-white bg-[#009898] hover:bg-[#009898] focus:ring-4 focus:ring-[#009898] border" onClick={() => setTexture(ele)}>{capitalizeWords(ele.name)}</button>
                                            )
                                            )}
                                        </div>
                                    </div>
                                </>
                            }
                            {/* </div> */}
                            {/* <div> */}
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-sm font-articulat font-semibold">
                                <i className="fa fa-location-dot fa-sm fa-fw" aria-hidden="true"></i>  Check pin code availability
                            </div>
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                    <div className="lg:col-span-9 md:col-span-8 sm:col-span-8 m-2">
                                        <TextInput
                                            onChange={(e) => { setPinCode(e.target.value); setMessage(null); setZipAvailability({ check: false, available: false }); }}
                                            value={pinCode}
                                            type="text"
                                            id="pin"
                                            pattern="[0-9]*"
                                            maxlength="6"
                                            errorMessage="Pin Code is Required."
                                            placeholder="Enter Pin Code"
                                            isLabelShow={false}
                                            showLabel="Pin Code"
                                            error={false}
                                        />
                                    </div>
                                    <button className="lg:col-span-3 m-2 md:col-span-4 sm:col-span-4 mt-1 text-center focus:outline-none text-white w-fulll bg-[#009898] hover:bg-[#009898] focus:ring-4 focus:ring-[#009898] font-medium rounded-lg text-sm p-2.5" onClick={() => checkPinHandler()}>Check</button>
                                </div>
                            </div>
                            {message &&
                                <div className={(message?.error === false ? "text-[#32CD32] " : "text-[#FF0000] ") + "lg:col-span-12 md:col-span-12 sm:col-span-12 ml-3 text-sm font-articulat font-normal mb-2"}>
                                    {message?.msg}
                                </div>
                            }
                            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-1">
                                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                    <div className="lg:col-span-4 md:col-span-4 sm:col-span-4">
                                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 text-center border border-[#FBF5F1] divide-x rounded-xl cursor-pointer">
                                            <span className={(count <= 1 ? "cursor-not-allowed " : "cursor-pointer ") + "m-1 lg:col-span-4 md:col-span-3 sm:col-span-3 focus:outline-none focus:ring-4 font-md text-sm px-5 py-2.5 p-1 focus:ring-[#009898]"} onClick={() => { count > 1 && handleRemoveFromCart(count) }}><i className="fa-solid fa-minus" aria-hidden="true"></i></span>
                                            <span className="m-1 lg:col-span-4 md:col-span-6 sm:col-span-6 focus:outline-none focus:ring-4 font-md text-sm px-5 py-2.5 p-1 text-center">{count}</span>
                                            <span className="m-1 lg:col-span-4 md:col-span-3 sm:col-span-3 focus:outline-none focus:ring-4 font-md text-sm px-5 py-2.5 p-1 text-white bg-[#009898] hover:bg-[#009898] focus:ring-4 focus:ring-[#009898]" onClick={() => { handleUpdateCartItem(count) }}><i className="fa-solid fa-plus" aria-hidden="true"></i></span>
                                        </div>
                                    </div>
                                    <button className="m-1 lg:col-span-8 md:col-span-8 sm:col-span-12 focus:outline-none focus:ring-4 font-md rounded-lg text-sm px-5 py-2.5 p-1 text-[#009898] border-[#009898] focus:ring-4 focus:ring-[#009898] border" onClick={() => handleAddToCart(productDetail?.product)}>{checkProductInCart(productDetail?.product?.id) ? "Remove Item" : 'Add To Cart'}</button>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </>
            )}
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 ml-2">
                <ul className="flex flex-wrap -mb-px lg:col-span-4 md:col-span-4 sm:col-span-12 text-sm font-articulat font-semibold cursor-pointer">
                    <li className="me-2" onClick={() => setTab(0)}>
                        <a className={tab === 0 ? "inline-block p-1 border-b-4 border-[#009898] rounded-t-lg active" :
                            "inline-block p-1 border-b-4 border-transparent rounded-t-lg hover:text-[#009898]"} aria-current="page">Description</a>
                    </li>
                    <li className="me-2" onClick={() => setTab(1)}>
                        <a className={tab === 1 ? "inline-block p-1 border-b-4 border-[#009898] rounded-t-lg active" :
                            "inline-block p-1 border-b-4 border-transparent rounded-t-lg hover:text-[#009898]"} aria-current="page">Reviews</a>
                    </li>
                </ul>
                <span className="text-[#FBF5F1]"><hr /></span>
            </div>

            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-5 ml-2">
                {tab === 0 ? <Description faq={faq} description={productDetail?.product?.product_properties} /> : <Reviews reviews={productDetail?.product?.reviews} productId={id} refresh={() => { getProductsList(id); setTab(1); }} />}
            </div>

            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-1 text-lg p-2 font-articulat font-semibold text-center">You May Also Like</div>
            {productDetail?.related_products?.map(ele => {
                let cartShow = cartStore.find(item => item.id === ele.id);
                return (
                    <div className="lg:col-span-3 md:col-span-6 sm:col-span-12 m-3">
                        <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 rounded-xl inset-0 flex">
                            <img src={ele.attachment_url[0]} className="w-full m-auto rounded-lg cursor-pointer" onClick={() => gotoProductDetails(ele.id, category, subCategory)} />
                        </div>
                        <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-base font-articulat font-normal mt-2 cursor-pointer">{ele.name}</div>
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 divide-x cursor-pointer">
                            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 text-left">
                                <span className="text-[#999999] text-xs font-articulat font-normal">Net wt. : </span>
                                <span className=" text-xs font-articulat font-semibold">{ele.net_wt + ele.unit}</span>
                            </div>
                            <div className="lg:col-span-8 md:col-span-4 sm:col-span-4">
                                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                                    <div className="lg:col-span-9 md:col-span-9 sm:col-span-9 text-center">
                                        <span className="text-[#667479] text-xs font-articulat font-normal">MRP : </span>
                                        <span className=" text-xs font-articulat font-semibold">₹{ele.master_price}</span>
                                        <span className="text-[#999999] text-xs font-articulat font-light line-through"> ₹{ele.cost_price}</span>
                                    </div>
                                    <Tooltip anchorSelect=".cart" place="left" style={{ backgroundColor: "#FBF5F1", color: "#222" }} >Add to cart</Tooltip>
                                    <div className="text-right lg:col-span-3 md:col-span-3 sm:col-span-3"><span className={(!cartShow && "bg-[#009898] text-white") + " p-3 rounded-xl cart text-[#009898]"}><i className="fa fa-shopping-cart cursor-pointer" aria-hidden="true" onClick={() => setCartHandler(ele)}></i></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <br />
            <br />
        </div>
    )
}

export default ProductDetails;