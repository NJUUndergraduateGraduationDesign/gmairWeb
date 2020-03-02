import React, {Component} from 'react';
import {DatePicker, Button, Select, Row, Col, Layout, Breadcrumb, Statistic} from 'antd';
import {Card} from "antd";
import Sidebar from "../sidebar/sidebar";
import GmairHeader from "../header/header";
import 'antd/dist/antd.css';
import Map from "../echarts/map";
import {userStatisticservice} from "../../service/userStatistic.service";

let totalUser =0;
let newUser =0;
class DashboardAdmin extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        userStatisticservice.totalUser().then(response=>{
            // totalUser=response.data.totalUser;
            // newUser=response.data.newUser;
        })
    }

    render() {
        const statisticComponent={
            width:'100%',
            margin: 100,
            marginLeft: 0,
            backgroundColor:'rgba(176,196,222,0.25)',
            borderRadius:50
        }
        const valueType={
            fontSize:40
        }
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
                        <div style={{display:'inline-block',width: '60%', height: '500px',float:'left',marginLeft:10}}>
                            <Map />
                        </div>
                        <div style={{display:'inline-block'}}>
                            <Card style={statisticComponent} >
                                <Statistic title="全国用户总数" value={totalUser} suffix={'个'} valueStyle={valueType} />
                            </Card>
                            <Card style={statisticComponent}>
                                <Statistic title="当月新增用户数" value={newUser} suffix={'个'} valueStyle={valueType}/>
                            </Card>
                        </div>
                    </div>
                </Layout>
            </Layout>
        </div>

    )
    }
}

export default DashboardAdmin;
