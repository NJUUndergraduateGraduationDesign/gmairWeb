import React, {Component} from 'react';
import {DatePicker, Button, Select, Row, Col,Layout,Breadcrumb} from 'antd';

import {Map, Markers, InfoWindow} from 'react-amap';
import moment from 'moment';
import {geolocationservice} from "../../service/geolocation.service";
import Sidebar from "../sidebar/sidebar";
import GmairHeader from "../header/header";
import 'antd/dist/antd.css';


const Option = Select.Option;
const {RangePicker} = DatePicker;
let provinceData = [];
let cityData = {};
const {Content} = Layout;

class DashboardUser extends Component {
    constructor() {
        super();
        this.state = {
            start: ``,
            end: ``,
            city: '',
            status: '',
            order_list: [],
            zoom: `4`,
            latitude: `34.75`,
            longitude: `104.5`,
            cities: [],
            secondCity: '',
            province: '',
            infoData: {position: {longitude: ``, latitude: ``}},
            infovisible: false,
        }
        this.markerEvents = {
            click: (e, marker) => {
                this.setState({
                    infoData: marker.Pg.extData,
                    infovisible: true,
                    longitude: marker.Pg.extData.position.longitude,
                    latitude: marker.Pg.extData.position.latitude,
                })
                console.log(marker.Pg.extData);
            }
        }
        this.infoEvents = {
            close: () => {
                this.setState({
                    infovisible: false,
                })
            }
        }
        this.onDateChange = this.onDateChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.onSecondCityChange = this.onSecondCityChange.bind(this);
    }

    //格式化日期
    formatDate(time) {
        let date = new Date(time);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let M = date.getMinutes();
        let s = date.getSeconds();
        let date_format = y + '-' + (m > 9 ? m : "0" + m) + '-' + (d > 9 ? d : "0" + d) + ' ' + (h > 9 ? h : "0" + h) + ':' + (M > 9 ? M : "0" + M) + ':' + (s > 9 ? s : "0" + s);
        return date_format;
    }

    //日期信息发生改变时
    onDateChange(value) {
        this.setState({
            start: this.formatDate(value[0]._d),
            end: this.formatDate(value[1]._d),
        })
    }

    //订单状态改变时
    onStatusChange(value) {
        if (value === '未选择') {
            this.setState({
                status: '',
            })
        }
        else {
            this.setState({
                status: value,
            })
        }
    }

    //点击查询按钮时触发
    onButtonClick() {
        let {secondCity} = this.state
        this.getOrderList();
        if (secondCity === '无' || secondCity === '未选择') {
            this.setState({
                latitude: `34.75`,
                longitude: `104.5`,
                zoom: `4`
            })
        }
        else {
            geolocationservice.obtain_latLng(secondCity).then(response => {
                if (response.responseCode === 'RESPONSE_OK') {
                    let latlng = response.data;
                    this.setState({
                        latitude: latlng.location.lat,
                        longitude: latlng.location.lng,
                        zoom: `9`,
                    })
                }
            })
        }
    }

    //根据不同条件获取订单信息
    getOrderList() {
        let {start, end, province, city, status} = this.state;
        let latlng_list = [];
        let order = [];

    }

    //获取省份LIST
    getProvinceCityList() {
        geolocationservice.obtain_province().then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let province = response.data;
                provinceData.push("全国");
                cityData['全国'] = ['无'];
                for (let i = 0; i < province.length; i++) {
                    provinceData[i + 1] = province[i].provinceName;
                    geolocationservice.obtain_city(province[i].provinceId).then(response => {
                        if (response.responseCode === "RESPONSE_OK") {
                            let cityNameList = [];
                            cityNameList.push("未选择");
                            for (let j = 0; j < response.data.length; j++) {
                                cityNameList.push(response.data[j].cityName)
                            }
                            cityData[province[i].provinceName] = cityNameList;
                        }
                    })
                }
            }
            if (response.responseCode === 'RESPONSE_NULL') {
                //alert("您查询的订单为空,请检查查询条件！");
            }
            if (response.responseCode === 'RESPONSE_ERROR') {
                //alert("查询出现错误！");
            }
        })
    }

    componentDidMount() {
        this.getOrderList();
    }

    componentWillMount() {
        this.getProvinceCityList();
        this.setState({
            start: this.formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1))),
        })
    }

    //省份改变时触发
    handleProvinceChange = (value) => {
        this.setState({
            cities: cityData[value],
            secondCity: cityData[value][0],
            province: '',
            city: '',
        });
        if (value !== '全国') {
            this.setState({
                province: value,
            })
        }
    };

    //市/区改变时触发
    onSecondCityChange = (value) => {
        this.setState({
            secondCity: value,
        });
        if (value === '未选择') {
            this.setState({
                city: '',
            })
        } else {
            this.setState({
                city: value,
            })
        }
    }

    render() {
        const styleComponentHead = {
            // position:`absolute`,
            zIndex: `6`,
            margin: `0em`,
            opacity: `0.9`,
            paddingBottom: `1em`,
            border: `0em`,
            width: `100%`
        }
        const grid_style = {
            marginRight: `1em`,
            marginLeft: `4em`,
        }
        const city_select_button = {
            width: `8em`,
        }
        const select_order_style = {
            width: `8em`,
        }
        const city_select_style = {
            marginRight: `1em`,
            padding: `0em`,
        }
        const city_left_select = {
            marginRight: `1em`
        }
        const city_right_select = {
            marginLeft: `1em`
        }
        const button_style = {
            marginLeft: `4em`,
        }
        const map_style = {
            height: window.innerHeight,
            border: '1px solid #fff',
        }
        const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
        const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
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
                                <div style={styleComponentHead}>
                                    <Row align="middle" type="flex" justify="center">
                                        <Col style={city_select_style}>城市选择</Col>
                                        <Col span={2} style={city_left_select}>
                                            <Select defaultValue={provinceData[0]} placeholder={'省'}
                                                    style={city_select_button}
                                                    onChange={this.handleProvinceChange} showSearch>
                                                {provinceOptions}
                                            </Select>
                                        </Col>
                                        <Col span={2} style={city_right_select}>
                                            <Select value={this.state.secondCity} style={city_select_button}
                                                    placeholder={'市/区'}
                                                    onChange={this.onSecondCityChange} showSearch>
                                                {cityOptions}
                                            </Select>
                                        </Col>
                                        <Col style={grid_style}>订单状态</Col>
                                        <Col span={2}>
                                            <Select style={select_order_style} showSearch onChange={this.onStatusChange}
                                                    placeholder="订单状态">
                                                <option value="未选择">未选择</option>
                                                <option value="PAYED">已支付</option>
                                                <option value="PROCESSING">进行中</option>
                                                <option value="FINISHED">已完成</option>
                                                <option value="COMMENTED">已安装</option>
                                                <option value="CLOSED">已结束</option>
                                            </Select>
                                        </Col>
                                        <Col style={grid_style}>日期选择</Col>
                                        <Col span={5}>
                                            <RangePicker
                                                defaultValue={[moment(new Date(new Date().setMonth(new Date().getMonth() - 1))), moment(new Date())]}
                                                placeholder={['Start', 'End']} format="YYYY-MM-DD"
                                                onChange={this.onDateChange}/>
                                        </Col>
                                        <Col span={2} style={button_style}>
                                            <Button type="primary" onClick={this.onButtonClick}>查询</Button>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={map_style}>
                                    <Map plugins={['ToolBar']}
                                         center={{latitude: this.state.latitude, longitude: this.state.longitude}}
                                         zoom={this.state.zoom} amapkey={`34c29a215aa3f61b5cf21323006f6cfc`}>
                                        <Markers markers={this.state.order_list} useCluster events={this.markerEvents}>
                                        </Markers>
                                        <InfoWindow position={{
                                            longitude: this.state.infoData.position.longitude,
                                            latitude: this.state.infoData.position.latitude
                                        }}
                                                    visible={this.state.infovisible} closeWhenClickMap={true}
                                                    events={this.infoEvents}
                                                    style={{border: '1px solid #3e88ff',}}>
                                            <h4>订单序号：{this.state.infoData.myLabel}</h4>
                                            <p>姓名：{this.state.infoData.consignee}</p>
                                            <p>地址：{this.state.infoData.address}</p>
                                            <a href={"/order/detail/" + this.state.infoData.orderId}
                                               target={"_blank"}>更多订单详情</a>
                                        </InfoWindow>
                                    </Map>
                                </div>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default DashboardUser;
