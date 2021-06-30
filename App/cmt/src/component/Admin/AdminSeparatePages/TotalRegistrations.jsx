import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
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
      id: 'status',
      label: 'Registration Status',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    }
  ];
  
  function createData(code, first_name, last_name, email, status) {
    return { code, first_name, last_name, email, status };
  }
  
//   const rows = [
//     createData('#3452', 'Tiran', 'Hettiarachchi', 'hettiarachchi1998@gmail.com','Accepted'),
//     createData('#3452', 'Tiran', 'Hettiarachchi', 'hettiarachchi1998@gmail.com','Accepted'),
//     createData('#3452', 'Tiran', 'Hettiarachchi', 'hettiarachchi1998@gmail.com','Accepted'),
//   ];

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

const TotalRegistrations = () => {
    const classes = useStyles();

    const [userType, setUserType] = useState("");

    const handleDropdownChange = (event) => {
        setUserType(event.target.value, console.log(userType));
    };

    const [researchers, setResearchers] = useState([{
        firstName:'',
        lastname:'',
        email:'',
        status:''
    }])
    const [workshops, setWorkshops] = useState([{
        firstName:'',
        lastName:'',
        email:'',
        status:''
    }])
    const [attendees, setAttendee] = useState([{
        firstName:'',
        lastName:'',
        email:'',
        status:''
    }])

    useEffect(() => {
        fetch("http://localhost:5000/api/researcher/getResearchers").then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes => setResearchers(jsonRes));

        fetch("http://localhost:5000/api/workshop/getWorkshops").then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes => setWorkshops(jsonRes));

        fetch("http://localhost:5000/api/attendee/getAttendees").then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes => setAttendee(jsonRes));
    })

    const [age, setAge] = React.useState('')
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

    const ResearcherSection = () => (
        <div>
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
                            {researchers.map(research =>
                            <TableBody>
                                <tr>
                                    <td>1</td>
                                    <td>{research.firstName}</td>
                                    <td>{research.lastName}</td>
                                    <td>{research.email}</td>
                                    <td>status</td>
                                </tr>

                            </TableBody>
                             )}
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={researchers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}/>
                    </Paper>
            </Grid>
        </div>

    );
    const WorkshopSection = () => (
        <div>
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
                            {workshops.map(workshop =>
                            <TableBody>
                                <tr>
                                    <td>1</td>
                                    <td>{workshop.firstName}</td>
                                    <td>{workshop.lastName}</td>
                                    <td>{workshop.email}</td>
                                    <td>status</td>
                                </tr>

                            </TableBody>
                             )}
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={workshops.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}/>
                    </Paper>
            </Grid>
        </div>

    );
    const AttendeeSection = () => (
        <div>
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
                            {attendees.map(attendee =>
                            <TableBody>
                                <tr>
                                    <td>1</td>
                                    <td>{attendee.firstName}</td>
                                    <td>{attendee.lastName}</td>
                                    <td>{attendee.email}</td>
                                    <td>status</td>
                                </tr>

                            </TableBody>
                             )}
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={attendees.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}/>
                    </Paper>
            </Grid>
        </div>

    );


    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <div className={classes.adminTitle}>
                        <h1 className={classes.adminTitleh}>User</h1>&nbsp;&nbsp;<h1 className={classes.adminTitleh1}>Registrations</h1>
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
                            onChange={handleDropdownChange}
                            input={<BootstrapInput />}>
                                <option aria-label="Select Your Conference" value="">Select User Type</option>
                                <option value={'Researcher'}>Researcher</option>
                                <option value={'workshop_presenter'}>Workshop Presenter</option>
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
                {userType == "Researcher" ?
                    <ResearcherSection /> 
                    : userType == "workshop_presenter" ?
                    <WorkshopSection /> 
                    : userType == "Attendee" ?
                    <AttendeeSection /> : null } 
            </Grid>    
        </div>
    )
}

export default TotalRegistrations
