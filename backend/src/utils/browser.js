import puppeteer from "puppeteer-extra";
import stealth_plugins from "puppeteer-extra-plugin-stealth";

puppeteer.use(stealth_plugins());

export const startBrowser = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: process.env.NODE_ENV === "production",
    });
    console.log("Browser started successfully");
    return browser;
  } catch (error) {
    console.log(error);
    console.log("Could not start browser");
    return undefined;
  }
};
