import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import {FormControl,NativeSelect,InputBase,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,InputLabel} from '@material-ui/core';
import SearchBar from "material-ui-search-bar";

import useStyles from './styles';

const columns = [
    { id: 'code', label: 'Code', minWidth: 170 },
    { id: 'first_name', label: 'First Name', minWidth: 100 },
    { id: 'last_name', label: 'Last Name', minWidth: 100 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'payment_amount',
      label: 'Payment Amount',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'payment_type',
        label: 'Payment Type',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
      },
    {
        id: 'payment_date',
        label: 'Payment Date',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
      }
  ];
  
  function createData(code, first_name, last_name, email, payment_amount,payment_type,payment_date) {
    return { code, first_name, last_name, email, payment_amount, payment_type, payment_date};
  }
  
  const rows = [
    createData('#3452', 'Tiran', 'Hettiarachchi', 'hettiarachchi1998@gmail.com','2500','VISA','22-08-2021'),
    createData('#3452', 'Tiran', 'Hettiarachchi', 'hettiarachchi1998@gmail.com','2500','VISA','22-08-2021'),
    createData('#3452', 'Tiran', 'Hettiarachchi', 'hettiarachchi1998@gmail.com','2500','VISA','22-08-2021'),
  ];

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
}))(InputBase);

const TotalRevenue = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('')
    const handleChange = (event) => {
        setAge(event.target.value);
    };
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
                <Grid item xs={4}>
                    <div className={classes.adminTitle}>
                        <h1 className={classes.adminTitleh}>Conference</h1>&nbsp;&nbsp;<h1 className={classes.adminTitleh1}>Revenue</h1>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div>
                        <FormControl className={classes.margin} style={{width:450,marginLeft:1,marginTop:30}}>
                            <InputLabel htmlFor="demo-customized-select-native">Select User Type</InputLabel>
                            <NativeSelect
                            id="demo-customized-select-native"
                            value={age}
                            placeholder="Select Your Conference"
                            onChange={handleChange}
                            input={<BootstrapInput />}>
                                <option aria-label="Select Your Conference" value="">Select User Type</option>
                                <option value={'Researcher'}>Researcher</option>
                                <option value={'Workshop Presenter'}>Workshop Presenter</option>
                                <option value={'Attendee'}>Attendee</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                </Grid>
                <Grid item xs={4}>
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

export default TotalRevenue
