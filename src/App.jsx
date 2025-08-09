import './App.scss'
import { useState } from 'react';
import Context from './Context';
import SearchBar from './components/searchBar';

function App() {
  const [city,setCity]=useState();

  return (
    <>
      <Context value={{
        cityState:[city,setCity]
      }}>

        <SearchBar></SearchBar>
        
      </Context>
    </>
  )
}

export default App
