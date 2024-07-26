import { useEffect, useState } from 'react';
import './SignUp.css';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    navigate('/page1');


    function handleSubmit() {
        console.log(name + " " + email);
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
                    
                    <input type="phone" placeholder="Phone number" value={phone} 
                            onChange={(e) => setPhone(e.target.value)} required/>

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