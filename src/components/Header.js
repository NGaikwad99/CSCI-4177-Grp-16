import { Link, useNavigate } from 'react-router-dom';
import './header.css'
import logo from '../assets/img/logo.png';

function Header() {
    const navigate = useNavigate();

    const toLogin = () => {
        navigate('/Login');
    }

    const toSignup = () => {
        navigate('/Signup');
    }

    return (
        <header className="header">
            <div className="logo-div">
                <img src={logo} alt='logo of the app'></img>
                <Link to="/"><h1>SafeSpace</h1></Link>
            </div>
            <div class="nav-auth">
                <nav className="nav">
                    <Link to="/">Resources</Link>
                    <Link to="/">About us</Link>
                </nav>

                <div className="auth">
                    <button className="signup" onClick={toSignup}>Sign up</button>
                    <button className="login" onClick={toLogin}>Log in</button>
                </div>
            </div>
        </header>
    )
}

export default Header;
