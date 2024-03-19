import Logo from "../images/logo.png";
import { useLocation } from 'react-router-dom';
import { Tooltip } from "react-tooltip";
import IsCart from "../images/IsCart.png";
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from "react";
import CartList from "../view/public/CartList";

const Nav = (props) => {
  const { search } = useLocation();
  const [current, setCurrent] = useState(null);
  console.log(current == 0)
  const queryParams = useMemo(() => search.substring(4, search.length), [search]);
  const [showCart, setShowCart] = useState(false);
  const [auth, setAuth] = useState(false);
  const cart = useSelector(state => state.cartReducer.cart);
  console.log('cart ==> ', cart);

  const linkPage = (url) => {
    window.location.replace(window.location.origin + url);
  }

  const productHandler = (id) => {
    window.location.replace(window.location.origin + '/product?id=' + id);
  }

  const currentPage = (val) => {
    if (val) {
      setCurrent(val.substring(0, 1))
    }
  }

  useEffect(() => {
    currentPage(queryParams)
    var token = localStorage.getItem('token');
    if (token?.length > 0) {
      setAuth(!auth);
    }
  }, []);


  return (
    <>
      <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
        <div className="lg:col-span-4 md:col-span-4 ml-5 mt-1 sm:col-span-12">
          <img src={Logo} className="object-cover mt-1 cursor-pointer" onClick={() => linkPage("/home")} />
        </div>
        <div className={(current == 0 && "text-[#009898] ") + "text-[#000000] lg:col-span-1 md:col-span-1 sm:col-span-4 text-base font-articulat font-medium inline-block p-1 rounded-t-lg hover:text-[#009898] hover:border-[#009898] dark:hover:text-[#009898] lg:text-center md:text-center sm:text-left mt-7 inline-block p-1 cursor-pointer"} onClick={() => productHandler(0)}>Shop All</div>
        <div className={(current == 1 && "text-[#009898] ") + "text-[#000000] lg:col-span-1 md:col-span-1 sm:col-span-4 text-base font-articulat font-medium inline-block p-1 rounded-t-lg hover:text-[#009898] hover:border-[#009898] dark:hover:text-[#009898] lg:text-center md:text-center sm:text-left mt-7 inline-block p-1 cursor-pointer"} onClick={() => productHandler(1)}>Fresh Milled</div>
        <div className={(current == 2 && "text-[#009898] ") + "text-[#000000] lg:col-span-2 md:col-span-2 sm:col-span-4 text-base font-articulat font-medium inline-block p-1 rounded-t-lg hover:text-[#009898] hover:border-[#009898] dark:hover:text-[#009898] text-left lg:ml-5 mt-7 inline-block p-1 cursor-pointer"} onClick={() => productHandler(2)}>Powdered Spices</div>
        <div className="lg:col-span-4 md:col-span-4 sm:col-span-12 lg:text-right md:text-right sm:text-left mt-7 cursor-pointer">
          <Tooltip anchorSelect=".location" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }} >Location</Tooltip>
          <Tooltip anchorSelect=".search" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }} >Search</Tooltip>
          <Tooltip anchorSelect=".login" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }} >{auth ? "Profile" : "Login"}</Tooltip>
          <Tooltip anchorSelect=".carts" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }} >Go To cart</Tooltip>

          <span className="m-4 p-1 text-xl" onClick={() => linkPage("/location")}><i className="fa fa-location-dot location fa-sm fa-fw" aria-hidden="true"></i></span>
          <span className="m-4 p-1 text-xl" onClick={() => linkPage("/search")}><i className="fa fa-search search fa-sm fa-fw" aria-hidden="true"></i></span>
          <span className="m-4 p-1 text-xl" onClick={() => linkPage(auth ? "/profile_account" : "/login")}><i className="fa-regular fa-user fa-sm fa-fw login" aria-hidden="true"></i></span>
          <span className="m-4 p-1 text-xl" onClick={() => setShowCart(true)}><i className="fa fa-shopping-cart carts fa-sm fa-fw" aria-hidden="true">{cart.length > 0 && <img src={IsCart} className="ml-2" />}</i></span>
        </div>
      </div>
      {showCart &&
        <CartList cartList={cart} setShowModal={(v) => setShowCart(v)} />
      }
    </>
  );
}

export default Nav;
