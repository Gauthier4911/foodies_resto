import React, { useState, useEffect } from 'react';
import { FaFacebookMessenger } from "react-icons/fa";
import { useStore } from "../../store.jsx";
import {FaRegFaceSmileWink} from "react-icons/fa6";
import axios from "axios";
import {useParams} from "react-router-dom";
import {food_list} from "../../data.jsx";

export default function Commentaire({ onCommentSubmit, commentaires }) {
    const [contenu, setContenu] = useState('');
    const [btn, setBtn] = useState(false);
    const CONECT = useStore((state) => state.CONECT);
    const { id } = useParams();

    useEffect(() => {
        if (contenu !== '') {
            setBtn(true)
        } else if (btn) {
            setBtn(false)
        }
    }, [ contenu, btn])


    const handleContenuChange = (e) => {
        setContenu(e.target.value);
    };
    const nom = JSON.parse(localStorage.getItem('nom')) || [];
    const nom2 = JSON.parse(localStorage.getItem('nom2')) || [];


    const handleSubmit = (e) => {
        e.preventDefault();
        const nouveauCommentaire = {
            id: id,
            name: nom.username || nom2[0].username,
            contenu,
            date: new Date().toLocaleDateString(),
            heure: new Date().toLocaleTimeString(),
        };
        onCommentSubmit(nouveauCommentaire);

        // Réinitialiser le formulaire après soumission
        setContenu('');


        // Enregistrer le commentaire dans le fichier JSON
        saveCommentToJSON(nouveauCommentaire);
    };

    const saveCommentToJSON = async (newComment) => {
        try {
            const response = await axios.post('http://localhost:3000/comment', newComment);
            console.log(response.data); // Affiche le message de réussite de l'inscription
        } catch (error) {
            console.error('Error saving comment:', error.message);
        }
    };

    return (
        <>
            <div className="card mb-3 bg-body-secondary" style={{ width: '400px' }}>
                <div className="card-body">
                    <p className="card-title fs-5 fw-bold"> Laisser un commentaire Merci <span style={{ color: "red" }}><FaRegFaceSmileWink /></span> </p>
                    <form className='container-fluid mx-auto' onSubmit={handleSubmit}>
                        <>
                            <div className="mb-3">
                                <label htmlFor="Textarea" className="form-label fw-bold">Commentaires</label>
                                <textarea className="form-control" id="Textarea" rows="2" value={contenu} onChange={handleContenuChange}></textarea>
                            </div>
                            <div className='d-grid g-3 mx-auto'>
                                {!CONECT ? (
                                    <button className="btn btn-outline-secondary my-3 mx-2" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" >Connectez-vous</button>
                                ) : ( btn? <button type="submit" className='btn btn-primary w-100'>Envoyer <FaFacebookMessenger/></button> : <button className='btn btn-primary w-100' disabled>Envoyer <FaFacebookMessenger/></button> )}
                            </div>
                        </>
                    </form>
                </div>
            </div>
        </>
    );
}
