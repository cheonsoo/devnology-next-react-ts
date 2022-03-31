import axios from 'axios';
import moment from 'moment';
import IProduct from '@/types/IProduct';

export default async function handler(req: any, res: any) {
  const { keyword } = req.query;

  const url = `https://apis.naver.com/cafe-web/cafe-search-api/v4.0/trade-search/all`;
  const result = await axios({
    method: 'GET',
    url,
    params: {
      query: encodeURI(keyword),
      page: 1,
      size: 20,
      recommendKeyword: true,
      searchOrderParamType: 'DEFAULT'
    }
  });
  const list = result.data.result.tradeArticleList;
  const data: IProduct[] = [];
  list.forEach((prd: any) => {
    const item = prd.item;
    const model = <IProduct>{
      id: item.articleId.toString(),
      title: item.subject,
      content: item.content,
      location: getLocation(item.productSale.regionList),
      prd_img: item.thumbnailImageUrl,
      tag: [],
      update_date: moment(item.writeTime).format('YYYY-MM-DD HH:MM'),
      price: item.productSale.cost,
      market: item.cafeName,
      link: `https://cafe.naver.com/${item.cafeUrl}/${item.articleId}`
    }
    data.push(model);
  });

  res.status(200).json({
    message: 'success',
    data: data
  });
}

function getLocation(regionList: any) {
  let location = '';
  try {
    regionList.forEach((item: any) => {
      location += item[Object.keys(item).pop()];
    })
  } catch (e) {
    console.log(e);
  }

  return location;
}