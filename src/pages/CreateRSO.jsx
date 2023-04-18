import React from "react";
import { useForm } from "react-hook-form";
import styles from "./SignUp.module.scss";
import Router from "next/router";

export default function SignUp() {
    const { register, handleSubmit, reset, formState } = useForm();

    const onSubmit = async (data) => {
        reset();
    };


    return (
        <div className={styles.signupForm}>
            <button onClick={() => Router.replace("/Protected")}>
                Home Page
            </button>
            <h1 className={styles.signupForm__header} >Create RSO</h1>
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
                    name="Description"
                    placeholder="Description"
                    {...register("Description", { required: true })}
                    className={styles.signupForm__input}
                />
                <button type="submit" className={styles.signupForm__button}>Sign Up</button>
            </form>
        </div>
    );
};

