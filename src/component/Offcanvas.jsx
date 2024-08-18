import React, {useEffect, useState} from 'react'
import {FaShoppingCart} from "react-icons/fa";
import {useStore} from "../../store.jsx";
import {FaMinus, FaPlus, FaTrash} from "react-icons/fa";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import emailjs from '@emailjs/browser'
import {toast} from "sonner";
import axios from "axios";

const schema = yup
    .object({
        firstName: yup.string().required("Champ obligatoire"),
        pays: yup.string().required("Champ obligatoire"),
        city: yup.string().required("Champ obligatoire").min(5,"minimum 5 caractères").max(20,"maximun 20 caractères"),
        address: yup.string().required("Champ obligatoire").min(5,"minimum 5 caractères").max(20,"maximun 20 caractères"),
        telephone: yup.string().required("Champ obligatoire").matches(/^\+237\d{9}$/,'Entrer un numero valide'),
        commande: yup.string().required("Champ obligatoire"),
        payer: yup.string().required("Champ obligatoire"),
    })
    .required()
export default function Offcanvas() {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false);
    const CARD = useStore((state) => state.CARD)

    const totalPrix = CARD.reduce((somme,item) =>
            somme + (item.qte * item.price)
        ,0);
    const arti = CARD.map(item => `- ${item.name} - ${item.qte}X - ${item.price} Fcfa`).join('\n');




    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryChange = (event) => {
        const selectedCountryName = event.target.value;
        setSelectedCountry(selectedCountryName);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        setLoad(true)
        const templateParams = {
            nomClient: data.firstName,
            villeClient: data.city,
            addressClient: data.address,
            telClient: data.telephone,
            paysClient: data.pays,
            cmdClient: data.commande,
            buyClient: data.payer,

        };

        emailjs.send('service_xe1sn2a', 'template_unq5ehn', templateParams, 'MaqT6nu4yQDkNun-q').then(
            (response) => {
                setShow(false)
                reset()
                setLoad(false)
                resetCARD()
                toast.success('Notre équipe vous contactera pour la livraison !!')
            },
            (error) => {
                console.log('FAILED...', error);
            },
        );
    }
    const updateProduit = useStore((state) => state.updateProduit)
    const resetCARD = useStore((state) => state.resetCARD)
    function delProduit(id){
        let update = CARD.filter(item => item._id !== id)
        updateProduit(update)
    }

    function addQteP(id){
        let qtePr = CARD.find(item => item._id === id)
        if (qtePr.qte <5) {
            let addQ = CARD.map((item) => {
                return (item._id === id) ? {
                    ...item,
                    qte: item.qte + 1
                } : item
            })
            updateProduit(addQ)
        }
    }
    function removeQteP(id){
        let qtePro = CARD.find(item => item._id === id)
        if (qtePro.qte > 1){
            let removeQteP = CARD.map((item) => {
                return (item._id === id)? {
                    ...item,
                    qte:item.qte - 1
                }:item
            })
            updateProduit(removeQteP)
        }
    }

    const CONECT = useStore((state) => state.CONECT);

    const btn = !CONECT
        ? <button className='btn btn-secondary my-1 w-75'>Connectez-vous</button> : <button className='btn  btn-primary my-1 w-75' onClick={() => setShow(true)}> Buy now </button>

    return (
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false"
             tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Votre Panier <FaShoppingCart className="mx-1"/></h5><hr className="bg-danger"/>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <p className='h3 text-center'>contenu de votre panier {CARD.length} plats</p>
                {
                    CARD.length === 0? (
                        <p className="text-center my-5">Aucun article dans votre panier actuellement !!</p>
                    ):(
                        <div className="row">
                            <div className="col-lg-12 my-3">
                                <div className="row">
                                    <div className="col-lg-4 ">
                                        <p className='my-3 fw-bold'>
                                            <span>Total :</span>
                                            <span> {
                                                CARD.reduce((somme,item) => {
                                                    return somme + (item.qte * item.price)
                                                },0)
                                            }{' '} Fcfa</span>
                                        </p>
                                    </div>
                                    {btn}
                                    <form className={`my-3 ${!show && 'd-none'}`} onSubmit={handleSubmit(onSubmit)} >
                                        <div className="mb-3">
                                            <input type="text" {...register("firstName")} className='form-control' placeholder='name...'/>
                                            <span className="text-danger">{errors.firstName?.message}</span>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" {...register("city")}  className='form-control' placeholder='ville...'/>
                                            <span className="text-danger">{errors.city?.message}</span>
                                        </div>
                                        <div className="mb-3">
                                            <select {...register("pays")} className="form-select border-0 bg-body-secondary" aria-label="Default select example" value={selectedCountry} onChange={handleCountryChange}>
                                                <option value="">Choisir un pays</option>
                                                {countries.map((country) => (
                                                    <option key={country.name.common} value={country.name.common}>
                                                        {country.name.common}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="text-danger">{errors.pays?.message}</p>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" {...register("address")} className='form-control' placeholder='Address...'/>
                                            <span className="text-danger">{errors.address?.message}</span>
                                        </div>
                                        <div className="mb-3">
                                            <input type="tel" {...register("telephone")} className='form-control' placeholder='+2376*********'/>
                                            <span className="text-danger">{errors.telephone?.message}</span>
                                        </div>
                                        <div className="mb-3">
                                            <select {...register("buy")} className="form-select border-0 bg-body-secondary" id="objet">
                                                <option value="">Mode de payement</option>
                                                <option value="MTN MONEY">MTN MONEY</option>
                                                <option value="ORANGE MONEY">ORANGE MONEY</option>
                                                <option value="VISA CARTE">VISA CARTE</option>
                                            </select>
                                            <p className="text-danger">{errors.payer?.message}</p>
                                        </div>
                                        <div className="mb-3">
                                        <textarea value={`Articles : \n${arti}\n Prix total : ${totalPrix} Fcfa`} {...register("cmd")} className="form-control border-0 bg-body-secondary"
                                                  id="exampleFormControlTextarea1" rows={CARD.length + 2} ></textarea>
                                            <span className="text-danger">{errors.commande?.message}</span>
                                        </div>
                                        <button type='submit' className='btn btn-warning w-100'>
                                            Envoyer
                                        </button>
                                        {load && <div className="d-flex align-items-center">
                                            <strong role="status" className='text-success'>Envoi...</strong>
                                            <div className="spinner-border ms-auto text-success" aria-hidden="true"></div>
                                        </div>}
                                    </form>
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th >Item</th>
                                            <th>Titre</th>
                                            <th>Prix</th>
                                            <th>Qauntité</th>
                                            <th>Remove</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            CARD.map((item,index)=>{
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img src={`/${item.image}`} alt="" width={50} className='rounded-circle'/>
                                                        </td>
                                                        <td scope="row">{item.name}</td>
                                                        <td scope="row">{item.price} Fcfa</td>
                                                        <td>
                                                            <div className="hstack gap-2">
                                                                <span  className="bg-success-subtle rounded-circle fw-bold" onClick={() => addQteP(item._id)}><FaPlus /></span>
                                                                <div>
                                                                    {item.qte}
                                                                </div>
                                                                <span className="bg-danger-subtle" onClick={() => removeQteP(item._id)}><FaMinus /></span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span role="button" className="text-danger" onClick={() => delProduit(item._id)}>X</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
