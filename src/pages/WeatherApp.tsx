import { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import CitySearch from './CitySearch';
import Loading from './Loading';
import { useSearchParams } from 'react-router-dom';
import WeatherCard from './WeatherCard';
import Maps from './Maps';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const selectedCity = searchParams.get('city');
    console.log(selectedCity);
    if (selectedCity) {
      setLoading(true);
      setError(null);
      const url = 'https://api.open-meteo.com/v1/forecast';
      async function fetchData(API_URL: string) {
        try {
          const data = await fetchWeatherApi(API_URL, {
            latitude: searchParams.get('lat'),
            longitude: searchParams.get('lon'),
            hourly: 'temperature_2m',
          });
          setWeatherData(data[0]);
          setLoading(false);
        } catch (error: any) {
          setError(error.message);
          setLoading(false);
        }
      }
      fetchData(url);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = 'https://api.open-meteo.com/v1/forecast';
          async function fetchData(API_URL: string) {
            try {
              const data = await fetchWeatherApi(API_URL, {
                latitude: latitude,
                longitude: longitude,
                hourly: 'temperature_2m',
              });

              setWeatherData(data[0]);
              setLoading(false);
            } catch (error: any) {
              setError(error.message);
              setLoading(false);
            }
          }
          fetchData(url);

          setLoading(true);
          setError(null);
        },
        (error: any) => {
          setError('Unable to get location data');
        }
      );
    }
  }, [searchParams]);

  if (error == 'Unable to get location data') {
    return (
      <div>
        <div className="error">{error}</div>
        <CitySearch />
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="search-container">
        <div>{error}</div>
        <CitySearch />
      </div>
      {!weatherData && <Loading />}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
};

export default WeatherApp;
