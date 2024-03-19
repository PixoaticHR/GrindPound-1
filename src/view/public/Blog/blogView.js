import { useEffect, useState, useMemo } from "react";
import { useLocation } from 'react-router-dom';
import HomeSubscribe from "../Home/homeSubsrice";
import { getBlogShow } from "../../../services/footer";
import { notificationService } from '../../../services/notifications/notificationService';
import { DateFormatter } from "../../../components/Shared/date_formatter";

const BlogDetails = () => {
    const { search } = useLocation();
    const queryParams = useMemo(() => search.substring(4, search.length), [search]);

    const [blog, setBlog] = useState({});

    const getBlog = (id) => {
        getBlogShow(id)
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj;
                    setBlog(data)
                }
            })
            .catch((error) => {
                setBlog({});
                notificationService.sendMessage({ type: "error", title: "Blog Details", text: error.receiveObj.message })
            });
    }
    const redirectPage = (url) => {
        window.location.replace(window.location.origin + url);
    }
    useEffect(() => {
        getBlog(queryParams);
    }, []);
    return (
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-4 mt-32">
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-2xl p-2 mt-4 font-articulat font-semibold">Blog Detail</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2  font-articulat font-normal cursor-pointer" onClick={() => redirectPage('/home')}>Home / <span className="text-[#009898]">Blog Detail</span></div>
            <div className="lg:col-span-9 md:col-span-8 sm:col-span-12 p-2 mt-4">
                <img src={blog?.image?.url} className="cursor-pointer mt-2 rounded-xl w-full h-auto" />
                <div className="text-2xl font-articulat font-semibold mt-5">{blog.title}</div>
                <div className=" text-xs font-articulat font-light text-gray-500 mt-5">{DateFormatter(blog.created_at, 'LL')}</div>
                <div className=" text-sm font-articulat font-normal mt-5">{blog.description}</div>
            </div>
            <div className="lg:col-span-3 md:col-span-4 sm:col-span-12 p-2 mt-5 ml-2">
                <div className="text-sm font-articulat font-semibold underline">Recent Blogs</div>
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 mt-4">
                    <img src={blog?.image?.url} className="cursor-pointer mt-2 rounded-xl h-28 lg:col-span-4 md:col-span-5 sm:col-span-5" />
                    <span className="lg:col-span-8 md:col-span-7 sm:col-span-7 ml-4">
                        <div className="text-sm font-articulat font-semibold mt-2">{blog.title}</div>
                        <div className=" text-xs font-articulat font-light text-gray-500 mt-2">{DateFormatter(blog.created_at, 'LL')}</div>
                    </span>

                    <img src={blog?.image?.url} className="cursor-pointer mt-3 rounded-xl h-28 lg:col-span-4 md:col-span-5 sm:col-span-5" />
                    <span className="lg:col-span-8 md:col-span-7 sm:col-span-7 ml-4">
                        <div className="text-sm font-articulat font-semibold mt-2">{blog.title}</div>
                        <div className=" text-xs font-articulat font-light text-gray-500 mt-2">{DateFormatter(blog.created_at, 'LL')}</div>
                    </span>

                    <img src={blog?.image?.url} className="cursor-pointer mt-3 rounded-xl h-28 lg:col-span-4 md:col-span-5 sm:col-span-5" />
                    <span className="lg:col-span-8 md:col-span-7 sm:col-span-7 ml-4">
                        <div className="text-sm font-articulat font-semibold mt-2">{blog.title}</div>
                        <div className=" text-xs font-articulat font-light text-gray-500 mt-2">{DateFormatter(blog.created_at, 'LL')}</div>
                    </span>

                    <img src={blog?.image?.url} className="cursor-pointer mt-3 rounded-xl h-28 lg:col-span-4 md:col-span-5 sm:col-span-5" />
                    <span className="lg:col-span-8 md:col-span-7 sm:col-span-7 ml-4">
                        <div className="text-sm font-articulat font-semibold mt-2">{blog.title}</div>
                        <div className=" text-xs font-articulat font-light text-gray-500 mt-2">{DateFormatter(blog.created_at, 'LL')}</div>
                    </span>
                </div>
            </div>
            <div className="mt-9"></div>
        </div>
    )
}
export default BlogDetails;