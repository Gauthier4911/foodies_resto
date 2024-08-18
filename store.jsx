import { create } from 'zustand';

export const useStore = create((set) => {
    // Récupérer les données du panier et de la connexion depuis localStorage
    let savedCARD = JSON.parse(localStorage.getItem('cart')) || [];
    const savedCONECT = JSON.parse(localStorage.getItem('isConnected')) || false;

    return {
        CARD: savedCARD,
        CONECT: savedCONECT,
        // Fonction pour connecter l'utilisateur et mettre à jour isConnected dans localStorage
        connection: () => {
            localStorage.setItem('isConnected', JSON.stringify(true));
            set(() => ({ CONECT: true }));
        },
        // Fonction pour déconnecter l'utilisateur et mettre à jour isConnected dans localStorage
        deconnection: () => {
            localStorage.setItem('isConnected', JSON.stringify(false));
            set(() => ({ CONECT: false }));
        },
        // Fonction pour mettre à jour le panier et le sauvegarder dans localStorage
        updateCARD: (produit) => {
            const updatedCARD = [...savedCARD, { ...produit, qte: 1 }];
            localStorage.setItem('cart', JSON.stringify(updatedCARD));
            savedCARD = updatedCARD; // Mettre à jour savedCARD ici
            set(() => ({ CARD: updatedCARD }));
        },
        // Fonction pour mettre à jour le panier depuis le composant Offcanvas
        updateProduit: (updatedCARD) => {
            localStorage.setItem('cart', JSON.stringify(updatedCARD));
            savedCARD = updatedCARD; // Mettre à jour savedCARD ici
            set(() => ({ CARD: updatedCARD }));
        },
        // Fonction pour réinitialiser le panier et vider localStorage
        resetCARD: () => {
            localStorage.removeItem('cart');
            savedCARD = []; // Mettre à jour savedCARD ici
            set(() => ({ CARD: [] }));
        },
    };
});
