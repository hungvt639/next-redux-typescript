import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
const Notify = ({ message, time }: any) => {
    useEffect(() => {
        setShow(true);
        let timer = setTimeout(() => setShow(false), time);
        return () => {
            clearTimeout(timer);
        };
    }, [message]);
    const [show, setShow] = useState<boolean>(true);
    if (show) {
        return <div className="show-notify">{message}</div>;
    } else {
        return <Fragment />;
    }
};

function Notification(message: any, time: number = 1000) {
    // const e = document.getElementById("__notify");
    // if (e) {
    //     ReactDOM.render(<Notify message={message} />, e);
    // } else {
    const child = document.createElement("DIV");
    child.className = "notify";
    ReactDOM.render(
        <Notify message={message} time={time} />,
        document.body.appendChild(child)
    );
    // }
}
export default Notification;
