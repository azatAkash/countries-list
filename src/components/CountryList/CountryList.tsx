import type { Country } from "../../types/country";

import CountryCard from "./CountryCard";
import styles from "./card.module.scss";

interface Props {
  countries: Country[];
  selectedCountry: Country | null;
  onSelectCountry: (c: Country | null) => void;
}

export default function CountryList({
  countries,
  selectedCountry,
  onSelectCountry,
}: Props) {
  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryCard
          key={country.name.common}
          country={country}
          selected={selectedCountry?.name.common === country.name.common}
          onSelect={onSelectCountry}
        />
      ))}
    </div>
  );
}
