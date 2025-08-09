import "./searchBar.scss"
import getWeather from "../services/getWeather";
import { useContext } from "react";
import Context from "../Context";

export default function SearchBar(){
    const context=useContext(Context)
    const {cityState}=context;
    const [city, setCity]=cityState

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
            <input type="text" onChange={handlerInsert}></input>
            <button onClick={handlerSearch}>Cerca</button>
        </>
    );
}