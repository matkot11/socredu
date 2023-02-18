import { signOut } from "next-auth/react";

const Home = () => {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <>
      <h1>Home</h1>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
};

export default Home;
