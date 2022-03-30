import axios from 'axios';
import IProduct from '@/types/IProduct';

export default async function handler(req: any, res: any) {
  const { keyword } = req.query;

  const url = `https://api.bunjang.co.kr/api/1/find_v2.json`;
  const result = await axios({
    method: 'GET',
    url,
    params: {
      q: encodeURI(keyword),
      order: 'score',
      page: 0,
      request_id: 2022324193240,
      stat_device: 'w',
      n: 100,
      stat_category_required: 1,
      req_ref: 'search',
      version: 4
    }
  });
  const items = result.data.list;
  const data:IProduct[] = items.map((item: any) => ({
    id: item.pid.toString(),
    title: item.name,
    content: '',
    location: item.location,
    prd_img: item.product_image,
    tag: [],
    // tag: item.tag,
    update_date: item.update_time,
    price: item.price,
    market: '번개장터',
    link: `https://m.bunjang.co.kr/products/${item.pid}`
  }));

  res.status(200).json({
    message: 'success',
    data
  });
}
