import './searchBar.scss';
import getWeather from '../../services/getWeather';
import { useContext, useRef, useState} from 'react';
import Context from '../../Context';
import TipBar from './tipBar/TipBar';

export default function SearchBar() {
    const context = useContext(Context);
    const { dataState } = context;
    const [, setData] = dataState;

    const inputRef=useRef()
    const [inputValue, setInputValue] = useState(''); //valore input
    const [tipCity, setTipCity] = useState(''); //suggerimento

    const [hideTipBar, setHideTipBar]=useState(false);

    function searchCity(city) { //city=inputvalue || tipCity
        if (!city) return
        
        getWeather(city)
            .then((result) => {
                setData(result); 
                // modifico il testo dell'input inserendo il risultato della ricerca
                if (!result.error && city != result.location.name) {
                    setInputValue(result.location.name);
                    setHideTipBar(true)
                    inputRef.current.blur() //tolgo il focus
                }
            })
            .catch((err) => console.error('Errore ' + err));
    }

    function searchTip(city){ //city=inputValue
        if (!city) {
            setTipCity('');
            return;
        }

        getWeather(city)
            .then((result) => {
                if (!result.error) {
                    setTipCity(result.location.name);
                } else {
                    setTipCity('');
                }
            })
            .catch((err) => console.error('Errore ' + err));
    }

    function acceptTip(tipCity) {
        if(tipCity){
            setInputValue(tipCity);
            inputRef.current.focus();
        }
    }

    //handlers

    function handlerInsert(e) {
        setInputValue(e.target.value);
        searchTip(e.target.value);
        if(hideTipBar){
            setHideTipBar(!hideTipBar)
        }
    }

    // eslint-disable-next-line no-unused-vars
    function handlerSearch(e) {
        //bottone diabilitato se !inputvalue
        searchCity(inputValue);
    }

    function handlerEnterKeyDown(e) {
        if (e.key === 'Enter') {
            searchCity(inputValue);
        }
    }

    return (
        <div id="SearchBar">
                <input
                    id="city-input"
                    type="text"
                    onChange={handlerInsert}
                    placeholder="Search a city by name"
                    onKeyDown={handlerEnterKeyDown}
                    value={inputValue}
                    ref={inputRef}
                    autoComplete='off' //blocca i suggerimenti
                ></input>
                <button
                    id="search-button"
                    onClick={handlerSearch}
                    disabled={inputValue ? false : true}
                >
                    <img src="/searchIcon.svg" id="icon"></img>
                </button>

            <TipBar tipCity={tipCity} acceptTip={acceptTip} hideTipBar={hideTipBar}></TipBar>
        </div>
    );
}
