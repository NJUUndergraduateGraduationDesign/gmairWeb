import React, {Component} from 'react';
import GmairHeader from "../header/header";
import {Breadcrumb, Card, Layout, Statistic} from "antd";
import Sidebar from "../sidebar/sidebar";
import ProvinceMap from "../echarts/provinceMap";
import {userStatisticservice} from "../../service/userStatistic.service";
import Map from "../echarts/map";

let totalUser =0;
let newUser =0;
let province;
class DashboardAdminPart extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        province=this.props.match.params.province;
        userStatisticservice.provinceUser(province).then(response=>{
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
        return <div>
            <GmairHeader/>
            <Layout>
                <Sidebar/>
                <Layout style={{padding: '0 24px 24px',width:`100%`}}>
                    <Breadcrumb style={{margin: '16px 0'}} separator=">">
                        <Breadcrumb.Item href="/dashboardAdmin">数据总览</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.props.match.params.province}数据统计</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{backgroundColor: `white`, paddingTop: `25px`,textAlign:`center`}}>
                        <div style={{display:'inline-block',width: '60%', height: '500px',float:'left',marginLeft:10}}>
                            <ProvinceMap province={this.props.match.params.province}/>
                        </div>
                        <div style={{display:'inline-block'}}>
                            <Card style={statisticComponent} >
                                <Statistic title={this.props.match.params.province+'用户总数'} value={totalUser} suffix={'个'} valueStyle={valueType} />
                            </Card>
                            <Card style={statisticComponent}>
                                <Statistic title="当月新增用户数" value={newUser} suffix={'个'} valueStyle={valueType}/>
                            </Card>
                        </div>
                    </div>
                </Layout>
            </Layout>
        </div>
    }
}

export default DashboardAdminPart;