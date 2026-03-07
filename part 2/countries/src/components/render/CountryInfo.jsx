import { useEffect } from "react"
import Weather from "./services/Weather"

const CountryInfo = ({ country, weather, setWeather }) => {
    useEffect(() => {
        console.log("country effect:", country)
        if (!country) 
            return null

        Weather
            .getCountry(country)
            .then(w => {
                console.log("country:", country)
                console.log("data:", w)
                setWeather(w)
            })
        }, [country])

    const icon = weather?.list?.[0]?.weather?.[0]?.icon
    const iconUrl = icon
    ? `https://openweathermap.org/payload/api/media/file/${weather?.list?.[0]?.weather?.[0]?.icon}.png`
    : null

    console.log(weather)

    return (
        <div>
            <h1>{country?.name?.common}</h1>
            <p>Capital {country?.capital}</p>
            <p>Area {country?.area}</p>

            <h2>Languages</h2>
            <ul>
                {Object.entries(country?.languages).map(([key, language]) =>
                    <li key={key}>{language}</li>   
            )}
            </ul>
            <img className="png" src={country.flags.png} />
            
            <h2>Weather in {country?.capital}</h2>

            <p> Temperature {(weather?.list?.[0]?.main?.temp - 273.15).toFixed(2)} Celsius </p>
            <img className="weather" src={iconUrl} />
            <p>Wind {weather?.list?.[0]?.wind?.speed.toFixed(1)} m/s</p>
        </div>
    )
}

export default CountryInfo