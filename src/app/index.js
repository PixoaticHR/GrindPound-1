import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notification from '../components/Notification';
import Loader from "../components/Loader";
import { lazy } from 'react';
const PageNotFound = lazy(() => import('../view/private/PageNotFound'));
const Login = lazy(() => import('../view/public/Login'));
const HomePage = lazy(() => import('../view/public/Home'));
const Navbar = lazy(() => import('../navbar'));
const Footer = lazy(() => import('../footer'));
const Product = lazy(() => import('../view/private/Product'));
const ProductDetails = lazy(() => import('../view/private/Product/productDetails'));
const Profile = lazy(() => import('../view/private/Profile'));
const Checkout = lazy(() => import('../view/private/Checkout'));
const ProfileAccount = lazy(() => import('../view/private/ProfileAccount'));
const Shipping = lazy(() => import('../view/private/Shipping'));
const OrderReceived= lazy(() => import('../view/private/OrderReceived'));
const Nutrition= lazy(() => import('../view/public/Nutritionist'));
const Subscribe= lazy(() => import('../view/public/Subscribe'));
const OurStory= lazy(() => import('../view/public/OurStory'));
const OrderStatus= lazy(() => import('../view/public/OrderStatus'));
const DispatchDelivery= lazy(() => import('../view/public/DispatchDelivery'));
const FAQ= lazy(() => import('../view/public/FAQ'));
const ReferFriend = lazy(() => import('../view/public/ReferFriend'));
const Blog= lazy(() => import('../view/public/Blog'));
const BlogDetails= lazy(() => import('../view/public/Blog/blogView'));

const App = () => {

    return (
            <Router>
                <Navbar />
                <Notification />
                <Loader />
                <Routes >
                    <Route path='*' exact element={<PageNotFound />} />
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/home" exact element={<HomePage />} />
                    <Route path="/faq" exact element={<FAQ />} />
                    <Route path="/shipping" exact element={<Shipping />} />
                    <Route path="/product_details" exact element={<ProductDetails />} />
                    <Route path="/dispatch_delivery" exact element={<DispatchDelivery />} />
                    <Route path="/order_received" exact element={<OrderReceived />} />
                    <Route path="/our_story" exact element={<OurStory />} />
                    <Route path="/our_blogs" exact element={<Blog />} />
                    <Route path="/blog_details" exact element={<BlogDetails />} />
                    <Route path="/order_status" exact element={<OrderStatus />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/product" exact element={<Product />} />
                    <Route path="/profile" exact element={<Profile />} />
                    <Route path="/profile_account" exact element={<ProfileAccount />} />
                    <Route path="/checkout" exact element={<Checkout />} />
                    <Route path='/location' exact element={<PageNotFound />} />
                    <Route path='/cart' exact element={<PageNotFound />} />
                    <Route path='/search' exact element={<PageNotFound />} />
                    <Route path='/help' exact element={<PageNotFound />} />
                    <Route path='/nutritionist_consultation' exact element={<Nutrition />} />
                    <Route path='/Subscribe' exact element={<Subscribe />} />
                    <Route path='/refer_friend' exact element={<ReferFriend />} />
                    <Route path='/about' exact element={<PageNotFound />} />
                </Routes>
                <Footer />
            </Router>
    );
}

export default App;