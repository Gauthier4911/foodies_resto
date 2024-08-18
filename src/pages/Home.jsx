import React from 'react'
import {Link} from "react-router-dom";
import {food_list} from "../../data.jsx";
import Card from "../component/Card.jsx";

export default function Home() {
    return (
        <main className="container-fluid my-5">
            <div className="my-3">a</div>
            <div className="schema rounded-top position-relative">
                <div className="container text-start position-absolute top-50 start-50 translate-middle" style={{ zIndex: 1 }}>
                    <h3 className="text-white">Commande ta nourriture favorite ici</h3>
                    <p className="text-white">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br/>
                        Ad asperiores beatae culpa dignissimos dolorum est eveniet laborum minus molestias nam non odio perferendis possimus repellat, sapiente. <br/>
                        Aliquid atque aut eos!
                    </p>
                    <Link to="/menu" type="button" className="rounded-pill btn btn-outline-primary">
                        Voir les menus
                    </Link>
                </div>
            </div>
            <div className="container">
                <h3 className=" my-2" >Meilleurs des repas chez vous</h3>
                <div className="row">
                    {
                        food_list.map((item,id)=>{
                            return(
                                <div className="col-md-6 col-lg-3 my-3" key={id}>
                                    <Card
                                        produit={item}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}