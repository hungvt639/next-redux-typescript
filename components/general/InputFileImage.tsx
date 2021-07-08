import React, { Fragment, useState } from "react";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { ValueImageFile } from "../../class/interface";
import ModalShowImage from "./ModalShowImg";
type props = {
    refValue: React.MutableRefObject<ValueImageFile>;
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

const InputFileImage = (props: props) => {
    const [value, setValue] = useState<ValueImageFile>(props.refValue.current);
    const [show, setshow] = useState<boolean>(false);
    function getBase64(file: any) {
        if (file) {
            let reader = new FileReader();
            reader.onloadend = function () {
                setValue({ image: file, img: reader.result });
                props.refValue.current = { image: file, img: reader.result };
            };
            reader.readAsDataURL(file);
            return reader;
        }
    }

    const handleImageChange = (val: any) => {
        // console.log(val.target.files[0]);

        getBase64(val.target.files[0]);
    };
    const deleteImage = () => {
        setValue({ image: null, img: "" });
        props.refValue.current = { image: null, img: "" };
    };
    // console.log(value);

    return (
        <div className="input-file-images">
            <label className="input-file-image">
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                />
                {value.img && typeof value.img === "string" ? (
                    <div className="input-file-image-show">
                        <img src={value.img} alt="Ảnh" />
                        <div className="input-file-bgr"></div>
                    </div>
                ) : (
                    <div className="input-file-image-add">
                        <p>+</p>
                        <p>Ảnh</p>
                    </div>
                )}
            </label>
            {value.img && typeof value.img === "string" ? (
                <div onClick={deleteImage} className="input-file-btn-delete">
                    <DeleteOutlined />
                </div>
            ) : (
                <Fragment />
            )}
            {value.img && typeof value.img === "string" ? (
                <div
                    onClick={() => setshow(true)}
                    className="input-file-btn-view"
                >
                    <EyeOutlined />
                </div>
            ) : (
                <Fragment />
            )}
            <ModalShowImage
                show={show}
                onClose={() => setshow(false)}
                img={props.refValue.current.img}
            />
        </div>
    );
};
export default InputFileImage;
