import React from 'react'
import { Outlet} from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import Offcanvas from "./component/Offcanvas.jsx";
import Connection from "./component/Connection.jsx";




export default function Root() {
    return (
        <>
            <Navbar/>
            <Offcanvas/>
            <Connection/>
            <Outlet />
            <Footer/>
        </>
    )
}