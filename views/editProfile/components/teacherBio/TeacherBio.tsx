import styles from "./teacherBio.module.scss";
import Bio from "@/views/editProfile/components/bio/Bio";
import SaveButton from "@/views/editProfile/components/saveButton/SaveButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useError } from "@/hooks/useError";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Label from "@/components/label/label";
import Input from "@/components/input/Input";
import ChooseTopics from "@/views/editProfile/components/chooseCategories/ChooseTopics";
import { categories, CategoryInterface } from "@/data/categories";
import DayCard from "@/views/editProfile/components/dayCard/DayCard";
import ChooseCategories from "@/views/editProfile/components/chooseTopics/ChooseCategories";

interface TeacherBioProps {
  image: string;
  about: string;
  categoriesProp: string[];
  topicsProp: string[];
  priceProp: any;
  daysProp: any[];
}

const TeacherBio = ({
  image,
  about,
  categoriesProp,
  topicsProp,
  priceProp,
  daysProp,
}: TeacherBioProps) => {
  const session = useSession();
  const router = useRouter();
  const { dispatchError } = useError();
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<Blob>(new Blob());
  const [preparedFile, setPreparedFile] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [category, setCategory] = useState<any[]>(
    categoriesProp.map((category) => ({
      ...categories.find((cat) => cat.name === category),
    })),
  );
  const [topics, setTopics] = useState<string[]>(topicsProp);
  const [days, setDays] = useState(daysProp);
  const handleAddCategory = (value: string) => {
    if (category.find((category) => category.name === value)) {
      dispatchError("You have already added this category.");
      return;
    }
    setCategory((prevState) => [
      ...prevState,
      categories.find(
        (category) => category.name === value,
      ) as CategoryInterface,
    ]);
  };

  const handleAddTopic = (value: string) => {
    if (topics.find((topic) => topic === value)) {
      dispatchError("You have already added this topic.");
      return;
    }
    setTopics((prevState) => [...prevState, value]);
  };

  const handleFile = async (e: any) => {
    if (e.target.files[0]) {
      await setSelectedFile(e.target.files[0]);
      const reader = new FileReader();
      await reader.readAsDataURL(e.target.files[0]);
      reader.onload = async () => {
        await setPreparedFile(reader.result);
      };
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: session.data?.user?.name || "",
      bio: about,
      price: priceProp,
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/bio/teacherBio", {
          name: values.fullName,
          about: values.bio,
          image: preparedFile,
          // @ts-ignore
          email: session.data?.user?.email,
          deleteImage: isImageDeleted,
          categories: category.map(({ name }) => name),
          topics,
          price: values.price,
          days,
        });
        await router.push("/profile");
        dispatchError(response.data.message);
      } catch (error: any) {
        dispatchError(error.response.data.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.wrapper}>
      <Bio
        image={image}
        formik={formik}
        isImageDeleted={isImageDeleted}
        selectedFile={selectedFile}
        handleFile={handleFile}
        setIsImageDeleted={setIsImageDeleted}
        setSelectedFile={setSelectedFile}
      />
      <ChooseCategories
        onChange={handleAddCategory}
        category={category}
        setCategory={setCategory}
      />
      <ChooseTopics
        onChange={handleAddTopic}
        topics={topics}
        setTopics={setTopics}
      />
      <div className={styles.priceWrapper}>
        <h4 className={styles.priceHeader}>Availability & Pricing</h4>
        <Label
          htmlFor="price"
          label="Price/h"
          className={styles.priceLabel}
          textClassName={styles.priceLabelText}
        >
          <div className={styles.priceInputWrapper}>
            <Input
              className={styles.priceInput}
              type="number"
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            <span className={styles.priceCurrency}>£</span>
          </div>
        </Label>
      </div>
      {days.map((day) => (
        <DayCard key={day.day} day={day} setDay={setDays} />
      ))}
      <SaveButton />
    </form>
  );
};

export default TeacherBio;
