import React from "react";
import { Tooltip } from "react-tooltip";

const TextInput = (props) => {

    const { showLabel, label, error, placeholder, errorMessage, type, defaultValue, maxlength, value, pattern } = props;

    const onChange = (data) => {
        if (data.target.validity.valid) {
            props.onChange && props.onChange(data);
        }
    };

    return (
        <div className="relative">
            <Tooltip anchorSelect=".error" place="top" >{errorMessage}</Tooltip>
            {showLabel && <label className="block font-bold tracking-wide text-sm ml-1 font-articulat" for={"grid-" + label}>
                {label}
            </label>
            }
            <input
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                type={type}
                pattern={pattern}
                maxlength={maxlength}
                placeholder={placeholder}
                className="focus:border-blue-500 p-1.5 w-full font-articulat placeholder-xs placeholder-thin"
            />
        </div>
    )
}

export default TextInput;
