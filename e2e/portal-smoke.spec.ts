import { test, expect } from "@playwright/test";

test("portal smoke: sidebar navigates Books ↔ Secrets", async ({ page }) => {
  await page.goto("/books");
  await expect(page.getByTestId("klaut-portal")).toBeVisible();
  await expect(page.getByTestId("chat-home")).toBeVisible();
  await expect(page.getByTestId("nav-books")).toBeVisible();

  await page.getByTestId("nav-secrets").click();
  await expect(page.getByTestId("settings-secrets")).toBeVisible();
  await expect(page.getByTestId("secrets-jwt")).toBeVisible();

  await page.getByTestId("nav-books").click();
  await expect(page.getByTestId("chat-home")).toBeVisible();
});

test("root redirects to books", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/books$/);
});
