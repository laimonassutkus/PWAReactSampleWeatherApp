import axios from "axios";

const URL = 'https://api.weatherapi.com/v1/current.json';
const API_KEY = '48c91b0d8343496997b164941240303'

export const fetchWeather = async (query) => {
    const response = await axios.get(URL, {
        params: {
            q: query,
            key: API_KEY
        }
    })

    return response.data
}