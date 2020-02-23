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
    Radio
} from 'antd';
import {machine_data_service} from "../../service/machine_data.service";
import {datetimeService} from "../../service/datetime.service";

import moment from "moment";
import "./machine.css";

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
        dataIndex: 'power',
        key: 'power',
    },
    {
        title: '工作模式',
        dataIndex: 'mode',
        key: 'mode',
    },

    {
        title: '绑定时间',
        dataIndex: 'bindTime',
        key: 'bindTime',
    }
    // },{
    //     title:"PM2.5连续超出阈值天数",
    //     dataIndex: 'overCount',
    //     key: 'overCount',
    // }
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
            is_power: '',
            start_time: '',
            end_time: '',
            over_count_value:0,
            start_over_count:'',
            end_over_count:'',
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
        this.getUidList(this.state.current_page, this.state.page_size, this.state.uid, this.state.start_time,
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
        })
        this.getUidList(1, this.state.page_size, this.state.uid, this.state.start_time, this.state.end_time,
            this.state.start_over_count,this.state.end_over_count,this.state.phone);
    }

    paginationChange(e) {
        this.setState({
            current_page: e,
        })
        this.getUidList(e, this.state.page_size, this.state.uid, this.state.start_time, this.state.end_time
        ,this.state.start_over_count,this.state.end_over_count,this.state.phone);
    }

    pageSizeChange(current, size) {
        this.setState({
            current_page: 1,
            page_size: size,
        })
        this.getUidList(1, size,this.state.uid,this.state.start_time,this.state.end_time,
            this.state.start_over_count,this.state.end_over_count,this.state.phone);
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
            overCountLTE='';
        }else {
            overCountGTE='';
            overCountLTE='';
        }
        this.setState({
            start_over_count:overCountGTE,
            end_over_count:overCountLTE,
            over_count_value:e.target.value,
        });
        this.getUidList(1, this.state.page_size,this.state.uid,this.state.start_time,this.state.end_time,
            overCountGTE,overCountLTE,this.state.phone);
    }

    //获取uid列表
    getUidList(current_page, page_size, uid, createTimeGTE, createTimeLTE,overCountGTE,overCountLTE) {
        machine_data_service.obtain_uid_list(current_page, page_size, uid, createTimeGTE, createTimeLTE,overCountGTE,overCountLTE).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                // console.log(response);
                let result = response.data;
                let data_source = [];
                for (let i = 0; i < result.machineList.length; i++) {
                    let is_power;
                    if (result.machineList[i].offline=== false) {
                        is_power = "否";
                    } else if(result.machineList[i].offline=== true){
                        is_power = "是"
                    }
                    let bindTime = datetimeService.formatTimeStampToDate(result.machineList[i].createAt);
                    data_source.push({
                        key: i,
                        uid: result.machineList[i].uid,
                        codeValue: result.machineList[i].codeValue,
                        mode: result.machineList[i].mode,
                        power: is_power,
                        bindTime: bindTime,
                        overCount: result.machineList[i].overCount,
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
                    <div style={{padding: `25px`, width: `100%`}}>
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
                                <Col span={1.2}>是否在线</Col>
                                <Col span={1.5}>
                                    <Select style={{width: 100}} defaultValue="" onChange={this.ispowerChoose}
                                            value={this.state.is_power}>
                                        <Option value="">未选择</Option>
                                        <Option value="true">是</Option>
                                        <Option value="false">否</Option>
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
                            <Table columns={columns} dataSource={this.state.data_source}
                                   style={{backgroundColor: `#fff`, padding: `25px`}}
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
            </div>
        );
    }
}

export default MachineOwnerList;
