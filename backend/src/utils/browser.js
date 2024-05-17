import { chromium, errors } from "playwright";

export const startBrowser = async () => {
  try {
    const browser = await chromium.launch({
      headless: process.env.NODE_ENV == "production",
    });
    console.log("Browser started successfully");
    return browser;
  } catch (error) {
    console.log(error);
    console.log("Could not start browser");
    return undefined;
  }
};
