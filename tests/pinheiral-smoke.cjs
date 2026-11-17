const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('file://' + path.resolve('pinheiral.html') + '?test=1');
  await page.waitForSelector('#nw', { state: 'visible', timeout: 30000 });
  await page.waitForTimeout(1000);
  await page.locator('#nw').click();
  await page.waitForSelector('#dlg', { state: 'visible', timeout: 10000 });
  const title = await page.title();
  if (title !== 'Crônicas de Pinheiral') throw new Error('Título incorreto: ' + title);
  const canvas = await page.locator('#c').evaluate(el => ({ width: el.width, height: el.height }));
  if (!canvas.width || !canvas.height) throw new Error('Canvas sem dimensões');
  const expansion = await page.evaluate(() => {
    const t = window.__PINHEIRAL_TEST__;
    if (!t) throw new Error('Hook de teste não carregou');
    t.start({ m: 5, e: 1, gray: { main: 1 } }, { a: 0, x: 265, y: 270 });
    const maps = t.maps();
    t.enterGray();
    ['gray_part_0', 'gray_part_1', 'gray_part_2'].forEach(id => {
      if (!t.collect(id)) throw new Error('Coletável não encontrado: ' + id);
    });
    return { maps, state: t.state() };
  });
  const region = expansion.maps.find(m => m.id === 3);
  if (!region || region.name !== 'Colinas Cinzentas' || region.w !== 56 || region.h !== 36) throw new Error('Mapa novo incorreto');
  if (expansion.state.parts !== 3) throw new Error('Coleta de peças falhou: ' + expansion.state.parts);
  if (errors.length) throw new Error('Erros JS: ' + errors.join(' | '));
  console.log(JSON.stringify({ boot: 'ok', newGame: 'ok', dialogue: 'ok', canvas, maps: expansion.maps.length, newRegion: region, collectedParts: expansion.state.parts, pageErrors: errors.length }));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
