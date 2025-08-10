import "./searchBar.scss"
import getWeather from "../../services/getWeather";
import { useContext, useState, useRef } from "react";
import Context from "../../Context";

export default function SearchBar(){

    const context=useContext(Context)
    const {dataState}=context;
    const [, setData]=dataState;

    const [city, setCity] = useState();

    const inputRef = useRef();

    function handlerInsert(e){
        setCity(e.target.value)
    }
    
    function handlerSearch(){
      getWeather(city)
      .then(result => {
          setData(result);
          if (!result.error) {
              inputRef.current.value = result.location.name;
          }
          console.log(result); //*provvisorio, debug
      }) 
      .catch(()=>console.error("errore"))
    }
    return (
        <>
            <input ref={inputRef} type="text" onChange={handlerInsert} placeholder="Search a city by name"></input>
            <button onClick={handlerSearch} disabled={city ? false : true}>Cerca</button>
        </>
    );
}