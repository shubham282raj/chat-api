import { Router } from "express";
import { search_handler } from "../middleware/search-handler.js";
import { browser } from "../index.js";
import { expect } from "playwright/test";

const router = Router();

router.get("/search", search_handler, async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const page = await browser.newPage();
    await page.goto("http://www.chatgpt.com");
    const text_area = await page.getByRole("textbox", {
      name: "Message ChatGPT",
    });
    await text_area.fill(prompt);
    await text_area.press("Enter");

    await expect(
      page.locator("[data-testid=conversation-turn-3]")
    ).toBeVisible();
    await expect(
      page
        .locator("[data-testid=conversation-turn-3]")
        .locator(".text-token-text-tertiary")
    ).toBeVisible({
      timeout: 30000,
    });

    const text = await page
      .locator("[data-testid=conversation-turn-3]")
      .locator(".markdown")
      .textContent();
    await page.close();

    return res.status(200).send({ message: text });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong!" });
  }
});

export default router;
