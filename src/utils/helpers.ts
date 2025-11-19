import type { Country } from "../types/country";

export function filterCountries(
  countries: Country[],
  search: string,
  region: string
) {
  return countries.filter(
    (c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase()) &&
      (region === "All" || c.region === region)
  );
}

export function getRegions(countries: Country[]) {
  return Array.from(new Set(countries.map((c) => c.region))).sort();
}
