import React, {Component} from 'react';
import {DatePicker, Button, Select, Row, Col,Layout,Breadcrumb} from 'antd';

import Sidebar from "../sidebar/sidebar";
import GmairHeader from "../header/header";
import 'antd/dist/antd.css';
import Map from "../echarts/map";

class DashboardAdmin extends Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div>
            <GmairHeader/>
            <Layout>
                <Sidebar/>
                <Layout style={{padding: '0 24px 24px',width:`100%`}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>数据总览</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{backgroundColor: `white`, paddingTop: `25px`,textAlign:`center`}}>
                        <Map/>
                    </div>
                </Layout>
            </Layout>
        </div>

    )
    }
}

export default DashboardAdmin;
