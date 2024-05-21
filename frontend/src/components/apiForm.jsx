import { useForm } from "react-hook-form";

const ApiForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <form
        className="flex flex-col items-center gap-5 my-5 w-3/4 border border-white"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-bold">Check API</h2>
        <div className="flex flex-col w-1/2 ">
          <span className="text-2xl">Select Chat Engine</span>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="chat-gpt"
                {...register("searchEngine")}
                checked
              ></input>
              <span className="mx-3 my-2 text-xl">Chat GPT</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="bing-chat"
                {...register("searchEngine")}
              ></input>
              <span className="mx-3 my-2 text-xl">Bing Chat</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col w-1/2 ">
          <span className="text-2xl">Search Type</span>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="default"
                {...register("searchType")}
                checked
              ></input>
              <span className="mx-3 my-2 text-xl">Default</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="short"
                {...register("searchType")}
              ></input>
              <span className="mx-3 my-2 text-xl">Short</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="very-short"
                {...register("searchType")}
              ></input>
              <span className="mx-3 my-2 text-xl">Very Short</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="one-word"
                {...register("searchType")}
              ></input>
              <span className="mx-3 my-2 text-xl">1 word</span>
            </label>
          </div>
        </div>
        <label className="flex flex-col w-1/2">
          <span className="text-2xl">Pre Prompt</span>
          <input
            className="my-1 p-1 bg-transparent border"
            type="text"
            {...register("customPre")}
          />
        </label>
        <label className="flex flex-col w-1/2 ">
          <span className="text-2xl">Post Prompt</span>
          <input
            className="my-1 p-1 bg-transparent border"
            type="text"
            {...register("customPost")}
          />
        </label>
        <label className="flex flex-col w-1/2 ">
          <span className="text-2xl">Prompt</span>
          <textarea
            className="my-1 p-1 bg-transparent border h-32"
            {...register("prompt")}
          />
        </label>
        <span>
          <button
            type="submit"
            className="px-6 py-3 border rounded-xl hover:bg-zinc-700"
          >
            Ask Chat API
          </button>
        </span>
      </form>
    </>
  );
};

export default ApiForm;
