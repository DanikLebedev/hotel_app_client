import React, { useState } from 'react';
import './ManagerDashboard.scss';
import CometChatSupport from '../../components/CometChatSupport/CometChatSupport';
import { Col, Container, Row } from 'react-bootstrap';
import { ArticleDataGrid } from '../../components/GridComponents/Grids/ArticleDataGrid/ArticleDataGrid';
import { OrderDataGrid } from '../../components/GridComponents/Grids/OrderDataGrid/OrderDataGrid';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

export const ManagerDashboard = () => {
    return (
        <>
            <div className="dashboard-page-bg d-flex justify-content-center align-items-end" />
            <div className="dashboard-page">
                <Container className="dashboard-page-wrapper" fluid={true}>
                    <h1 className="text-center">Dashboard</h1>
                    <Tabs defaultTab="vertical-tab-one" vertical>
                        <TabList>
                            <Tab tabFor="vertical-tab-one">Chat</Tab>
                            <Tab tabFor="vertical-tab-two">Articles</Tab>
                            <Tab tabFor="vertical-tab-three">Orders</Tab>
                        </TabList>
                        <TabPanel tabId="vertical-tab-one">
                            <CometChatSupport />
                        </TabPanel>
                        <TabPanel tabId="vertical-tab-two">
                            <ArticleDataGrid/>
                        </TabPanel>
                        <TabPanel tabId="vertical-tab-three">
                            <OrderDataGrid />
                        </TabPanel>
                    </Tabs>
                </Container>
            </div>
        </>
    );
};
