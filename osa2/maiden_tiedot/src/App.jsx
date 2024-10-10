import { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = ({ countries, setSearch }) => {
  if (countries.length > 10) { 
    return <p>Too many matches, specify another filter</p>
  }
  if (countries.length === 1) {
    const country = countries[0]
    const languages = Object.values(country.languages)
    console.log(languages)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {languages.map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} alt='flag' width='100px' />
      </div>
    )
  }
  return (
    <>
      {countries.map(country => 
        <div key={country.name.common}>{country.name.common} <button onClick={(event) =>{
          setSearch(country.name.common)
        }}>show</button></div>
      )}
    </>
  )
}

function App() {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setCountries(response.data)
      })
  }
  , [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      <Countries countries={countriesToShow} setSearch={setSearch} />
    </div>
  )
}

export default App
