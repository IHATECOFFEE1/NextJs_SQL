import React from "react";
import { useForm } from "react-hook-form";
import styles from "./SignUp.module.scss";
import { useState, useEffect } from 'react';

export default function SignUp() {
    const { register, handleSubmit, reset, formState } = useForm();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const getLocations = async () => {
            const response = await fetch('/api/locations');
            const data = await response.json();
            setLocations(data);
        }
        getLocations();
    }, []);

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
                    defaultValue={new Date().toISOString().slice(0, 16)}
                    min="2022-01-01T00:00"
                    name="start_Time"
                    {...register("start_Time", { required: true })}
                    className={styles.signupForm__input}
                />
                <input
                    type="datetime-local"
                    defaultValue={new Date().toISOString().slice(0, 16)}
                    min="2022-01-01T00:00"
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
                    defaultValue={null}
                    name="rso"
                    placeholder="RSO"
                    {...register("rso", { required: false })}
                    className={styles.signupForm__input}
                />
                <label htmlFor="location">Location:</label>
                <select
                    type="text"
                    name="at"
                    {...register("at", { required: true })}
                    className={styles.signupForm__input}
                >
                    {locations.map((location) => (
                        <option key={location.lName} value={location.lName}>
                            {location.lName}
                        </option>
                    ))}
                </select>
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


