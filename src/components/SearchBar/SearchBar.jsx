import './searchBar.scss';
import getWeather from '../../services/getWeather';
import { useContext, useState, useRef} from 'react';
import Context from '../../Context';
import TipBar from './tipBar/TipBar';

export default function SearchBar() {
    const context = useContext(Context);
    const { dataState } = context;
    const [, setData] = dataState;

    const [city, setCity] = useState(""); //valore input
    const [tipCity, setTipCity] = useState(""); //suggerimento
 
    const inputRef = useRef();

    function handlerInsert(e) {
        setCity(e.target.value);

        getWeather(e.target.value)
            .then((result) => {
                //inserisco il suggerimento 
                if (!result.error) {
                    setTipCity(result.location.name);
                } else {
                    setTipCity('');
                }
            })
            .catch((err) => console.error('Errore ' + err));
    }

    // eslint-disable-next-line no-unused-vars
    function handlerSearch(e) {
        getWeather(city)
            .then((result) => {
                setData(result);

                // modifico il testo dell'input inserendo il risultato della ricerca
                if (!result.error) {
                    setCity(result.location.name);
                }
            })
            .catch((err) => console.error('Errore ' + err));
    }

    function handlerEnterKeyDown(e){
      if(e.key==="Enter"){
        acceptTip(tipCity)
        getWeather(tipCity)
            .then((result) => {
                setData(result);
            })
            .catch((err) => console.error('Errore ' + err));
      }
    }
    
    function acceptTip(tipCity){
      if(tipCity){
        setCity(tipCity)
      }
        
    }
    return (
        <>
            <input
                ref={inputRef}
                type="text"
                onChange={handlerInsert}
                placeholder="Search a city by name"
                onKeyDown={handlerEnterKeyDown}
                value={city}
            >
                
            </input>
            <button onClick={handlerSearch} disabled={city ? false : true}>
                Cerca
            </button>
            <TipBar tipCity={tipCity} acceptTip={acceptTip}></TipBar>
        </>
    );
}
