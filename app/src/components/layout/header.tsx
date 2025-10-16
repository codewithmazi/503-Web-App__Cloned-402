import { signOut } from "aws-amplify/auth";
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const handleSignOut = async () => {
    try {
      await signOut();
      alert("You have been signed out.");
      // Redirect to login page or home page
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <header className="navbar is-light is-fixed-top">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item is-size-3 has-text-primary">
          Media Stream
        </Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <Link to="/" className="navbar-item has-text-grey-dark is-size-5">Home</Link>
          <Link to="/crops" className="navbar-item has-text-grey-dark is-size-5">Crops</Link>
          <Link to="/staff" className="navbar-item has-text-grey-dark is-size-5">Staff</Link>
          <Link to="/ops" className="navbar-item has-text-grey-dark is-size-5">Ops</Link>

        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <Link to="/search" className="button is-primary">
            Search
          </Link>
        </div>

        <div className="navbar-item">
          <button className="button is-danger" onClick={handleSignOut}> Log out</button>
        </div>
        </div>
    </header>
  );
};

export default Header;