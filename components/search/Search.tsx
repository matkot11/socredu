import styles from "./search.module.scss";
import Input from "@/components/input/Input";
import { useState } from "react";
import SearchIcon from "@/assets/icons/SearchIcon";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await router.replace(`/home/search?search=${search}`);
  };

  return (
    <form className={styles.contentInputWrapper} onSubmit={handleSubmit}>
      <Input
        placeholder="Search for lesson"
        name="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className={styles.contentInput}
      />
      <SearchIcon className={styles.contentSearch} />
    </form>
  );
};
export default Search;
