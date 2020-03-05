import React, {Component} from 'react';
import {DatePicker, Button, Select, Row, Col,Layout,Breadcrumb} from 'antd';
import GmairHeader from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Footer from "../header/footer";



class ReportUser extends Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <GmairHeader/>
            <Layout>
            <Sidebar/>
            <Layout style={{padding: '0 24px 24px',width:`100%`}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>用户月报</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{backgroundColor: `white`, paddingTop: `25px`,textAlign:`center`}}>
                </div>
            </Layout>
            </Layout>
            <Footer/>
        </div>
    }
}

export default ReportUser;
