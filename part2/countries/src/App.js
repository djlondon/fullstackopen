import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filterState }) => (
  <div>
    find countries: <input value={filterState.val} onChange={filterState.handler} />
  </div>
)

const Weather = ({ lat, long }) => {
  const [weather, setWeather] = useState({})
  useEffect(() => {
    axios
      .get("https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: lat,
            longitude: long,
            current_weather: true,
            windspeed_unit: "mph"
          }
        })
      .then(response => {
        console.log(response.data)
        setWeather(response.data.current_weather)
      })
  }, [])
  return (
    <>
      <p>temperature {weather.temperature} °C</p>
      <p>wind {weather.windspeed} mph</p>
    </>
  )
}

const Country = ({ country }) => {
  const [lat, long] = country.capitalInfo.latlng

  return (<div>
    <h2>{country.name.common} </h2>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h3>languages:</h3>
    <ul>{Object.values(country.languages).map(v => <li>{v}</li>)}</ul>
    <img src={country.flags.png} />
    <h3>Weather in {country.capital}</h3>
    <Weather lat={lat} long={long} />
  </div>)
}

const CountryBrief = ({ country, setCountry }) => {
  const showCountry = (event) => {
    event.preventDefault()
    setCountry(country.ccn3)
  }

  return (<li>
    {country.name.common}
    <form onSubmit={showCountry}>
      <button>show</button>
    </form>
  </li>)
}

const Countries = ({ countries, filterName, country, setCountry }) => {
  const countriesToShow = countries.filter(country =>
    country.name.common.toLocaleLowerCase().includes(filterName.toLocaleLowerCase()) ||
    country.cca3 === filterName.toLocaleUpperCase()
  )
  console.log(countriesToShow)
  if (countriesToShow.length == 1) {
    return <Country country={countriesToShow[0]} />
  } else if (country !== '') {
    return <Country country={countriesToShow.find(v => v.ccn3 === country)} />
  }
  if (countriesToShow.length < 10) {
    return <ul>{countriesToShow.map(country => <CountryBrief key={country.ccn3} country={country} setCountry={setCountry} />)}</ul>
  } else {
    return <p>Too many countries too show.</p>
  }

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [currentCountry, setCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        // console.log(countries)
      })
  }, [])

  const filterState = {
    val: newFilter, handler: (event) => {
      setNewFilter(event.target.value)
      setCountry('')
    }
  }

  return (
    <div>
      <Filter filterState={filterState} />
      <Countries countries={countries} filterName={newFilter} country={currentCountry} setCountry={setCountry} />
    </div>
  )
}

export default App