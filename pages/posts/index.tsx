import * as React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import withLayout from '@/components/layouts';

import { posts } from '@/constants';

import styles from '@/styles/Posts.module.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3E957B',
    color: '#fff',
    fontWeight: '900',
    borderRadius: '8px 8px 0 0'
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
  const router = useRouter();

  const handleClick = (key: string) => {
    console.log('clicked!!!');
    router.push(`/post/${key}`);
  };

  return (
    <TableContainer className={styles.posts_container} component={Paper}>
      <Table className='table_posts' sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">POSTS</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.keys(posts).filter(key => posts[key].publish).map((key, idx) => (
            <StyledTableRow className='table_row' key={idx} onClick={() => handleClick(key)}>
              <StyledTableCell className='table_cell' component="th" scope="row">
                <div className='table_cell_line title'>{posts[key].title}</div>
                <div className='table_cell_line'>{posts[key].desc}</div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withLayout(Posts);
