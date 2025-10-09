import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer has-background-dark has-text-white">
      <div className="content has-text-centered">
        <p>
          <strong>Media Stream</strong> &copy; {new Date().getFullYear()} | All rights reserved.
        </p>

        <p>
          <a href="/about" className="has-text-primary">
            About Us
          </a> | 
          <a href="/privacy-policy" className="has-text-primary">
            Privacy Policy
          </a> | 
          <a href="/terms-of-service" className="has-text-primary">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;