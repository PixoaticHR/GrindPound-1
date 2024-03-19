import { useMemo } from "react";
import HomeSubscribe from "../Home/homeSubsrice";

const DispatchDelivery = () => {
    const list = useMemo(
        () => [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Nullam efficitur massa vitae commodo auctor",
            "Pellentesque ornare ex in est scelerisque consectetur",
            "Duis ultricies ex ut vehicula luctus.",
            "Cras a turpis in enim tempor tempor at tempus arcu.",
            "Vestibulum vitae eros sit amet leo semper auctor a et risus.",
            "Vestibulum blandit metus porttitor nibh sagittis ultricies",
            "Ut cursus justo id ultrices egestas.",
            "Sed in dolor eget ex sollicitudin gravida vitae at urna.",
            "Vivamus ac nulla vestibulum, lobortis est eu, scelerisque felis.",
            "Sed gravida metus sit amet magna mattis, id aliquet felis volutpat.",
            "Sed pretium sem at metus dictum, quis vehicula dolor ultricies.",
            "Morbi non dolor imperdiet, volutpat metus eu, porttitor ipsum.",
            "Integer molestie elit ac augue sollicitudin ullamcorper.",
            "Nullam et erat in libero laoreet efficitur."
        ]);
    return (<>
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-4 mt-2 mt-28">
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xl p-2 font-articulat font-semibold">Dispatch and Delivery</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 font-articulat font-semibold mt-3 text-[#999999]">Effective as of 1 January 2024</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-xl p-2 font-articulat font-normal mt-3">Policy basics</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 font-articulat font-semibold mt-2">Returns</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 font-articulat font-normal">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br /><br />
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.<br /><br />
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</div>

            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 font-articulat font-semibold mt-2">How to initiate a return</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 font-articulat font-normal">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br /><br />
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.<br /><br />
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</div>

            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 font-articulat font-semibold mt-2">Return Eligibility</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 font-articulat font-normal">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</div>

            {list.map(ele =>
                <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm font-articulat font-normal ml-5"><i className="fa fa-circle" aria-hidden="true" style={{ fontSize: "5px" }}></i>  {ele}</div>
            )}

            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 font-articulat font-semibold mt-3">How to initiate a return</div>
            <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 text-sm p-2 font-articulat font-normal">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br /><br />
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.<br /><br />
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</div>
        </div>
        <HomeSubscribe />
        </>
    )
}
export default DispatchDelivery;