import { useState } from "react";
import { capitalizeWords } from "../../../services/utils/function";

const Description = (props) => {
    const [coll, setColl] = useState({});
    return (
        <>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3 text-xs font-articulat font-normal text-semibold">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. took a galley of type and scrambled it to make a type specimen book.
            </div>
            {props.description?.map(ele =>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-3">
                    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                        <div className="lg:col-span-2 md:col-span-3 sm:col-span-4 text-xs font-articulat font-normal text-semibold"><i className="fa fa-circle" aria-hidden="true" style={{ fontSize: "6px" }}></i>&nbsp;&nbsp;{ele.name}</div>
                        <div className="lg:col-span-10 md:col-span-9 sm:col-span-8 text-xs font-articulat font-normal text-semibold">{capitalizeWords(ele.value)}</div>
                    </div>
                </div>
            )}
            <br />
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 mt-1 text-lg font-articulat font-semibold text-center">FAQ</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12">
                {props.faq?.map((ele,i)=>
                <div className="p-3 mt-3 font-articulat bg-[#FBF5F1] rounded-xl" onClick={() => setColl({ ...coll, [ele.question]: !(coll[ele.question]) })}>
                    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12">
                        <div className="lg:col-span-11 md:col-span-10 sm:col-span-9 text-sm font-semibold">{ele.question}</div>
                        <div className="lg:col-span-1 md:col-span-2 sm:col-span-3 text-right text-lg font-semibold"><i className={((coll[ele.question]) ? "fa-chevron-down" : "fa-chevron-right") + " fa cursor-pointer"} aria-hidden="true"></i></div>
                        {coll[ele.question] &&
                            <div className="lg:col-span-11 md:col-span-10 sm:col-span-9 text-xs mt-2 font-normal">{ele.answer}</div>
                        }
                    </div>
                </div>
                )}
            </div>
        </>
    )
}
export default Description;