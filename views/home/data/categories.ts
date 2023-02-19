import mathIcon from "../icons/math.svg";
import biologyIcon from "../icons/biology.svg";
import englishIcon from "../icons/english.svg";

interface Category {
  id: number;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 1, name: "Math", icon: mathIcon },
  { id: 2, name: "Biology", icon: biologyIcon },
  { id: 3, name: "English", icon: englishIcon },
];
