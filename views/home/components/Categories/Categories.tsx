import styles from "./categories.module.scss";
import Category from "@/views/home/components/category/Category";
import { categories } from "@/views/home/data/categories";

const Categories = () => (
  <div>
    <span className={styles.header}>Categories</span>
    <div className={styles.categories}>
      {categories.map(({ id, name, icon }) => (
        <Category key={id} name={name} icon={icon} />
      ))}
    </div>
  </div>
);

export default Categories;
