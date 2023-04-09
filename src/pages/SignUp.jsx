import React from "react";
import { useForm} from "react-hook-form";

export default function SignUp() {
    const { register, handleSubmit, reset, formState } = useForm();

    const onSubmit = async (data) => {
        console.log("signup", data);
        console.log(JSON.stringify(data));
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
                    {...register("name", { required: true })}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    {...register("username", { required: true })}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    {...register("type", { required: true })}
                />
                <input
                    type="text"
                    name="rso"
                    placeholder="RSO"
                    {...register("rso", { required: true })}
                />
                <button type="submit">Sign Up</button>
            </form>   
        </div>
    );
};


