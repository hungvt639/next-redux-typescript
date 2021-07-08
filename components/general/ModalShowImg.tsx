import React, { Fragment } from "react";
import { CloseOutlined } from "@ant-design/icons";

type props = {
    show: boolean;
    onClose: any;
    img: string | ArrayBuffer | null;
    width?: number | string;
    height?: number | string;
};
const ModalShowImage = (props: props) => {
    return (
        <div className={props.show ? "modal" : "height-0 width-0 modal"}>
            <div
                onClick={() => props.onClose()}
                className={props.show ? "modal-close" : "display-none"}
            ></div>
            <div
                className={props.show ? "modal-children-img" : " display-none"}
            >
                {props.img && typeof props.img === "string" ? (
                    <img src={props.img} alt="Lỗi" />
                ) : (
                    <Fragment />
                )}
                <span
                    onClick={() => props.onClose()}
                    className="close-modal-img"
                >
                    <CloseOutlined />
                </span>
            </div>
        </div>
    );
};
export default ModalShowImage;
