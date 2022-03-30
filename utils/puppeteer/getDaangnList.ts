import Model from "@/server/lib/model";
import Scraper from '@/server/lib/scraper';
import { Sites } from "@/server/sites";

export const getDaangnList = async (keyword: string) => {
  console.log('### getDaagnList', keyword);
  let result = {};

  try {
    for (const site of Sites) {
      let model = new Model(site.name);
      model.model.vars = { ...model.model.vars, ...site };
      await Scraper.connect();
      await Scraper.newPage();
      await Scraper.goto(site.url);
      const siteResult = await Scraper.scrap(model);
      result = { ...result, ...siteResult };
      // return [];
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
