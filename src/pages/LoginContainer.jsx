import React, { useState, useEffect } from "react";
import Login from "../components/Login/Login";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginContainer() {
    const [error, setError] = useState("");
    const onFinish = (values) => {
        
        const data = {
            gmail: values.username,
            password: values.password,
        };
        console.log(data);
        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.message);
                // setError(data.message)
                setTimeout(function () {
                    setError("")
                }, 2000);
                if (data.message === "Login succesfully") {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }else {
                    toast(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <>
            <Login onFinish={ onFinish } error={ error } />
            <ToastContainer />
        </>
    );
}

export default LoginContainer;
