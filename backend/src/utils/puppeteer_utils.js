export const wait_for_timeout = (ms) =>
  new Promise((res) => setTimeout(res, ms));
