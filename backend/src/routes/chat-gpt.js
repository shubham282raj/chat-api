import { Router } from "express";
import { search_handler } from "../middleware/search-handler.js";
import { browser } from "../index.js";

const router = Router();

router.post("/search", search_handler, async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const page = await browser.newPage();
    await page.goto("http://chatgpt.com");
    const text_area = await page.waitForSelector("div >>> textarea");
    await text_area.type(prompt);
    await page.keyboard.press("Enter");

    let response = await page.waitForSelector(
      "div >>> [data-testid=conversation-turn-3]"
    );
    await response.waitForSelector(".text-token-text-tertiary");
    response = await response.waitForSelector(".markdown");
    response = await response.evaluate((element) => element.textContent);

    page.close();

    return res.status(200).send({ message: response });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong!" });
  }
});

export default router;
