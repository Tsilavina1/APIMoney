import React, { useState} from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
  return fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

//Appel API pour recuperer données user
//recupUser et recupAccount avec parametre token et bearer + token 
//retour token de l'API {token:} donc token.token
async function recupUser(token) {
  // console.log(localStorage.getItem('token'))

  // console.log(token);
    return fetch('http://localhost:5000/api/get/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ token,
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(nom, prenom, tel, adresse)
    })
      .then(data => data.json())
   }

//Appel API recuperer données compte user. url: /api/comptes/id

async function recupAccount(url, token) {
  return fetch("http://localhost:5000"+url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(numero, montant)
  })
    .then(data => data.json())
 }


export default function Login({setToken, setData, setDataCompte}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);

    const recupU = await recupUser(token.token)
    setData(recupU);

    // "compte": "/api/comptes/id"
    const recupC = await recupAccount(recupU["compte"], token.token)
    setDataCompte(recupC);

    
   
    // window.location.href = "/dashboard";
  }



  return(
    <div className="login-wrapper">
        <h1>Se connecter</h1> <br />
        <form onSubmit={handleSubmit}>
        <label>
            <p>Email</p> 
            <input type="text" className="form-control" onChange={e => setEmail(e.target.value)} />
        </label> <br /> <br />
        <label>
            <p>Mot de passe</p>
            <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div> <br /> <br />
            <button type="submit" className=" form-control btn-primary">Valider</button>
        </div>
        </form>
    </div>
  )
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}