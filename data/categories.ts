import englishIcon from "@/views/home/icons/english.svg";
import artIcon from "@/views/home/icons/art.svg";
import mathIcon from "@/views/home/icons/math.svg";
import historyIcon from "@/views/home/icons/history.svg";
import dramaIcon from "@/views/home/icons/drama.svg";
import biologyIcon from "@/views/home/icons/biology.svg";
import geographyIcon from "@/views/home/icons/geography.svg";
import socialStudiesIcon from "@/views/home/icons/social-studies.svg";
import chemistryIcon from "@/views/home/icons/chemistry.svg";
import languagesIcon from "@/views/home/icons/languages.svg";
import designIcon from "@/views/home/icons/design.svg";
import physicsIcon from "@/views/home/icons/physics.svg";
import philosophyIcon from "@/views/home/icons/philosophy.svg";
import literatureIcon from "@/views/home/icons/literature.svg";
import itIcon from "@/views/home/icons/it.svg";
import musicIcon from "@/views/home/icons/music.svg";

export interface CategoryInterface {
  id: number;
  name: string;
  display: string;
  icon: string;
}

export const categories: CategoryInterface[] = [
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
