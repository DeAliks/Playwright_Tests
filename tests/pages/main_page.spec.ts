import { test, expect } from '../fixtures/fixtureMainPage';
import { MainPage } from '../models/MainPage';

test.describe('Тесты главной страницы', () => {
  test('Отображение элементов навигации - хедер', async ({ mainPage }) => {
    await mainPage.checkElementsVisability();
  });

  test('Проверка на корректность названия - хедер', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('Проверка атрибута Href элементов навигации - хедер', async ({ mainPage }) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('Проверка переключения лайт мод', async ({ mainPage }) => {
    test.step('Нажатие на иконку переключения лайт мода', async () => {
      await mainPage.clickSwithLightModeIcon();
    });
    test.step('Нажатие на иконку переключения дарк мода', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test(`Проверка стилей с светлой темой`, async ({ mainPage }) => {
    await test.step('Проверка светлой темой', async () => {
      await mainPage.setLightMode();
    });

    await test.step('Скриншотная проверка с светлой темой', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`Проверка стилей с темной темой`, async ({ mainPage }) => {
    test.step('Проверка темной темой', async () => {
      await mainPage.setDarkMode();
    });

    test.step('Скриншотная проверка о темной темой', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
