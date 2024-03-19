import { useEffect, useState } from "react";
import HomeSubscribe from "./homeSubsrice";
import CarouselBaneer from "../../../components/carousel";
import C1 from "../../../images/c1.png";
import C2 from "../../../images/c2.png";
import C3 from "../../../images/c3.png";
import CarousalMulti from "./slider";
import { Tooltip } from "react-tooltip";
import { connect, useDispatch, useSelector } from 'react-redux';
import { getFilterProduct, getBaneerImg } from "../../../services/index";
import { notificationService } from '../../../services/notifications/notificationService';
import Popup from "../../private/Product/popup";
import { addAllItemsToCart, addToCart, removeFromCart } from "../../../reducers/cart/actions";
import { addItemsToCart, deleteCartItem, fetchCartProducts } from "../../../services/checkout";

export const fetchCartList = (dispatch) => {
    fetchCartProducts()
        .then((response) => {
            console.log('fetchCartList response ==> ', response?.cart_items);
            if (response?.cart_items) {
                let data = response?.cart_items.map(val => { return { ...val?.product, quantity: val?.quantity } });
                console.log('fetchCartList response data==> ', data);
                dispatch(addAllItemsToCart(data));
            };
        })
        .catch((error) => {
            console.log('error ==> ', error);
        });
};

const Home = (props) => {
    const [productList, setProductList] = useState([]);
    const [bannerList, setBannerList] = useState([]);
    const [promotionList, setPromotionList] = useState([]);
    const [advertiseList, setAdvertiseList] = useState([]);
    const dispatch = useDispatch();
    const cartStore = useSelector(state => state.cartReducer.cart);

    const [tab, setTab] = useState(0);
    const [addProduct, setAddProduct] = useState(null);

    const getProductList = (category) => {
        const payload = {
            keyword: "",
            subcategory_id: category
        };

        getFilterProduct(payload)
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj.data;
                    setProductList(data)
                    // notificationService.sendMessage({ type: "success", title: "Products List", text: "Products List get Successfully" })
                }
            })
            .catch((error) => {
                setProductList([])
                notificationService.sendMessage({ type: "error", title: "Products List", text: error.receiveObj.message })
            });
    };

    const getBannerList = () => {
        getBaneerImg()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj.banners;
                    const banner = data.filter(ele => ele.banner_type === 'banner');
                    const advertise = data.filter(ele => ele.banner_type === 'advertise');
                    const promotion = data.filter(ele => ele.banner_type === 'promotion');
                    setAdvertiseList(advertise);
                    setPromotionList(promotion);
                    setBannerList(banner);
                }
            })
            .catch((error) => {
                setBannerList([])
                setAdvertiseList([]);
                setPromotionList([]);
                notificationService.sendMessage({ type: "error", title: "Banner List", text: error.receiveObj.message })
            });
    };

    const setCartHandler = (val) => {
        const arr = productList.products;
        const index = arr.findIndex(ele => ele.id === val.id)
        arr.splice(index, 0, { ...val, cart: !arr[index].cart })
        arr.splice(index + 1, 1)
        props.setProductCart({ ...val, quantity: 1 }, !arr[index].cart);
        setAddProduct({ ...val, quantity: 1 }, !arr[index].cart);
        setTimeout(() => {
            setAddProduct(null);
            setProductList({ ...productList, products: arr })
        }, 2000);
    };

    const handleAddToCart = (product) => {
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

    const gotoProductDetails = (id, tab) => {
        window.location.replace((window.location.origin + ('/product_details?id=' + id + ",cat=" + tab)));
    };

    // const fetchCartList = () => {
    //     fetchCartProducts()
    //         .then((response) => {
    //             console.log('fetchCartList response ==> ', response?.cart_items);
    //             if (response?.cart_items) {
    //                 let data = response?.cart_items.map(val => { return { ...val?.product, quantity: val?.quantity } });
    //                 console.log('fetchCartList response data==> ', data);
    //                 dispatch(addAllItemsToCart(data));
    //             };
    //         })
    //         .catch((error) => {
    //             console.log('error ==> ', error);
    //         });
    // };

    useEffect(() => {
        getBannerList();
        getProductList("");
        fetchCartList(dispatch);
    }, []);

    console.log('productList?.products ==> ', productList);

    return (
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 mt-28">
            {addProduct && <Popup product={addProduct} />}
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-2">
                <CarouselBaneer data={bannerList} />
            </div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-12 text-center text-2xl p-2 font-articulat font-semibold">Shop By Category</div>

            <div className="lg:col-span-4 md:col-span-4 sm:col-span-2"></div>
            <ul className=" ml-24 flex flex-wrap -mb-px lg:col-span-8 md:col-span-8 sm:col-span-10 text-base font-articulat font-normal text-center mt-2 cursor-pointer">
                <li className="me-8" onClick={() => { getProductList(""); setTab(0) }}>
                    <a className={tab === 0 ? "inline-block p-1 border-b-4 border-[#009898] rounded-t-lg active dark:text-blue-500 dark:border-blue-500" :
                        "inline-block p-1 rounded-t-lg hover:text-[#009898] hover:border-[#009898] dark:hover:text-[#009898]"} aria-current="page">All</a>
                </li>
                {productList?.categories?.map((ele, i) =>
                    <li key={i} className="me-8" onClick={() => { getProductList(ele.id); setTab(i + 1) }}>
                        <a className={tab === i + 1 ? "inline-block p-1 border-b-4 border-[#009898] rounded-t-lg active dark:text-blue-500 dark:border-blue-500" :
                            "inline-block p-1 rounded-t-lg hover:text-[#009898] hover:border-[#009898] dark:hover:text-[#009898]"} aria-current="page"
                        >{ele.name}</a>
                    </li>
                )}
            </ul>
            <div className="lg:col-span-3 md:col-span-4 sm:col-span-12">
            </div>

            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-5">
                    {productList?.products?.map((ele, i) => {
                        let cartShow = cartStore.find(item => item.id === ele.id);
                        return (
                            <div key={ele.id} className="lg:col-span-3 md:col-span-6 sm:col-span-12 m-3">
                                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 rounded-xl inset-0 flex">
                                    <img src={ele.attachment_url[0]} className="w-full m-auto rounded-lg cursor-pointer" onClick={() => gotoProductDetails(ele.id, tab)} />
                                </div>
                                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-base font-articulat font-normal mt-2">{ele.name}</div>
                                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 divide-x ">
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
                                            <div className="text-right lg:col-span-3 md:col-span-3 sm:col-span-3" onClick={() => handleAddToCart(ele)}><span className={(!cartShow && "bg-[#009898] text-white") + " p-3 cart rounded-xl text-[#009898]"}><i className="fa fa-shopping-cart cursor-pointer" aria-hidden="true"></i></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-9"><hr /></div>
                </div>
            </div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-12 text-center text-2xl p-2 font-articulat font-semibold ">We’re solving the biggest problems</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-12">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 bg-black text-white divide-x">
                    <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-10">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 h-64 p-10">
                            <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 text-right mt-10">
                                <img src={C1} className="object-cover mt-1 h-16 cursor-pointer" />
                            </div>
                            <div className="lg:col-span-9 md:col-span-9 sm:col-span-8 text-left mt-10">
                                <div className="text-center text-lg font-articulat font-semibold ">Freshly Milled Grains</div>
                                <div className="text-center text-xs font-articulat font-semibold">We do not stock products in our warehouse.​ Every grain is freshly milled and delivered promptly to you to ensure peak quality</div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-5">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-10">
                            <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 text-right mt-16">
                                <img src={C2} className="object-cover mt-1 h-16 cursor-pointer" />
                            </div>
                            <div className="lg:col-span-9 md:col-span-9 sm:col-span-8 text-left mt-16">
                                <div className="text-center text-lg font-articulat font-semibold">Eco-friendly Packaging</div>
                                <div className="text-center text-xs font-articulat font-semibold ">Our pack is made of 100% biodegradable, enzyme based material. Making each order a bundle of goodness, both on the inside and out.</div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 p-5">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-10">
                            <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 text-right mt-16">
                                <img src={C3} className="object-cover h-16 cursor-pointer" />
                            </div>
                            <div className="lg:col-span-9 md:col-span-9 sm:col-span-8 text-left mt-16">
                                <div className="text-center text-lg font-articulat font-semibold">Customised Flours</div>
                                <div className="text-center text-xs font-articulat font-semibold ">Our products are made to order, which guarantees that your Floryo experience is going to be personalised like non other. Don’t be shy and state your preferences</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-12 text-center text-2xl p-2 font-articulat font-semibold ">Fresh Mill, delivered at your convenience</div>

                {promotionList.map((ele, i) => {
                    return (
                        <div key={i} className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-12" style={{ display: "flex", position: "relative", textAlign: "center", height: "521px" }}>
                            <img src={ele.image_url} className="w-full cursor-pointer" />
                            <span className="text-center text-xl  font-articulat">
                                <div className="" style={{ color: ele.text_color, display: "flex", position: "absolute", textAlign: "center", top: "12rem", left: "20rem", right: "20rem" }}>{ele.title}</div>
                                <span style={{ display: "flex", position: "absolute", textAlign: "center", top: "16rem", left: "40rem" }}>
                                    <button className="focus:outline-none text-white bg-[#009898] hover:bg-[#009898] mt-5 focus:ring-4 focus:ring-[#009898] font-medium rounded-lg text-sm px-5 py-2.5 p-3">Find Out More </button>
                                </span>
                            </span>
                        </div>
                    )
                })}
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-12 text-center text-2xl p-2 font-articulat font-semibold">Fresh Mill, delivered at your convenience</div>

                <CarousalMulti data={advertiseList} />

                <HomeSubscribe />
            </div>
        </div>
    );
}

export default Home;