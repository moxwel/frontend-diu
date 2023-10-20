import React from "react";

import NavBar from "./nav_bar";
import { Link } from "react-router-dom"; // Importa el componente Link

export const PageHeader = () => {
  var LogoUSM = require("../assets/usm.png").default;

  return (
    <>
      <div className="nav-line" style={{ display: "flex", alignItems: "center" }}>
        <h1 className="page__title">
          {/* Envuelve el logo y el texto con un elemento Link */}
          <Link to="/" className="page__title" style={{ display: "flex", alignItems: "center" }}>
            <img src={LogoUSM} height={50} alt="logo usm" style={{ marginRight: "10px" }} />
            Eventos USM
          </Link>
        </h1>
      </div>
    </>
  );
};

export default PageHeader;
