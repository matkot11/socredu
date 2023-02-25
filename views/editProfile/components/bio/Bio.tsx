import styles from "./bio.module.scss";
import Label from "@/components/label/label";
import Input from "@/components/input/Input";
import Image from "next/image";
import Trash from "@/assets/icons/Trash";
import Textarea from "@/components/textarea/Textarea";
import FileInput from "@/views/editProfile/components/fileInput/FileInput";
import {FormikProps} from "formik";

interface StudentBioProps {
  image: string;
  formik: FormikProps<any>;
  isImageDeleted: boolean;
  selectedFile: Blob;
  handleFile: (e: any) => void;
  setIsImageDeleted: (e: any) => void;
  setSelectedFile: (e: any) => void;
}

const Bio = ({
  image,
  formik,
  isImageDeleted,
  selectedFile,
  handleFile,
  setIsImageDeleted,
  setSelectedFile,
}: StudentBioProps) => {
  return (
    <>
      <Label htmlFor="fullName" label="Full Name">
        <Input
          name="fullName"
          onChange={formik.handleChange}
          value={formik.values.fullName}
        />
      </Label>
      <div className={styles.imageChangeWrapper}>
        <div className={styles.imageBorderWrapper}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={
                isImageDeleted
                  ? "https://res.cloudinary.com/dlyqh2gvy/image/upload/v1676912589/default_mjfaai.svg"
                  : selectedFile.size > 0
                  ? URL.createObjectURL(selectedFile)
                  : image
              }
              alt="Updated image"
              fill
            />
          </div>
        </div>
        <div className={styles.imageButtonWrapper}>
          <FileInput
            onChange={handleFile}
            onClick={(e: any) => (e.target.value = "")}
          />
          <button
            className={styles.imageButton}
            type="button"
            onClick={() => {
              setIsImageDeleted(true);
              setSelectedFile(new Blob());
            }}
          >
            <Trash className={styles.icon} /> Delete
          </button>
        </div>
      </div>
      <Label htmlFor="bio" label="Write your BIO">
        <Textarea
          name="bio"
          onChange={formik.handleChange}
          value={formik.values.bio}
        />
      </Label>
    </>
  );
};

export default Bio;
