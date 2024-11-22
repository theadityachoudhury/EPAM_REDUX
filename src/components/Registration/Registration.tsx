import { Link, useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import "./Registration.css";
import { useState } from "react";
import instance from "../../helpers/axios";
import axios from "axios";

const Registration = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState<{ name: string, email: string, password: string }>({ name: "", email: "", password: "" });
    const [error, setError] = useState<{ name: string, email: string, password: string }>({ name: "", email: "", password: "" });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input);
        const { email, password, name } = input;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let errrorObj = { ...error };
        if (!emailPattern.test(email)) {
            errrorObj = { ...errrorObj, email: "Invalid Email" };
        } else {
            errrorObj = { ...errrorObj, email: "" };
        }
        if (name.length < 1) {
            errrorObj = { ...errrorObj, name: "Name must be atleast 1 characters long" };
        } else {
            errrorObj = { ...errrorObj, name: "" };
        }

        if (password.length < 8) {
            errrorObj = { ...errrorObj, password: "Password must be 8 characters long" };
        } else {
            errrorObj = { ...errrorObj, password: "" };
        }

        if (errrorObj.email || errrorObj.password || errrorObj.name) {
            setError(errrorObj);
            return;
        } else {
            setError({ name: "", email: "", password: "" });
        }

        const inputData = { email, password, name };
        try {
            const response = await instance.post("/register", inputData);
            if (response.status === 201) {
                navigate("/login");
            }
        } catch (err: Error | any) {
            console.log(err);
            if (axios.isAxiosError(err)) {
                if (err.response?.data) {
                    setError({ ...error, email: "Email already exists" });
                }
            }
        }
    }

    return (
        <div className="login__container">
            <div className="login__body">
                <h1 className="">Register</h1>
                <div className="login__form__body">
                    <form className="" onSubmit={handleSubmit}>
                        <Input type="text" metaData={{ placeholder: "Enter Name", name: "name", error: error.name }} onChange={handleChange} label={{ show: true, text: "Name" }} />
                        <Input type="email" metaData={{ placeholder: "Enter Email", name: "email", error: error.email }} onChange={handleChange} label={{ show: true, text: "Email" }} />
                        <Input type="password" metaData={{ placeholder: "Enter Password", name: "password", error: error.password }} onChange={handleChange} label={{ show: true, text: "Password" }} />
                        <Button title="Register" type="submit" />
                    </form>
                    <p className="">
                        If you have an account you can <Link to="/login" className="">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
