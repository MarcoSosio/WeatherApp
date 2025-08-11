import './searchBar.scss';
import getWeather from '../../services/getWeather';
import { useContext, useState} from 'react';
import Context from '../../Context';
import TipBar from './tipBar/TipBar';

export default function SearchBar() {
    const context = useContext(Context);
    const { dataState } = context;
    const [, setData] = dataState;

    const [inputValue, setInputValue] = useState(''); //valore input
    const [tipCity, setTipCity] = useState(''); //suggerimento

    function searchCity(city) {
        if (!city) return

        getWeather(city)
            .then((result) => {
                setData(result);

                // modifico il testo dell'input inserendo il risultato della ricerca
                if (!result.error && city != result.location.name) {
                    setInputValue(result.location.name);
                }
            })
            .catch((err) => console.error('Errore ' + err));
    }

    function searchTip(city){ //cerca il suggerimento
        if (!city) return;

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
        }
    }

    //handlers

    function handlerInsert(e) {
        setInputValue(e.target.value);
        searchTip(e.target.value);
    }

    // eslint-disable-next-line no-unused-vars
    function handlerSearch(e) {
        //bottone diabilitato se !inputvalue
        searchCity(inputValue);
    }

    function handlerEnterKeyDown(e) {
        if (e.key === 'Enter') {
            acceptTip(tipCity);
            searchCity(tipCity);
        }
    }

    return (
        <>
            <input
                type="text"
                onChange={handlerInsert}
                placeholder="Search a city by name"
                onKeyDown={handlerEnterKeyDown}
                value={inputValue}
            ></input>
            <button onClick={handlerSearch} disabled={inputValue ? false : true}>
                Cerca
            </button>
            <TipBar tipCity={tipCity} acceptTip={acceptTip}></TipBar>
        </>
    );
}
