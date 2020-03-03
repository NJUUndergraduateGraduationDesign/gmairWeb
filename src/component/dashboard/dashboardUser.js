import React, {Component} from 'react';
import {DatePicker, Button, Select, Row, Col,Layout,Breadcrumb} from 'antd';

import {Map, Markers, InfoWindow} from 'react-amap';
import moment from 'moment';
import {geolocationservice} from "../../service/geolocation.service";
import Sidebar from "../sidebar/sidebar";
import GmairHeader from "../header/header";
import 'antd/dist/antd.css';
import PropertyRadar from "../echarts/propertyRadar";


const Option = Select.Option;
const {RangePicker} = DatePicker;
let provinceData = [];
let cityData = {};
const {Content} = Layout;

class DashboardUser extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <GmairHeader/>
                <Layout>
                    <Sidebar/>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>主页</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 480}}>
                            <div style={{display:"inline-block",width:400,height:350,float:"right",marginRight:0}}>
                                <PropertyRadar />
                            </div>
                      </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default DashboardUser;
