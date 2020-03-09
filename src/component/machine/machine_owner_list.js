import React, {Component} from 'react';
import GmairHeader from "../header/header";
import Sidebar from "../sidebar/sidebar";
import {
    Breadcrumb,
    Layout,
    Input,
    notification,
    Table,
    Divider,
    Form,
    Row,
    Col,
    Select,
    Button,
    DatePicker,
    Radio,
    Spin
} from 'antd';
import {machine_data_service} from "../../service/machine_data.service";
import {datetimeService} from "../../service/datetime.service";

import moment from "moment";
import "./machine.css";
import Footer from "../header/footer";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const {Content} = Layout;
const Option = Select.Option;
const {RangePicker} = DatePicker;
const columns = [
    {
        title: 'uid',
        dataIndex: 'uid',
        key: 'uid',
    },
    {
        title: '二维码',
        dataIndex: 'codeValue',
        key: 'codeValue'
    },
    {
        title: '是否工作',
        dataIndex: 'isPower',
        key: 'isPower',
    },
    {
        title: '工作模式',
        dataIndex: 'mode',
        key: 'mode',
    },
    {
        title: '辅热开关',
        dataIndex: 'heat',
        key: 'heat',
    },
    {
        title:"城市",
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: '绑定时间',
        dataIndex: 'bindTime',
        key: 'bindTime',
    },
    {
        title:"PM2.5连续超出阈值天数",
        dataIndex: 'overCount',
        key: 'overCount',
    }
];


class MachineOwnerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_page: 1,
            page_size: 10,
            data_source: [],
            total_page: 1,
            uid: '',
            phone: '',
            is_power: -1,
            start_time: '',
            end_time: '',
            over_count_value:0,
            start_over_count:'',
            end_over_count:'',
            loading:false
        };
        this.paginationChange = this.paginationChange.bind(this);
        this.pageSizeChange = this.pageSizeChange.bind(this);
        this.rowClick = this.rowClick.bind(this);
        this.rowStyleSelect = this.rowStyleSelect.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.ispowerChoose = this.ispowerChoose.bind(this);
        this.uidInput = this.uidInput.bind(this);
        this.submitChange = this.submitChange.bind(this);
        this.overCountChange=this.overCountChange.bind(this);
    }

    componentDidMount() {
        this.getUidList(this.state.current_page, this.state.page_size, this.state.uid,this.state.is_power, this.state.start_time,
            this.state.end_time,this.state.start_over_count,this.state.end_over_count,this.state.phone);
    }

    rowClick(e) {
        window.open("/machine/data/" + e.uid);
        // window.location.href="/machine/data/"+e.uid
    }

    uidInput(e) {
        this.setState({
            uid: e.target.value,
        })
    }


    ispowerChoose(e) {
        this.setState({
            is_power: e,
        })
    }

    onDateChange(e) {
        if (e.length === 0) {
            this.setState({
                start_time: '',
                end_time: '',
            })
        } else {
            let start = new Date(datetimeService.formatTimeStampToDate(new Date(e[0]._d).getTime())).getTime();
            let end = new Date(datetimeService.formatTimeStampToDate(new Date(e[1]._d).getTime())).getTime();
            this.setState({
                start_time: start,
                end_time: end,
            })
        }
    }

    submitChange() {
        this.setState({
            current_page:1,
        },()=>{
            this.getUidList(1, this.state.page_size, this.state.uid, this.state.is_power,this.state.start_time, this.state.end_time,
                this.state.start_over_count,this.state.end_over_count);
        })

    }

    paginationChange(e) {
        this.setState({
            current_page: e,
        },()=>{
            this.getUidList(1, this.state.page_size, this.state.uid, this.state.is_power,this.state.start_time, this.state.end_time,
                this.state.start_over_count,this.state.end_over_count);
        })

    }

    pageSizeChange(current, size) {
        // this.setState({
        //     current_page: 1,
        //     page_size: size,
        // })
        // this.getUidList(1, this.state.page_size, this.state.uid, this.state.is_power,this.state.start_time, this.state.end_time,
        //     this.state.start_over_count,this.state.end_over_count);
    }

    overCountChange(e){

        let overCountGTE;
        let overCountLTE;
        if(e.target.value===1){
            overCountGTE=0;
            overCountLTE=2;
        }else if(e.target.value===2){
            overCountGTE=3;
            overCountLTE=5;
        }else if(e.target.value===3){
            overCountGTE=6;
            overCountLTE=9;
        }else if(e.target.value===4){
            overCountGTE=10;
            overCountLTE=14;
        }else if(e.target.value===5){
            overCountGTE=15;
            overCountLTE=30;
        }else {
            overCountGTE=0;
            overCountLTE=30;
        }
        this.setState({
            start_over_count:overCountGTE,
            end_over_count:overCountLTE,
            over_count_value:e.target.value,
            current_page:1,
        },()=>{
            this.getUidList(1, this.state.page_size, this.state.uid, this.state.is_power,this.state.start_time, this.state.end_time,
                this.state.start_over_count,this.state.end_over_count);
        });
    }

    //获取uid列表
    getUidList(current_page, page_size, uid,isPower, createTimeGTE, createTimeLTE,overCountGTE,overCountLTE) {
        this.setState(
            {
                loading: true
            },
        );
        machine_data_service.obtain_uid_list(current_page, 10000, uid, isPower, createTimeGTE, createTimeLTE,overCountGTE,overCountLTE).then(response => {
            if (response.code === 200) {
                this.setState(
                    {
                        loading: false
                    },
                );
                let result = response.data;
                // alert(overCountGTE+''+overCountLTE)
                // alert(JSON.stringify(result));
                // let result={machineList:[{uid:'11',codeValue:'6666', isPower:0, mode:0, bindTime:'2019-06-06 12:00:00',overCount:2,heat:0,city:'南京'},
                //     {uid:'22',codeValue:'s6', isPower:1, mode:1, bindTime:'2019-06-06 12:01:00',overCount:20,heat:1,city: '南昌'}]};
                let data_source = [];
                let mode;
                for (let i = 0; i < result.machineList.length; i++) {
                    let is_power;
                    if (result.machineList[i].isPower===0) {
                        is_power = "否";
                    }
                    else{
                        is_power = "是"
                    }
                    if (result.machineList[i].mode=== 0) {
                        mode = "自动";
                    }
                    else if (result.machineList[i].mode=== 1){
                        mode = "睡眠";
                    }
                    else {
                        mode = "手动";
                    }
                    data_source.push({
                        key: i,
                        uid: result.machineList[i].uid,
                        codeValue: result.machineList[i].codeValue,
                        mode: mode,
                        isPower: is_power,
                        bindTime: result.machineList[i].bindTime,
                        overCount: result.machineList[i].overCount,
                        heat: result.machineList[i].heat?"开":'关',
                        city: result.machineList[i].city
                    })
                }
                // console.log(data_source);
                this.setState({
                    total_page: result.totalPage,
                    data_source: data_source,
                })
            }
            else if (response.responseCode === 'RESPONSE_NULL') {
                this.openNotification("查询结果为空", "请检查查询条件");
                this.setState({
                    data_source: [],
                })
            } else {
                this.openNotification("查询错误", "请稍后再试");
                this.setState({
                    data_source: [],
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

    rowStyleSelect(record, index) {
        if (record.overCount < 3) {
            return "table_row_green"
        } else if (record.overCount < 6) {
            return "table_row_blue"
        } else if (record.overCount < 10) {
            return "table_row_yellow"
        } else if (record.overCount < 15) {
            return "table_row_orange"
        } else if (record.overCount >= 15) {
            return "table_row_red"
        }
    }

    render() {
        return (
            <div>
                <GmairHeader/>
                <Layout>
                    <Sidebar/>
                    <Layout style={{padding: '0 24px 24px',width:`100%`}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>机器数据</Breadcrumb.Item>
                        </Breadcrumb>
                    <div>
                        <div style={{backgroundColor: `white`, paddingTop: `25px`,textAlign:`center`}}>
                            <span>PM2.5B连续大于25的天数&nbsp;&nbsp;</span>
                            <RadioGroup buttonStyle="solid" value={this.state.over_count_value} onChange={this.overCountChange}>
                                <RadioButton value={0}>全选</RadioButton>
                                <RadioButton value={1} >0-2</RadioButton>
                                <RadioButton value={2} >3-5</RadioButton>
                                <RadioButton value={3} >6-9</RadioButton>
                                <RadioButton value={4} >10-14</RadioButton>
                                <RadioButton value={5} >大于15</RadioButton>
                            </RadioGroup>
                            <Row align="middle" type="flex" justify="space-around"
                                 style={{paddingLeft: `100px`, paddingRight: `100px`,paddingTop:`25px`}}>
                                <Col span={1.2}>uid</Col>
                                <Col span={1.5}>
                                    <Input style={{width: '90%'}} value={this.state.uid} placeholder="uid"
                                           onChange={this.uidInput}></Input>
                                </Col>
                                <Col span={1.2}>是否工作</Col>
                                <Col span={1.5}>
                                    <Select style={{width: 100}} defaultValue={-1} onChange={this.ispowerChoose}
                                            value={this.state.is_power}>
                                        <Option value={-1}>未选择</Option>
                                        <Option value={1}>是</Option>
                                        <Option value={0}>否</Option>
                                    </Select>
                                </Col>
                                <Col span={1.2}>日期选择</Col>
                                <Col span={7}>
                                    <RangePicker
                                        placeholder={['开始时间', '结束时间']} format="YYYY-MM-DD" onChange={this.onDateChange} style={{width:`90%`}}
                                    />
                                </Col>
                                <Col span={1.2}>
                                    <Button type="primary" onClick={this.submitChange}>查询</Button>
                                </Col>
                            </Row>
                            <Spin tip="Loading..." size="large" spinning={this.state.loading} style={{position:"relative",bottom:-200,zIndex:100}}/>
                            <Table columns={columns} dataSource={this.state.data_source}
                                   style={{backgroundColor: 'rgb(255,255,255,0.5)', padding: `25px`}}
                                   onRow={(record) => {
                                       return {
                                           onClick: (event) => {
                                               this.rowClick(record)
                                           },       // 点击行
                                       };
                                   }}
                                   rowClassName={(record, index) => {
                                       return this.rowStyleSelect(record, index)
                                   }}
                                   pagination={{
                                       showQuickJumper: true,
                                       total: this.state.total_page * this.state.page_size,
                                       showSizeChanger: true,
                                       onChange: this.paginationChange,
                                       onShowSizeChange: this.pageSizeChange,
                                       current: this.state.current_page,
                                   }}/>
                        </div>
                    </div>
                    </Layout>
                </Layout>
                <Footer/>
            </div>
        );
    }
}

export default MachineOwnerList;
