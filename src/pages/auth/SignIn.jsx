import { NextPage} from "next";
import React from "react";
import styles from "./SignIn.module.scss";
import { useState } from "react";
import { signIn } from "next-auth/react";

const SignIn = (props) => {
    const [userInfo, setUserInfo] = useState({ email: '', password: ''});
    const handleSubmit = async (e) => {

        e.preventDefault()

        const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false,
        })

        console.log(res)

    };

    return <div>
        <form className={styles.signInForm} onSubmit={handleSubmit}>
            <h1>Sign In</h1>

            <input 
                type="email" placeholder="email" value={userInfo.email} 
                onChange={({ target }) => 
                setUserInfo( {...userInfo, email: target.value})}
            />

            <input 
                type="password" placeholder="Password" value={userInfo.password} 
                onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })}
            />

            <button type="submit"> Login </button>
        </form>

    </div>;
};

export default SignIn;