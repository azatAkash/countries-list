import { useEffect, useState } from "react";
import type { Country } from "./types/country";
import styles from "./styles/App.module.scss";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

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

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <div className={styles.countryItem} key={country.name.common}>
          <img
            src={country.flags.png}
            alt={country.flags.alt ?? country.name.common}
            width={120}
          />

          <h3>{country.name.common}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
