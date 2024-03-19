import { useEffect, useMemo, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Tooltip } from "react-tooltip";
import CarouselBaneer from "../../../components/carousel";
import { getProduct, getBaneerImg } from "../../../services/index";
import { notificationService } from '../../../services/notifications/notificationService';
import Popup from "../../private/Product/popup";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, deleteCartItem } from "../../../services/checkout";
import { fetchCartList } from "../../public/Home";
import { addToCart, removeFromCart } from "../../../reducers/cart/actions";

const Product = () => {
    const { search } = useLocation();
    const queryParams = useMemo(() => search.substring(4, search.length), [search]);
    const [bannerList, setBannerList] = useState([]);
    const [productList, setProductList] = useState({});
    const [showAll, setShowAll] = useState(false);
    const [showProduct, setShowProduct] = useState([]);
    const [currentSub, setCurrentSub] = useState(queryParams);
    const [currentSubName, setCurrentSubName] = useState("All");
    const [addProduct, setAddProduct] = useState(null);
    const dispatch = useDispatch();
    const cartStore = useSelector(state => state.cartReducer.cart);

    const setSearchHandler = (id) => {
        const payload = {
            "keyword": "",
            "subcategory_id": id,
            "min_price": "",
            "max_price": "",
            "net_wt_unit": ""
        }
        setCurrentSub(id);
        getProductsList(payload);
    };

    const getBannerList = () => {
        getBaneerImg()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj.banners;
                    const banner = data.filter(ele => ele.banner_type === 'banner');
                    setBannerList(banner)
                }
            })
            .catch((error) => {
                setBannerList([])
                notificationService.sendMessage({ type: "error", title: "Banner List", text: error.receiveObj.message })
            });
    };

    const getProductsList = (payload) => {
        getProduct(payload)
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj;
                    const orgData = data.products;
                    if (orgData.length < 15) {
                        setShowProduct(orgData)
                        setShowAll(false)
                    } else {
                        const slicedArray = orgData.slice(0, 15);
                        setShowProduct(slicedArray)
                        setShowAll(true)
                    }
                    setProductList({ ...data, products: orgData })
                }
            })
            .catch((error) => {
                setProductList([])
                notificationService.sendMessage({ type: "error", title: "Product List", text: error.receiveObj.message })
            });
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
    }

    const setCartHandler = (val) => {
        const arr = productList?.products;
        const index = arr.findIndex(ele => ele.id === val.id)
        arr.splice(index, 0, { ...val, cart: !arr[index].cart })
        arr.splice(index + 1, 1)
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


    const showImgHandler = () => {
        setShowProduct(productList?.products)
        setShowAll(false)
    }
    const linkPage = (url) => {
        window.location.replace(window.location.origin + url);
    }
    const gotoProductDetails = (id, tab, sub) => {
        linkPage('/product_details?id=' + id + ",cat=" + tab + ",sub=" + sub);
    };

    useEffect(() => {
        const payload = {
            "keyword": "",
            "subcategory_id": queryParams == 0 ? "" : queryParams,
            "min_price": "",
            "max_price": "",
            "net_wt_unit": ""
        };
        getBannerList();
        getProductsList(payload);
    }, []);

    return (
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 mt-32">
            {addProduct && <Popup product={addProduct} />}
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-2">
                <CarouselBaneer data={bannerList} />
            </div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 mt-2 ml-3 font-articulat font-normal cursor-pointer">
                <span onClick={() => linkPage("/home")}>Home &nbsp; / &nbsp; </span>
                <span>{current(queryParams)} &nbsp; / &nbsp; </span>
                <span className="text-[#005956]">{currentSubName}</span>
            </div>
            <div className="lg:col-span-2 md:col-span-4 sm:col-span-6 p-2 ml-3">
                <span className="text-base font-articulat font-semibold mt-2 cursor-pointer">Catagories</span><br />
                <div className={"text-sm font-articulat font-medium mt-3 cursor-pointer" + (currentSub == 0 ? " text-[#005956]" : "")} onClick={() => { setCurrentSubName("All"); setSearchHandler("") }}>All</div>
                {productList?.subcategories?.map(ele =>
                    <div className={"text-sm font-articulat font-medium mt-2 cursor-pointer" + (currentSub == ele.id ? " text-[#005956]" : "")} onClick={() => { setCurrentSubName(ele.name); setSearchHandler(ele.id) }}>{ele.name}</div>
                )}
            </div>
            <div className="lg:col-span-10 md:col-span-8 sm:col-span-6 p-2 ml-3">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                    {productList?.products?.map((ele, i) => {
                        let cartShow = cartStore.find(item => item.id === ele.id);
                        return (
                            <div className="lg:col-span-4 md:col-span-6 sm:col-span-12 m-3">
                                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 rounded-xl inset-0 flex">
                                    <img src={ele.attachment_url[0]} className="w-full m-auto rounded-lg cursor-pointer" onClick={() => gotoProductDetails(ele.id, currentSub, currentSubName)} />
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
                                            <div className="text-right lg:col-span-3 md:col-span-3 sm:col-span-3"><span className={(!cartShow && "bg-[#009898] text-white") + " p-3 rounded-xl text-[#005956] cart"}><i className="fa fa-shopping-cart cursor-pointer" aria-hidden="true" onClick={() => handleAddToCart(ele)}></i></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {showAll &&
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-center mb-5">
                    <button className="focus:outline-none text-white bg-[#009898] hover:bg-[#009898] mt-5 focus:ring-4 focus:ring-[#005956] font-medium rounded-lg text-sm px-5 py-2.5 p-3" onClick={() => showImgHandler(showAll)}>Show More</button>
                </div>
            }
        </div>
    );
}


export default Product;