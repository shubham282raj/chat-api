export const search_handler = (req, res, next) => {
  if (!req.body.prompt) {
    return res.status(400).send({ message: "No prompt found!" });
  }

  const {
    query: { type },
  } = req;
  let {
    body: { prompt, custom },
  } = req;

  if (custom) {
    prompt = custom.pre + ". " + prompt + ". " + custom.post;
  }

  switch (type) {
    case "short":
      prompt = prompt + ". Keep your answer short";
      break;

    case "very-short":
      prompt = prompt + ". Keep your answer very very short";
      break;

    case "one-word":
      prompt = prompt + ". Keep answer strictly to 1 or 2 words maximum.";
      break;

    default:
      break;
  }

  req.body.prompt = prompt;
  next();
};

export const bing_search_type_handler = (req) => {
  const {
    body: { prompt, custom },
  } = req;
  const {
    query: { type },
  } = req;

  const prompts = [prompt];

  switch (type) {
    case "short":
      prompts.push("Summarize your answer.");
      break;
    case "very-short":
      prompts.push("Summarize your answer in 10 to 15 words.");
      break;
    case "one-word":
      prompts.push("Summarize your answer in 1 or 2 words.");
      break;
    default:
      break;
  }

  return prompts;
};
