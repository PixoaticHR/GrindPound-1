import { Tooltip } from "react-tooltip";

const TextInput = (props) => {
  const { id, isRequired, placeholder, isLabelShow, showLabel, type, error, errorMessage, maxlength, pattern,value,disabled } = props;

  const onChange = (data) => {
    if (data.target.validity.valid) {
      props.onChange && props.onChange(data);
    }
  };

  return (
    <>
      <Tooltip anchorSelect=".error1" place="top" style={{ backgroundColor: "red", color: "#222" }} >{errorMessage}</Tooltip>
      {isLabelShow &&
        <label for={id} className="block mb-2 text-sm font-sm font-articulat font-semibold text-xs mt-2">{showLabel}</label>
      }
      <div className="w-full">
        <input
          value={value}
          disabled={disabled}
          onChange={onChange}
          type={type}
          id={id}
          pattern={pattern}
          maxlength={maxlength}
          className={"border border-[#FBF5F1] text-xs rounded-xl focus:ring-blue-500 font-articulat font-normal focus:border-blue-500 block w-full p-2.5  dark:bg-[#FBF5F1] dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + (error ? "border-red-200 error1" : "border-gray-200")}
          placeholder={placeholder}
          required={isRequired} />
      </div>
    </>
  );
}
export default TextInput;
