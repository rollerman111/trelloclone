import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  TablePagination,
  TableFooter,
  FormControl,
  TextField,
  InputAdornment,
} from '@mui/material'
import type { projectObj } from '../../redux/slices/projectSlice'
import PriorityCell from './PriorityCell'
import StatusCell from './StatusCell'
import ProgressCell from './ProgressCell'
import DateCell from './DateCell'
import UpdateFavorites from './UpdateFavorites'
import TableMenu from './TableMenu'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';


type props = {
  projects: projectObj[]
}

export default function ProjectTable({ projects }: props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects.length) : 0;

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearchTerm(event.target.value)
  };

  const handleClick = (): void => {
    setShowClearIcon('none')
    setSearchTerm('')
  };



  return (
    <>
      <TableContainer component={Paper} sx={{ flex: 1 }}>

        <FormControl sx={{ margin: 0, display: 'flex' }}>
          <TextField
            size="small"
            variant="outlined"
            onChange={handleChange}
            value={searchTerm}
            placeholder="Search by title..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ display: showClearIcon }}
                  onClick={handleClick}
                  sx={{ cursor: 'pointer' }}
                >
                  <ClearIcon />
                </InputAdornment>
              )
            }}
          />
        </FormControl>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="center">Priority&nbsp;</TableCell>
              <TableCell align="center">End Date&nbsp;</TableCell>
              <TableCell align="center">Status&nbsp;</TableCell>
              <TableCell align="center" >Progress&nbsp;</TableCell>
              <TableCell padding="checkbox" ></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((row: projectObj) => row.title.includes(searchTerm))
              : projects.filter((row: projectObj) => row.title.includes(searchTerm))
            ).map((row) => (
              <TableRow key={row.id}>

                <TableCell component="th" scope="row">
                  <UpdateFavorites favorite={row.favorite} id={row.id as number} />
                </TableCell>

                <TableCell component="th" scope="row">
                  <Link to={`/project/${row.id}`}>{row.title}</Link>
                </TableCell>
                <TableCell align="center">

                  <PriorityCell priority={row.priority} id={row.id as number} />


                </TableCell>
                <TableCell align="center">
                  <DateCell endDate={row.endDate} id={row.id as number} />
                </TableCell>

                <TableCell align="center">
                  <StatusCell status={row.status} id={row.id as number} />
                </TableCell>

                <TableCell align="center">
                  <ProgressCell progress={row.progress} id={row.id as number} />
                </TableCell>

                <TableCell align="center">
                  <TableMenu id={row.id as number} />

                </TableCell>

              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination

                colSpan={6}
                rowsPerPageOptions={[10, 20, 50]}
                count={projects.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}
