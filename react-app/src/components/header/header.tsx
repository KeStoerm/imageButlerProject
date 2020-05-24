import React from "react";
import logo from "../../template/logo.png";
import "./header.scss";
import {useHistory} from "react-router-dom";

export const Header: React.FC = () => {
  const history = useHistory();

  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item">
        <img src={logo} onClick={() => history.push("/")} alt="ImageButler. We'll find your image!"/>
      </a>
    </div>
  </nav>
}