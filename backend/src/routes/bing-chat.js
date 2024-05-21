import { Router } from "express";
import {
  bing_search_type_handler,
  search_handler,
} from "../middleware/search-handler.js";
import { browser } from "../index.js";
import { wait_for_timeout } from "../utils/puppeteer_utils.js";

const router = Router();

router.post("/search", search_handler, async (req, res) => {
  try {
    const prompts = bing_search_type_handler(req);

    const page = await browser.newPage();
    await page.goto("http://bing.com/chat");

    for (let i = 0; i < prompts.length; i++) {
      await page.waitForSelector("div >>> textarea");
      const text_area = await page.$("div >>> textarea");
      await text_area.type(prompts[i]);
      await page.keyboard.press("Enter");

      await page.waitForSelector("div >>> #stop-responding-button");
      await wait_for_timeout(1000);
      await page.waitForSelector("div >>> #stop-responding-button:disabled");

      if (i == 0) {
        try {
          const continue_btn = await page.waitForSelector(
            "div >>> .get-started-btn",
            { timeout: 500 }
          );
          await continue_btn.click();
        } catch {}
      }
    }

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
