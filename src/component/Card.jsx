import React from 'react';
import { Link } from "react-router-dom";
import { useStore } from "../../store.jsx";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import {toast} from "sonner";

export default function Card({ produit }) {
    const updateCARD = useStore((state) => state.updateCARD);
    const CARD = useStore((state) => state.CARD);

    function AddProduit() {
        let existProduit = CARD.findIndex(item => item._id === produit._id);
        if (existProduit === -1) {
            updateCARD(produit);
        }else {
            toast.info('Cet article est deja dans votre panier !!!')
        }
    }

    return (
        <div className="card border  position-relative">
            <Link to={`/produit/${produit._id}`}>
                <img src={produit.image} className="card-img-top" alt="..." />
            </Link>
            <span onClick={AddProduit} style={{ position: 'absolute', bottom: '180px', right: '5px' }}>
                <FaCirclePlus className="effet"  style={{ fontSize: 'x-large' }} />
            </span>
            <div className="card-body">
                <div className='hstack'>
                    <h5 className="card-title text-center mx-2">{produit.name}</h5>
                    <p className="ms-auto"><FaStar className="text-danger" /><FaStar className="text-danger" /><FaRegStar className="text-danger" /></p>
                </div>
                <p className="card-text text-start ">{produit.description}</p>
                <div className='hstack'>
                    <p className="text-danger mx-2">
                        {produit.price} Fcfa
                    </p>
                    <p className="ms-auto">{produit.category}</p>
                </div>
            </div>
        </div>
    )
}
