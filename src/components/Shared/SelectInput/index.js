
import React from "react";
import { Tooltip } from "react-tooltip";

const SelectInput = (props) => {

  const { showLabel, id, name, placeholder, isLabelShow, value, options, error, errorMessage,defaultValue,disabled } = props;

  const onChange = (data) => {
    props.onChange && props.onChange(data);
  };

  return (
    <>
      <Tooltip anchorSelect=".error" place="top" style={{ backgroundColor: "#D9D9D9", color: "#222" }} >{errorMessage}</Tooltip>
      {isLabelShow &&
        <label for={id} className="block mb-2 text-sm font-sm font-articulat font-semibold text-xs mt-2">{showLabel}</label>
      }
      <div className="w-full">
        <select
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          id={id}
          name={name}
          onChange={onChange}
          className={"border border-[#FBF5F1] text-xs rounded-xl focus:ring-blue-500 font-articulat font-normal focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + (error ? "border-red-200 error" : "border-gray-200")}
        >
          {options.map((ele) => (
              <option key={ele} value={ele} selected={defaultValue === ele}>
                {ele}
              </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default SelectInput;
