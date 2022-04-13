import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';
import Image from 'next/image';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import withLayout from '@/components/layouts';

import styles from '@/styles/AllMarkets.module.scss';

let timer: any;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#55aacc',
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

const AllMarkets = () => {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<Object[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [excluded, setExcluded] = useState([]);

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
    if (evt.keyCode === 13) handleSearch();
  };

  const handleChange = (evt: any) => {
    setKeyword(evt.currentTarget.value);
  };

  const handleChangeExcluded = (evt: any) => {
    const words = evt.currentTarget.value;
    setExcluded(words.split(',').map((word: string) => word.trim()));
  };

  const handleSearch = async () => {
    console.log(`keyword: ${keyword}`);
    setPage(0);
    setData([]);

    const list1 = await getNaverCafeList(keyword);
    console.log('### 중고나라: ', list1);
    const list2 = await getBunjangList(keyword);
    console.log('### 번개장터', list2);
    const list3 = await getDaangnList(keyword);
    console.log('### 당근마켓', list3);

    let allList = list1.concat(list2).concat(list3);
    allList = allList
      .filter((item: any) => excluded.filter((word: string) => item.title.includes(word)).length === 0)
      .sort((a: any, b: any) => new Date(b.update_date).getTime() - new Date(a.update_date).getTime());
    setData(allList);
  };

  const handleInfiniteScroll = () => {
    // console.log('handleInfiniteScroll');
  };

  const getBunjangList = async (keyword: string) => {
    const url = `/api/scrapers/products/bunjang?keyword=${keyword}`;
    // const url = `http://localhost:3000/api/scrapers/products/bunjang?keyword=${keyword}`;
    const res = await axios({
      method: 'GET',
      url,
    });
    return res.data.data;
  };

  const getNaverCafeList = async (keyword: string) => {
    const url = `/api/scrapers/products/navercafe?keyword=${keyword}`;
    const res = await axios({
      method: 'GET',
      url,
    });
    return res.data.data;
  };

  const getDaangnList = async (keyword: string) => {
    const url = `/api/scrapers/products/daangn?keyword=${keyword}`;
    const res = await axios({
      method: 'GET',
      url,
    });
    return res.data.data;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={styles.all_markets_container}>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', marginRight: '10px' }}>
          <div style={{ marginRight: '15px' }}>
            <TextField
              id="outlined-basic"
              label="검색"
              variant="outlined"
              onKeyUp={handleKeyUp}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField id="outlined-basic" label="제외" variant="outlined" onChange={handleChangeExcluded} />
          </div>
        </div>
        <div>
          <Button variant="contained" style={{ height: '55px' }} onClick={handleSearch}>
            검색
          </Button>
        </div>
      </div>

      <div>
        <TableContainer component={Paper}>
          <Table className="table_posts" sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" width="100px">
                  Image
                </StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">Market</StyledTableCell>
                <StyledTableCell align="left">Location</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, idx: number) => (
                <StyledTableRow className="table_row" key={idx} onClick={() => handleClickLink(item)}>
                  <StyledTableCell className="table_cell" component="th" scope="row">
                    <div style={{ width: '250px' }}>
                      <Image
                        alt="test"
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                        src={item.prd_img}
                      />
                    </div>
                    {/* <div><img style={{ height: '100px' }} src={item.prd_img} /></div> */}
                  </StyledTableCell>
                  <StyledTableCell className="table_cell" component="th" scope="row">
                    {item.title}
                  </StyledTableCell>
                  <StyledTableCell className="table_cell" component="th" scope="row">
                    {item.price}
                  </StyledTableCell>
                  <StyledTableCell className="table_cell" component="th" scope="row">
                    {item.market}
                  </StyledTableCell>
                  <StyledTableCell className="table_cell" component="th" scope="row">
                    {item.location}
                  </StyledTableCell>
                  <StyledTableCell className="table_cell" component="th" scope="row">
                    {item.update_date}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default withLayout(AllMarkets);
