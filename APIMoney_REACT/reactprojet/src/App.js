import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Compte from './Components/Compte/Compte';
import Transactions from './Components/Transactions/Transactions';
import Rapport from './Components/Rapport/Rapport';
import Presentation from './Components/Presentation/Presentation';
import Signup from './Components/Signup/Signup';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import useToken from './Components/App/useToken';
import useData from './Components/App/useData';
import useDataCompte from './Components/App/useDataCompte';



// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }


function App() {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken();

  const { recupU, setData } = useData(); 

  const { recupC, setDataCompte} = useDataCompte();

// Se deconnecter: effacer la valeur du token
  const Deconnect = e => {
    e.preventDefault();
  setToken({token:false})

  }

  // creation bandeau horizontal
  const band = <nav className="navbar navbar-light bg-light">
  <div className="container-fluid">
      <Link to="/" className="navbar-brand"><img src="/logo_apimoney.png" style={{height:"50px"}}/>SHAKE YOUR MONEY MAKER</Link>
  </div>
</nav> 

// creation side bar
const sidebar = <div className="col-4 text-white bg-dark p-0" style={{width: "280px"}}>
  <div className="bg-dark p-3" style={{position:"fixed", height:"100%", width:"280px"}}>
  <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
  <span className="fs-4 text-uppercase">{recupU.nom} {recupU.prenom}</span>
  </Link>
  <hr />
  <ul className="nav nav-pills flex-column mb-auto">
    <li className="nav-item">
      <Link to="/dashboard" className="nav-link text-white" aria-current="page">
        Dashboard
      </Link>
    </li>
    <li>
      <Link to="/transactions" className="nav-link text-white">
        Transactions
      </Link>
    </li>
    <li>
      <Link to="/compte" className="nav-link text-white">
        Compte
      </Link>
    </li>
    <li>
      <Link to="/rapport" className="nav-link text-white">
        Rapport
      </Link>
    </li>
    <li>
      <button className="btn btn-outline-danger me-2" onClick={Deconnect}>Se deconnecter</button>
    </li>
  </ul>
  </div>
</div>

  
  // const token = getToken();
  if(!token) {
    // return <Login setToken={setToken} />
    return (
      <BrowserRouter>    
        <Switch>
          <Route path="/login">
          {band}
            <Login setToken={setToken} setData={setData} setDataCompte={setDataCompte}/>
          </Route>
          <Route path="/signup">
          {band}
            <Signup />
          </Route>
          <Route path="/">
            <Presentation />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
  
  return (
    <div className="wrapper">
      <BrowserRouter>
      {band}
      <div className="row">
      {sidebar}
      <div className="col-8">
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/compte">
            <Compte data={recupU} data_compte={recupC}/>
          </Route>
          <Route path="/transactions">
            <Transactions data={recupU} data_compte={recupC} setDataCompte={setDataCompte}/>
          </Route>
          <Route path="/rapport">
            <Rapport data_compte={recupC}/>
          </Route>
        </Switch>
        </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
