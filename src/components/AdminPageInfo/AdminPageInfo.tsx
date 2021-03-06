import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '../../pages/AdminPage/AdminPage.scss';
import { RoomDataGrid } from '../GridComponents/Grids/RoomDataGrid/RoomDataGrid';
import { CategoryDataGrid } from '../GridComponents/Grids/CategoryDataGrid/CategoryDataGrid';
import { OrderDataGrid } from '../GridComponents/Grids/OrderDataGrid/OrderDataGrid';
import { EmployeeDataGrid } from '../GridComponents/Grids/EmployeeDataGrid/EmployeeDataGrid';
import { FeedbackDataGrid } from '../GridComponents/Grids/FeedbackDataGrid/FeedbackDataGrid';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CometChatSupport from '../CometChatSupport/CometChatSupport';
import { ArticleDataGrid } from '../GridComponents/Grids/ArticleDataGrid/ArticleDataGrid';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: any) => ({
    root: {
        flexGrow: 1,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 'bold',
        color: '#fff',
    },
}));

export const AdminPageInfo: React.FC = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container className={'admin-page align-items-center'} fluid>
            <AppBar color="primary" position="static" className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    scrollButtons="auto"
                    indicatorColor={'secondary'}
                    variant="scrollable"
                    aria-label="simple tabs example"
                >
                    <Tab label="Categories" {...a11yProps(0)} />
                    <Tab label="Rooms" {...a11yProps(1)} />
                    <Tab label="Orders" {...a11yProps(2)} />
                    <Tab label="Employees" {...a11yProps(3)} />
                    <Tab label="Feedbacks" {...a11yProps(4)} />
                    <Tab label="Articles" {...a11yProps(5)} />
                    <Tab label="Chat" {...a11yProps(5)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <CategoryDataGrid />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <RoomDataGrid />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <OrderDataGrid />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <EmployeeDataGrid />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <FeedbackDataGrid />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <ArticleDataGrid />
            </TabPanel>
            <TabPanel value={value} index={6}>
                <CometChatSupport />
            </TabPanel>
        </Container>
    );
};
