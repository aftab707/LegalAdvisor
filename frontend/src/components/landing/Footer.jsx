import { Scale, Twitter, Linkedin, Github, Facebook } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  const footerColumns = [
    { title: "Product", links: ["Features",  "Documentation", "API Reference"] },
    { title: "Company", links: ["About Us", "Blog",  "Contact"] },
    { title: "Legal", links: ["Terms of Service", "Disclaimer", "Sharia Compliance"] },
  ];

  const socialIcons = [
    { Icon: Twitter, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: Github, href: "#" },
    { Icon: Facebook, href: "#" },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer__brand-col">
            <div className="footer__brand-header">
              <div className="footer__logo-box">
                <Scale color="white" size={20} />
              </div>
              <span className="footer__brand-name">Legal Advisor</span>
            </div>
            <p className="footer__description">
              Empowering Pakistanis with accessible legal knowledge grounded in Islamic values            </p>
            <div className="footer__socials">
              {socialIcons.map(({ Icon, href }, idx) => (
                <a key={idx} href={href} className="footer__social-link">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerColumns.map((col, idx) => (
            <div key={idx}>
              <h4 className="footer__col-title">{col.title}</h4>
              <ul className="footer__link-list">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
         
        
         <div className="disclaimer" id='disclaimer'>
          <div className="legal">
            <h4>Legal Disclaimer</h4>
            <p>This platform provides general legal information based on Pakistani statutory 
               law and Islamic jurisprudence.<br></br> It does NOT constitute legal advice or create 
               an attorney-client relationship.<br></br> For specific legal matters, consult a licensed 
               advocate of the High Court or Supreme Court of Pakistan.</p>
          </div>
          <div className="islamic">
            <h4>Islamic Disclaimer</h4>
            <p>Islamic guidance is based on Quran, Sahih Hadith, and classical fiqh.<br></br> For formal 
               religious rulings (fatwas), consult qualified Islamic scholars (ulema).</p>
          </div>
        </div>



        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Legal Advisor. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">Privacy Policy</a>
            <a href="#" className="footer__legal-link">Terms of Service</a>
            <a href="#" className="footer__legal-link">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};