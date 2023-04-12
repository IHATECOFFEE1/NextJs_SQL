import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

const Protected = () => {
    const { status, data } = useSession();
    
    useEffect (() => {
        if (status === "unauthenticated") {
            Router.replace("/auth/SignIn");
        }
    }, [status]);
    
    if (status === "authenticated") {
        return <div>
            <h1>Protected Page</h1>
            <p> {JSON.stringify(data.user, null, 2)} </p>
            <p>{data.user.name}</p>
            <p>{data.user.email}</p>
        </div>;
    }

    return <div>
        <h1>LOADING</h1>
    </div>;
}

export default Protected;