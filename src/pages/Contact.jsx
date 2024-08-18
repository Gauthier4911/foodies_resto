import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import emailjs from "@emailjs/browser"
import {useStore} from "../../store.jsx";
import {toast} from "sonner";
import axios from "axios";

const schema = yup
    .object({
        firstName: yup.string().required("Champ obligatoire"),
        secondName: yup.string().required("Champ obligatoire"),
        pays: yup.string().required("Champ obligatoire").min(5,"minimun 20 caractères").max(150,"maximun 150 caractères"),
        sms: yup.string().required("Champ obligatoire").min(5,"minimun 20 caractères").max(300,"maximun 300 caractères"),
    })
    .required()

export default function Contact() {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    const [load, setLoad] = useState(false);

    const resetCARD = useStore((state) => state.resetCARD)

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
            smsClient: data.sms,
            paysClient: data.pays,
            secondNameClient: data.secondName,
        };

        emailjs.send('service_xe1sn2a', 'template_zf8k22p', templateParams , 'MaqT6nu4yQDkNun-q').then(
            (response) => {
                reset()
                setLoad(false)
                resetCARD()
                toast.success('Notre équipe vous contactera pour repondre à vos questions !!')
            },
            (error) => {
                console.log('FAILED...', error);
            },
        );
    }

    return (
        <main className="container my-5">
            <div className="my-5">a</div>
            <div className="row my-5">
                <h1 className="text-center"><strong>Contact Us<span style={{color:"orange"}}>.</span></strong></h1>
                <div className="card  col-lg-6  h-100 border-0">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63676.936173541326!2d9.692380335755107!3d4.059427747542052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610d9dc899e743%3A0x15e15bd81525def5!2sHIGH%20TECH%20VOCATIONAL%20TRAINING%20CENTER!5e0!3m2!1sfr!2scm!4v1700574210961!5m2!1sfr!2scm"
                        style={{height: 350}} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" className="img-fluid"></iframe>
                    <div className="card-body mx-2 border border-1 w-100">
                        <h5 className="card-title mt-3 fs-4 fw-bold">Foodies<span style={{color:"orange"}}>.</span></h5>
                        <p className="card-text text-secondary">
                            <small>Village-Ndogpassi3 <br/> Douala <br/>
                                Cameroun <br/>
                                Tel: <span className="fw-bold">++237658525704</span>
                            </small>
                        </p>

                    </div>
                </div>
                <div className="col-lg-6  h-100 ">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-3">
                            <label htmlFor="name" className="form-label fw-bold">Nom<span
                                className="text-danger">*</span></label>
                            <input {...register("firstName")}  type="text" className="form-control border-2" id="name"
                            />
                            <p className="text-danger">{errors.firstName?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Pays" className="form-label my-3 fw-bold">Pays<span
                                className="text-danger">*</span></label>
                            <select {...register("pays")} className="form-select border-2 " aria-label="Default select example" value={selectedCountry} onChange={handleCountryChange}>
                                <option value="">Choisir un pays</option>
                                {countries.map((country) => (
                                    <option key={country.name.common} value={country.name.common}>
                                        {country.name.common}
                                    </option>
                                ))}
                            </select>
                            <p className="text-danger">{errors.pays?.message}</p>
                        </div>
                        <div className="my-3">
                            <label htmlFor="lastname" className="form-label fw-bold">Subject<span
                                className="text-danger">*</span></label>
                            <textarea {...register("secondName")} className="form-control border-2"
                                      id="exampleFormControlTextarea2" rows="2" ></textarea>
                            <p className="text-danger">{errors.secondName?.message}</p>
                        </div>
                        <div className="my-3">
                            <label htmlFor="exampleFormControlTextarea1"
                                   className="form-label fw-bold">Message<span
                                className="text-danger">*</span></label>
                            <textarea {...register("sms")} className="form-control border-2"
                                      id="exampleFormControlTextarea1" rows="3" ></textarea>
                            <p className="text-danger">{errors.sms?.message}</p>
                        </div>
                        {!load?(<button className="btn btn-secondary w-100"  type="submit">Envoyer</button>):(<button className="btn btn-secondary w-100 disabled"  type="submit"><p className="text-center my-3">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div></p></button>)}
                        <p className="my-2 text-danger text-center">(* = champ obligatoire)</p>
                    </form>
                </div>
            </div>
        </main>
    )
}
