import React from 'react'
import TotalCards from './TotalCards'
import AdminTabPanel from './AdminTabPanel'
import useStyles from './styles';

const Admin = () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.adminTitle}>
                <h1 className={classes.adminTitleh}>Admin</h1>&nbsp;&nbsp;<h1 className={classes.adminTitleh1}>Dashboard</h1>
            </div>
            <TotalCards />
            <div>
                <h2 style={{marginLeft:30}}>User Summary</h2>
            </div>
            <AdminTabPanel />
           
        </div>
    )
}

export default Admin
