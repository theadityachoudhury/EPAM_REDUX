import { Link, useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import "./Login.css";
import { useState } from "react";
import instance from "../../helpers/axios";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/user/thunk";
import { AppDispatch } from "../../store";

const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState<{ email: string, password: string }>({ email: "", password: "" });
    const [error, setError] = useState<{ email: string, password: string }>({ email: "", password: "" });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input);
        const { email, password } = input;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let errrorObj = { ...error };
        if (!emailPattern.test(email)) {
            errrorObj = { ...errrorObj, email: "Invalid Email" };
        } else {
            errrorObj = { ...errrorObj, email: "" };
        }
        if (password.length < 8) {
            errrorObj = { ...errrorObj, password: "Password must be 8 characters long" };
        } else {
            errrorObj = { ...errrorObj, password: "" };
        }

        if (errrorObj.email || errrorObj.password) {
            setError(errrorObj);
            return;
        } else {
            setError({ email: "", password: "" });
        }

        const inputData = { email, password };
        console.log(inputData);
        try {
            const response = await instance.post("/login", inputData);
            const data = response.data;
            if (data.successful) {
                dispatch(fetchUser(data.result));
                navigate("/courses");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login__container">
            <div className="login__body">
                <h1 className="">Login</h1>
                <div className="login__form__body">
                    <form className="" onSubmit={handleSubmit}>
                        <Input type="email" metaData={{ placeholder: "Enter Email", name: "email", error: error.email }} onChange={handleChange} label={{ show: true, text: "Email" }} />
                        <Input type="password" metaData={{ placeholder: "Enter Password", name: "password", error: error.password }} onChange={handleChange} label={{ show: true, text: "Password" }} />
                        <Button title="LOGIN" type="submit" />
                    </form>
                    <p className="">
                        If you don't have an account you may <Link to="/register" className="">Registration</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
