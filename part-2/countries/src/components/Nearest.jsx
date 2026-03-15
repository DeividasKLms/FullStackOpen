import RenderCountries from "./render/RenderCountries"
import CountryInfo from "./render/CountryInfo"

const Nearest = ({ allCountries, input, setInput, viewWeather, setWeather }) => {
    const searchNearest = input === ""
    ? []
    : allCountries.filter(c => c.name?.common?.toLowerCase().includes(input.toLowerCase()))

    if (searchNearest.length > 10) 
        return <div>Too many matches, specify another filter</div>

    if (searchNearest.length === 1)
        return <div> 
                <CountryInfo 
                country={searchNearest[0]} 
                weather={viewWeather} 
                setWeather={setWeather}
                />
               </div>

    return (
        <div>
            {searchNearest.map((c, index) => 
                <RenderCountries 
                key={index} 
                nearest={c} 
                setInput={setInput}
                />
            )}
        </div>
    )
}

export default Nearest