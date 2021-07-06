import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
const Notify = ({ message }: any) => {
    useEffect(() => {
        setShow(true);
        let timer1 = setTimeout(() => setShow(false), 1000);
        return () => {
            clearTimeout(timer1);
        };
    }, [message]);
    const [show, setShow] = useState<boolean>(true);
    console.log("show", show);
    if (show) {
        return <div className="show-notify">{message}</div>;
    } else {
        return <Fragment />;
    }
};

function Notification(message: any) {
    // const e = document.getElementById("__notify");
    // if (e) {
    //     ReactDOM.render(<Notify message={message} />, e);
    // } else {
    const child = document.createElement("DIV");
    child.id = "__notify";
    child.className = "notify";
    ReactDOM.render(
        <Notify message={message} />,
        document.body.appendChild(child)
    );
    // }
}
export default Notification;
