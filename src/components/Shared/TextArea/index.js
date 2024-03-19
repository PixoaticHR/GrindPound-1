import { Tooltip } from "react-tooltip";

const TextArea = (props) => {
  const { id, isRequired, placeholder, isLabelShow, showLabel, type, error, errorMessage, onChange, defaultValue } = props;

  return (
    <>
      <Tooltip anchorSelect=".error1" place="top" style={{ backgroundColor: "red", color: "#222" }} >{errorMessage}</Tooltip>
      {isLabelShow &&
        <label for={id} className="block mb-2 text-sm font-sm font-articulat font-semibold text-xs mt-2">{showLabel}</label>
      }
      <div className="relative w-full">
        <textarea
          value={defaultValue}
          onChange={onChange}
          type={type}
          id={id}
          rows="4"
          className={"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" + (error ? "border-red-200 error1" : "border-gray-200")}
          placeholder={placeholder}
          required={isRequired} />
      </div>
    </>
  );
}
export default TextArea;
