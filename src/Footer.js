import './footer.css'
import { Link } from 'react-router-dom';

import ContactUs from './ContactUs';
import FAQ from './FAQ';
function Footer() {
    return (
        <footer className="footer">
            <Link to="/ContactUs" >Contact us</Link>
            <Link to="/FAQ">FAQ</Link>
            <p>© 2024 Group 16</p>
        </footer>
    )
}

export default Footer;