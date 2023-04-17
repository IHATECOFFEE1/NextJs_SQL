import { react } from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./RSO.module.scss";
import Router from "next/router";


const RSO = () => {
    const { status, data } = useSession();
    const [JoinStatus1, setJoinStatus1] = useState("Join");
    const [JoinStatus2, setJoinStatus2] = useState("Join");
    const [JoinStatus3, setJoinStatus3] = useState("Join");

    const handleJoin1 = async () => {
        if (JoinStatus1 === "Join") {
            const publicResponse = await fetch('/api/users?id=' + data.user.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rso: "CS Club" }),
            });
            
            setJoinStatus1("Leave");
        } else {
            const publicResponse = await fetch('/api/users?id=' + data.user.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rso: null }),
            });
            setJoinStatus1("Join");
        }
    }

    const handleJoin2 = async () => {
        if (JoinStatus2 === "Join") {
            const publicResponse = await fetch('/api/users?id=' + data.user.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rso: "CS Club" }),
            });
            setJoinStatus2("Leave");
        } else {
            const publicResponse = await fetch('/api/users?id=' + data.user.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rso: null }),
            });
            setJoinStatus2("Join");
        }
    }

    const handleJoin3 = async () => {
        if (JoinStatus3 === "Join") {
            const publicResponse = await fetch('/api/users?id=' + data.user.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rso: "Arts Club" }),
            });
            setJoinStatus3("Leave");
        } else {
            const publicResponse = await fetch('/api/users?id=' + data.user.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rso: null }),
            });
            setJoinStatus3("Join");
        }
    }

    useEffect (() => {
        if (status === "unauthenticated") {
            Router.replace("/auth/SignIn");
        }
    }, [status]);

    
    return (
        
        <div className={styles.eventList}>
            <button onClick={() => Router.replace("/Protected")}>
                Home Page
            </button>
            <h2> RSO </h2>
            <div className={styles.event}>
                <h2> CS Club </h2>
                <p> Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aliquam porro, veritatis deserunt ex quod! Atque maxime ullam facilis dolor sint. Dolorem minus pariatur alias saepe, fugit placeat! Architecto, tempore. </p>
                
                <button onClick={() => handleJoin1()}>
                    {JoinStatus1}
                </button>
            </div>
            <div className={styles.event}>
                <h2> UCF Club </h2>
                <p> Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aliquam porro, veritatis deserunt ex quod! Atque maxime ullam facilis dolor sint. Dolorem minus pariatur alias saepe, fugit placeat! Architecto, tempore. </p>

                <button onClick={() => handleJoin2()}>
                    {JoinStatus2}
                </button>
            </div>
            <div className={styles.event}>
                <h2> Arts Club </h2>
                <p> Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aliquam porro, veritatis deserunt ex quod! Atque maxime ullam facilis dolor sint. Dolorem minus pariatur alias saepe, fugit placeat! Architecto, tempore. </p>

                <button onClick={() => handleJoin3()}>
                    {JoinStatus3}
                </button>
            </div>
        </div>
    )
};

export default RSO;