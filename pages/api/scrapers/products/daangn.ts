import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import IProduct from '@/types/IProduct';

export default async function handler(req: any, res: any) {
  const { keyword } = req.query;
  const url = `https://www.daangn.com/search/${encodeURI(keyword)}`;

  const browser: any = await puppeteer.launch()
  const page: any = await browser.newPage();
  await page.goto(url);
  const content = await page.content();
  const $ = cheerio.load(content);
  const items = [];
  const data: IProduct[] = [];
  $('.articles-wrap').first().each(function(this: any) {
    $(this).find('.flea-market-article.flat-card').each(function(this: any) {
      // console.log($(this).html());
      const prd_img = $(this).find('img:first').attr('src');
      const title = $(this).find('.article-title').text().trim();
      const content = $(this).find('.article-content').text().trim();
      const location = $(this).find('.article-region-name').text().trim();
      const price = $(this).find('.article-price').text().trim();
      let link = $(this).find('.flea-market-article-link').attr('href');
      link = `https://www.daangn.com${link}`;

      const model = <IProduct>{
        id: '',
        title,
        content,
        prd_img,
        location,
        price,
        market: '당근마켓',
        link,
        tag: []
      };
      data.push(model);
    });
  });

  browser.close();

  res.status(200).json({
    message: 'success',
    data: data
  });
}

/*
export default async function handler(req: any, res: any) {
  const keyword = '해피해킹';
  const url = `https://www.daangn.com/search/${keyword}`;

  const browser: any = await puppeteer.launch()
  const page: any = await browser.newPage();
  await page.goto('https://stackoverflow.com/users/4794');
  const content = await page.content();
  const text = await page.evaluate(() => {
    return $('.flex--item.mb12.fs-headline2.lh-xs').text();
  });
  console.log('### text: ', text);
  browser.close();

  res.status(200).json({
    message: 'success',
    data: text
  });
}
*/

/*
export default async function handler(req, res) {
  const keyword = '해피해킹';
  const url = `https://www.daangn.com/search/${keyword}`;
  puppeteer.launch().then(function(browser: any) {
    browser.newPage().then(function(page: any) {
        page.goto('https://stackoverflow.com/users/4794').then(function() {
            page.evaluate(function() {
                return $('.flex--item.mb12.fs-headline2.lh-xs').text();
            }).then(function(result: any) {
                console.info(result);
                browser.close();
            });
        });
    });
});
  res.status(200).json({ message: 'success' });
}
*/
