import { useState, useContext } from 'react';
import './SignUp.css';
import axios from 'axios';
import { AuthContext } from '../components/authContext';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const { login } = useContext(AuthContext);

    async function handleSubmit(e) {
        

        console.log(username + " " + password);

        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/register', { name, email, username, role, password });
            console.log(res.data);
            // const token = res.data.token;

            // localStorage.setItem('token', token);

            login();

            // console.log('Login successful. Token:', token);
        } catch (err) {
            console.error(err);
        }
    }

    function backtoLogin() {
    }

    return (
        <main className='signup'>
            <div className="signupPg">
                <h1>SignUp</h1>

                <form className="inputForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name"  value={name} 
                            onChange={(e) => setName(e.target.value)} required/>

                    <input type="email" placeholder="Email" value={email} 
                            onChange={(e) => setEmail(e.target.value)} required/>

                    <input type="text" placeholder="Username" value={username} 
                            onChange={(e) => setUsername(e.target.value)} required/>
                    
                    {/* <input type="phone" placeholder="Phone number" value={phone} 
                            onChange={(e) => setPhone(e.target.value)} required/> */}

                    <input type="role" placeholder="Role" value={role} 
                            onChange={(e) => setRole(e.target.value)} required/>

                    <input type="password" placeholder="Password" value={password} 
                            onChange={(e) => setPassword(e.target.value)} required/>

                    <input type="password" placeholder="Confirm password" value={confPassword} 
                            onChange={(e) => setConfPassword(e.target.value)} required/>

                    <button type="submit" onClick={handleSubmit}><strong>SUBMIT</strong></button>
                    <button type="button" onClick={backtoLogin}><strong>BACK TO LOGIN</strong></button>
                </form>
            </div>
        </main>
    )
}

export default SignUp;