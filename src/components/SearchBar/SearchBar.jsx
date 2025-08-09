import "./searchBar.scss"
import getWeather from "../../services/getWeather";
import { useContext, useState } from "react";
import Context from "../../Context";

export default function SearchBar(){

    const context=useContext(Context)
    const {dataState}=context;
    const [, setData]=dataState;

    const [city, setCity] = useState();

    function handlerInsert(e){
        setCity(e.target.value)
      }
    
      function handlerSearch(){
        getWeather(city)
        .then(result => {setData(result); console.log(result)}) //*provvisorio, debug
        .catch(()=>console.error("errore"))
      }
    return (
        <>
            <input type="text" onChange={handlerInsert}></input>
            <button onClick={handlerSearch}>Cerca</button>
        </>
    );
}