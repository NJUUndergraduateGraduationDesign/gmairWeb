import React, {Component} from 'react';
import {DatePicker, Button, Select, Row, Col,Layout,Breadcrumb} from 'antd';
import {Map, Markers, InfoWindow} from 'react-amap';
import moment from 'moment';
import {geolocationservice} from "../../service/geolocation.service";
import {Card} from "antd";
import Sidebar from "../sidebar/sidebar";
import GmairHeader from "../header/header";
import 'antd/dist/antd.css';
import PropertyRadar from "../echarts/propertyRadar";
import {userStatisticservice} from "../../service/userStatistic.service";
import HeatCalendar from "../echarts/heatCalendar";
import ReactEcharts from "echarts-for-react";
import OpenTimePie from "../echarts/openTimePie";
import ForecastRadar from "../echarts/forecastRadar";
import Footer from "../header/footer";
import './dashboard.css'


const Option = Select.Option;
const {RangePicker} = DatePicker;
let provinceData = [];
let cityData = {};
const {Content} = Layout;
let calendarDataPM25={name:'室内PM2.5',value:[]};
let calendarDataOpenTime={name:'开启时间',value:[]};
let levelTable=['空气质量优良，可开窗通风哦(*^▽^*)','空气质量不良，建议使用本产品进化空气(｀・ω・´)','空气质量较差，建议持续使用本产品进化空气（￣へ￣）']
let level=0;
let temp='';
let tempL=0;

class DashboardUser extends Component {
    constructor() {
        super();
        this.state={
            radar_data:[],
            forecast_data:[],
            open_time_data:{time:0,percent:0}
        }
    }

    getTips = () => {
        let forecastRadar=this.state.forecast_data;
        if (forecastRadar.outdoorPm25<75){
            level=0;
        }
        else if(forecastRadar.outdoorPm25<150){
            level=1;
        }
        else {
            level=2;
        }
        if(forecastRadar.temp<8){
            tempL=2;
            temp='天气寒冷，可使用本产品的高档辅热功能哦╮(╯﹏╰）╭'
        }
        else if(forecastRadar.temp<15){
            tempL=1;
            temp='天气较冷，可使用本产品的低档辅热功能哦(；′⌒`)'
        }
        else {
            tempL=0;
            if(level==0){
                temp='天气好好哦，出门逛逛吧(￣▽￣)~*'
            }
            else {
                temp='这温度，刚刚好(￣▽￣)／'
            }
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

    getForecastData = () => {
        // userStatisticservice.getForecastData(sessionStorage.getItem('userName')).then(response=>{
        let response={data:{indoorPm25:50,outdoorPm25:150,co2:100,humid:175,temp:40,volume:160}};
        let forecast_data=[];
        forecast_data.push(response.data.indoorPm25);
        forecast_data.push(response.data.outdoorPm25);
        forecast_data.push(response.data.co2);
        forecast_data.push(response.data.humid);
        forecast_data.push(response.data.temp);
        forecast_data.push(response.data.volume);
        this.setState({
            forecast_data:forecast_data
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
        let response={data:{
                    "2019-05-25": 10,
                    "2019-06-08": 11,
                    "2019-06-09": 21,
                    "2019-06-01": 31,
                    "2019-06-03": 41,
                    "2019-02-28": 51,
                    "2019-02-26": 62,
                    "2019-02-27": 71,
                    "2019-02-24": 81,
                    "2019-02-25": 91,
                    "2019-02-22": 1}}
        for (let i in response.data){
            calendarDataPM25.value.push([i,response.data[i]])
        }
        // })

        // userStatisticservice.calendarOpenTime(sessionStorage.getItem('userName')).then(response=>{
        response={data:{
                "2019-05-25": 100,
                "2019-06-08": 110,
                "2019-06-09": 210,
                "2019-06-01": 310,
                "2019-06-03": 410,
                "2019-02-28": 510,
                "2019-02-26": 620,
                "2019-02-27": 710,
                "2019-02-24": 810,
                "2019-02-25": 910,
                "2019-02-22": 10}}
        for (let i in response.data){
            calendarDataOpenTime.value.push([i,response.data[i]])
        }
        // })
    }

    componentDidMount() {
        this.getRadarData();
        this.getCalendarData();
        this.getOpenTimeData();
        this.getForecastData();
        this.getTips();
    }

    render() {
        let styleType=['innerCard1','innerCard2','innerCard3']
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
                            <div style={{marginTop:280}}>
                                <HeatCalendar type='pm25' data={calendarDataPM25}/>
                                <HeatCalendar type='openTime' data={calendarDataOpenTime}/>
                            </div>
                            <div style={{marginBottom:200}}>
                            <div style={{display:"inline-block",width:400,height:350,marginLeft:50}}>
                                <ForecastRadar data={this.state.forecast_data}/>
                            </div>
                            <div  style={{display:"inline-block",width:400,height:350,float:"right",marginRight:150,marginTop:60}}>
                                <Card className="outerCard" title="机器明日运行情况的小建议" style={{width:400,boxShadow:'10px 10px 10px #000000'}}
                                      headStyle={{backgroundColor:'rgba(117,51,0,0.63)',fontSize:18,fontFamily:'KaiTi',borderTopLeftRadius:20,
                                          borderTopRightRadius:20,color:"white",textAlign:"center"}}>
                                    <Card className={styleType[level]}  title="空气质量小建议"
                                          headStyle={{backgroundColor:'rgba(17,17,17,0.63)',fontSize:16,fontFamily:'KaiTi',borderTopLeftRadius:20,
                                              borderTopRightRadius:20,color:"white",textAlign:"center"}}>
                                        <p  style={{fontFamily: "FangSong",fontWeight:'bold'}}>{levelTable[level]}</p>
                                    </Card>
                                    <Card className={styleType[tempL]} style={{ marginTop: 16}} title="温度情况小建议"
                                          headStyle={{backgroundColor:'rgba(11,11,11,0.63)',fontSize:16,fontFamily:'KaiTi',borderTopLeftRadius:20,
                                              borderTopRightRadius:20,color:"white",textAlign:"center"}}>
                                        <p style={{fontFamily: "FangSong",fontWeight:'bold'}}>{temp}</p>
                                    </Card>
                                </Card>
                            </div>
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
