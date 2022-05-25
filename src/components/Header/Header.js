import React from "react";
import robot from "../../assets/robot.svg";

const Header = () => {
  return (
    <header>
      <img src={robot} alt="robot" className="header__logo" />
      <h1>Fun with AI</h1>
    </header>
  );
};

export default Header;
