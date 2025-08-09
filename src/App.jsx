import './App.scss'
import getWeather from './getWeather'
import { useState } from 'react';

function App() {
  const [city,setCity]=useState();

  function handlerInsert(e){
    setCity(e.target.value)
  }

  function handlerSearch(){
    getWeather(city)
    .then(result => console.log(result))
    .catch(()=>console.error("errore"))
  }

  return (
    <>
      <input type='text' onChange={handlerInsert}></input>
      <button onClick={handlerSearch}>Cerca</button>
    </>
  )
}

export default App
