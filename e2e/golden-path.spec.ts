import { test, expect } from "@playwright/test";

test("golden path: chat → upload → clarify → post", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("chat-home")).toBeVisible();

  await page.getByTestId("chat-input").fill("Neuer Beleg von REWE");
  await page.getByTestId("chat-send").click();
  await expect(page.getByTestId("msg-user")).toContainText("REWE");

  await page.getByTestId("upload-zone").click();
  await expect(page.getByTestId("clarify-card")).toBeVisible();

  await page.getByTestId("clarify-confirm").click();
  await expect(page.getByTestId("post-confirm")).toBeVisible();

  await page.getByTestId("post-confirm").click();
  await expect(page.getByTestId("posted-badge")).toContainText("Gebucht");
});
