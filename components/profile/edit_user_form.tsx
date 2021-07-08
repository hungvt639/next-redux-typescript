import React, { useState, useRef } from "react";
import { UserInterface, ValueImageFile } from "../../class/interface";
import { fValidateEmail, fValidatePhone } from "../../function/validate";
import Input from "../general/Input";
import InputFileImage from "../general/InputFileImage";

const EditUserForm = ({ value }: { value: UserInterface | null }) => {
    // const user = useSelector((s: RootState) => s.authState.user);
    const imageRef = useRef<ValueImageFile>({ image: null, img: "" });
    const nameRef = useRef<string>(value?.name ? value.name : "");
    const emailRef = useRef<string>(value?.email ? value.email : "");
    const phoneRef = useRef<string>(
        value?.phoneNumber ? value.phoneNumber : ""
    );

    const [firstSubmit, setFirstSubmit] = useState<boolean>(false);
    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setFirstSubmit(true);
        console.log("u___", imageRef);
    }
    function validateEmail(email: string) {
        const val = fValidateEmail(email);
        if (val) return { value: false, message: "" };
        else return { value: true, message: "Định dạng email chưa đúng" };
    }
    function validatePhone(phone: string) {
        const val = fValidatePhone(phone);
        if (val) return { value: false, message: "" };
        else return { value: true, message: "Số điện thoại không hợp lệ" };
    }
    return (
        <div className="forms_">
            <h1>Chỉnh sửa thông tin</h1>
            <form onSubmit={(e) => onSubmit(e)} className="form_">
                <InputFileImage refValue={imageRef} />
                <label>
                    Họ tên:
                    <br />
                    <Input
                        refValue={nameRef}
                        name="name"
                        placeholder="Họ tên"
                        firstSubmit={firstSubmit}
                    />
                </label>

                <label>
                    Email:
                    <br />
                    <Input
                        name="email"
                        placeholder="Email"
                        refValue={emailRef}
                        required={true}
                        firstSubmit={firstSubmit}
                        validate={validateEmail}
                    />
                </label>
                <label>
                    Số điện thoại
                    <br />
                    <Input
                        name="phone"
                        placeholder="Số điện thoại"
                        type="number"
                        refValue={phoneRef}
                        required={true}
                        firstSubmit={firstSubmit}
                        validate={validatePhone}
                    />
                </label>
                <button type="submit">Chỉnh sửa</button>
            </form>
        </div>
    );
};
export default EditUserForm;
