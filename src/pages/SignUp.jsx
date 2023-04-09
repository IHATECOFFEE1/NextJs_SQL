import React from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
    const { register, handleSubmit, reset, errors } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            reset();

        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    required
                />
                <input
                    type="text"
                    name="rso"
                    placeholder="RSO"
                />
                <button type="submit">Sign Up</button>
            </form>   
        </div>
    );
};


