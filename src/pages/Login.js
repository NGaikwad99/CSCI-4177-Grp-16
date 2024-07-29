import './Login.css';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/authContext';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    async function handleSubmit(e) {
        console.log(username + " " + password);

        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/login', { username, password });
            console.log(res.data);
            const token = res.data.token;

            localStorage.setItem('token', token);

            login();

            console.log('Login successful. Token:', token);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main className="login">
            <div className="loginPg">
                <h1>Login</h1>

                <form className="inputForm loginForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username"  value={username} 
                            onChange={(e) => setUsername(e.target.value)} required/>

                    <input type="password" placeholder="Password" value={password} 
                            onChange={(e) => setPassword(e.target.value)} required/>

                    <button type="submit" onClick={handleSubmit}><strong>SUBMIT</strong></button>
                    <button type="button" onClick={() => {console.log("reset password clicked")}}><strong>RESET PASSWORD</strong></button>
                </form>
            </div>
        </main>
    )
}

export default Login;
