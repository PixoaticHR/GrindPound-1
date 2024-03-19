import { Tooltip } from "react-tooltip";

const TextInputWithIcon = (props) => {
  const { id, isRequired, placeholder, isLabelShow, showLabel, icon, type, defaultValue, error, errorMessage, maxlength, pattern,disabled } = props;
  
  const onChange = (data) => {
    if (data.target.validity.valid) {
      props.onChange && props.onChange(data);
    }
  };
  return (
    <>
      <Tooltip anchorSelect=".error" place="top" style={{ backgroundColor: "#D9D9D9", color: "#222" }} >{errorMessage}</Tooltip>
      {isLabelShow &&
        <label for={id} className="block mb-2 text-sm font-sm font-articulat font-semibold text-xs mt-2">{showLabel}</label>
      }
      <div className="relative w-full ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none font-articulat font-semibold text-sm">
          {icon}
        </div>
        <input
          onChange={onChange}
          value={defaultValue}
          disabled={disabled}
          type={type}
          id={id}
          pattern={pattern}
          maxlength={maxlength}
          className={"border text-xs rounded-xl focus:ring-blue-500 font-articulat font-normal focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-bg-[#FBF5F1] dark:border-bg-[#FBF5F1] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + (error ? "border-red-200 error" : "border-gray-200")}
          placeholder={placeholder}
          required={isRequired} />
      </div>
    </>
  );
}
export default TextInputWithIcon; 