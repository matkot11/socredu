import styles from "./category.module.scss";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

interface CategoryProps {
  name: string;
  icon: string;
}

const Category = ({ name, icon }: CategoryProps) => (
  <Link
    href={`/home/${name.replace(/\s+/g, "").toLowerCase()}`}
    className={classNames(
      styles.wrapper,
      styles[name.replace(/\s+/g, "").toLowerCase()],
    )}
  >
    <Image className={styles.image} src={icon} alt={name} />
    <span>{name}</span>
  </Link>
);

export default Category;
