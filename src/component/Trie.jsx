import React, { useEffect, useState } from 'react';
import { food_list, menu_list } from "../../data.jsx";
import Card from "./Card.jsx";

export default function Trie() {
    const [filter, setFilter] = useState('');
    const [sortByName, setSortByName] = useState('asc');
    const [sortByPrice, setSortByPrice] = useState('asc');
    const [category, setCategory] = useState('');
    const [sortedArticles, setSortedArticles] = useState([]);

    const handleChange = (e) => {
        setFilter(e.target.value);
    };

    const handleClick = (menuName) => {
        setCategory(menuName);
    }

    useEffect(() => {
        const sorted = food_list
            .filter(item => category === '' || item.category.includes(category))
            .filter((article) => article.name.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();

                if (sortByName === 'asc') {
                    return nameA.localeCompare(nameB);
                } else {
                    return nameB.localeCompare(nameA);
                }
            })
            .sort((a, b) => {
                const priceA = a.price;
                const priceB = b.price;

                if (sortByPrice === 'asc') {
                    return priceA - priceB;
                } else {
                    return priceB - priceA;
                }
            });

        setSortedArticles(sorted);
    }, [filter, sortByName, sortByPrice, category]);

    const handleAllMenuClick = () => {
        setCategory('');
    };

    return (
        <div>
            <div className="row fonction">
                <div className="items col-lg col-md-none d-flex justify-content-between">
                    {menu_list.map((item) => (
                        <div className="col-lg-1" key={item.menu_name} onClick={() => handleClick(item.menu_name)}>
                            <img src={item.menu_image} alt={item.menu_name} />
                            <p className="text-center my-1">{item.menu_name}</p>
                        </div>
                    ))}
                </div>
                <p className="my-3"><button className="btn btn-outline-secondary my-3" onClick={handleAllMenuClick}>All menu</button></p>
            </div>
            {/* Afficher les produits filtrés */}
            <div className='row'>
                <div className='text-end col-lg-12 '>
                    <small className='mx-5 my-5'><span className="h2">{sortedArticles.length}</span> produits</small>
                    <div className='text-center'>
                        <input className="rounded-pill train border bg-white arretz mx-2" type="text" placeholder="Filtrer par nom" onChange={handleChange} />
                        <label htmlFor="sortByName">Trier par nom :</label>
                        <select id="sortByName" value={sortByName} className='mx-1 border-0' style={{outline:0}} onChange={(e) => setSortByName(e.target.value)}>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                        <label htmlFor="sortByPrice">Trier par prix :</label>
                        <select id="sortByPrice" value={sortByPrice} className='mx-1 border-0' style={{outline:0}} onChange={(e) => setSortByPrice(e.target.value)}>
                            <option value="asc">Croissant</option>
                            <option value="desc">Décroissant</option>
                        </select>
                        <label htmlFor="sortByPrice">Trier par catégories :</label>
                        <select id='sortCategory' value={category} onChange={(e) =>setCategory(e.target.value)} className='mx-1 border-0' style={{outline:0}} >
                            <option value=''>All Menu</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Cake">Cake</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Salad">Salad</option>
                            <option value="Sandwich">Sandwich</option>
                        </select>
                        <div className='row'>
                            {sortedArticles.length === 0 ? (
                                <div className=" h1  my-5">Aucun <span className='text-danger'> Plats n'est disponible </span></div>
                            ) : (
                                sortedArticles.map((article) => (
                                    <div className="col-md-6 col-lg-3 my-4" key={article.id}>
                                        <Card produit={article}/>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
