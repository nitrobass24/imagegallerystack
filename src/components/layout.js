import React from "react";
import { Link } from "gatsby";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/images">Images</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>Copyright © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;
