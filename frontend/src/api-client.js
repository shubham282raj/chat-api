const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const search_chat = async (formData) => {
  if (!formData.searchEngine) {
    return new Error("You need to select Chat Engine");
  }

  const search_url = `${API_BASE_URL}/api/${formData.searchEngine}/search?type=${formData.searchType}`;
  const response = await fetch(search_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: formData.prompt,
      custom: {
        pre: formData.customPre,
        post: formData.customPost,
      },
    }),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody.message;
};
