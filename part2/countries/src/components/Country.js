import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({currentCountry}) => {
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)
    const [weather, setWeather] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
    
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + currentCountry.capital + "&units=metric&appid=" + process.env.REACT_APP_API_KEY)
          .then(response => {
            const apiResponse = response.data;
            setWeather(apiResponse)
            setLoading(false)
          }).catch(error => {
            console.log(error);
          })
        }, [])
    
    if (isLoading) {
        return <p>Loading...</p>
    }
    
    return (
        <>
           <h1>{capitalize(currentCountry.name.common)}</h1>
           <p>capital {currentCountry.capital}</p>
           <p>area {currentCountry.area}</p>
           <p><b>languages: </b></p>
           <ul>
            {Object.values(currentCountry.languages).map((l) => <li key={l}>{l}</li>)}
           </ul>
           <img src={currentCountry.flags.png} />
           <h2>Weather in {currentCountry.capital}</h2>
           <p>temperature {weather.main.temp} Celsius</p>
           <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} />
           <p>wind {weather.wind.speed} m/s</p>
        </>
    )
}

export default Country