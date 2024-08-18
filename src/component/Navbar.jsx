import React, {useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import { useStore } from "../../store.jsx";
import { FaBagShopping } from "react-icons/fa6";
import {BiUserCircle} from "react-icons/bi";
import "./navbar.css";

export default function Navbar() {
    const CARD = useStore((state) => state.CARD);
    const CONECT = useStore((state) => state.CONECT);
    const connection = useStore((state) => state.deconnection);
    const nom = JSON.parse(localStorage.getItem('nom')) || [];
    const nom2 = JSON.parse(localStorage.getItem('nom2')) || [];
    const clearLocalStorage = () => {
        connection();
        nom.clear;
        nom2.clear;
        // Après la déconnexion, réinitialisez également les informations de l'utilisateur
    };
    return (
        <nav
            id="navBar"
            className="navbar navbar-expand-lg bg-body-tertiary fixed-top"
        >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <h1>Foodies <strong style={{ color: "orange" }}>.</strong></h1>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/menu">
                                Menu
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                    <ul></ul>
                </div>

                <div className="profil d-flex">
                    <p role="button"
                       data-bs-toggle="offcanvas"
                       data-bs-target="#offcanvasScrolling"
                       aria-controls="offcanvasScrolling"
                       className="nav-item shopIcon my-2"
                    >
                        <FaBagShopping/>{" "}
                        <span className="comteur rounded-pill">
                        <>{CARD.length}</>
                     </span>
                    </p>

                    <p className="nav-item btn-group my-2">

                        <button data-bs-toggle="modal" data-bs-target="#exampleModal"  className={`btn border-primary rounded-pill ${CONECT && 'd-none'}`}>Log In</button>

                        <p
                            className={` ms-2 mt-2 dropdown-toggle ${!CONECT && 'd-none'}`}
                            data-bs-toggle="dropdown"
                            data-bs-display="static"
                            aria-expanded="false"
                        >
                            <BiUserCircle style={{transform:"scale(2.5)"}} />
                        </p>
                        <ul className={`dropdown-menu dropdown-menu-lg-end ${!CONECT && 'd-none'}`}>
                            <li>
                                <p className="dropdown-item">
                                    {nom.username || nom2[0].username}
                                </p>
                            </li>
                            <li>
                                <p role="button" onClick={clearLocalStorage} className="dropdown-item">
                                    Log Out
                                </p>
                            </li>
                        </ul>
                    </p>
                </div>
            </div>
        </nav>
    );
}

