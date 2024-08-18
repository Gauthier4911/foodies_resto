// stock.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

const initialData = [];

export const useUserData = () => {
    const [userData, setUserData] = useState(initialData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setUserData(response.data);
                console.log('Données utilisateur:', response.data); // Affichage des données dans la console
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur :', error);
            }
        };

        fetchData();
    }, []);

    return userData;
};
