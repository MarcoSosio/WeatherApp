import './searchBar.scss';
import getWeather from '../../services/getWeather';
import { useContext, useRef, useState} from 'react';
import Context from '../../Context';
import TipBar from './TipBar/TipBar';
import { TIP_BAR_STATES } from '../../constants/constants.js';
import searchIcon from  "./assets/searchIcon.svg";

export default function SearchBar() {
    const context = useContext(Context);
    const { dataState } = context;
    const [, setData] = dataState;

    const inputRef=useRef()
    const [inputValue, setInputValue] = useState(''); //valore input
    const [tipCity, setTipCity] = useState(''); //suggerimento

    const [tipBarStatus, setTipBarStatus] = useState(TIP_BAR_STATES.VISIBLE);

    function searchCity(city) { //city=inputvalue || tipCity
        if (!city) return
        
        getWeather(city)
            .then((result) => {
                setData(result); 
                setTipBarStatus(TIP_BAR_STATES.HIDDEN);
                // modifico il testo dell'input inserendo il risultato della ricerca
                if (!result.error && inputValue != result.location.name) {
                    setInputValue(result.location.name);
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
                    setTipBarStatus(TIP_BAR_STATES.VISIBLE)
                } else {
                    setTipBarStatus(TIP_BAR_STATES.NOTHING_FOUND)
                    setTipCity('');
                }
            })
            .catch((err) => console.error('Errore ' + err));
    }

    function handlerInsert(e) {
        setInputValue(e.target.value);
        searchTip(e.target.value);
        if(tipBarStatus==TIP_BAR_STATES.HIDDEN){
            setTipBarStatus(TIP_BAR_STATES.VISIBLE)
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
                autoComplete="off" //blocca i suggerimenti
            ></input>
            <button
                id="search-button"
                onClick={handlerSearch}
                disabled={inputValue ? false : true}
            >
                <img src={searchIcon} id="icon"></img>
            </button>

            <TipBar
                tipCity={tipCity}
                searchCity={searchCity}
                tipBarStatus={tipBarStatus}
            ></TipBar>
        </div>
    );
}
