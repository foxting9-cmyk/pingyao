(async () => {
  const url = process.argv[2] || 'http://localhost:5174/jinshang/01_index.html';
  const selector = process.argv[3] || '#piaohao';
  const path = process.argv[4] || 'piaohao.png';

  try {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    // 等待目标元素出现，超时则回退到整页截图
    let el = null;
    try {
      el = await page.waitForSelector(selector, { timeout: 5000 });
    } catch (e) {
      el = null;
    }
    if (!el) {
      console.error('元素未找到:', selector);
      await page.screenshot({ path: path.replace('.png','-full.png'), fullPage: true });
      console.log('已保存整页截图：', path.replace('.png','-full.png'));
      await browser.close();
      process.exit(2);
    }
    await el.screenshot({ path });
    console.log('Saved element screenshot to', path);
    await browser.close();
  } catch (err) {
    console.error('截图失败:', err);
    process.exit(1);
  }
})();