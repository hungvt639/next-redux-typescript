import React from "react";
type props = {
    children?: JSX.Element;
    show: boolean;
    // setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setShowFalse: any;
};
const Modal: React.FC<props> = ({ children, show, setShowFalse }: props) => {
    return (
        <div className={show ? "modal" : "height-0 width-0 modal"}>
            <div
                onClick={() => setShowFalse()}
                className={show ? "modal-close" : "display-none"}
            ></div>
            <div className={show ? "modal-children" : "display-none"}>
                {children}
            </div>
        </div>
    );
};
export default Modal;
