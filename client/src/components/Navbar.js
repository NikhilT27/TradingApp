import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ children }) {
  return (
    <>
      <Link to="/">
        <div className="title-box">
          <div>
            <p>XXXX</p>
          </div>
        </div>
      </Link>
      {children}
      {/* <Footer /> */}
    </>
  );
}
