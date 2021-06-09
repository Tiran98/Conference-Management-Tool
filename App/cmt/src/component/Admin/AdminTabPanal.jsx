import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import 'bootstrap/dist/css/bootstrap.min.css';

import useStyles from './styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}
  

const AdminTabPanel = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <div className={classes.tabroot}>
                <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example" className={classes.tabs} >
                    <Tab label="Reseachers" {...a11yProps(0)} />
                    <Tab label="Workshop Presenters" {...a11yProps(1)} />
                    <Tab label="Attendees" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <Form>
                    <InputGroup size="m" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">Total Registrations</InputGroup.Text>
                      <FormControl readOnly aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    <InputGroup size="m" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">Accepted Registrations</InputGroup.Text>
                      <FormControl readOnly aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    <InputGroup size="m" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">Declined Registrations</InputGroup.Text>
                      <FormControl readOnly aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    <InputGroup size="m" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">Pending Registrations</InputGroup.Text>
                      <FormControl readOnly aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                  </Form>  
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Form>
                      <InputGroup size="m" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Total Registrations</InputGroup.Text>
                        <FormControl readOnly aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup>
                      <InputGroup size="m" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Accepted Registrations</InputGroup.Text>
                        <FormControl readOnly aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup>
                      <InputGroup size="m" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Declined Registrations</InputGroup.Text>
                        <FormControl readOnly aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup>
                      <InputGroup size="m" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Pending Registrations</InputGroup.Text>
                        <FormControl readOnly aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup>
                    </Form>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Form>
                    <InputGroup size="m" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">Total Registrations</InputGroup.Text>
                      <FormControl readOnly aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                  </Form>      
                </TabPanel>
            </div>
        </div>
    )
}

export default AdminTabPanel