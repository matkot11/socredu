import styles from "./search.module.scss";
import Input from "@/components/input/Input";
import { useState } from "react";
import SearchIcon from "@/assets/icons/SearchIcon";

const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <div className={styles.contentInputWrapper}>
      <Input
        placeholder="Search for lesson"
        name="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className={styles.contentInput}
      />
      <SearchIcon className={styles.contentSearch} />
    </div>
  );
};

export default Search;
