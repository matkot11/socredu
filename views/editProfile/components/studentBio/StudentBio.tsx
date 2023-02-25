import styles from "./studentBio.module.scss";
import { useFormik } from "formik";
import SaveButton from "@/views/editProfile/components/editButton/SaveButton";
import { useState } from "react";
import { useError } from "@/hooks/useError";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Bio from "@/views/editProfile/components/bio/Bio";

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
      <Bio
        image={image}
        formik={formik}
        isImageDeleted={isImageDeleted}
        selectedFile={selectedFile}
        handleFile={handleFile}
        setIsImageDeleted={setIsImageDeleted}
        setSelectedFile={setSelectedFile}
      />
      <SaveButton />
    </form>
  );
};

export default StudentBio;
