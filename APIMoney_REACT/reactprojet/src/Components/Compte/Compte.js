import React from 'react';

// access control comptes: authenticated fully, recuperation du token avec JSON parse 
// let storage = JSON.parse(localStorage.getItem('token'))

//recuperation de l'API, fetch avec Bearer token
// async function recupUser() {
//   // console.log(localStorage.getItem('token'))

  
//     return fetch('http://localhost:5000/api/get/me', {
//       method: 'GET',
//       headers: {
//         'Authorization': 'Bearer '+ storage.token,
//         'Content-Type': 'application/json'
//       },
//       // body: JSON.stringify(nom, prenom, tel, adresse)
//     })
//       .then(data => data.json())
//    }


//    async function recupAccount(url) {
//     return fetch("http://localhost:5000"+url, {
//       method: 'GET',
//       headers: {
//         'Authorization': 'Bearer '+ storage.token,
//         'Content-Type': 'application/json'
//       },
//       // body: JSON.stringify(numero, montant)
//     })
//       .then(data => data.json())
//    }



export default function Compte({data, data_compte}){
  // const [data, setData] = React.useState();
  // const [data_compte, setData_compte] = React.useState();

//   React.useEffect( async ()=> {
      
//     const recupU = await recupUser()
//       setData(recupU);
//     const recupC = await recupAccount(recupU["compte"])
//    setData_compte(recupC);
  
// }, []);


    let html
    if(data && data_compte) {
     html = <div className="card text-black mb-3 align-items-center sticky-md-top" style={{width: "18rem;"}}>

              <ul className="list-group list-group-flush">
                <li className="list-group-item"><span><b>Compte N°: </b></span>{data_compte.numero}</li>
                <li className="list-group-item"><span><b>Solde: </b></span>{data_compte.montant} €</li>
              </ul>

              <div className="card-body">
                <a href="/transactions" className="card-link">Nouvelle transaction</a>
              </div>
      </div>
      
    }
    return(
    <div>
      
     <div>{html}</div>
        

        
    </div>
        )
    }

    




    