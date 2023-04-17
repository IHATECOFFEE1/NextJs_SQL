import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import { signOut } from "next-auth/react";
import styles from "./Protected.module.scss";


const Protected = () => {
    const { status, data } = useSession();

    useEffect (() => {
        if (status === "unauthenticated") {
            Router.replace("/auth/SignIn");
        }
    }, [status]);

    if (status === "authenticated") {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <button
                        className={styles.logoutButton}
                        onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
                    >
                        Log out
                    </button>
                    <h1 className={styles.title}>Protected Page</h1>
                </div>
                <div className={styles.userInfo}>
                    <p>ID: {data.user.id}</p>
                    <p>Name: {data.user.name}</p>
                    <p>Email: {data.user.email}</p>
                    <p>Type: {data.user.type}</p>
                    {data.user.rso && <p>RSO: {data.user.rso}</p>}
                </div>
                <div className={styles.buttons}>
                    <button
                        className={styles.createButton}
                        onClick={() => Router.replace("/CreateEvent")}
                    >
                        Create Events
                    </button>
                    <button
                        className={styles.searchButton}
                        onClick={() => Router.replace("/Events")}
                    >
                        Search Events
                    </button>
                    <button
                        className={styles.rsoButton}
                        onClick={() => Router.replace("/RSO")}
                    >
                        RSO
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>LOADING</h1>
        </div>
    );
}

export default Protected;