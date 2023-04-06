import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'
import ErrorFetch from './components/ErrorFetch'



function App() {
  const [latlom, setLatlom] = useState()
  const [weather, seTweather] = useState()
  const [inputValue, setInputValue] = useState('Lima')
  const [temperature, setTemperature] = useState()

  const [cityLatLon, setCityLatLon] = useState(true)
  const [hasError, setHasError] = useState(false)



  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setLatlom(obj)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])



  useEffect(() => {
    if (latlom) {
      const apiKey = 'dd4f1def13a903697fdd93e8cd2fb9e2'
      const url0 = `https://api.openweathermap.org/data/2.5/weather?lat=${latlom.lat}&lon=${latlom.lon}&appid=${apiKey}&lang=es`
      const url = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&q=${inputValue || 'Lima'}&lang=es`


      axios.get(cityLatLon
        ? url0
        : url)
        .then(res => {

          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const fahrenheit = (celsius * 9 / 5 + 32).toFixed(1)
          setTemperature({ celsius, fahrenheit })
          seTweather(res.data)
          setHasError(false)

        })
        .catch(err => {
          console.log(err)
          setHasError(true)
          setTimeout(() => {
            setHasError(false)
          }, 1500)
        })
    }
  }, //[inputValue])
    [cityLatLon
      ? latlom
      : inputValue])







  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(e.target.nameCity.value.toLowerCase().trim())
    e.target.nameCity.value = ''
  }

  const appStyle = {
      backgroundImage: weather
                  ? `url('/imgWheather/${weather?.weather[0].icon}.jpg')`
                  : `url('/imgWheather/01d.jpg')`
  }
 
  const weatherLatLon = () => setCityLatLon(true)
  const weatherCity = () => setCityLatLon(false)


  return (
    <div style={appStyle} className="App">
      {
        weather ? (
          <div className='container'>
            <form className='formCity' onSubmit={handleSubmit}>
              <input id='nameCity' type="text" placeholder='Ingrese la Ciudad ' />
              <button onClick={weatherCity} >Buscar</button>
            </form>
          
            {
              hasError
                ? <ErrorFetch />
                : <WeatherCard
                  weather={weather}
                  temperature={temperature} />
            }

            {cityLatLon
              ? ''
              : <button className='seeLocation' onClick={weatherLatLon}> See According to my Location </button>
            }
          </div>
        )
          :
          <Loading />
      }


    </div>
  )
}

export default App
