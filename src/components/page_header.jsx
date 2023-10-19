import React from "react";

import NavBar from "./nav_bar";

export const PageHeader = () => {
  var LogoUSM = require("../assets/usm.png").default;

  return (
    <>
      <h1 className="page__title">
        <img src={LogoUSM} height={50} alt="logo usm" /> Eventos USM
      </h1>
      <NavBar />
    </>
  );
};

export default PageHeader;
