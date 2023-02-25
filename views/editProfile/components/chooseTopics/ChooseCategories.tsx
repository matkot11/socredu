import styles from "./chooseCategories.module.scss";
import Label from "@/components/label/label";
import Select from "@/components/input/Select";
import Close from "@/assets/icons/Close";
import {categories, CategoryInterface} from "@/data/categories";

interface ChooseCategoriesProps {
  onChange: (value: string) => void;
  category: CategoryInterface[];
  setCategory: (value: CategoryInterface[]) => void;
}

const ChooseCategories = ({
  onChange,
  category,
  setCategory,
}: ChooseCategoriesProps) => {
  return (
    <div className={styles.categoriesWrapper}>
      <Label htmlFor="category" label="Category">
        <Select
          name="category"
          onChange={(e) => onChange(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.display}
            </option>
          ))}
        </Select>
      </Label>
      <div className={styles.categoryWrapper}>
        {category.map(({ id, display }) => (
          <button
            onClick={() =>
              setCategory(category.filter((item) => item.id !== id))
            }
            className={styles.category}
            key={id}
          >
            <span>{display}</span>
            <Close className={styles.icon} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChooseCategories;
