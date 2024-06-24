import { Link } from 'react-router-dom';
import './header.css'
import logo from './assets/img/logo.png';

function Header() {
    return (
        <header className="header">
            <div className="logo-div">
                <img src={logo}></img>
                
                <Link to="/"><h1>SafeSpace</h1></Link>
            </div>
            <div class="nav-auth">
                <nav className="nav">
                    <Link to="/">Resources</Link>
                    <Link to="/">About us</Link>
                </nav>

                <div className="auth">
                    <button className="signup">Sign up</button>
                    <button className="login">Log in</button>
                </div>
            </div>
        </header>
    )
}

export default Header;