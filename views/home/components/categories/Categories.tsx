import styles from "./categories.module.scss";
import Category from "@/views/home/components/category/Category";
import Header from "@/components/header/Header";
import {categories} from "@/data/categories";

const Categories = () => (
  <div>
    <Header text="Categories" />
    <div className={styles.categories}>
      {categories.map(({ id, display, name, icon }) => (
        <Category key={id} display={display} name={name} icon={icon} />
      ))}
    </div>
  </div>
);

export default Categories;
