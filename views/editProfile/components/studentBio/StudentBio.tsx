import styles from "./studentBio.module.scss";
import Label from "@/components/label/label";
import Input from "@/components/input/Input";
import { useFormik } from "formik";
import Image from "next/image";
import Trash from "@/assets/icons/Trash";
import Textarea from "@/components/textarea/Textarea";
import SaveButton from "@/views/editProfile/components/editButton/SaveButton";
import { useState } from "react";
import FileInput from "@/views/editProfile/components/fileInput/FileInput";
import { useError } from "@/hooks/useError";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface StudentBioProps {
  image: string;
  about: string;
}

const StudentBio = ({ image, about }: StudentBioProps) => {
  const session = useSession();
  const router = useRouter();
  const { dispatchError } = useError();
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<Blob>(new Blob());
  const [preparedFile, setPreparedFile] = useState<string | ArrayBuffer | null>(
    null,
  );

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
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/bio/userBio", {
          name: values.fullName,
          about: values.bio,
          image: preparedFile,
          // @ts-ignore
          email: session.data?.user?.email,
          deleteImage: isImageDeleted,
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
      <SaveButton />
    </form>
  );
};

export default StudentBio;
