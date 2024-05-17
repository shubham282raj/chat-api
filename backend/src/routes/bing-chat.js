import { Router } from "express";
import { search_handler } from "../middleware/search-handler.js";
import { browser } from "../index.js";

const router = Router();

router.get("/search", search_handler, async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const page = await browser.newPage();
    await page.goto("http://bing.com/chat");
    const text_area = await page.waitForSelector("div >>> textarea");
    await text_area.type(prompt);
    await page.keyboard.press("Enter");

    await page.waitForSelector("div >>> #stop-responding-button");
    await page.waitForSelector("div >>> #stop-responding-button:disabled");

    let response = await page.waitForSelector("div >>> .ac-textBlock");
    response = await page.$$("div >>> .ac-textBlock");
    response = await response[response.length - 1].evaluate(
      (element) => element.textContent
    );

    page.close();

    return res.status(200).send({ message: response });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong!" });
  }
});

export default router;
