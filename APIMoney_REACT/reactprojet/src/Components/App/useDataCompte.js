import { useState } from 'react';

export default function useDataCompte() {
    const getDataCompte = () => {
        const recupCString = localStorage.getItem('recupC');
        const userDataCompte = JSON.parse(recupCString);
        return userDataCompte
      };
    const [recupC, setDataCompte] = useState(getDataCompte());
    const saveDataCompte = userDataCompte => {
        localStorage.setItem('recupC', JSON.stringify(userDataCompte));
        setDataCompte(userDataCompte);
      };

      return {
        setDataCompte: saveDataCompte,
        recupC
      }

}