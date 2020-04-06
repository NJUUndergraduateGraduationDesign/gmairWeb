import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';
import Sidebar from "../sidebar/sidebar";
import GmairHeader from "../header/header";
import 'antd/dist/antd.css';
import PropertyRadar from "../echarts/propertyRadar";
import {userStatisticservice} from "../../service/userStatistic.service";
import HeatCalendar from "../echarts/heatCalendar";
import OpenTimePie from "../echarts/openTimePie";
import Footer from "../header/footer";
import './dashboard.css'

const {Content} = Layout;
let calendarDataPM25 = {name: '室内PM2.5', value: []};
let calendarDataOpenTime = {name: '开启时间', value: []};

class DashboardUser extends Component {
    constructor() {
        super();
        this.state = {
            radar_data: [],
            forecast_data: [],
            open_time_data: {time: 0, percent: 0}
        }
    }

    getRadarData = () => {
        userStatisticservice.userRadarData().then(response => {
            // let response={data:{indoorPm25:30,outdoorPm25:100,co2:60,humid:75,temp:36,volume:120}};
            let radar_data = [];
            radar_data.push(response.data.indoorPm25);
            radar_data.push(response.data.outdoorPm25);
            radar_data.push(response.data.co2);
            radar_data.push(response.data.humid);
            radar_data.push(response.data.temp);
            radar_data.push(response.data.volume);
            this.setState({
                radar_data: radar_data
            })
        })
    };

    getOpenTimeData = () => {
        userStatisticservice.userOpenTimeData().then(response => {
            // let response={data:{time:900}};
            if (response.code === 200) {
                let openTimeData = response.data.time;
                let percent = Math.round(openTimeData / 1440 * 100);
                this.setState({
                    open_time_data: {time: openTimeData, percent: percent}
                })
            }
        })
    };

    getCalendarData = () => {
        userStatisticservice.calendarPm25().then(response => {
            // let response={data:{
            //             "2019-05-25": 10,
            //             "2019-06-08": 11,
            //             "2019-06-09": 21,
            //             "2019-06-01": 31,
            //             "2019-06-03": 41,
            //             "2019-02-28": 51,
            //             "2019-02-26": 62,
            //             "2019-02-27": 71,
            //             "2019-02-24": 81,
            //             "2019-02-25": 91,
            //             "2019-02-22": 1}}
            for (let i in response.data) {
                calendarDataPM25.value.push([i, response.data[i]])
            }
            this.forceUpdate()
        });

        userStatisticservice.calendarOpenTime().then(response => {
            // response={data:{
            //         "2019-05-25": 100,
            //         "2019-06-08": 110,
            //         "2019-06-09": 210,
            //         "2019-06-01": 310,
            //         "2019-06-03": 410,
            //         "2019-02-28": 510,
            //         "2019-02-26": 620,
            //         "2019-02-27": 710,
            //         "2019-02-24": 810,
            //         "2019-02-25": 910,
            //         "2019-02-22": 10}}
            for (let i in response.data) {
                calendarDataOpenTime.value.push([i, response.data[i]])
            }
            this.forceUpdate()
        })
    };

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
                            <div>
                                <h3 style={{fontWeight: 'bold'}}>近30天数据综合</h3>
                            </div>
                            <div style={{display: "inline-block", width: 400, height: 350, marginLeft: 50}}>
                                <OpenTimePie time={this.state.open_time_data.time + 'min'}
                                             percent={this.state.open_time_data.percent}/>
                            </div>
                            <div style={{
                                display: "inline-block",
                                width: 400,
                                height: 350,
                                float: "right",
                                marginRight: 150
                            }}>
                                <PropertyRadar data={this.state.radar_data}/>
                            </div>
                            <div style={{marginTop: 280}}>
                                <HeatCalendar type='pm25' data={calendarDataPM25}/>
                                <HeatCalendar type='openTime' data={calendarDataOpenTime}/>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
                <Footer/>
            </div>
        )
    }
}

export default DashboardUser;
