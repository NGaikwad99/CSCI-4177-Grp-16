import './Login.css';
import { useState } from 'react';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit() {
        console.log(username + " " + password);
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
