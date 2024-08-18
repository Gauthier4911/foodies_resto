import React, {useEffect} from 'react'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Root from "./Root.jsx";
import Home from "./pages/Home.jsx";
import ProduitItem from "./pages/ProduitItem.jsx";
import Contact from "./pages/Contact.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Menu from "./pages/Menu.jsx";
import axios from "axios";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path:'',
                element:<Home/>,
            },
            {
                path: 'menu',
                element: <Menu/>,
            },
            {
                path: 'contact',
                element: <Contact/>,
            },
            {
                path: 'produit/:id',
                element: <ProduitItem/>,
            },
        ]
    },


]);

export default function App() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupérer les données du serveur
                const response = await axios.get('http://localhost:3000/users');
                const userData = response.data;
                // Stocker les données dans le localStorage
                localStorage.setItem('userData', JSON.stringify(userData));
            } catch (error) {
                console.error('Erreur lors du chargement des données :', error);
            }
        };

        fetchData();
    }, []);

    return (

        <RouterProvider router={router}/>

    )
}
