import { Router } from "express";
import { search_handler } from "../middleware/search-handler.js";
import { browser } from "../index.js";
import { expect } from "playwright/test";

const router = Router();

router.get("/search", search_handler, async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const page = await browser.newPage();
    await page.goto("http://www.bing.com/chat");
    await page.locator("[name=searchbox]").fill(prompt);
    await page.press("[name=searchbox]", "Enter");

    await expect(page.locator("#stop-responding-button")).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible({
      timeout: 30000,
    });
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.locator("#stop-responding-button")).toBeDisabled({
      timeout: 30000,
    });
    await expect(page.locator(".ac-textBlock")).toBeVisible();

    const text = await page.locator(".ac-textBlock").last().textContent();
    await page.close();

    return res.status(200).send({ message: text });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong!" });
  }
});

export default router;
