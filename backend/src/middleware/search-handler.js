export const search_handler = (req, res, next) => {
  if (!req.body.prompt) {
    return res.status(400).send({ message: "No prompt found!" });
  }

  const {
    query: { type },
  } = req;
  const {
    body: { prompt, custom },
  } = req;

  if (custom) {
    prompt = prompt + ". " + custom;
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
