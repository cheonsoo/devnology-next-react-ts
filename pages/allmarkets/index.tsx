import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import Image from "next/image";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import withLayout from '../../components/layouts';

import { posts } from '../../constants';

import styles from '@/styles/AllMarkets.module.scss';

let timer: any;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Posts: NextPage = () => {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<Object[]>([]);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          handleInfiniteScroll();
        }, 300);
      }
    });
  }, []);

  useEffect(() => {
    console.log(`### data`, data);
  }, [data]);

  const handleClickLink = (item: any) => {
    console.log('clicked!!!');
    window.open(item.link, '_blank');
  };

  const handleKeyUp = (evt: any) => {
    if (evt.keyCode === 13)
      handleSearch();
  }

  const handleChange = (evt: any) => {
    setKeyword(evt.currentTarget.value);
  };

  const handleSearch = async () => {
    console.log(`keyword: ${keyword}`);
    setData([]);

    const list1 = await getBunjangList(keyword);
    const list2 = await getJoongnaList(keyword);
    setData(list1.concat(list2));
  };

  const handleInfiniteScroll = () => {
    console.log('handleInfiniteScroll');
  }

  const getBunjangList = async (keyword: string) => {
    const url = `https://api.bunjang.co.kr/api/1/find_v2.json?q=${keyword}&order=score&page=0&request_id=2022324193240&stat_device=w&n=100&stat_category_required=1&req_ref=search&version=4`;
    const res = await axios({
      method: 'GET',
      url
    });
    const items = res.data.list;
    console.log('### 번개장터', items);
    const _data = items.map((item: any) => ({
      id: item.pid,
      title: item.name,
      location: item.location,
      prd_img: item.product_image,
      tag: item.tag,
      update_date: item.update_time,
      price: item.price,
      market: 'bunjang',
      link: `https://m.bunjang.co.kr/products/${item.pid}`
    }));
    return _data;
  };

  const getJoongnaList = async (keyword: string) => {
    const url = `https://search-api.joongna.com/v25/search/product`;
    const res = await axios({
      method: 'POST',
      url,
      data: {
        "filter": {
          "categoryDepth": 0,
          "categorySeq": 0,
          "dateFilterParameter": {
              "sortEndDate": null,
              "sortStartDate": null
          },
          "productCondition": -1,
          "flawedYn": 0,
          "fullPackageYn": 0,
          "limitedEditionYn": 0,
          "maxPrice": 2000000000,
          "minPrice": 0,
          "tradeType": 0
        },
        "page": 0,
        "firstQuantity": 10,
        "productFilter": "ALL",
        "productStates": [
            0,
            1
        ],
        "quantity": 10,
        "searchQuantity": 30,
        "osType": 2,
        "searchWord": keyword,
        "sort": "RECENT_SORT",
        "startIndex": 0,
        "searchStartTime": "2022-03-25 02:19:06"
      }
    });
    const items = res.data.data.items;
    console.log('### 중고나라', items);
    const _data = items.map((item: any) => ({
      id: item.articleSeq,
      title: item.title,
      location: '',
      prd_img: `https://img2.joongna.com${item.url}`,
      tag: '',
      update_date: item.articleReqDate,
      price: item.price,
      market: 'joongna',
      link: item.articleUrl
    }));
    return _data;
  };

  return (
    <div className={styles.all_markets_container}>
      <div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" onKeyUp={handleKeyUp} onChange={handleChange} />
        <Button variant="contained" onClick={handleSearch}>Outlined</Button>
      </div>

      <div>
        <TableContainer className={styles.posts_container} component={Paper}>
          <Table className='table_posts' sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" width='100px'>Image</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">Market</StyledTableCell>
                <StyledTableCell align="left">Location</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item: any, idx: number) => (
                <StyledTableRow className='table_row' key={idx} onClick={() => handleClickLink(item)}>
                  <StyledTableCell className='table_cell' component="th" scope="row">
                    {/* <div style={{ width: '100px', height: '100px' }}><Image alt='test' layout='fill' src={item.prd_img} /></div> */}
                    <div><img style={{ height: '100px' }} src={item.prd_img} /></div>
                  </StyledTableCell>
                  <StyledTableCell className='table_cell' component="th" scope="row">{item.title}</StyledTableCell>
                  <StyledTableCell className='table_cell' component="th" scope="row">{item.price}</StyledTableCell>
                  <StyledTableCell className='table_cell' component="th" scope="row">{item.market}</StyledTableCell>
                  <StyledTableCell className='table_cell' component="th" scope="row">{item.location}</StyledTableCell>
                  <StyledTableCell className='table_cell' component="th" scope="row">{item.update_date}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default withLayout(Posts);
