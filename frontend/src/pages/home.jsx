import ApiForm from "../components/apiForm";

const Home = () => {
  return (
    <>
      <h1 className="text-center text-4xl text-white font-bold tracking-tightbord py-10 w-full border-2 border-white-1000">
        Welcome to Chat API
      </h1>
      <ApiForm />
    </>
  );
};

export default Home;
