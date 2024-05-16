import { chromium } from "playwright";

export const startBrowser = async () => {
  try {
    const browser = await chromium.launch({
      headless: process.env.NODE_ENV == "production",
    });
    return browser;
  } catch {
    console.log("Could not start browser");
    return undefined;
  }
};
