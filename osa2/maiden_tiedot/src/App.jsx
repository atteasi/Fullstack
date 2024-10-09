import { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = ({ countries }) => {
  if (countries.length === 0) {
    return <div>No matches found</div>
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length < 1) {
    return <div>
      {countries.map(country => 
        <div key={country.name}>
          {country.name}
        </div>
      )}
    </div>
  } else if (countries.length === 1) {
    const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${countries[0].name}`
    let country = []
    weather
    axios.get(baseUrl).then(response => {
      country = response.data
    })
    return( 
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => 
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt="flag" width="100" height="100"/>
      <h1>Weather in {country.capital}</h1>
      <p>temperature: </p>
      <img src="" alt="weather" width="100" height="100"/>
      <p>wind: </p>
    </div>

    )
  }
}

function App() {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setCountries(response.data)
    })
  }, [])

  const matches = countries.filter(country => 
    country.name && typeof country.name === 'string' && country.name.toLowerCase().includes(search.toLowerCase())
  )

return (
  <div>
    find countries<input value={search} onChange={(event) => {
       console.log(search);
       console.log(matches)
       setSearch(event.target.value);
     }} />
    <Countries countries = {matches}/>
  </div>
)
}

export default App
