import React from 'react';
import {Breadcrumb, Layout, Input, notification, InputNumber, Button, Form, Icon, Select} from 'antd'
import GmairHeader from "../header/header";
import Sidebar from "../sidebar/sidebar"
import '../../../node_modules/echarts/theme/macarons'
import {machine_data_service} from "../../service/machine_data.service";
import {datetimeService} from "../../service/datetime.service";
import MachineCharts from './machine_charts';


const Option = Select.Option;
const {Content} = Layout


class MachineData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qrcode: ``,
            select_day: 7,
            time_length: 7,
            data_type: 'pm25',
            data_type_name:["PM2.5"],
            data_y: [],
            y_name: "μg/m³",
            data_x: [],
            data_x_hour: [],
            data_y_hour: [],
            filter_show:false,
            filter_disabled:false,
        };
        this.selectDayChange = this.selectDayChange.bind(this);
        this.qrcodeChange = this.qrcodeChange.bind(this);
        this.dataTypeChange = this.dataTypeChange.bind(this);
        this.selectSubmit = this.selectSubmit.bind(this);
        this.filterClick = this.filterClick.bind(this);
    }


    componentDidMount() {
        let qrcode = this.props.match.params.qrcode;
        this.setState({
            qrcode: qrcode,
        })
        this.setDataTypeName();
        this.getDayData(qrcode, this.state.select_day, this.state.data_type);
        this.getHourData(qrcode, this.state.select_day, this.state.data_type);
        this.check_qrcode(qrcode);
    }

    qrcodeChange(e) {
        this.setState({
            qrcode: e.target.value,
        })
    }

    selectDayChange(value) {
        this.setState({
            select_day: value,
        })
    }

    dataTypeChange(value) {
        this.setState({
            data_type: value,
        })
    }

    getCityName(cityId){
        let data_type_name=this.state.data_type_name;
        machine_data_service.obtain_cityName(cityId).then(response=>{
            if(response.responseCode==="RESPONSE_OK"){
                data_type_name[2]=response.data[0].cityName+"PM2.5";
                this.setState({
                    data_type_name:data_type_name,
                })
            }
        })
    }

    filterClick(e){
        machine_data_service.config_screen(this.state.qrcode,'1').then(response=>{
            if(response.responseCode==="RESPONSE_OK"){
                this.setState({
                    filter_disabled:true,
                })
                setTimeout(()=>{
                    this.setState({
                        filter_disabled:false,
                    })
                },10000)
                this.openNotification("点亮滤网灯","成功")
            }else {
                this.openNotification("点亮滤网灯","失败，请稍后重试")
            }
        })
    }

    getDayData(qrcode, select_day, data_type) {
        machine_data_service.obtain_machine_data_day(qrcode, select_day, data_type).then(response => {
            if (response.responseCode === "RESPONSE_OK") {
                let data_x = [];
                let data_y = [[],[],[]];
                if(data_type==="pm25"){
                    this.pm25Data(response,data_y);
                    this.pm25x_Data(response,data_x);
                }else {
                    for (let i = 0; i < response.data.length; i++) {
                        data_x.push(datetimeService.formatTimeStampToMonth(new Date(response.data[i].createTime).getTime() - 86400000));
                        if (data_type === "power") {
                            data_y[0].push(parseInt(response.data[i].powerOnMinute));
                        }
                        if (data_type === "heat") {
                            data_y[0].push(parseInt(response.data[i].heatOnMinute));
                        }
                        if (data_type === "mode") {
                            data_y[0].push(parseInt(response.data[i].sleepMinute));
                            data_y[1].push(parseInt(response.data[i].manualMinute));
                            data_y[2].push(parseInt(response.data[i].autoMinute));
                        }
                        if (data_type === "volume") {
                            data_y[0].push(parseInt(response.data[i].averageVolume));
                        }
                        if (data_type === "co2") {
                            data_y[0].push(parseInt(response.data[i].averageCo2));
                        }
                        if (data_type === "humid") {
                            data_y[0].push(parseInt(response.data[i].averageHumid));
                        }
                        if (data_type === "temp") {
                            data_y[0].push(parseInt(response.data[i].averageTemp));
                        }
                    }
                }
                this.setState({
                    data_x: data_x,
                    data_y: data_y,
                })
            }
            else if (response.responseCode === "RESPONSE_NULL") {
                this.setState({
                    data_x: [],
                    data_y: [],
                })
            } else {
                this.setState({
                    data_x: [],
                    data_y: [],
                })
            }
        });
    }

    pm25Data(response,data_y){
        if(response.data.indoorpm25!==null){
            for(let i=0;i<response.data.indoorpm25.length;i++){
                data_y[0].push(parseInt(response.data.indoorpm25[i].averagePm25))
            }
        }
        if(response.data.citypm25!==null){
            this.getCityName(response.data.citypm25[0].cityId);
            for(let i=0;i<response.data.citypm25.length;i++){
                data_y[2].push(parseInt(response.data.citypm25[i].pm25))
            }
        }
        if(response.data.outpm25!==null){
            for(let i=0;i<response.data.outpm25.length;i++){
                data_y[1].push(parseInt(response.data.outpm25[i].averagePm25))
            }
        }
        return data_y;
    }

    pm25_hour_Data(response,data_y){
        if(response.data.indoorpm25!==null){
            for(let i=0;i<response.data.indoorpm25.length;i++){
                data_y[0].push(parseInt(response.data.indoorpm25[i].averagePm25))
            }
        }
        if(response.data.citypm25!==null){
            for(let i=0;i<response.data.citypm25.length;i++){
                data_y[2].push(parseInt(response.data.citypm25[i].pm25))
            }
        }
        if(response.data.outpm25!==null){
            for(let i=0;i<response.data.outpm25.length;i++){
                data_y[1].push(parseInt(response.data.outpm25[i].pm2_5))
            }
        }
        return data_y;
    }

    pm25x_Data(response,data_x){
        if(response.data.indoorpm25!==null){
            for(let i=0;i<response.data.indoorpm25.length;i++){
                data_x.push(datetimeService.formatTimeStampToMonth(new Date(response.data.indoorpm25[i].createTime).getTime()-86400000));
            }
        }else if(response.data.citypm25!==null){
            for(let i=0;i<response.data.citypm25.length;i++){
                data_x.push(datetimeService.formatTimeStampToMonth(new Date(response.data.citypm25[i].createTime).getTime()-86400000));
            }
        }else if(response.data.outpm25!==null){
            for(let i=0;i<response.data.outpm25.length;i++){
                data_x.push(datetimeService.formatTimeStampToMonth(new Date(response.data.outpm25[i].createTime).getTime()-86400000));
            }
        }
        return data_x;
    }

    pm25x_hour_Data(response,data_x){
        if(response.data.indoorpm25!==null){
            for(let i=0;i<response.data.indoorpm25.length;i++){
                data_x.push(datetimeService.formatTimeStampToDateHour(new Date(response.data.indoorpm25[i].createTime).getTime()-3600000));
            }
        }else if(response.data.citypm25!==null){
            for(let i=0;i<response.data.citypm25.length;i++){
                data_x.push(datetimeService.formatTimeStampToDateHour(new Date(response.data.citypm25[i].createTime).getTime()-3600000));
            }
        }else if(response.data.outpm25!==null){
            for(let i=0;i<response.data.outpm25.length;i++){
                data_x.push(datetimeService.formatTimeStampToDateHour(new Date(response.data.outpm25[i].createTime).getTime()-3600000));
            }
        }
        return data_x;
    }

    getHourData(qrcode, select_day, data_type) {
        machine_data_service.obtain_machine_data_hour(qrcode, select_day * 24, data_type).then(response => {
                if (response.responseCode === "RESPONSE_OK") {
                    console.log(response);
                    let data_x = [];
                    let data_y = [[],[],[]];
                    if(data_type==="pm25"){
                        this.pm25_hour_Data(response,data_y);
                        this.pm25x_hour_Data(response,data_x);
                    }else {
                        for (let i = 0; i < response.data.length; i++) {
                            data_x.push(datetimeService.formatTimeStampToDateHour(new Date(response.data[i].createTime).getTime()-3600000));
                            if (data_type === "power") {
                                data_y[0].push(parseInt(response.data[i].powerOnMinute));
                            }
                            if (data_type === "heat") {
                                data_y[0].push(parseInt(response.data[i].heatOnMinute));
                            }
                            if (data_type === "mode") {
                                data_y[0].push(parseInt(response.data[i].sleepMinute));
                                data_y[1].push(parseInt(response.data[i].manualMinute));
                                data_y[2].push(parseInt(response.data[i].autoMinute));
                            }
                            if (data_type === "volume") {
                                data_y[0].push(parseInt(response.data[i].averageVolume));
                            }
                            if (data_type === "co2") {
                                data_y[0].push(parseInt(response.data[i].averageCo2));
                            }
                            if (data_type === "humid") {
                                data_y[0].push(parseInt(response.data[i].averageHumid));
                            }
                            if (data_type === "temp") {
                                data_y[0].push(parseInt(response.data[i].averageTemp));
                            }
                        }
                    }
                    this.setState({
                        data_x_hour: data_x,
                        data_y_hour: data_y,
                    })
                }
                else if (response.responseCode === "RESPONSE_NULL") {
                    this.openNotification("结果为空", "所查询的二维码没有相应数据");
                    this.setState({
                        data_x_hour: [],
                        data_y_hour: [],
                    })
                } else {
                    this.openNotification("错误", "请检查二维码是否正确");
                    this.setState({
                        data_x_hour: [],
                        data_y_hour: [],
                    })
                }
            }
        )
    }

    selectSubmit() {
        this.setDataTypeName();
        this.getDayData(this.state.qrcode, this.state.select_day, this.state.data_type);
        this.getHourData(this.state.qrcode, this.state.select_day, this.state.data_type);
    }

    setDataTypeName() {
        let data_type = this.state.data_type;
        let data_type_name=[];
        let y_name;
        if (data_type === 'pm25') {
            data_type_name[0] = "室内PM2.5";
            data_type_name[1] = "舱内PM2.5";
            data_type_name[2] = "城市PM2.5";
            y_name = "μg/m³"
        }
        if (data_type === 'volume') {
            data_type_name[0] = "风量";
            y_name = "m³/h"
        }
        if (data_type === 'power') {
            data_type_name[0] = "开机时间";
            y_name = "min"
        }
        if (data_type === 'co2') {
            data_type_name[0] = "CO₂"
            y_name = "ppm"
        }
        if (data_type === 'humid') {
            data_type_name[0] = "湿度"
            y_name = "%"
        }
        if (data_type === 'temp') {
            data_type_name[0] = "温度"
            y_name = "℃"
        }
        if (data_type === 'mode') {
            data_type_name[0] = "睡眠模式"
            data_type_name[1] = "手动模式"
            data_type_name[2] = "自动模式"
            y_name="min"
        }
        if (data_type === 'heat') {
            data_type_name[0] = "辅热开启"
            y_name = "min"
        }
        this.setState({
            data_type_name: data_type_name,
            y_name: y_name,
            time_length: this.state.select_day
        })
    }

    check_qrcode = (qrcode) => {
        machine_data_service.check_exist(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let info = response.data[0];
                machine_data_service.probe_component(info.modelId, 'SCREEN').then(response => {
                    if (response.responseCode === 'RESPONSE_OK') {
                        this.setState({filter_show: true})
                    }
                })
            }
        })
    }

    openNotification = (message, description) => {
        notification.open({
            message: message,
            description: description,
        });
    };

    render() {
        return (<div style={{width:`100%`}}>
            <GmairHeader/>
            <Layout>
                <Sidebar/>
                <Layout style={{padding: '0 24px 24px',width:`100%`}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>机器数据</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 480,width:`100%`}}>
                        <Form layout="inline" style={{textAlign: `center`}}>
                            <Form.Item>
                                <Input placeholder="二维码" value={this.state.qrcode} onChange={this.qrcodeChange}/>
                            </Form.Item>
                            <Form.Item>
                                天数&nbsp;&nbsp;
                                <InputNumber min={1} max={30} value={this.state.select_day} style={{width: 100}}
                                             onChange={this.selectDayChange}/>
                            </Form.Item>
                            <Form.Item>
                                数据类型&nbsp;&nbsp;
                                <Select defaultValue="PM2.5" style={{width: 120}} placeholder="数据类型" showSearch={true}
                                        value={this.state.data_type} onChange={this.dataTypeChange}>
                                    <Option value="pm25">PM2.5</Option>
                                    <Option value="volume">风量</Option>
                                    <Option value="power">开机时间</Option>
                                    <Option value="co2">二氧化碳</Option>
                                    <Option value="humid">湿度</Option>
                                    <Option value="temp">温度</Option>
                                    <Option value="mode">模式</Option>
                                    <Option value="heat">辅热</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={this.selectSubmit}
                                >
                                    查询
                                </Button>
                            </Form.Item>
                            {this.state.filter_show&&
                            <Form.Item>
                                <Button
                                    onClick={this.filterClick}
                                    disabled={this.state.filter_disabled}
                                >
                                    点亮滤网灯
                                </Button>
                            </Form.Item>
                            }
                        </Form>
                        <MachineCharts time_length={this.state.time_length} data_type_name={this.state.data_type_name}
                                       y_name={this.state.y_name} time_type="天" data_x={this.state.data_x}
                                       data_y={this.state.data_y} style={{width:`100%`}}
                        />
                        <MachineCharts time_length={this.state.time_length * 24}
                                       data_type_name={this.state.data_type_name}
                                       y_name={this.state.y_name} time_type="小时" data_x={this.state.data_x_hour}
                                       data_y={this.state.data_y_hour} style={{width:`100%`}}
                        />
                    </Content>
                </Layout>
            </Layout>
        </div>)
    }
}

export default MachineData;
