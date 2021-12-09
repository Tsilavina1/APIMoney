import React from 'react';
import { VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryStack,
    VictoryLegend,
    VictoryAxis } from 'victory';

let storage = JSON.parse(localStorage.getItem('token'))
async function detailtransaction(url) {
console.log(storage)
    return fetch('http://localhost:5000'+url, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer '+ storage.token,
          'Content-Type':'application/json'
      },
     
  })
      .then(data => data.json())
  
  
}



export default async function Rapport({data_compte}){
// console.log(data_compte)
let sommejan = 0
let sommefev = 0
let sommemars = 0
let sommeavr = 0
let sommemai = 0
let sommejuin = 0
let sommejuil = 0
let sommeaout = 0
let sommesept = 0
let sommeoct = 0
let sommenov = 0
let sommedec = 0


  for(let i = 0; i<data_compte.transactions.length; i++){

 let detail = await detailtransaction(data_compte.transactions[i])

 const date = detail.date
 const mois = date.split("-");


 if(mois[1] === '01') {
   if(detail.type === 1 && detail.type === 3){
    sommejan += detail.montant
   }
   
 } else if(mois[1] === '02') {
  if(detail.type === 1 && detail.type === 3){
    sommefev += detail.montant
   }
 } else if(mois[1] === '03') {
  if(detail.type === 1 && detail.type === 3){
    sommemars += detail.montant
   }
 } else if(mois[1] === '04') {
  if(detail.type === 1 && detail.type === 3){
    sommeavr += detail.montant
   }
 } else if(mois[1] === '5') {
  if(detail.type === 1 && detail.type === 3){
    sommemai += detail.montant
   }
 } else if(mois[1] === '6') {
  if(detail.type === 1 && detail.type === 3){
    sommejuin += detail.montant
   }
 } else if(mois[1] === '07') {
  if(detail.type === 1 && detail.type === 3){
    sommejuil += detail.montant
   }
 } else if(mois[1] === '08') {
  if(detail.type === 1 && detail.type === 3){
    sommeaout += detail.montant
   }
 } else if(mois[1] === '09') {
  if(detail.type === 1 && detail.type === 3){
    sommesept += detail.montant
   }
 } else if(mois[1] === '10') {
  if(detail.type === 1 && detail.type === 3){
    sommeoct += detail.montant
   }
 } else if(mois[1] === '11') {
  if(detail.type === 1 && detail.type === 3){
    sommenov += detail.montant
   }
 } else {
  if(detail.type === 1 && detail.type === 3){
    sommedec += detail.montant
   }
 }

}

    return(
        <div>
      <VictoryChart height={400} width={800}
      domain={{ x: [0,12] }}
      domainPadding={{ x: 30, y: 20 }}
      >
        <VictoryAxis />

        <VictoryLegend x={0} y={0}
              gutter={50}
              style={{title: {fontSize: 20 } }}
              data={[
                { name: "Dépot", symbol: { fill: "blue" } },
                { name: "Dépense", symbol: { fill: "red" } }
              ]}
            />
            <VictoryStack
              colorScale={["blue", "red"]}
            />
        <VictoryBar
          barRatio={1}
          cornerRadius={0} // Having this be a non-zero number looks good when it isn't transitioning, but looks like garbage when it is....
          style={{ data: { fill: "blue" } }}
          alignment="middle"
        //   labels={d => d.y}
          data={[
            { x: "Jan", y: sommejan },
            { x: "Fev", y: sommefev },
            { x: "Mars", y: sommemars },
            { x: "Avril", y: sommeavr },
            { x: "Mai", y: sommemai },
            { x: "Juin", y: sommejuin },
            { x: "Juil", y: sommejuil },
            { x: "Aout", y: sommeaout },
            { x: "Sept", y: sommesept },
            { x: "Oct", y: sommeoct },
            { x: "Nov", y: sommenov },
            { x: "Dec", y: sommedec }
          ], [
            { x: "Jan", y: sommejan },
            { x: "Fev", y: sommefev },
            { x: "Mars", y: sommemars },
            { x: "Avril", y: sommeavr },
            { x: "Mai", y: sommemai },
            { x: "Juin", y: sommejuin },
            { x: "Juil", y: sommejuil },
            { x: "Aout", y: sommeaout },
            { x: "Sept", y: sommesept },
            { x: "Oct", y: sommeoct },
            { x: "Nov", y: sommenov },
            { x: "Dec", y: sommedec }
          ]}
        />
      </VictoryChart>
    </div>
    )
}