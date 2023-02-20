import englishIcon from "../icons/english.svg";
import artIcon from "../icons/art.svg";
import mathIcon from "../icons/math.svg";
import historyIcon from "../icons/history.svg";
import dramaIcon from "../icons/drama.svg";
import biologyIcon from "../icons/biology.svg";
import geographyIcon from "../icons/geography.svg";
import socialStudiesIcon from "../icons/social-studies.svg";
import chemistryIcon from "../icons/chemistry.svg";
import languagesIcon from "../icons/languages.svg";
import designIcon from "../icons/design.svg";
import physicsIcon from "../icons/physics.svg";
import philosophyIcon from "../icons/philosophy.svg";
import literatureIcon from "../icons/literature.svg";
import itIcon from "../icons/it.svg";
import musicIcon from "../icons/music.svg";

interface Category {
  id: number;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 1, name: "English", icon: englishIcon },
  { id: 2, name: "Art", icon: artIcon },
  { id: 3, name: "Math", icon: mathIcon },
  { id: 4, name: "History", icon: historyIcon },
  { id: 5, name: "Drama", icon: dramaIcon },
  { id: 6, name: "Biology", icon: biologyIcon },
  { id: 7, name: "Geography", icon: geographyIcon },
  { id: 8, name: "Social Studies", icon: socialStudiesIcon },
  { id: 9, name: "Chemistry", icon: chemistryIcon },
  { id: 10, name: "Foreign Languages", icon: languagesIcon },
  { id: 11, name: "Graphic Design", icon: designIcon },
  { id: 12, name: "Physics", icon: physicsIcon },
  { id: 13, name: "Philosophy", icon: philosophyIcon },
  { id: 14, name: "Literature", icon: literatureIcon },
  { id: 15, name: "IT", icon: itIcon },
  { id: 16, name: "Music", icon: musicIcon },
];
