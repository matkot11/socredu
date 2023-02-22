import styles from "@/views/profile/profile.module.scss";
import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import ProfileButton from "@/views/profile/components/profileButton/ProfileButton";
import { signOut, useSession } from "next-auth/react";
import AccountButton from "@/views/profile/components/accountButton/AccountButton";
import AccountLink from "@/views/profile/components/accountButton/AccountLink";
import PersonIcon from "@/assets/icons/PersonIcon";
import Settings from "@/assets/icons/Settings";
import Money from "@/assets/icons/Money";
import Logout from "@/assets/icons/Logout";
import settingsIllustration from "@/assets/illustrations/settings-illustrations.svg";
import Image from "next/image";

const Profile = () => {
  const session = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!session.data) return;

  return (
    <MainTemplate>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <div className={styles.headerWrapper}>
            <h2 className={styles.header}>PROFILE</h2>
            <p className={styles.subheader}>
              Update your profile and personal informations.
            </p>
          </div>
          <ProfileButton
            image={session.data.user?.image || ""}
            name={session.data.user?.name || ""}
          />
          <h3 className={styles.heading}>Account Settings</h3>
          <AccountLink
            icon={<PersonIcon className={styles.icon} />}
            name="Edit Profile"
          />
          <AccountLink
            icon={<Settings className={styles.icon} />}
            name="Personal Details"
          />
          <AccountLink
            icon={<Money className={styles.icon} />}
            name="Purchased Lessons"
          />
          <AccountButton
            onClick={handleSignOut}
            icon={<Logout className={styles.icon} />}
            name="Log Out"
          />
        </div>
        <Image
          className={styles.illustration}
          src={settingsIllustration}
          alt="Settings illustration"
        />
      </div>
    </MainTemplate>
  );
};

export default Profile;
