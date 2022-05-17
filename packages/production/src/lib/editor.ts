import { launch } from 'puppeteer';

export const init = async (token: string) => {
  const browser = await launch();
  const page = await browser.newPage();

  console.log('Opened', page, document, token);

  await browser.close();
};
