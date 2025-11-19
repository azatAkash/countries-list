import React from "react";
import type { Country } from "../../types/country";
import styles from "./card.module.scss";

interface Props {
  country: Country;
  selected: boolean;
  onSelect: (c: Country | null) => void;
}

export default function CountryCard({ country, selected, onSelect }: Props) {
  return (
    <article
      className={`${styles.countryItem} ${selected ? styles.expanded : ""}`}
      onClick={() => onSelect(selected ? null : country)}
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

      {selected && (
        <div className={styles.rightSide}>
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
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
        </div>
      )}
    </article>
  );
}
