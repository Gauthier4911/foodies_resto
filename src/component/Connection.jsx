import React, {  useState } from 'react';
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStore } from "../../store.jsx";
import axios from "axios";
import {toast} from "sonner";

const schema = yup
    .object({
        username: yup.string().required("Champ obligatoire"),
        email: yup.string().required("Champ obligatoire").email("Entrer un email valide"),
        password: yup.string().required("Champ obligatoire").min(8, "Entrer un mot de passe valide 8 caractères"),
    })
    .required()

const schema2 = yup
    .object({
        email2: yup.string().required("Ce champ est obligatoire").email("Entrer un email valide"),
        password2: yup.string().required("Ce champ est obligatoire").min(8, "Entrer un mot de passe valide 8 caractères"),

    })
    .required()

export default function Connection() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [showRegistration, setShowRegistration] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const connection = useStore((state) => state.connection);
    const [error, setError] = useState('');

    const closeModal = () => {
        const modal = document.querySelector('.closing');
        modal.click()
    };

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm({
        resolver: yupResolver(schema2),
    })

    const onSubmitRegister = async (formData) => {
        try {
            // Envoyer les données d'inscription au serveur
            const emailExistsResponse = await axios.get(`http://localhost:3000/users?email=${formData.email}`);
            if (emailExistsResponse.data.length > 0) {
                console.log('Email already exists');
                toast.error('Cet email appartient deja à une autre personne !!!');

                return;
            }
            const response = await axios.post('http://localhost:3000/users', formData);
            console.log('Inscription réussie:', response.data);
            toast.success('Vous etes connectés !!');
            // Récupérer les données utilisateur du localStorage
            const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];
            // Ajouter les nouvelles données utilisateur
            const updatedUserData = [...storedUserData, formData];
            // Stocker les données mises à jour dans le localStorage
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
            const user2 = JSON.parse(localStorage.getItem('user2')) || [];
            const user3 = [...user2, formData]
            localStorage.setItem('nom2', JSON.stringify(user3));

            // Réinitialiser le formulaire et fermer la modal
            reset();
            connection();
            closeModal();
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error.response?.data ?? error.message);
            toast.info('Erreur lors de l\'inscription  desolé veuilez reessayez !!');
        }
    };  // Récupérer les données utilisateur du localStorage
    const onSubmitLogin = (formData) => {
        try {
            // Récupérer les données utilisateur du localStorage
            const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];

            // Vérifier les informations de connexion
            const user = storedUserData.find(user => user.email === formData.email2 && user.password === formData.password2 );
            if (user) {
                console.log('Connecté avec succès :', user);
                toast.success('Vous etes connectés !!');
                localStorage.setItem('nom', JSON.stringify(user));
                reset();
                connection();
                closeModal();
                // Connectez l'utilisateur
            } else {
                // Si l'utilisateur n'est pas trouvé, affichez un message d'erreur
                setError('Identifiants incorrects.');
                toast.error('Identifiants incorrects !!');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error.response?.data ?? error.message);
            toast.info('Erreur lors de la connexion desolé veuilez reessayez !!');
        }
    };


    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {!showRegistration ? (
                            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Connection</h1>) : (
                            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">S'inscrire</h1>)}
                        <button type="button" className="btn-close closing" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="formBoxRight">
                            <div className="formContent">
                                {!showRegistration ? (
                                    <form onSubmit={handleSubmit2(onSubmitLogin)}>
                                        <div className="my-3">
                                            <input type="email" className="form-control border-2" {...register2("email2")}
                                                   placeholder="Votre email..." />
                                            <small className="text-danger">{errors2.email2?.message}</small>
                                        </div>
                                        <div className="my-3">
                                            <input className="form-control border-2"
                                                   type={isPasswordVisible ? 'text' : 'password'} {...register2("password2")}
                                                   placeholder="Mot de passe..." />
                                            {isPasswordVisible ? <FaRegEye onClick={handleTogglePasswordVisibility} className='text-danger position-sticky start-100' /> : <FaRegEyeSlash onClick={handleTogglePasswordVisibility} className='text-danger position-sticky start-100' />}
                                            <small className="text-danger">{errors2.password2?.message}</small>
                                        </div>
                                        <button type="submit" className='btn btn-outline-secondary w-100'>Connexion</button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmitRegister)}>
                                        <div className="my-3">
                                            <input className="form-control border-2"  {...register("username")}
                                                   placeholder="Votre nom..." />
                                            <small className="text-danger">{errors.username?.message}</small>
                                        </div>
                                        <div className="my-3">
                                            <input className="form-control border-2" {...register("email")}
                                                   placeholder="Votre email..." />
                                            <small className="text-danger">{errors.email?.message}</small>
                                        </div>
                                        <div className="my-3">
                                            <input className="form-control border-2"
                                                   type={isPasswordVisible ? 'text' : 'password'} {...register("password")}
                                                   placeholder="Mot de passe..." />
                                            <FaRegEye onClick={handleTogglePasswordVisibility}
                                                      className='text-danger position-sticky start-100' />
                                            <small className="text-danger">{errors.password?.message}</small>
                                        </div>
                                        <button type="submit" className='btn btn-outline-secondary w-100'>Inscription</button>
                                    </form>
                                )}
                            </div>
                        </div>
                        <div className="mt-3">
                            {!showRegistration ? (
                                <h5 className="text-center">Pas encore de compte?</h5>
                            ) : (
                                <h5 className="text-center">Déjà inscrit?</h5>
                            )}
                            <span className="d-block text-center btn mx-auto" onClick={() => setShowRegistration(!showRegistration)}>
                                {!showRegistration ? "Inscrivez-vous ici" : "Connectez-vous ici"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
