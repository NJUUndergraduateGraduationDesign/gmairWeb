import React from 'react';
import {Breadcrumb, Layout, Input, notification, InputNumber, Button, Form, Icon, Select, Col, Row,DatePicker} from 'antd'
import GmairHeader from "../header/header";
import Sidebar from "../sidebar/sidebar"
import '../../../node_modules/echarts/theme/macarons'
import {machine_data_service} from "../../service/machine_data.service";
import {datetimeService} from "../../service/datetime.service";
import MachineCharts from './machine_charts';
import moment from "moment";
import Machine_charts_pie from "./machine_charts_pie";
import Footer from "../header/footer";



const Option = Select.Option;
const {Content} = Layout
let data_pie_y=[]
let data_pie_yhour=[]

class MachineData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: ``,
            select_day: 7,
            select_date: '2019-10-25',//moment(Date.now()),
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
            completeType:1
        };
        this.selectDayChange = this.selectDayChange.bind(this);
        this.selectDateChange = this.selectDateChange.bind(this);
        this.dataTypeChange = this.dataTypeChange.bind(this);
        this.selectSubmit = this.selectSubmit.bind(this);
        this.selectDateChange = this.selectDateChange.bind(this);
        this.filterClick = this.filterClick.bind(this);
        //this.setDataTypeName = this.setDataTypeName(this);
    }


    componentDidMount() {
        let uid = this.props.match.params.uid;
        this.setState({
            uid: uid,
        })
        this.getDayData(uid, this.state.select_day, this.state.data_type,this.state.completeType);
        this.getHourData(uid, this.state.select_date, this.state.data_type,this.state.completeType);
        this.setDataTypeName();
    }


    selectDayChange(value) {
        this.setState({
            select_day: value,
        })
    }

    selectDateChange(value) {
        this.setState({
            select_date: value+864000,
        },()=>{

            this.submitDateChangeClick()

        })
    }

    completeChoose =(value)=>{
        this.setState({
            completeType: value
        },()=>{
            this.selectSubmit();
        })
    }

    dataTypeChange(value) {
        this.setState({
            data_type: value
        },()=>{
            this.selectSubmit();
        })
    }


    filterClick(e){
        machine_data_service.config_screen(this.state.uid,'1').then(response=>{
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

    getDayData(uid, select_day, data_type,completeType) {
        machine_data_service.obtain_machine_data_day(uid, select_day, data_type,completeType).then(response => {
            if (response.code === 200) {
                let data_x = [];
                let data_y;
                if(data_type==="pm25"){
                    //mock
                    // let response={data:{indoorPm25:[{createTime:1582808521000,averagePm25:1},{createTime:1582722121000,averagePm25:10},
                    //             {createTime:1582635721000,averagePm25:20},{createTime:1582549321000,averagePm25:50},{createTime:1582462921000,averagePm25:30}],
                    //         innerPm25:[{createTime:1582808521000,averagePm25:15},{createTime:1582722121000,averagePm25:85},
                    //             {createTime:1582635721000,averagePm25:66},{createTime:1582549321000,averagePm25:55},{createTime:1582462921000,averagePm25:5}],
                    //         comIndoorPm25:[{createTime:1582894921000,averagePm25:99},{createTime:1582808521000,averagePm25:8},{createTime:1582722121000,averagePm25:15},
                    //             {createTime:1582635721000,averagePm25:23},{createTime:1582549321000,averagePm25:56},{createTime:1582462921000,averagePm25:40}],
                    //         comInnerPm25:[{createTime:1582894921000,averagePm25:10},{createTime:1582808521000,averagePm25:10},{createTime:1582722121000,averagePm25:60},
                    //             {createTime:1582635721000,averagePm25:70},{createTime:1582549321000,averagePm25:55},{createTime:1582462921000,averagePm25:0}],
                    //     }};

                    data_y=[[],[],[],[]];
                    this.pm25x_Data(response,data_x);
                    this.pm25Data(response,data_y);
                }
                else if (data_type==="mode"){
                    //mock
                    // let response={data:{normal:{sleepMinute:200,manualMinute:332,autoMinute:655},complete:{sleepMinute:300,manualMinute:432,autoMinute:755}}}

                    data_y=[[{name:this.state.data_type_name[0],value:response.data.normal.sleepMinute},
                            {name:this.state.data_type_name[1],value:response.data.normal.manualMinute},
                            {name:this.state.data_type_name[2],value:response.data.normal.autoMinute}],
                        [{name:this.state.data_type_name[0],value:response.data.complete.sleepMinute},
                            {name:this.state.data_type_name[1],value:response.data.complete.manualMinute},
                            {name:this.state.data_type_name[2],value:response.data.complete.autoMinute}]];
                    data_pie_y=data_y
                }else {
                    //mock
                    // let response={data:{normal:[{createTime:1582808521000,powerOnMinute:11000,heatOnMinute:1,averageVolume:11,averageCo2:44,averageHumid:54,averageTemp:35},
                    //             {createTime:1582722121000,powerOnMinute:11000,heatOnMinute:6,averageVolume:44,averageCo2:2,averageHumid:54,averageTemp:35},
                    //             {createTime:1582635721000,powerOnMinute:12000,heatOnMinute:9,averageVolume:33,averageCo2:32,averageHumid:23,averageTemp:7},
                    //             {createTime:1582549321000,powerOnMinute:15000,heatOnMinute:56,averageVolume:5,averageCo2:54,averageHumid:65,averageTemp:12},
                    //             {createTime:1582462921000,powerOnMinute:13000,heatOnMinute:19,averageVolume:6,averageCo2:65,averageHumid:12,averageTemp:16}],
                    //         complete:[{createTime:1582894921000,powerOnMinute:19900,heatOnMinute:7,averageVolume:11,averageCo2:45,averageHumid:32,averageTemp:32},
                    //             {createTime:1582808521000,powerOnMinute:18000,heatOnMinute:1,averageVolume:55,averageCo2:78,averageHumid:21,averageTemp:12},
                    //             {createTime:1582722121000,powerOnMinute:11500,heatOnMinute:62,averageVolume:32,averageCo2:65,averageHumid:87,averageTemp:13},
                    //             {createTime:1582635721000,powerOnMinute:12300,heatOnMinute:33,averageVolume:55,averageCo2:88,averageHumid:46,averageTemp:16},
                    //             {createTime:1582549321000,powerOnMinute:15600,heatOnMinute:78,averageVolume:12,averageCo2:65,averageHumid:19,averageTemp:49},
                    //             {createTime:1582462921000,powerOnMinute:14000,heatOnMinute:9,averageVolume:8,averageCo2:74,averageHumid:35,averageTemp:16}]
                    //     }};

                    data_y=[[],[]];
                    if (response.data.complete.length!==0) {
                        //补全数据
                        for (let i = 0; i < response.data.complete.length; i++) {
                            data_x.push(datetimeService.formatTimeStampToMonth(new Date(response.data.complete[i].createTime).getTime()));
                            if (data_type === "power") {
                                data_y[1].push(parseInt(response.data.complete[i].powerOnMinute));
                            }
                            if (data_type === "heat") {
                                data_y[1].push(parseInt(response.data.complete[i].heatOnMinute));
                            }
                            if (data_type === "volume") {
                                data_y[1].push(parseInt(response.data.complete[i].averageVolume));
                            }
                            if (data_type === "co2") {
                                data_y[1].push(parseInt(response.data.complete[i].averageCo2));
                            }
                            if (data_type === "humid") {
                                data_y[1].push(parseInt(response.data.complete[i].averageHumid));
                            }
                            if (data_type === "temp") {
                                data_y[1].push(parseInt(response.data.complete[i].averageTemp));
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < response.data.normal.length; i++) {
                            data_x.push(datetimeService.formatTimeStampToMonth(new Date(response.data.normal[i].createTime).getTime()));
                        }
                    }

                    //原始数据
                    for (let i = 0; i < response.data.normal.length; i++) {
                        if (data_type === "power") {
                            data_y[0].push(parseInt(response.data.normal[i].powerOnMinute));
                        }
                        if (data_type === "heat") {
                            data_y[0].push(parseInt(response.data.normal[i].heatOnMinute));
                        }
                        if (data_type === "volume") {
                            data_y[0].push(parseInt(response.data.normal[i].averageVolume));
                        }
                        if (data_type === "co2") {
                            data_y[0].push(parseInt(response.data.normal[i].averageCo2));
                        }
                        if (data_type === "humid") {
                            data_y[0].push(parseInt(response.data.normal[i].averageHumid));
                        }
                        if (data_type === "temp") {
                            data_y[0].push(parseInt(response.data.normal[i].averageTemp));
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
        if(response.data.indoorPm25!==null){
            for(let i=0;i<response.data.indoorPm25.length;i++){
                data_y[0].push(parseInt(response.data.indoorPm25[i].averagePm25))
            }
        }
        if(response.data.comIndoorPm25!==null){
            for(let i=0;i<response.data.comIndoorPm25.length;i++){
                data_y[2].push(parseInt(response.data.comIndoorPm25[i].averagePm25))
            }
        }
        if(response.data.innerPm25!==null){
            for(let i=0;i<response.data.innerPm25.length;i++){
                data_y[1].push(parseInt(response.data.innerPm25[i].averagePm25))
            }
        }
        if(response.data.comInnerPm25!==null){
            for(let i=0;i<response.data.comInnerPm25.length;i++){
                data_y[3].push(parseInt(response.data.comInnerPm25[i].averagePm25))
            }
        }
        return data_y;
    }

    pm25_hour_Data(response,data_y){
        if(response.data.indoorPm25!==null){
            for(let i=0;i<response.data.indoorPm25.length;i++){
                data_y[0].push(parseInt(response.data.indoorPm25[i].averagePm25))
            }
        }
        if(response.data.comIndoorPm25!==null){
            for(let i=0;i<response.data.comIndoorPm25.length;i++){
                data_y[2].push(parseInt(response.data.comIndoorPm25[i].averagePm25))
            }
        }
        if(response.data.innerPm25!==null){
            for(let i=0;i<response.data.innerPm25.length;i++){
                data_y[1].push(parseInt(response.data.innerPm25[i].averagePm25))
            }
        }
        if(response.data.comInnerPm25!==null){
            for(let i=0;i<response.data.comInnerPm25.length;i++){
                data_y[3].push(parseInt(response.data.comInnerPm25[i].averagePm25))
            }
        }
        return data_y;
    }

    sortCreateTime(data){
        data.sort(function(a,b){
            return a.createTime - b.createTime
        });
    }

    pm25x_Data(response,data_x){
        if(response.data.indoorPm25!==null){
            this.sortCreateTime(response.data.indoorPm25);
            for(let i=0;i<response.data.indoorPm25.length;i++){
                data_x.push(datetimeService.formatTimeStampToMonth(new Date(response.data.indoorPm25[i].createTime).getTime()));
            }
        }
        if(response.data.comIndoorPm25!==null){
            this.sortCreateTime(response.data.comIndoorPm25);
            for(let i=0;i<response.data.comIndoorPm25.length;i++){
                let newData=datetimeService.formatTimeStampToMonth(new Date(response.data.comIndoorPm25[i].createTime).getTime());
                if(data_x.indexOf(newData)===-1) {
                    data_x.push(newData);
                }
            }
        }
        if(response.data.innerPm25!==null){
            this.sortCreateTime(response.data.innerPm25);
            for(let i=0;i<response.data.innerPm25.length;i++){
                let newData=datetimeService.formatTimeStampToMonth(new Date(response.data.innerPm25[i].createTime).getTime());
                if(data_x.indexOf(newData)===-1) {
                    data_x.push(newData);
                }
            }
        }
        if(response.data.comInnerPm25!==null){
            this.sortCreateTime(response.data.comInnerPm25);
            for(let i=0;i<response.data.comInnerPm25.length;i++){
                let newData=datetimeService.formatTimeStampToMonth(new Date(response.data.comInnerPm25[i].createTime).getTime());
                if(data_x.indexOf(newData)===-1) {
                    data_x.push(newData);
                }
            }
        }
        data_x.sort();
        return data_x;
    }

    pm25x_hour_Data(response,data_x){
        if(response.data.indoorPm25!==null){
            this.sortCreateTime(response.data.indoorPm25);
            for(let i=0;i<response.data.indoorPm25.length;i++){
                data_x.push(datetimeService.formatTimeStampToDateHour(new Date(response.data.indoorPm25[i].createTime).getTime()))
            }
        }
        if(response.data.comIndoorPm25!==null){
            this.sortCreateTime(response.data.comIndoorPm25);
            for(let i=0;i<response.data.comIndoorPm25.length;i++){
                let newData= datetimeService.formatTimeStampToDateHour(new Date(response.data.comIndoorPm25[i].createTime).getTime());
                if(data_x.indexOf(newData)===-1) {
                    data_x.push(newData);
                }
            }
        }
        if(response.data.innerPm25!==null){
            this.sortCreateTime(response.data.innerPm25);
            for(let i=0;i<response.data.innerPm25.length;i++){
                let newData=datetimeService.formatTimeStampToDateHour(new Date(response.data.innerPm25[i].createTime).getTime());
                if(data_x.indexOf(newData)===-1) {
                    data_x.push(newData);
                }
            }
        }
        if(response.data.comInnerPm25!==null){
            this.sortCreateTime(response.data.comInnerPm25);
            for(let i=0;i<response.data.comInnerPm25.length;i++){
                let newData=datetimeService.formatTimeStampToDateHour(new Date(response.data.comInnerPm25[i].createTime).getTime());
                if(data_x.indexOf(newData)===-1) {
                    data_x.push(newData);
                }
            }
        }
        data_x.sort();

        return data_x;
    }

    getHourData(uid, select_date, data_type,completeType) {
         machine_data_service.obtain_machine_data_hour(uid, select_date, data_type,completeType).then(response => {
                if (response.code === 200) {
                    // for (let i=0;i<24;i++){
                    //     let start = 1582905831000;
                    //     let hour=i*3600000;
                    //     let data1=Math.round(Math.random()*100);
                    //     let data2=Math.round(Math.random()*100);
                    //     response.data.comIndoorPm25.push({createTime:start+hour,averagePm25:data1+Math.round(Math.random()*20)-10});
                    //     response.data.comInnerPm25.push({createTime:start+hour,averagePm25:data2+Math.round(Math.random()*20)-10});
                    // }
                    let data_x = [];
                    let data_y;
                    if(data_type==="pm25"){
                        //mock data
                        // let response={data:{indoorPm25: [],comIndoorPm25: [],innerPm25: [],comInnerPm25: []}};
                        // for (let i=0;i<24;i++){
                        //     let start = 1582819431000;
                        //     let hour=i*3600000;
                        //     let data1=Math.round(Math.random()*100);
                        //     let data2=Math.round(Math.random()*100);
                        //     response.data.indoorPm25.push({createTime:start+hour,averagePm25:data1});
                        //     response.data.comIndoorPm25.push({createTime:start+hour,averagePm25:data1+Math.round(Math.random()*20)-10});
                        //     response.data.innerPm25.push({createTime:start+hour,averagePm25:data2});
                        //     response.data.comInnerPm25.push({createTime:start+hour,averagePm25:data2+Math.round(Math.random()*20)-10});
                        // }
                        data_y=[[],[],[],[]];
                        this.pm25x_hour_Data(response,data_x);
                        this.pm25_hour_Data(response,data_y);
                    }
                    else if (data_type==="mode"){
                        //mock
                        // let response={data:{normal:{sleepMinute:20,manualMinute:32,autoMinute:65},complete:{sleepMinute:30,manualMinute:43,autoMinute:55}}}
                        data_y=[[{name:this.state.data_type_name[0],value:response.data.normal.sleepMinute},
                            {name:this.state.data_type_name[1],value:response.data.normal.manualMinute},
                            {name:this.state.data_type_name[2],value:response.data.normal.autoMinute}],
                            [{name:this.state.data_type_name[0],value:response.data.complete.sleepMinute},
                                {name:this.state.data_type_name[1],value:response.data.complete.manualMinute},
                                {name:this.state.data_type_name[2],value:response.data.complete.autoMinute}]];
                        data_pie_yhour=data_y
                    }else {
                        // let response={data:{normal: [],complete: []}};
                        // for (let i=0;i<24;i++){
                        //     let start = 1582819431000;
                        //     let hour=i*3600000;
                        //     let data1=Math.round(Math.random()*100);
                        //     let data2=Math.round(Math.random()*100);
                        //     response.data.normal.push({createTime:start+hour,powerOnMinute:data1,heatOnMinute:data1,averageVolume:data1
                        //             ,averageCo2:data1,averageHumid:data1,averageTemp:data1});
                        //     response.data.complete.push({createTime:start+hour,powerOnMinute:data1+Math.round(Math.random()*20)-10,
                        //             heatOnMinute:data1+Math.round(Math.random()*20)-10,averageVolume:data1+Math.round(Math.random()*20)-10
                        //             ,averageCo2:data1+Math.round(Math.random()*20)-10,averageHumid:data1+Math.round(Math.random()*20)-10
                        //             ,averageTemp:data1+Math.round(Math.random()*20)-10});
                        // }
                        data_y=[[],[]];

                        if (response.data.complete.length!==0) {
                            for (let i = 0; i < response.data.complete.length; i++) {
                                data_x.push(datetimeService.formatTimeStampToDateHour(new Date(response.data.complete[i].createTime).getTime()));
                                if (data_type === "power") {
                                    data_y[1].push(parseInt(response.data.complete[i].powerOnMinute));
                                }
                                if (data_type === "heat") {
                                    data_y[1].push(parseInt(response.data.complete[i].heatOnMinute));
                                }
                                if (data_type === "volume") {
                                    data_y[1].push(parseInt(response.data.complete[i].averageVolume));
                                }
                                if (data_type === "co2") {
                                    data_y[1].push(parseInt(response.data.complete[i].averageCo2));
                                }
                                if (data_type === "humid") {
                                    data_y[1].push(parseInt(response.data.complete[i].averageHumid));
                                }
                                if (data_type === "temp") {
                                    data_y[1].push(parseInt(response.data.complete[i].averageTemp));
                                }
                            }
                        }
                        else {
                            for (let i = 0; i < response.data.normal.length; i++) {
                                data_x.push(datetimeService.formatTimeStampToMonth(new Date(response.data.normal[i].createTime).getTime()));
                            }
                        }

                        //normal
                        for (let i = 0; i < response.data.normal.length; i++) {
                            if (data_type === "power") {
                                data_y[0].push(parseInt(response.data.normal[i].powerOnMinute));
                            }
                            if (data_type === "heat") {
                                data_y[0].push(parseInt(response.data.normal[i].heatOnMinute));
                            }
                            if (data_type === "volume") {
                                data_y[0].push(parseInt(response.data.normal[i].averageVolume));
                            }
                            if (data_type === "co2") {
                                data_y[0].push(parseInt(response.data.normal[i].averageCo2));
                            }
                            if (data_type === "humid") {
                                data_y[0].push(parseInt(response.data.normal[i].averageHumid));
                            }
                            if (data_type === "temp") {
                                data_y[0].push(parseInt(response.data.normal[i].averageTemp));
                            }
                        }
                    }
                    this.setState({
                        data_x_hour: data_x,
                        data_y_hour: data_y,
                    })
                }
                else if (response.responseCode === "RESPONSE_NULL") {
                    this.openNotification("结果为空", "所查询的uid没有相应数据");
                    this.setState({
                        data_x_hour: [],
                        data_y_hour: [],
                    })
                } else {
                    this.setState({
                        data_x_hour: [],
                        data_y_hour: [],
                    })
                }
            }
        )
    }

    selectSubmit() {
        this.getDayData(this.state.uid, this.state.select_day, this.state.data_type,this.state.completeType);
        this.getHourData(this.state.uid, this.state.select_date, this.state.data_type,this.state.completeType);
        this.setDataTypeName();
    }

    submitDateChangeClick = () =>{
        this.getHourData(this.state.uid, this.state.select_date, this.state.data_type,this.state.completeType);
        this.setDataTypeName();
    }

    setDataTypeName() {
        let data_type = this.state.data_type;
        let data_type_name=[];
        let y_name;
        if (data_type === 'pm25') {
            data_type_name[0] = "室内PM2.5";
            data_type_name[1] = "室外PM2.5";
            data_type_name[2] = "补全室内PM2.5";
            data_type_name[3] = "补全室外PM2.5";
            y_name = "μg/m³"
        }
        if (data_type === 'volume') {
            data_type_name[0] = "风量";
            data_type_name[1] = "补全风量";
            y_name = "m³/h"
        }
        if (data_type === 'power') {
            data_type_name[0] = "开机时间";
            data_type_name[1] = "补全开机时间";
            y_name = "min"
        }
        if (data_type === 'co2') {
            data_type_name[0] = "CO₂";
            data_type_name[1] = "补全CO₂";
            y_name = "ppm"
        }
        if (data_type === 'humid') {
            data_type_name[0] = "湿度";
            data_type_name[1] = "补全湿度";
            y_name = "%"
        }
        if (data_type === 'temp') {
            data_type_name[0] = "温度";
            data_type_name[1] = "补全温度";
            y_name = "℃"
        }
        if (data_type === 'mode') {
            data_type_name[0] = "睡眠模式";
            data_type_name[1] = "手动模式";
            data_type_name[2] = "自动模式";
            y_name="min"
        }
        if (data_type === 'heat') {
            data_type_name[0] = "辅热开启时间";
            data_type_name[1] = "补全辅热开启时间";
            y_name = "min"
        }
        this.setState({
            data_type_name: data_type_name,
            y_name: y_name,
            time_length: this.state.select_day
        },()=>{

        })
    }


    openNotification = (message, description) => {
        notification.error({
            message: message,
            description: description,
        });
    };



    render() {
        const divp ={
            display:'inline-block',
            height:400,
            width:'50%',
        };
        let chart1;
        let chart2;
        if(this.state.data_type==='mode'){
            chart1=<div>
                <div style={divp}>
                <Machine_charts_pie time_length={this.state.time_length} data_type_name={this.state.data_type_name}
                                  y_name={this.state.y_name} time_type="普通1" data={data_pie_y[0]}/>
                </div>
                <div style={divp}>
                <Machine_charts_pie time_length={this.state.time_length} data_type_name={this.state.data_type_name}
                                    y_name={this.state.y_name} time_type="预测1" data={data_pie_y[1]}/>
                </div>
            </div>;
            chart2=<div>
                <div style={divp}>
                <Machine_charts_pie time_length={this.state.time_length} data_type_name={this.state.data_type_name}
                                    y_name={this.state.y_name} time_type="普通2" data={data_pie_yhour[0]} style={{}}/>
                </div>
                <div style={divp}>
                <Machine_charts_pie time_length={this.state.time_length} data_type_name={this.state.data_type_name}
                                    y_name={this.state.y_name} time_type="预测2" data={data_pie_yhour[1]} style={{}}/>
                </div>
            </div>;
        }
        else {
            chart1=<MachineCharts time_length={this.state.time_length} data_type_name={this.state.data_type_name}
                           y_name={this.state.y_name} time_type="天" data_x={this.state.data_x}
                           data_y={this.state.data_y} style={{width:`100%`}}
            />;
            chart2=<MachineCharts time_length={this.state.time_length * 24}
            data_type_name={this.state.data_type_name}
            y_name={this.state.y_name} time_type="小时" data_x={this.state.data_x_hour}
            data_y={this.state.data_y_hour} style={{width:`100%`}}
            />;
        }
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
                                <span style={{fontSize:'17px'}}>uid：{this.state.uid}</span>
                            </Form.Item>
                            <Form.Item>
                                天数&nbsp;&nbsp;
                                <InputNumber min={1} max={30} value={this.state.select_day} style={{width: 100}}
                                             onChange={this.selectDayChange}/>
                            </Form.Item>
                            <Form.Item>
                                补全方法&nbsp;&nbsp;
                                <Select style={{width: 150}} defaultValue={1} onChange={this.completeChoose}
                                        value={this.state.completeType}>
                                    <Option value={0}>不补全</Option>
                                    <Option value={1}>mean</Option>
                                    <Option value={2}>usePrevious</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                数据类型&nbsp;&nbsp;
                                <Select defaultValue="pm25" style={{width: 120}} placeholder="数据类型" showSearch={true}
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
                        {chart1}
                        <Form layout={"inline"} style={{textAlign: `center`,marginTop:'50px'}}>
                        <Form.Item>日期选择</Form.Item>
                        <Form.Item>
                            <DatePicker
                                format="YYYY-MM-DD" onChange={this.selectDateChange} defaultValue={moment(this.state.select_date)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.submitDateChangeClick}>查询</Button>
                        </Form.Item>
                        </Form>
                        {chart2}
                    </Content>
                </Layout>
            </Layout>
            <Footer/>
        </div>)
    }
}

export default MachineData;
