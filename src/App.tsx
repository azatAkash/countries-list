import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function getCountries() {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population"
      );
      const data = await response.json();
      setCountries(data);
    }

    getCountries();
  }, []);

  return (
    <div className="country-list">
      {countries.map((country) => (
        <div className="country-item" key={country.name.common}>
          <img src={country.flags.png} alt={country.flags.alt} width={80} />

          <h3>{country.name.common}</h3>

          <p>
            <strong>Capital:</strong> {country.capital?.[0] ?? "—"}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
