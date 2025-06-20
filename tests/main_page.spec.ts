import { test, expect, Page, Locator } from '@playwright/test';
import { METHODS } from 'http';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string; // ? Опционально
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Platwright logo link',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js batton',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub icon',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord icon',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'btn Switch mode icon',
  },
];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('Отображение элементов навигации - хедер', async ({ page }) => {
    for (const { locator, name } of elements) {
      await test.step(`Проверка отображение элемента ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    }
  });

  test('Проверка на корректность названия - хедер', async ({ page }) => {
    for (const { locator, name, text } of elements) {
      if (text) {
        await test.step(`Проверка названия элемента ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    }
  });

  test('Проверка атрибута Href элементов навигации - хедер', async ({ page }) => {
    for (const { locator, name, attribute } of elements) {
      if (attribute) {
        await test.step(`Проверка атрибутов href элемента ${name}`, async () => {
          await expect.soft(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    }
  });

  test('Проверка переключения лайт мод', async ({ page }) => {
    await page.getByLabel('Switch between dark and light').dblclick();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Проверка заголовка страниц', async ({ page }) => {
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toBeVisible();
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
  });

  test('Проверка переххода по Get Started', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
  });
});
