import { test, expect, type Page } from "@playwright/test";

async function signup(page: Page, email = "new@example.test") {
  await page.goto("/signup/email");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("User Name").fill("Test User");
  await page.getByLabel("Password", { exact: true }).fill("test-password-123");
  await page.getByRole("button", { name: "Sign Up", exact: true }).click();
  await expect(page).toHaveURL(
    /\/protected\/profile$|\/(?:login|signup\/email)\?message=/,
  );
}
async function contrast(locator: ReturnType<Page["locator"]>) {
  return locator.evaluate((el) => {
    const css = getComputedStyle(el);
    const luminance = (rgb: string) => {
      const channels = rgb
        .match(/[\d.]+/g)!
        .slice(0, 3)
        .map(Number)
        .map((v) => {
          const c = v / 255;
          return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const a = luminance(css.color),
      b = luminance(css.backgroundColor);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
}

test.beforeEach(async ({ request }) => {
  await request.post("http://127.0.0.1:54329/__reset");
});

test("signup creates a profile and a persistent authenticated session", async ({
  page,
}) => {
  await signup(page);
  await expect(page).toHaveURL(/\/protected\/profile$/);
  await expect(
    page.getByRole("heading", { name: "Hello, Test User!" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("new@example.test", { exact: true }),
  ).toBeVisible();
});

test("confirmation-required signup waits for confirmation without attempting an anonymous profile insert", async ({
  page,
  request,
}) => {
  await signup(page, "confirm@example.test");
  await expect(page).toHaveURL(/\/login\?message=/);
  await expect(page.getByText(/Check your email to confirm/)).toBeVisible();
  expect(
    (await (await request.get("http://127.0.0.1:54329/__state")).json()).users,
  ).toHaveLength(0);
});

test("signup and callback errors display usable feedback", async ({ page }) => {
  await signup(page, "error@example.test");
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Unable to create your account" }),
  ).toBeVisible();
  await page.goto("/auth/callback?code=bad-code");
  await expect(page).toHaveURL(/\/login\?message=/);
  await expect(
    page.getByText(/confirmation link is invalid or expired/),
  ).toBeVisible();
});

test("trigger selection stays readable and event times round trip in the local timezone", async ({
  page,
  request,
}, testInfo) => {
  await signup(page);
  await page.goto("/protected/calendar");
  await page.getByRole("button", { name: "Log Epilepsy Event" }).click();
  const dialog = page.getByRole("dialog");
  const trigger = dialog.getByRole("button", { name: "Stress", exact: true });
  expect(await contrast(trigger)).toBeGreaterThanOrEqual(4.5);
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-pressed", "true");
  await expect(trigger).toHaveCSS("color", "rgb(255, 255, 255)");
  expect(await contrast(trigger)).toBeGreaterThanOrEqual(4.5);
  await trigger.hover();
  expect(await contrast(trigger)).toBeGreaterThanOrEqual(4.5);
  await page.screenshot({
    path: testInfo.outputPath("trigger-selected.png"),
    fullPage: true,
    animations: "disabled",
  });
  await page.getByLabel("Date & Time").fill("2026-11-17T14:30");
  await dialog.getByRole("button", { name: "Log Event", exact: true }).click();
  await expect(
    page.getByText("Epilepsy event logged successfully", { exact: true }),
  ).toBeVisible();
  const state = await (
    await request.get("http://127.0.0.1:54329/__state")
  ).json();
  expect(state.epilepsy_events[0].event_date).toBe("2026-11-17T19:30:00.000Z");
  expect(state.epilepsy_events[0].triggers).toEqual(["Stress"]);
  await page.getByRole("tab", { name: "List", exact: true }).click();
  await expect(page.getByText(/Nov 17, 2026, 02:30 PM/)).toBeVisible();
});

test("creating a custom activity does not submit the parent activity log", async ({
  page,
  request,
}) => {
  await signup(page);
  await page.goto("/protected/calendar");
  await page.getByRole("button", { name: "Log Activity", exact: true }).click();
  await page
    .getByRole("button", { name: "Create new activity", exact: true })
    .click();
  await page.getByLabel("Activity Name").fill("Morning Yoga");
  await page
    .getByRole("button", { name: "Create Activity", exact: true })
    .click();
  await expect(
    page.getByText("Activity created successfully", { exact: true }),
  ).toBeVisible();
  const state = await (
    await request.get("http://127.0.0.1:54329/__state")
  ).json();
  expect(state.activities).toHaveLength(1);
  expect(state.activity_logs).toHaveLength(0);
  await expect(page.getByRole("dialog")).toHaveCount(1);
});

test("daily health dates stay on the selected day and duplicates are explained", async ({
  page,
}) => {
  await signup(page);
  await page.goto("/protected/calendar");
  await page
    .getByRole("button", { name: "Log Daily Health", exact: true })
    .click();
  await page.getByLabel("Date *", { exact: true }).fill("2026-11-17");
  await page
    .getByRole("button", { name: "Save Health Log", exact: true })
    .click();
  await expect(
    page.getByText("Health log saved successfully", { exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "List", exact: true }).click();
  await expect(page.getByText("Nov 17, 2026", { exact: true })).toBeVisible();
  await page
    .getByRole("button", { name: "Log Daily Health", exact: true })
    .click();
  await page.getByLabel("Date *", { exact: true }).fill("2026-11-17");
  await page
    .getByRole("button", { name: "Save Health Log", exact: true })
    .click();
  await expect(
    page.getByText("A health log already exists for this date."),
  ).toBeVisible();
});

test("mobile activity search is case insensitive and invalid slugs render 404", async ({
  page,
}) => {
  await page.goto("/main/activities?keyword=SWIM");
  await expect(
    page.locator('a[href="/main/activities/swimming"]'),
  ).toBeVisible();
  await expect(
    page.locator('a[href="/main/activities/basketball"]'),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const response = await page.goto("/main/activities/does-not-exist");
  expect(response?.status()).toBe(404);
});

test("mobile pages and calendar keep content within the viewport", async ({
  page,
}) => {
  await signup(page);
  for (const width of [320, 390, 672]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of [
      "/main/activities",
      "/main/resources",
      "/main/resources/success-stories",
      "/protected/calendar",
    ]) {
      await page.goto(route);
      expect(
        await page
          .locator("main")
          .evaluate((el) => el.scrollWidth <= el.clientWidth),
        `${route} at ${width}px`,
      ).toBe(true);
      await expect(
        page.getByRole("link", { name: "Calendar", exact: true }),
      ).toBeInViewport();
    }
  }
});

test("resource search stays on resources and filters results", async ({
  page,
}) => {
  await page.goto("/main/resources");
  await page.getByLabel("Search for resources").fill("MEDICATION");
  await page.getByLabel("Search for resources").press("Enter");
  await expect(page).toHaveURL(/\/main\/resources\?keyword=MEDICATION/);
  await expect(
    page.locator('a[href="/main/resources/medication-warning"]'),
  ).toBeVisible();
  await expect(
    page.locator('a[href="/main/resources/setting-goals"]'),
  ).toHaveCount(0);
});
