import React, {Component} from 'react';
import GmairHeader from "../header/header";
import {Breadcrumb, Layout} from "antd";
import Sidebar from "../sidebar/sidebar";

class DashboardAdminPart extends Component {
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
                        <Breadcrumb.Item>省份数据统计</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{backgroundColor: `white`, paddingTop: `25px`,textAlign:`center`}}>
                    </div>
                </Layout>
            </Layout>
        </div>
    }
}

export default DashboardAdminPart;