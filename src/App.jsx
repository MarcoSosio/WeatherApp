import './App.scss';
import { useState } from 'react';
import Context from './Context';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import MainInfo from './components/MainInfo/MainInfo.jsx';

function App() {
    const [data, setData] = useState();

    return (
        <div id="App">
            <Context
                value={{
                    dataState: [data, setData],
                }}
            >
                <SearchBar></SearchBar>
                <MainInfo></MainInfo>
            </Context>
            {/* <div style={{width:"3000px", height:"100px", backgroundColor:"red" }}></div> */}
        </div>
    );
}

export default App;
