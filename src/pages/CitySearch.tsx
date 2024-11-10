import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CitySearch = () => {
  const [searchParams, setsearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue) {
      const API_KEY = '60c907d8676c855bf7c4154744fb0dcf';
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          setShowSuggestions(true);
        })
        .catch((error) => console.error(error));
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (city: {
    name: string;
    lat: string;
    lon: string;
  }) => {
    setInputValue(city.name);
    setShowSuggestions(false);
    setsearchParams({ city: city.name, lat: city.lat, lon: city.lon });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue) {
      const matchingCity: any = suggestions.find(
        (city: { name: string; lat: string; lon: string }) =>
          city.name.toLowerCase() === inputValue.toLowerCase()
      );
      console.log(matchingCity);
      if (matchingCity) {
        setError(false);
        setsearchParams({
          city: matchingCity?.name,
          lat: matchingCity.lat,
          lon: matchingCity.lon,
        });
      } else {
        setError(true);
        setShowSuggestions(false);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="city-search-input"
          placeholder="Search"
        />
        <button type="submit" className="city-search-button">
          Go
        </button>
        {error && <div className="error">Sorry, no results found</div>}
      </form>

      {showSuggestions && (
        <ul className="city-search-suggestions">
          {suggestions.map((city: any, index) => (
            <li
              className="city-search-suggestion"
              key={index}
              onClick={() => handleSuggestionClick(city)}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CitySearch;
