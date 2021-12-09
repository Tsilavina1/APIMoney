import React, {useState} from 'react';


async function signupUser(email, nom, prenom, tel, adresse, password) {
    return fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email, nom, prenom, tel, adresse, password)
    })
      .then(data => data.json())
   }


   async function newAccount(numero, montant, userfk) {
     let body = {
      "numero": numero,
      "montant": montant,
      "userfk": userfk
    
     }
    return fetch('http://localhost:5000/api/comptes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(data => data.json())
   }

   function accountNb(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return parseInt(result);
}


export default function Signup(){
    const [email, setEmail] = useState();
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [tel, setTel] = useState();
    const [adresse, setAdresse] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await signupUser({
          email,
          nom,
          prenom,
          tel,
          adresse,
          password
        });
// console.log(data["@id"])
    await newAccount(accountNb(4), 0, data["@id"])
    window.location.href = "/login";
      }
    
    return(
    <div className="login-wrapper">
        <h1>S'inscrire</h1> <br />
        <form onSubmit={handleSubmit}>
        <label>
            <p>Email</p> 
            <input type="text" className="form-control" onChange={e => setEmail(e.target.value)} />
        </label> <br /> <br />
        <label>
            <p>Nom</p> 
            <input type="text" className="form-control" onChange={e => setNom(e.target.value)} />
        </label> <br /> <br />
        <label>
            <p>Prenom</p> 
            <input type="text" className="form-control" onChange={e => setPrenom(e.target.value)} />
        </label> <br /> <br />
        <label>
            <p>Telephone</p> 
            <input type="text" className="form-control" onChange={e => setTel(parseInt(e.target.value))} />
        </label> <br /> <br />
        <label>
            <p>Adresse</p> 
            <input type="text" className="form-control" onChange={e => setAdresse(e.target.value)} />
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
   