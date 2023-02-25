import styles from "./chooseTopics.module.scss";
import Label from "@/components/label/label";
import Close from "@/assets/icons/Close";
import Input from "@/components/input/Input";
import { useState } from "react";

interface ChooseTopicsProps {
  onChange: (value: string) => void;
  topics: string[];
  setTopics: (value: string[]) => void;
}

const ChooseTopics = ({ onChange, topics, setTopics }: ChooseTopicsProps) => {
  const [topicInput, setTopicInput] = useState("");

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onChange(topicInput);
      setTopicInput("");
    }
  };
  return (
    <div className={styles.topicsWrapper}>
      <Label htmlFor="topic" label="Topics">
        <Input
          name="topic"
          onKeyDown={handleKeyDown}
          onChange={(e) => setTopicInput(e.target.value)}
          value={topicInput}
        />
      </Label>
      <div className={styles.topicWrapper}>
        {topics.map((item) => (
          <button
            onClick={() =>
              setTopics(topics.filter((filteredTopic) => filteredTopic !== item))
            }
            className={styles.topic}
            key={item}
          >
            <span>{item}</span>
            <Close className={styles.icon} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChooseTopics;
