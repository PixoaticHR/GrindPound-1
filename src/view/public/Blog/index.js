import { useEffect, useState } from "react";
import HomeSubscribe from "../Home/homeSubsrice";
import { getBlogList } from "../../../services/footer";
import { notificationService } from '../../../services/notifications/notificationService';
import { DateFormatter } from "../../../components/Shared/date_formatter";

const Blog = () => {
    const [blog, setBlog] = useState([]);

    const getBlog = () => {
        getBlogList()
            .then((response) => {
                if (response.success && response.receiveObj) {
                    const data = response.receiveObj;
                    setBlog(data)
                }
            })
            .catch((error) => {
                setBlog([]);
                notificationService.sendMessage({ type: "error", title: "Blog List", text: error.receiveObj.message })
            });
    }
    const redirectPage = (url) => {
        window.location.replace(window.location.origin + url);
    }
    useEffect(() => {
        getBlog();
    }, []);

    return (
        <>
            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-4 mt-32">
                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xl p-2 font-articulat font-semibold cursor-pointer">Blog</div>
                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 mt-2 font-articulat font-semibold cursor-pointer" onClick={()=>redirectPage('/home')}>Home / <span className="text-[#009898]">Blogs</span></div>
                    <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 mt-5">
                            {blog.map(ele=>
                                <div className="lg:col-span-4 md:col-span-6 sm:col-span-12 m-2 rounded-xl">
                                <img src={ele?.image?.url} className="w-full cursor-pointer" onClick={() =>redirectPage('/blog_details?id='+ele.id)} />
                                <div className="text-xs p-2 font-articulat font-semibold cursor-pointer">{ele.title}</div>
                                <div className="text-xs ml-2 font-articulat font-normal text-gray-500 cursor-pointer">{DateFormatter(ele.created_at, 'LL')}</div>
                            </div>
                                )}
                        </div>
                    </div>
            </div>
            <HomeSubscribe />
        </>
    )
}
export default Blog;