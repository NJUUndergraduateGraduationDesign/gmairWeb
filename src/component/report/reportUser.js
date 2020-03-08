import React, {Component} from 'react';
import {DatePicker, Button, Select, Row, Col,Layout,Breadcrumb,Carousel} from 'antd';
import GmairHeader from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Footer from "../header/footer";
import {reportService} from "../../service/report.service";
import "./reportUser.css"

class ReportUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid : sessionStorage.getItem("userName"),

            openDaysCount : 0,
            mostOpenDay : '',
            mostOpenDayHoursCount : 0.0,

            mostOpenHourGTE : 0,
            mostOpenHourLTE : 0,
            mostOpenHourMinutesCount : 0.0,

            mostUseMode : '',
            mostUseModeHoursCount : 0.0,

            pm25Average : 0.0,
            defeatUserPercent : 0.0,

            categoryEnvironment : 0,
        };
    }

    componentDidMount() {
        reportService.reportData(this.state.uid).then(response =>{
            this.setState({
                openDaysCount: response.data.openDaysCount,
                mostOpenDay: response.data.mostOpenDay,
                mostOpenDayHoursCount: response.data.mostOpenDayHoursCount,

                mostOpenHourGTE: response.data.mostOpenHourGTE,
                mostOpenHourLTE: response.data.mostOpenHourLTE,
                mostOpenHourMinutesCount: response.data.mostOpenHourMinutesCount,

                mostUseMode: response.data.mostUseMode,
                mostUseModeHoursCount: response.data.mostUseModeHoursCount,

                pm25Average: response.data.pm25Average,
                defeatUserPercent: response.data.defeatUserPercent,

                categoryEnvironment: response.data.categoryEnvironment
            });
        });
    }

    render() {
        const carouselSettings = {
            autoplay: false,
            autoplaySpeed: 5000,
        };

        return <div>
            <GmairHeader/>
            <Layout>
            <Sidebar/>
            <Layout style={{padding: '0 24px 24px',width:`100%`}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>用户月报</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{backgroundColor: `white`, paddingTop: `0px`}}>
                    <Carousel {...carouselSettings} className={'carouselCss'}>
                        <div>
                            <p className={"statisticText1"}>在最近30天中......</p>
                            <p className={"statisticText2"}>您的设备共有 {this.state.openDaysCount} 天处于运行状态；</p>
                            <p className={"statisticText3"}>{this.state.mostOpenDay}，您的设备运行了最长的时间，</p>
                            <p className={"statisticText4"}>最长时间为 {this.state.mostOpenDayHoursCount} 分钟！</p>
                            <img src={require("../../../public/carouselImg/1.jpg")} alt={'#'} className={"bgImgCss"}/>
                        </div>
                        <div>
                            <p className={"statisticText1"}>在最近30天中......</p>
                            <p className={"statisticText2"}>您经常在 {this.state.mostOpenHourGTE} 时到 {this.state.mostOpenHourLTE} 时之间使用设备；</p>
                            <p className={"statisticText3"}>在这个时间段内，您平均使用了 {this.state.mostOpenHourMinutesCount} 分钟！</p>
                            <img src={require("../../../public/carouselImg/2.jpg")} alt={'#'} className={"bgImgCss"}/>
                        </div>
                        <div>
                            <p className={"statisticText5"}>在最近30天中......</p>
                            <p className={"statisticText6"}>您最常使用的设备模式是：{this.state.mostUseMode}；</p>
                            <p className={"statisticText7"}>该模式您使用了 {this.state.mostUseModeHoursCount} 小时！</p>
                            <img src={require("../../../public/carouselImg/3.jpg")} alt={'#'} className={"bgImgCss"}/>
                        </div>
                        <div>
                            <p className={"statisticText5"}>在最近30天中......</p>
                            <p className={"statisticText6"}>您的室内平均PM2.5指数是；{this.state.pm25Average}；</p>
                            <p className={"statisticText7"}>打败了全国 {this.state.defeatUserPercent} % 的用户！继续加油！</p>
                            <img src={require("../../../public/carouselImg/4.jpg")} alt={'#'} className={"bgImgCss"}/>
                        </div>
                        <div>
                            <p className={"statisticText1"}>在最近30天中......</p>
                            <p className={"statisticText2"}>经分析，您的室内环境类别为：{this.state.categoryEnvironment}。</p>
                            <img src={require("../../../public/carouselImg/5.jpg")} alt={'#'} className={"bgImgCss"}/>
                        </div>
                    </Carousel>
                </div>
            </Layout>
            </Layout>
            <Footer/>
        </div>
    }
}

export default ReportUser;
