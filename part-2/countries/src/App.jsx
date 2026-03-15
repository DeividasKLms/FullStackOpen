import { useState, useEffect } from "react"
import axios from "axios"
import Nearest from "./components/Nearest"

const App = () => {
  const [value, setValue] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [viewWeather, setWeather] = useState([])

  useEffect(() => {
    if (!allCountries) 
      return null
    
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
        })
      }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      <Nearest 
      allCountries={allCountries} 
      input={value} 
      setInput={setValue}
      viewWeather={viewWeather}
      setWeather={setWeather}
      />
    </div>
  )
}

export default App
