import "./footer.css";

export function Footer() {
  return <>
    <footer className="footer_container">
        <div className="footer_content">
            <p>© 2023 E-Commerce Project. All rights reserved.</p>
            <p>Follow us on social media!</p>
            <ul className="social_links">
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
        </div>
    </footer>
  </>;
}
