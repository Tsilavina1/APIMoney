import { useState } from 'react';

export default function useData() {
    const getData = () => {
        const recupUString = localStorage.getItem('recupU');
        const userData = JSON.parse(recupUString);
        return userData
      };
    const [recupU, setData] = useState(getData());
    const saveData = userData => {
        // console.log(userData);
        localStorage.setItem('recupU', JSON.stringify(userData));
        setData(userData);
      };

      return {
        setData: saveData,
        recupU
      }

}