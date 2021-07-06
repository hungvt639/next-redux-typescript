import React, { useState } from "react";
type props = {
    refValue: React.MutableRefObject<string>;
    type?: string;
    className?: string;
    name?: string;
    placeholder?: string;
    autoComplete?: string;
};
const Input: React.FC<props> = (props: props) => {
    const [value, setValue] = useState<string>("");
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        props.refValue.current = e.target.value;
    }
    return (
        <input
            className={props.className}
            type={props.type ? props.type : "text"}
            name={props.name ? props.name : ""}
            placeholder={props.placeholder ? props.placeholder : ""}
            autoComplete={props.autoComplete ? props.autoComplete : "off"}
            value={value}
            onChange={(e) => onChange(e)}
        />
    );
};
export default Input;
