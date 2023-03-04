import styles from "./category.module.scss";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

interface CategoryProps {
  display: string;
  name: string;
  icon: string;
}

const Category = ({ display, name, icon }: CategoryProps) => (
  <Link
    href={`/home/category/${name}`}
    className={classNames(styles.wrapper, styles[name])}
  >
    <Image className={styles.image} src={icon} alt={name} quality={100} />
    <span className={styles.title}>{display}</span>
  </Link>
);

export default Category;
