import { Tooltip } from "react-tooltip";

const TextInputWithRightIcon = (props) => {
  const { id, isRequired, placeholder, isLabelShow, showLabel, icon, type, defaultValue, onChange, error, errorMessage ,maxlength} = props;

  return (
    <>
      <Tooltip anchorSelect=".error" place="top" style={{ backgroundColor: "#D9D9D9", color: "#222" }} >{errorMessage}</Tooltip>
      {isLabelShow &&
        <label for={id} className="block mb-2 text-sm font-sm font-articulat font-semibold text-xs mt-2">{showLabel}</label>
      }
      <div className="relative w-full">
        <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
        {icon}
          </div>
        <input
          onChange={onChange}
          value={defaultValue}
          type={type}
          maxlength={maxlength}
          id={id}
          className={"border text-xs rounded-xl focus:ring-blue-500 font-articulat font-normal focus:border-blue-500 block w-full ps-1 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + (error ? "border-red-200 error" : "border-gray-200")}
          placeholder={placeholder}
          required={isRequired} />
      </div>
    </>
  );
}
export default TextInputWithRightIcon; 