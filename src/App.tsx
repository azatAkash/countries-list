import { useEffect, useState } from "react";
import type { Country } from "./types/country";
import styles from "./styles/App.module.scss";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  useEffect(() => {
    async function getCountries() {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population"
      );
      const data: Country[] = await response.json();
      setCountries(data);
    }

    getCountries();
  }, []);

  const regions: string[] = Array.from(
    new Set(countries.map((c) => c.region))
  ).sort();

  // Filter countries by name + region
  const filteredCountries: Country[] = countries.filter((country) => {
    const matchesName = country.name.common
      .toLowerCase()
      .includes(inputValue.toLowerCase());

    const matchesRegion =
      selectedRegion === "All" || country.region === selectedRegion;

    return matchesName && matchesRegion;
  });

  return (
    <>
      <header className="header">
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search countries..."
          />

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="All">All regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </header>

      <p>Total countries found: {filteredCountries.length}</p>

      <div className={styles.countryList}>
        {filteredCountries.map((country) => (
          <div className={styles.countryItem} key={country.name.common}>
            <img
              src={country.flags.png}
              alt={country.flags.alt ?? country.name.common}
            />
            <h3>{country.name.common}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
