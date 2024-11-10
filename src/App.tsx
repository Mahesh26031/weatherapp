import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import WeatherApp from './pages/WeatherApp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherApp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
