import axios from "axios"

const countryUrl = "https://api.openweathermap.org/data/2.5/forecast?"
const api_key = import.meta.env.VITE_SOME_KEY

const getCountry = country => {
    const request = axios.get(`${countryUrl}lat=${country?.capitalInfo?.latlng[0]}&lon=${country?.capitalInfo?.latlng[1]}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default { getCountry }