import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { food_list } from "../../data.jsx";
import { useStore } from "../../store.jsx";
import Commentaire from "../component/Commentaire.jsx";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";
import {FaRegStar, FaStar} from "react-icons/fa";

export default function ProduitItem() {
    const [commentaires, setCommentaires] = useState([]);
    const { id } = useParams();
    const [produit, setProduit] = useState([]);
    const [showCommentaires, setShowCommentaires] = useState(false);
    const CONECT = useStore((state) => state.CONECT);

    const handleCommentSubmit = (nouveauCommentaire) => {
        console.log('Nouveau commentaire soumis :', nouveauCommentaire);
        setCommentaires([...commentaires, nouveauCommentaire]);
        setShowCommentaires(true);
    };

    function getProduit() {
        let ITEM = food_list.find(item => item._id === id)
        setProduit(ITEM)
    }

    useEffect(() => {
        getProduit();
    }, []);
    useEffect(() => {
        // Simulation de la récupération des commentaires depuis l'API
        // Remplacez cette partie par votre propre logique de récupération des commentaires
        const fetchCommentaires = async () => {
            // Ici, vous devriez faire une requête à votre API pour obtenir les commentaires
            // Remplacez cet exemple par votre propre code Axios
            const response = await axios.get(`http://localhost:3000/comment?id=${id}`);
            setCommentaires(response.data);
        };
        fetchCommentaires();
    }, [id]);

    const updateCARD = useStore((state) => state.updateCARD)
    const CARD = useStore((state) => state.CARD)

    function AddProduit() {
        let existProduit = CARD.findIndex(item => item._id === produit._id)
        if (existProduit === -1) {
            updateCARD(produit)
        }
    }

    return (
        <main className="container my-5">
            <div className="my-5">a</div>
            {produit !== null && (
                <div className="row">
                    <div className="col-lg-4">
                        <img src={`/${produit.image}`} style={{ height: 'auto', width: '100%' }} className="img-thumbnail img-fluid object-fit-fill border-0 shadow" alt="..." />
                    </div>
                    <div className="col-lg-8">
                        <p className="fw-bold my-2"><strong style={{fontSize:"xx-large"}}>{produit.name}</strong></p>
                        <p className="fw-bold my-2"><FaStar className="text-danger" /><FaStar className="text-danger" /><FaStar className="text-danger" /><FaStar className="text-danger" /><FaRegStar className="text-danger"/><span className="mx-4">(122)</span></p>
                        <p className="text-secondary fw-bold my-2">2000 <strong className="text-success">{produit.price} Fcfa</strong></p>
                        <p className="fw-bold my-2">
                            {produit.description}
                        </p>
                        <p className="fw-bold my-2">
                            <button type="button" className="btn btn-primary" onClick={AddProduit}>
                                Ajouter au panier
                            </button>
                        </p>
                    </div>
                    <div className="col-lg-12 my-3">
                        <div className="row">
                            <div className="col-lg-5 col-md-4">
                                <Commentaire onCommentSubmit={handleCommentSubmit} commentaires={commentaires} />
                            </div>
                            {CONECT? (<div className="col-lg-7 col-md-8  ">
                                {commentaires.length > 0 ? (
                                    <div className="card">
                                        <div className="card-body">
                                            <div>
                                                {commentaires.map((commentaire, index) => (
                                                    <div key={index} className="mb-3">
                                                        <small
                                                            className="text-muted">{commentaire.date} {commentaire.heure}</small>
                                                        <p className='fw-bold'>
                                                            <p><strong
                                                                className='fs-1 me-2'><FaCircleUser/></strong><small>{commentaire.name}</small>
                                                            </p>
                                                            <p>{commentaire.contenu}</p>
                                                        </p>
                                                        <hr/>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (<div><p className="text-center fw-bold my-5" style={{fontSize: "xx-large"}}>Pas de
                                    commentaires sur cette article</p></div>)}
                            </div>):(<div></div>)}
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
