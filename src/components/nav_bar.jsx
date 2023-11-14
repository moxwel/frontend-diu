import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="nav-bar">
      <NavLink className={({ isActive }) => `nav-bar__link ${isActive ? "nav-bar__link--active" : ""}`} to="/">
        Página Administrador
      </NavLink>
      <NavLink className={({ isActive }) => `nav-bar__link ${isActive ? "nav-bar__link--active" : ""}`} to="/eventos/proximos">
        Página Visita
      </NavLink>
    </nav>
  );
};

export default NavBar;
