import React, {Component} from 'react';
import {DatePicker, Button, Select, Row, Col,Layout,Breadcrumb} from 'antd';

import {Map, Markers, InfoWindow} from 'react-amap';
import moment from 'moment';
import {geolocationservice} from "../../service/geolocation.service";
import Sidebar from "../sidebar/sidebar";
import GmairHeader from "../header/header";
import 'antd/dist/antd.css';
import PropertyRadar from "../echarts/propertyRadar";
import {userStatisticservice} from "../../service/userStatistic.service";
import HeatCalendar from "../echarts/heatCalendar";
import ReactEcharts from "echarts-for-react";
import OpenTimePie from "../echarts/openTimePie";


const Option = Select.Option;
const {RangePicker} = DatePicker;
let provinceData = [];
let cityData = {};
const {Content} = Layout;
let calendarDataPM25={name:'室内PM2.5',value:[]};
let calendarDataOpenTime={name:'开启时间',value:[]};

class DashboardUser extends Component {
    constructor() {
        super();
        this.state={
            radar_data:[],
            open_time_data:{time:0,percent:0}
        }
    }

    getRadarData = () => {
        // userStatisticservice.userRadarData(sessionStorage.getItem('userName')).then(response=>{
            let response={data:{indoorPm25:30,outdoorPm25:100,co2:60,humid:75,temp:36,volume:120}};
            let radar_data=[];
            radar_data.push(response.data.indoorPm25);
            radar_data.push(response.data.outdoorPm25);
            radar_data.push(response.data.co2);
            radar_data.push(response.data.humid);
            radar_data.push(response.data.temp);
            radar_data.push(response.data.volume);
            this.setState({
                radar_data:radar_data
            })
        // })
    }

    getOpenTimeData = () => {
        // userStatisticservice.userOpenTimeData(sessionStorage.getItem('userName')).then(response=>{
        let response={data:{time:900}};
        let openTimeData=response.data.time;
        let percent=Math.round(openTimeData/1440*100);
        this.setState({
            open_time_data:{time:openTimeData,percent: percent}
        })
    }

    getCalendarData = () => {
        // userStatisticservice.calendarPm25(sessionStorage.getItem('userName')).then(response=>{
        let response={data:[
                    {"2019-05-25": 10},
                    {"2019-06-08": 11},
                    {"2019-06-09": 21},
                    {"2019-06-01": 31},
                    {"2019-06-03": 41},
                    {"2019-02-28": 51},
                    {"2019-02-26": 62},
                    {"2019-02-27": 71},
                    {"2019-02-24": 81},
                    {"2019-02-25": 91},
                    {"2019-02-22": 1}]}
        for (let i=0;i<response.data.length;i++){
            calendarDataPM25.value.push([Object.keys(response.data[i])[0],Object.values(response.data[i])[0]])
        }
        // })

        // userStatisticservice.calendarOpenTime(sessionStorage.getItem('userName')).then(response=>{
        response={data:[
                {"2019-05-25": 1},
                {"2019-06-08": 10},
                {"2019-06-09": 100},
                {"2019-06-01": 1000},
                {"2019-06-03": 991},
                {"2019-02-28": 1401},
                {"2019-02-26": 302},
                {"2019-02-27": 661},
                {"2019-02-24": 351},
                {"2019-02-25": 198},
                {"2019-02-22": 751}]}
        for (let i=0;i<response.data.length;i++){
            calendarDataOpenTime.value.push([Object.keys(response.data[i])[0],Object.values(response.data[i])[0]])
        }
        // })
    }

    componentDidMount() {
        this.getRadarData();
        this.getCalendarData();
        this.getOpenTimeData();
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
                            <div style={{display:"inline-block",width:400,height:350,marginLeft:50}}>
                                <OpenTimePie time={this.state.open_time_data.time+'min'} percent={this.state.open_time_data.percent}/>
                            </div>
                            <div style={{display:"inline-block",width:400,height:350,float:"right",marginRight:150}}>
                                <PropertyRadar data={this.state.radar_data}/>
                            </div>
                            <div style={{marginTop:300}}>
                                <HeatCalendar type='pm25' data={calendarDataPM25}/>
                                <HeatCalendar type='openTime' data={calendarDataOpenTime}/>
                            </div>
                      </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default DashboardUser;
