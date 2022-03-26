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

import { experiments } from '@/constants';

import styles from '@/styles/Posts.module.scss';

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

const Experiments: NextPage = () => {
  const router = useRouter();

  const handleClick = (key: string) => {
    console.log('clicked!!!');
    router.push(`/experiment/${key}`);
  };

  return (
    <TableContainer className={styles.posts_container} component={Paper}>
      <Table className='table_posts' sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Experiments</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.keys(experiments).filter(key => experiments[key].publish).map((key, idx) => (
            <StyledTableRow className='table_row' key={idx} onClick={() => handleClick(key)}>
              <StyledTableCell className='table_cell' component="th" scope="row">
                <div className='table_cell_line title'>{experiments[key].title}</div>
                <div className='table_cell_line'>{experiments[key].desc}</div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withLayout(Experiments);