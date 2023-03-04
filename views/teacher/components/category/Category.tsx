import styles from "./category.module.scss";

interface CategoryProps {
  category: string;
}

const Category = ({ category }: CategoryProps) => (
  <div className={styles.wrapper}>{category}</div>
);

export default Category;
