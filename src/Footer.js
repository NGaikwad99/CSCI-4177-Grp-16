import './footer.css'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <Link to="/">Contact us</Link>
            <Link to="/">FAQ</Link>
            <p>© 2024 Group 16</p>
        </footer>
    )
}

export default Footer;