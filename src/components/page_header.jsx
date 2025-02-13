import React from "react";
import NavBar from "./nav_bar";
import { Link } from "react-router-dom";

export const PageHeader = () => {
  var LogoUSM = require("../assets/usm.png").default;

  return (
    <>
      <div className="nav-line" style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}>
        <h1 className="page__title">
          <Link to="/" className="page__title" style={{ display: "flex", alignItems: "center" }}>
            <img src={LogoUSM} height={50} alt="logo usm" style={{ marginRight: "10px" }} />
            Gestion de Eventos USM
          </Link>
        </h1>
        <NavBar />
      </div>
    </>
  );
};

export default PageHeader;
