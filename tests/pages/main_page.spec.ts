import { test, expect, Page, Locator } from '@playwright/test';
import { METHODS } from 'http';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });
  test('Отображение элементов навигации - хедер', async () => {
    await mainPage.checkElementsVisability();
  });

  test('Проверка на корректность названия - хедер', async () => {
    await mainPage.checkElementsText();
  });

  test('Проверка атрибута Href элементов навигации - хедер', async () => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('Проверка переключения лайт мод', async () => {
    test.step('Нажатие на иконку переключения лайт мода', async () => {
      await mainPage.clickSwithLightModeIcon();
    });
    test.step('Нажатие на иконку переключения дарк мода', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test(`Проверка стилей с светлой темой`, async () => {
    await test.step('Проверка светлой темой', async () => {
      await mainPage.setLightMode();
    });

    await test.step('Скриншотная проверка с светлой темой', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`Проверка стилей с темной темой`, async () => {
    test.step('Проверка темной темой', async () => {
      await mainPage.setDarkMode();
    });

    test.step('Скриншотная проверка о темной темой', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
