import clipboardy from "clipboardy";
import { PORT } from "../index.js";

let lastClip = "init";

const api_request = async (prompt, custom) => {
  const response = await fetch(
    `http://localhost:${PORT}/api/bing-chat/search?type=short`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        custom: custom,
      }),
    }
  );
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody.message;
  } else {
    return "BAD REQUEST";
  }
};

const clipbaord_check = async () => {
  const clipboard = clipboardy.readSync();
  if (lastClip !== clipboard) {
    clearInterval(clipboard_loop);

    const response_mssg = await api_request(clipboard);
    clipboardy.writeSync(response_mssg);

    clipboard_loop = setInterval(clipbaord_check, 500);
    lastClip = response_mssg;
  }
};

let clipboard_loop = null;

export const set_clipboard_loop = () => {
  clipboard_loop = setInterval(clipbaord_check, 500);
};
