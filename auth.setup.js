const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.pinterest.com/');

  console.log('Пожалуйста, выполните вход в Pinterest...');
  console.log('Скрипт автоматически сохранит состояние, как только увидит главную страницу.');
  
  try {
    // Ждем появления поисковой строки (признак успешного логина)
    await page.waitForSelector('input[name="searchBoxInput"]', { timeout: 120000 });
    
    // Сохраняем состояние в файл
    await context.storageState({ path: 'auth.json' });
    console.log('Сессия успешно сохранена в auth.json');
  } catch (e) {
    console.log('Время ожидания истекло или произошла ошибка:', e.message);
  }

  await browser.close();
})();
