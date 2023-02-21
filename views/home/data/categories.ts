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
  display: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 1, name: "english", display: "English", icon: englishIcon },
  { id: 2, name: "art", display: "Art", icon: artIcon },
  { id: 3, name: "math", display: "Math", icon: mathIcon },
  { id: 4, name: "history", display: "History", icon: historyIcon },
  { id: 5, name: "drama", display: "Drama", icon: dramaIcon },
  { id: 6, name: "biology", display: "Biology", icon: biologyIcon },
  { id: 7, name: "geography", display: "Geography", icon: geographyIcon },
  {
    id: 8,
    name: "socialStudies",
    display: "Social Studies",
    icon: socialStudiesIcon,
  },
  { id: 9, name: "chemistry", display: "Chemistry", icon: chemistryIcon },
  {
    id: 10,
    name: "foreignLanguages",
    display: "Foreign Languages",
    icon: languagesIcon,
  },
  {
    id: 11,
    name: "graphicDesign",
    display: "Graphic Design",
    icon: designIcon,
  },
  { id: 12, name: "physics", display: "Physics", icon: physicsIcon },
  { id: 13, name: "philosophy", display: "Philosophy", icon: philosophyIcon },
  { id: 14, name: "literature", display: "Literature", icon: literatureIcon },
  { id: 15, name: "it", display: "IT", icon: itIcon },
  { id: 16, name: "music", display: "Music", icon: musicIcon },
];
