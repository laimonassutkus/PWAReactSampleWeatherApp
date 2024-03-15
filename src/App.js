import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';

import './App.css'

const App = () => {
    const [query, setQuery] = useState('');
    const [city, setCity] = useState('');
    const [temp, setTemp] = useState('');
    const [error, setError] = useState('');

    const search = async (event) => {
        if(event.key === 'Enter') {
            console.log('Received "onKeyDown" & "Enter" was pressed, payload: ', event)

            try {
                const data = await fetchWeather(query);
                console.log('Successfully fetched data from weather API, payload: ', data);
                setTemp(data.current.temp_c)
                setCity(data.location.name)
                setError('')
            } catch (error) {
                const message = error.response.data.error.message
                console.log('Received an error from an API: ', message)
                setError('City not found.')
                setTemp('')
                setCity('')
            }

            // Reset query for a new search.
            setQuery('')
        }
    }

    return (
        <div className='background'>
            <div className='main-container'>
                <input
                    type='text'
                    className='search'
                    placeholder='Enter a city name ...'
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={search}
                />

                <div className='temperature'>
                    {temp !== '' ? (
                        <div>
                            <h1>{ temp }&deg;</h1>
                            <h4>{ city }</h4>
                        </div>
                    ) : null}

                    {error !== '' ? (
                        <div>
                            <p>{ error }</p>
                        </div>
                    ) : null}
                </div>
            </div>
            
        </div>
    )
}

export default App;