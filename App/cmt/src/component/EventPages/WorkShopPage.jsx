import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import {FormControl,NativeSelect,InputBase,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,InputLabel} from '@material-ui/core';
import SearchBar from "material-ui-search-bar";

import useStyles from './styles';

const columns = [
    { id: 'code', label: 'No', minWidth: 170 },
    { id: 'conference', label: 'Conference', minWidth: 100 },
    { id: 'title', label: 'Workshop Title', minWidth: 100 },
    {
      id: 'name',
      label: 'Presenter',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'date',
      label: 'Date',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    }
  ];
  
  function createData(code, conference, title, name, date) {
    return { code, conference, title, name, date };
  }
  
  const rows = [
    createData('#3452', 'SLIIT', 'Web Developing React', 'Derik Alex','05/06/2021'),
    createData('#3452', 'SLIIT', 'Web Developing React', 'Derik Alex','05/06/2021'),
    createData('#3452', 'SLIIT', 'Web Developing React', 'Derik Alex','05/06/2021'),
  ];


const WorkShopPage = () => {
    const classes = useStyles();
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [search, setSearch] = React.useState('');
    return (
        <div>
           <Grid container spacing={3}>
                <Grid item xs={6}>
                    <div className={classes.adminTitle}>
                        <h1 className={classes.adminTitleh}>Workshop</h1>&nbsp;&nbsp;<h1 className={classes.adminTitleh1}>Presentations</h1>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <SearchBar
                        style={{marginTop:50,marginRight:40}}
                        value={search}
                        onChange={(newValue) => setSearch({ value: newValue })}
                        //onRequestSearch={() => doSomethingWith(this.state.value)}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth,color:'#ffcc00',backgroundColor:'#171717' }}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                        );
                                    })}
                                    </TableRow>
                                );
                                })}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default WorkShopPage
