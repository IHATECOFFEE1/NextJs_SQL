import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import { signOut } from "next-auth/react";

const Protected = () => {
    const { status, data } = useSession();
    
    
    useEffect (() => {
        if (status === "unauthenticated") {
            Router.replace("/auth/SignIn");
        }
    }, [status]);

    if (status === "authenticated") {
        return <div>
            <button onClick={ () => signOut({ callbackUrl: 'http://localhost:3000' }) }>
                Log out
            </button>
            <h1>Protected Page</h1>
            <p>{data.user.id}</p>
            <p>{data.user.name}</p>
            <p>{data.user.email}</p>




            <button onClick={() => Router.replace("/CreateEvent") }>
                Create Events
            </button>
            <button onClick={() => Router.replace("/Events") }>
                Search Events
            </button>




        </div>;
    }

    return <div>
        <h1>LOADING</h1>
    </div>;
}

export default Protected;