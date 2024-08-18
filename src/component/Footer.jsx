import React from 'react'
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <main style={{marginTop: 0}}>
            <footer className="container-fluid border shadow my-5">
                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>&copy; 2024 Foodies, by No_name-dev. All rights reserved.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><Link className="link-dark" to="#"><FaTwitter/></Link></li>
                        <li className="ms-3"><Link className="link-dark" to="#"><FaInstagram/></Link></li>
                        <li className="ms-3"><Link className="link-dark" to="#"><FaFacebook/></Link></li>
                    </ul>
                </div>
            </footer>
        </main>
    )
}
