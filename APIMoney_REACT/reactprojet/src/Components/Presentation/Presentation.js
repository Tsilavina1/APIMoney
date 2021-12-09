import React from 'react';
import {Link} from 'react-router-dom';

export default function Presentation(){
    return(
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><img src="/logo_apimoney.png" style={{height:"50px"}}/>SHAKE YOUR MONEY MAKER</Link>
                    <form className="d-flex">
                        <Link className="btn btn-outline-success me-2" to="/signup">S'inscrire</Link>
                        <Link className="btn btn-sm btn-outline-secondary" to="/login">Se connecter</Link>
                    </form>
                    
                </div>
            </nav>
            <div>
                <h3>Gestion des operations bancaires</h3>
            </div>
        </div>
        )
    }