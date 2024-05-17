import puppeteer from "puppeteer";

export const startBrowser = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    console.log("Browser started successfully");
    return browser;
  } catch (error) {
    console.log(error);
    console.log("Could not start browser");
    return undefined;
  }
};
