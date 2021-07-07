import React, { Fragment, useState, useEffect, useMemo } from "react";

type props = {
    refValue: React.MutableRefObject<string>;
    type?: string;
    className?: string;
    name?: string;
    placeholder?: string;
    autoComplete?: string;
    required?: boolean | string;
    firstSubmit?: boolean;
    // defaultValue?: string
    validate?: (data: string) => { value: boolean; message: string };
};

const Input: React.FC<props> = (props: props) => {
    // console.log("p", props.refValue);
    // const [isRequired, setIsRequired] = useState(false);
    const [firstShow, setFirstShow] = useState(false);
    // console.log("valuess", props.refValue.current);

    const [value, setValue] = useState<string>(props.refValue.current);
    useEffect(() => {
        setFirstShow(!!props.firstSubmit);
    }, [props.firstSubmit]);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        setFirstShow(true);
        props.refValue.current = e.target.value;
        // props.refValue.current.required = !e.target.value;
        // setIsRequired(!e.target.value);
    }
    const validateF = props.validate
        ? props.validate(value)
        : { value: false, message: "" };

    return (
        <div>
            <input
                className={props.className}
                type={props.type ? props.type : "text"}
                name={props.name ? props.name : ""}
                placeholder={props.placeholder ? props.placeholder : ""}
                autoComplete={props.autoComplete ? props.autoComplete : "off"}
                value={value}
                onChange={(e) => onChange(e)}
            />
            {props.required && !props.refValue.current && firstShow ? (
                <p className="form-mess-err">
                    {typeof props.required === "string"
                        ? props.required
                        : `${
                              props.name ? props.name : "Trường này"
                          } không được để trống`}
                </p>
            ) : (
                <Fragment />
            )}
            {validateF.value && firstShow ? (
                <p className="form-mess-err">{validateF.message}</p>
            ) : (
                <Fragment />
            )}
        </div>
    );
};
export default Input;
