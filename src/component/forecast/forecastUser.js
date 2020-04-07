import React, {Component} from 'react';
import {Layout, Breadcrumb, Card} from 'antd';
import GmairHeader from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Footer from "../header/footer";
import ForecastRadar from "../echarts/forecastRadar";
import {userStatisticservice} from "../../service/userStatistic.service";

const {Content} = Layout;
let levelTable = ['空气质量优良，可开窗通风哦(*^▽^*)', '空气质量不良，建议使用本产品进化空气(｀・ω・´)', '空气质量较差，建议持续使用本产品进化空气（￣へ￣）'];
let level = 0;
let temp = '';
let tempL = 0;

class ForecastUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast_data: []
        };
    }

    getTips = () => {
        let forecastRadar = this.state.forecast_data;
        if (forecastRadar[1] < 25) {
            level = 0;
        } else if (forecastRadar[1] < 50) {
            level = 1;
        } else {
            level = 2;
        }
        if (forecastRadar[4] < 8) {
            tempL = 2;
            temp = '天气寒冷，可使用本产品的高档辅热功能哦╮(╯﹏╰）╭'
        } else if (forecastRadar[4] < 15) {
            tempL = 1;
            temp = '天气较冷，可使用本产品的低档辅热功能哦(；′⌒`)'
        } else {
            tempL = 0;
            if (level == 0) {
                temp = '天气好好哦，出门逛逛吧(￣▽￣)~*'
            } else {
                temp = '这温度，刚刚好(￣▽￣)／'
            }
        }
        this.forceUpdate()
    };

    getForecastData = () => {
        userStatisticservice.getForecastData(localStorage.getItem('userName')).then(response => {
            if (response.code === 200) {
                let forecast_data = [];
                forecast_data.push(response.data.indoorPm25);
                forecast_data.push(response.data.outdoorPm25);
                forecast_data.push(response.data.co2);
                forecast_data.push(response.data.humid);
                forecast_data.push(response.data.temp);
                forecast_data.push(response.data.volume);
                this.setState({
                    forecast_data: forecast_data
                }, () => {
                    this.getTips()
                })
            }
        })
    };

    componentDidMount() {
        this.getForecastData();
    }

    render() {
        let styleType = ['innerCard1', 'innerCard2', 'innerCard3'];
        return <div>
            <GmairHeader/>
            <Layout>
                <Sidebar/>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>机器数据预测</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 480}}>
                        <div style={{marginBottom: 200}}>
                            <div style={{display: "inline-block", width: 400, height: 350, marginLeft: 50}}>
                                <ForecastRadar data={this.state.forecast_data}/>
                            </div>
                            <div style={{
                                display: "inline-block",
                                width: 400,
                                height: 350,
                                float: "right",
                                marginRight: 150,
                                marginTop: 60
                            }}>
                                <Card className="outerCard" title="机器明日运行情况的小建议"
                                      style={{width: 400, boxShadow: '10px 10px 10px #000000'}}
                                      headStyle={{
                                          backgroundColor: 'rgba(117,51,0,0.63)',
                                          fontSize: 18,
                                          fontFamily: 'KaiTi',
                                          borderTopLeftRadius: 20,
                                          borderTopRightRadius: 20,
                                          color: "white",
                                          textAlign: "center"
                                      }}>
                                    <Card className={styleType[level]} title="空气质量小建议"
                                          headStyle={{
                                              backgroundColor: 'rgba(17,17,17,0.63)',
                                              fontSize: 16,
                                              fontFamily: 'KaiTi',
                                              borderTopLeftRadius: 20,
                                              borderTopRightRadius: 20,
                                              color: "white",
                                              textAlign: "center"
                                          }}>
                                        <p style={{fontFamily: "FangSong", fontWeight: 'bold'}}>{levelTable[level]}</p>
                                    </Card>
                                    <Card className={styleType[tempL]} style={{marginTop: 16}} title="温度情况小建议"
                                          headStyle={{
                                              backgroundColor: 'rgba(11,11,11,0.63)',
                                              fontSize: 16,
                                              fontFamily: 'KaiTi',
                                              borderTopLeftRadius: 20,
                                              borderTopRightRadius: 20,
                                              color: "white",
                                              textAlign: "center"
                                          }}>
                                        <p style={{fontFamily: "FangSong", fontWeight: 'bold'}}>{temp}</p>
                                    </Card>
                                </Card>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <Footer/>
        </div>
    }
}

export default ForecastUser;
