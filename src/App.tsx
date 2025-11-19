import React, { useEffect, useState } from "react";
import headerStyles from "./styles/header.module.scss";
import layoutStyles from "./styles/App.module.scss";
import cardStyles from "./styles/card.module.scss";
import type { Country } from "./types/country";

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
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

  const regions = Array.from(new Set(countries.map((c) => c.region))).sort();
  const filtered = countries.filter(
    (c) =>
      c.name.common.toLowerCase().includes(inputValue.toLowerCase()) &&
      (selectedRegion === "All" || c.region === selectedRegion)
  );

  return (
    <div className={layoutStyles.app}>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerControls}>
          <input
            className={headerStyles.searchInput}
            placeholder="Search countries..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select
            className={headerStyles.regionSelect}
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

      <div className={layoutStyles.counter}>
        Total countries found: {filtered.length}
      </div>

      <div className={layoutStyles.countryList}>
        {filtered.map((country) => {
          const isSelected =
            selectedCountry?.name.common === country.name.common;
          return (
            <article
              key={country.name.common}
              className={`${cardStyles.countryItem} ${
                isSelected ? cardStyles.expanded : ""
              }`}
              onClick={() => setSelectedCountry(isSelected ? null : country)}
            >
              <div className={cardStyles.leftSide}>
                <div className={cardStyles.flagWrap}>
                  <img
                    src={country.flags.svg || country.flags.png}
                    alt={country.name.common}
                  />
                </div>
                <h3>{country.name.common}</h3>
              </div>

              {isSelected && (
                <div className={cardStyles.rightSide}>
                  <p>
                    <strong>Official:</strong> {country.name.official}
                  </p>
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
            </article>
          );
        })}
      </div>
    </div>
  );
}
