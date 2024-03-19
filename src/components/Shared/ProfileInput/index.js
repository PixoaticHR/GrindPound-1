const ProfileInput = (props) => {
    return (
        <div className="text-center p-2 m-2 text-xs font-articulat font-normal text-white bg-gray-400 h-16 w-16 cursor-pointer border border-[#FBF5F1]" style={{ "borderRadius": "100%" }}>
            <input
                type="file"
                id="exampleInput"
                style={{ "display": "none" }}
                disabled={props.disabled}
                accept=".png,.jpg,.jpeg,.gif"
                onChange={props.onChange}
            />
            <label htmlFor="exampleInput" className="w-full h-full flex items-center justify-center">
                {props.defaultValue ? (
                    <img
                        src={typeof props.defaultValue === 'string' ? props.defaultValue : URL.createObjectURL(props.defaultValue)}
                        alt="Profile"
                        className="object-cover h-full w-full cursor-pointer"
                        style={{ "borderRadius": "100%" }}
                    />
                ) : (
                    <>
                        <i className="fa fa-camera" aria-hidden="true"></i><br />
                        Upload Image
                    </>
                )}
            </label>
        </div>
    );
}

export default ProfileInput;
