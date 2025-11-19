import { useEffect, useState } from "react";
import type { Country } from "./types/country";

import Header from "./components/Header/Header";
import CountryList from "./components/CountryList/CountryList";

import layoutStyles from "./styles/App.module.scss";
import { filterCountries, getRegions } from "./utils/helpers";

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
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

  const regions = getRegions(countries);
  const filtered = filterCountries(countries, search, region);

  return (
    <div className={layoutStyles.app}>
      <Header
        search={search}
        region={region}
        regions={regions}
        onSearch={setSearch}
        onSelectRegion={setRegion}
      />

      <div className={layoutStyles.counter}>
        Total countries found: {filtered.length}
      </div>

      <CountryList
        countries={filtered}
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
      />
    </div>
  );
}
