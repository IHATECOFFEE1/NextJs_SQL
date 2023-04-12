import React from "react";
import { useForm} from "react-hook-form";
import styles from "./SignUp.module.scss";

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
        <div className={styles.signupForm}>
            <h1 className={styles.signupForm__header} >Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm__form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    {...register("name", { required: true })}
                    className={styles.signupForm__input}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    {...register("username", { required: true })}
                    className={styles.signupForm__input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className={styles.signupForm__input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                    className={styles.signupForm__input}
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    {...register("type", { required: true })}
                    className={styles.signupForm__input}
                />
                <input
                    type="text"
                    name="rso"
                    placeholder="RSO"
                    {...register("rso", { required: true })}
                    className={styles.signupForm__input}
                />
                <button type="submit" className={styles.signupForm__button}>Sign Up</button>
            </form>
        </div>
    );
};


