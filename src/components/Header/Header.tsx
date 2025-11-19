import styles from "./header.module.scss";

interface Props {
  search: string;
  region: string;
  regions: string[];
  onSearch: (s: string) => void;
  onSelectRegion: (r: string) => void;
}

export default function Header({
  search,
  region,
  regions,
  onSearch,
  onSelectRegion,
}: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.headerControls}>
        <input
          className={styles.searchInput}
          placeholder="Search countries..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />

        <select
          className={styles.regionSelect}
          value={region}
          onChange={(e) => onSelectRegion(e.target.value)}
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
  );
}
