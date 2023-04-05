import React, { useState } from 'react'

const WeatherCard = ({ weather, temperature }) => {


  const [isCelsius, setIsCelsius] = useState(true)


  const handChangeTemperature = () => setIsCelsius(!isCelsius)

  return (
    <article className='content'>

      <div className='contentTitle'>
        <h1>Weather App</h1>
        <p>{weather?.name}, {weather?.sys.country}</p>
      </div>

      <section className='contentWeather'>
        <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
        <article className='contentDescription'>
          <h3>"{weather?.weather[0].description.split(' ').
            map(p => p[0].toUpperCase() + p.slice(1)).join(' ')}"</h3>

          <div className='contentList'>
            <div className='contentListSon'>

              <p>Wind Speed</p>
              <p>{weather?.wind.speed} m/s</p>
            </div>

            <div className='contentListSon'>
              <p>Clouds</p>
              <p>{weather?.clouds.all} %</p>
            </div>

            <div className='contentListSon'>
              <p>Pressure</p>
              <p>{weather?.main.pressure} hPa</p>
            </div>
          </div>

        </article>
      </section>

      <footer className='contentChange'>
        <h1>{
          isCelsius
            ? `${temperature?.celsius} °C`
            : `${temperature?.fahrenheit} °F`
        }
        </h1>
        <button onClick={handChangeTemperature}> Change to {isCelsius?  '°F ': '°C'}</button>
      </footer>

    </article>
  )
}

export default WeatherCard