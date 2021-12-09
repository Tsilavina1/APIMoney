import React, {useState} from 'react';
import Select from 'react-select';


async function createTransaction(type, montant, date, userfk, comptefk, comptedestinataire){
   let data = {type, montant, date, userfk, comptefk, comptedestinataire}
   if(comptedestinataire == undefined) {
    data = {type, montant, date, userfk, comptefk}
   }
    return fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())

}
// Appel API pour mettre a jour les données du compte
async function updateTransaction(montant,url){
    // console.log(montant)
    return fetch('http://localhost:5000'+url, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({montant})
    })
        .then(data => data.json())

}


function currentdate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '/' + mm + '/' + dd;
// console.log(today);
    return today; 
}


//fonction transaction avec props permettant de recuperer les infos user et compte
//les props doivent passer dans app composant Transactions
//useState(1) pour mettre le choix 1 type dépôt par defaut

export default function Transactions({data, data_compte, setDataCompte}){
    const [type, setType] = useState(1);
    const [montant, setMontant] = useState();
    const [date, setDate] = useState(currentdate());
    const [comptedestinataire, setComptedestinataire] = useState(); 

    // console.log(data, data_compte);

    const handleSubmit = async e => {
        e.preventDefault();
        let newtransaction = await createTransaction(
            type,
            montant,
            date,
            data["@id"],
            data_compte["@id"],
            comptedestinataire

        );

        data_compte.transactions.push(newtransaction["@id"])

        if(type === 1) {
            let newmontant = data_compte.montant + montant
            setMontant(newmontant)
            data_compte.montant = newmontant
            alert('Dépôt effectué')
            // setMontant((data_compte) => data_compte.montant + montant);
        } else if (type === 3) {
            let newmontant = data_compte.montant - montant
            setMontant(newmontant)
            data_compte.montant = newmontant
            alert('Dépense effectuée')
            // setMontant((data_compte) => data_compte.montant - montant);
        } else {
            let storage = JSON.parse(localStorage.getItem('token'))

            var datadestinataire = await fetch('http://localhost:5000/api/comptes/'+ comptedestinataire, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ storage.token,
                'Content-Type':'application/json'
            },
           
    })
        .then(data => data.json())
        
            // console.log("destinataire", datadestinataire);

            let newmontant = data_compte.montant - montant
            setMontant(newmontant)
            data_compte.montant = newmontant


            let montantdest = datadestinataire.montant + montant
            // setMontant(montantdest)
            datadestinataire.montant = montantdest
            alert('Transfert effectué')

            await updateTransaction(datadestinataire.montant, "/api/comptes/" + comptedestinataire)
            // setDataCompte(data_compte);
        }
        
        //data_compte["@id"] correspond à l'url /api/comptes/id
        await updateTransaction(data_compte.montant, data_compte["@id"])
        setDataCompte(data_compte);

        
       
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Type</p>
                    <select onChange={e => setType(parseInt(e.target.value))}>
                        <option value="1">Dépôt</option>
                        <option value="2">Transfert</option>
                        <option value="3">Depense</option>
                    </select>
                </label> <br /> <br />

                <label>
                    <p>Montant</p>
                    <input type="number" className="form-control" style={{display:"inline", width:"90%"}} onChange={e => setMontant(parseInt(e.target.value))}/>€
                </label> <br /> <br />
                
                {type === 2 ? <div><label>
                
                    <p>Compte Destinataire</p>
                    <input type="text" className="form-control" onChange={e => setComptedestinataire(e.target.value)} /> 
                </label> <br/> <br/></div> : null} 

                <label>
                    <p>Date</p>
                    <input type="text" readOnly value={currentdate()} className="form-control" onChange={e => setDate(e.target.value)}/>
                </label> <br /> <br />

                <div> 
                <button type="submit" className="btn-dark">Valider</button>
                </div>

            </form>
        </div>


           
        );

}

   
    
