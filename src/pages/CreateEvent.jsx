import React from "react";
import { useForm } from "react-hook-form";
import styles from "./SignUp.module.scss";

export default function SignUp() {
    const { register, handleSubmit, reset, formState } = useForm();

    const onSubmit = async (data) => {

        try {
            const response = await fetch("/api/events", {
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
                    name="events_Name"
                    placeholder="Name"
                    {...register("events_Name", { required: true })}
                    className={styles.signupForm__input}
                />
                <input
                    type="datetime-local"
                    value="2018-06-12T19:30"
                    min="2018-06-07T00:00" max="2018-06-14T00:00"
                    name="start_Time"
                    {...register("start_Time", { required: true })}
                    className={styles.signupForm__input}
                />
                <input
                    type="datetime-local"
                    value="2018-06-12T19:30"
                    min="2018-06-07T00:00" max="2018-06-14T00:00"
                    name="end_Time"
                    {...register("end_Time", { required: true })}
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
                <input
                    type="text"
                    name="locations_LName"
                    placeholder="Location"
                    {...register("locations_LName", { required: true })}
                    className={styles.signupForm__input}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    {...register("description", { required: true })}
                    className={styles.signupForm__input}
                />

                <button type="submit" className={styles.signupForm__button}>Sign Up</button>
            </form>
        </div>
    );
};


