import { useEffect, useState } from "react";
import type { Country } from "./types/country";
import styles from "./styles/App.module.scss";

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    async function getCountries() {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population"
      );
      const data: Country[] = await res.json();
      setCountries(data);
    }
    getCountries();
  }, []);

  const regions: string[] = Array.from(
    new Set(countries.map((c) => c.region))
  ).sort();

  const filteredCountries = countries.filter((country) => {
    const matchesName = country.name.common
      .toLowerCase()
      .includes(inputValue.toLowerCase());

    const matchesRegion =
      selectedRegion === "All" || selectedRegion === country.region;

    return matchesName && matchesRegion;
  });

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerControls}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search countries..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <select
            className={styles.regionSelect}
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="All">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </header>

      <p className={styles.counter}>
        Total countries found: {filteredCountries.length}
      </p>

      <div className={styles.countryList}>
        {filteredCountries.map((country) => {
          const isSelected =
            selectedCountry?.name.common === country.name.common;

          return (
            <div
              key={country.name.common}
              className={`${styles.countryItem} ${
                isSelected ? styles.expanded : ""
              }`}
              onClick={() => setSelectedCountry(isSelected ? null : country)}
            >
              <div className={styles.leftSide}>
                <div className={styles.flagWrap}>
                  <img
                    src={country.flags.svg || country.flags.png}
                    alt={country.name.common}
                  />
                </div>
                <h3>{country.name.common}</h3>
              </div>

              {isSelected && (
                <div className={styles.rightSide}>
                  <p>
                    <strong>Capital:</strong> {country.capital?.[0] ?? "—"}
                  </p>
                  <p>
                    <strong>Region:</strong> {country.region}
                  </p>
                  <p>
                    <strong>Population:</strong>{" "}
                    {country.population.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
