import React from "react";
import Swipe from "../components/Swipe";
import Footer from "../components/Footer";

export default function Navbar({ children }) {
  return (
    <>
      <div className="title-box">
        <div>
          <p>XXXX</p>
        </div>
      </div>
      {children}
      {/* <Footer /> */}
    </>
  );
}
