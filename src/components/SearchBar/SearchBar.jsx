import './searchBar.scss';
import getWeather from '../../services/getWeather';
import { useContext, useState, useRef } from 'react';
import Context from '../../Context';
import TipBar from './tipBar/TipBar';

export default function SearchBar() {
    const context = useContext(Context);
    const { dataState } = context;
    const [, setData] = dataState;

    const [city, setCity] = useState();
    const [tipCity, setTipCity] = useState();

    const inputRef = useRef();

    function handlerInsert(e) {
        setCity(e.target.value);

        getWeather(e.target.value)
            .then((result) => {
                if (!result.error) {
                    setTipCity(result.location.name);
                } else {
                    setTipCity('');
                }
                console.log(result);
            })
            .catch((err) => console.error('Errore ' + err));
    }

    function handlerSearch() {
        getWeather(city)
            .then((result) => {
                setData(result);
                if (!result.error) {
                    inputRef.current.value = result.location.name;
                }
                console.log(result); //*provvisorio, debug
            })
            .catch((err) => console.error('Errore ' + err));
    }

    function handlerAccept(){
        inputRef.current.value=tipCity
    }
    return (
        <>
            <input
                ref={inputRef}
                type="text"
                onChange={handlerInsert}
                placeholder="Search a city by name"
                onKeyDown={(e) => {
                    e.key == 'Enter' && handlerAccept();
                    console.log(e.key);
                }}
            >
                
            </input>
            <button onClick={handlerSearch} disabled={city ? false : true}>
                Cerca
            </button>
            <TipBar tipCity={tipCity} inputRef={inputRef}></TipBar>
        </>
    );
}
