import React, {Component} from 'react';
import {DatePicker, Button, Select, Row, Col,Layout,Breadcrumb,Carousel} from 'antd';
import GmairHeader from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Footer from "../header/footer";
import {reportService} from "../../service/report.service";
import "./reportUser.css"

const envLv = ["优", "较优" , "一般", "较差", "差"];
const envSuggest = ["太棒了，请保持！", "加油，争取更好！", "还有提升空间哦！", "请多多使用本设备改善室内环境！", "请多多使用本设备改善室内环境！"];

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

            categoryEnvironment : "",
            environmentSuggest : "",

            part1 : {
                first : true,
                text1 : "statisticText1WithAnim",
                text2 : "statisticText2WithAnim",
                text3 : "statisticText3WithAnim",
                text4 : "statisticText4WithAnim",
            },

            part2 : {
                first : true,
                text1 : "statisticText1",
                text2 : "statisticText2",
                text3 : "statisticText3",
            },

            part3 : {
                first : true,
                text1 : "statisticText5",
                text2 : "statisticText6",
                text3 : "statisticText7",
            },

            part4 : {
                first : true,
                text1 : "statisticText8",
                text2 : "statisticText9",
                text3 : "statisticText10",
            },

            part5 : {
                first : true,
                text1 : "statisticText1",
                text2 : "statisticText2",
                text3 : "statisticText3",
            },
        };

        this.onChange = this.onChange.bind(this);
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

                categoryEnvironment: envLv[response.data.categoryEnvironment],
                environmentSuggest: envSuggest[response.data.categoryEnvironment],
            });
        });
    }

    onChange(current) {
        if (current === 1 && this.state.part2.first) {
            this.setState({
                part2 : {
                    first : false,
                    text1 : "statisticText1WithAnim",
                    text2 : "statisticText2WithAnim",
                    text3 : "statisticText3WithAnim",
                },
            })
        }
        else if (current === 2 && this.state.part3.first) {
            this.setState({
                part3 : {
                    first : false,
                    text1 : "statisticText5WithAnim",
                    text2 : "statisticText6WithAnim",
                    text3 : "statisticText7WithAnim",
                },
            })
        }
        else if (current === 3 && this.state.part4.first) {
            this.setState({
                part4 : {
                    first : false,
                    text1 : "statisticText8WithAnim",
                    text2 : "statisticText9WithAnim",
                    text3 : "statisticText10WithAnim",
                },
            })
        }
        else if (current === 4 && this.state.part5.first) {
            this.setState({
                part5 : {
                    first : false,
                    text1 : "statisticText1WithAnim",
                    text2 : "statisticText2WithAnim",
                    text3 : "statisticText3WithAnim",
                },
            })
        }
    }

    render() {
        const carouselSettings = {
            autoplay: true,
            autoplaySpeed: 6000,
            afterChange: this.onChange
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
                            <p className={this.state.part1.text1}>在这个月里......</p>
                            <p className={this.state.part1.text2}>您的设备共有 <span className={'special-font'}>
                                {this.state.openDaysCount}</span> 天处于运行状态；</p>
                            <p className={this.state.part1.text3}><span className={'special-font'}>
                                {this.state.mostOpenDay}</span>，您的设备运行了最长的时间，</p>
                            <p className={this.state.part1.text4}>最长时间为
                                <span className={'special-font'}>{this.state.mostOpenDayHoursCount}</span> 小时！</p>
                            <img src={require("../../../public/carouselImg/1.jpg")} alt={'#'} className={"bgImgCss"}/>
                        </div>
                        <div>
                            <p className={this.state.part2.text1}>在这个月里......</p>
                            <p className={this.state.part2.text2}>您经常在 <span className={'special-font'}>
                                {this.state.mostOpenHourGTE}</span> 时到 <span className={'special-font'}>
                                {this.state.mostOpenHourLTE}</span> 时之间使用设备；</p>
                            <p className={this.state.part2.text3}>在这个时间段内，您平均使用了 <span className={'special-font'}>
                                {this.state.mostOpenHourMinutesCount}</span> 分钟！</p>
                            <img src={require("../../../public/carouselImg/2.jpg")} alt={'#'} className={"bgImgCss"}/>
                        </div>
                        <div>
                            <p className={this.state.part3.text1}>在这个月里......</p>
                            <p className={this.state.part3.text2}>您最常使用的设备模式是：<span className={'special-font'}>
                                {this.state.mostUseMode}</span>；</p>
                            <p className={this.state.part3.text3}>该模式您使用了 <span className={'special-font'}>
                                {this.state.mostUseModeHoursCount}</span> 小时！</p>
                            <img src={require("../../../public/carouselImg/3.jpg")} alt={'#'} className={"bgImgCss"}/>
                        </div>
                        <div>
                            <p className={this.state.part4.text1}>在这个月里......</p>
                            <p className={this.state.part4.text2}>您的室内平均PM2.5指数是；<span className={'special-font'}>
                                {this.state.pm25Average}</span>；</p>
                            <p className={this.state.part4.text3}>打败了全国 <span className={'special-font'}>
                                {this.state.defeatUserPercent}</span> % 的用户！继续加油！</p>
                            <img src={require("../../../public/carouselImg/4.jpg")} alt={'#'} className={"bgImgCss"}/>
                        </div>
                        <div>
                            <p className={this.state.part5.text1}>在这个月里......</p>
                            <p className={this.state.part5.text2}>经分析，您的室内环境类别为：<span className={'special-font'}>
                                {this.state.categoryEnvironment}</span>。</p>
                            <p className={this.state.part5.text3}><span className={'special-font'}>
                                {this.state.environmentSuggest}</span></p>
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
