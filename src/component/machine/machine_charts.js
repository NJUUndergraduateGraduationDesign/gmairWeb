import React from 'react';
import ReactEcharts from 'echarts-for-react';
import '../../../node_modules/echarts/theme/macarons'
import echarts from "echarts";
import {color} from "echarts/src/export";

class MachineData extends React.Component {
    constructor(props) {
        super(props);
    }

    setSeries(data_type_name,data,time_type,color){
        if(time_type==="小时"){
            let series=[];
            if(data_type_name.length===4) {
                for (let i = 0; i < data.length; i++) {
                    if (i > 1) {
                        series.push({
                            lineStyle: {
                                normal: {
                                    color: color[i]   // 线条颜色
                                }
                            },
                            itemStyle:{
                                normal:{
                                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                                        { offset: 0,  color: color[i]},
                                        { offset: 0.7,  color: 'rgba(255,234,255, 0)'}
                                    ], false),

                                    lineStyle:{
                                        width:2,
                                        type:'dotted'  //'dotted'虚线 'solid'实线
                                    },
                                    borderType:"dotted",
                                    barBorderColor: 'red',
                                    barBorderWidth:1.5,
                                }
                            },
                            smooth: true,
                            name: data_type_name[i],
                            type: 'bar',
                            data: data[i],
                            symbolSize: 10,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        })
                    }
                    else {
                        series.push({
                            lineStyle: {
                                normal: {
                                    color: color[i]   // 线条颜色
                                }
                            },
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                                        { offset: 0,  color: color[i]},
                                        { offset: 0.7,  color: 'rgba(255,234,255, 0)'}
                                    ], false),

                                }
                            },
                            smooth: true,
                            name: data_type_name[i],
                            type: 'bar',
                            data: data[i],
                            symbolSize: 10,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        })
                    }
                }
            }
            else {
                for (let i = 0; i < data.length; i++) {
                    if (i > 0) {
                        series.push({
                            lineStyle: {
                                normal: {
                                    color: color[i]   // 线条颜色
                                }
                            },
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                                        { offset: 0,  color: color[i]},
                                        { offset: 0.7,  color: 'rgba(255,234,255, 0)'}
                                    ], false),

                                    lineStyle:{
                                        width:2,
                                        type:'dotted'  //'dotted'虚线 'solid'实线
                                    },
                                    borderType:"dotted",
                                    barBorderColor: 'red',
                                    barBorderWidth:1.5,
                                }
                            },
                            smooth: true,
                            name: data_type_name[i],
                            type: 'bar',
                            data: data[i],
                            symbolSize: 10,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        })
                    }
                    else {
                        series.push({
                            lineStyle: {
                                normal: {
                                    color: color[i]   // 线条颜色
                                }
                            },
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                                        { offset: 0,  color: color[i]},
                                        { offset: 0.7,  color: 'rgba(255,234,255, 0)'}
                                    ], false),

                                }
                            },
                            smooth: true,
                            name: data_type_name[i],
                            type: 'bar',
                            data: data[i],
                            symbolSize: 10,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        })
                    }
                }
            }
            return series;
        }else {
            let series=[];
            if(data_type_name.length===4){
                for(let i=0;i<data.length;i++){
                    if(i>1){
                        series.push({
                            lineStyle: {
                                normal: {
                                    color: color[i]   // 线条颜色
                                }
                            },
                            itemStyle:{
                                normal:{
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                                                { offset: 0,  color: color[i]},
                                                { offset: 0.7,  color: 'rgba(255,234,255, 0)'}
                                            ], false),

                                    lineStyle:{
                                        width:2,
                                        type:'dotted'  //'dotted'虚线 'solid'实线
                                    },
                                    borderType:"dotted",
                                    barBorderColor: 'red',
                                    barBorderWidth:1.5,
                                }
                            },

                            smooth: true,
                            name: data_type_name[i],
                            type: 'bar',
                            data: data[i],
                            symbolSize: 10,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                }
                            }

                        })
                    }
                    else {
                        series.push({
                            lineStyle: {
                                normal: {
                                    color: color[i]   // 线条颜色
                                }
                            },
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                                        { offset: 0,  color: color[i]},
                                        { offset: 0.7,  color: 'rgba(255,234,255, 0)'}
                                    ], false),
                                }
                            },
                            smooth: true,
                            name: data_type_name[i],
                            type: 'bar',
                            data: data[i],
                            symbolSize: 10,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                }
                            }

                        })
                    }

                }
            }
            else {
                for(let i=0;i<data.length;i++){
                    if(i>0){
                        series.push({
                            lineStyle: {
                                normal: {
                                    color: color[i]   // 线条颜色
                                }
                            },
                            itemStyle:{
                                normal:{
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                                                { offset: 0,  color: color[i]},
                                                { offset: 0.7,  color: 'rgba(255,234,255, 0)'}
                                            ], false),
                                    lineStyle:{
                                        width:2,
                                        type:'dotted'  //'dotted'虚线 'solid'实线
                                    },
                                    borderType:"dotted",
                                    barBorderColor: 'tomato',
                                    barBorderWidth:3,
                                }
                            },
                            smooth: true,
                            name: data_type_name[i],
                            type: 'bar',
                            data: data[i],
                            symbolSize: 10,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                }
                            }

                        })
                    }
                    else {
                        series.push({
                            lineStyle: {
                                normal: {
                                    color: color[i]   // 线条颜色
                                }
                            },
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                                        { offset: 0,  color: color[i]},
                                        { offset: 0.7,  color: 'rgba(255,234,255, 0)'}
                                    ], false),
                                }
                            },
                            smooth: true,
                            name: data_type_name[i],
                            type: 'bar',
                            data: data[i],
                            symbolSize: 10,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                }
                            }

                        })
                    }

                }
            }

            return series;
        }

    }
    setDataTypeName(data_type_name,time_type){
        if(data_type_name.length>=2){
            if(time_type==="天"){
                return "每日";
            }else {
                return "小时";
            }
        }else {
            if(time_type==="天"){
                return data_type_name+"每日";
            }else {
                return data_type_name+"小时";
            }
        }
    }

    componentDidMount(){

    }

    getOptions = () =>{
        let {time_length,data_type_name,data_y,time_type,y_name,data_x} =this.props;
        let color;
        if(data_type_name.length===4){
            color=['rgba(242,130,170,0.9)', 'rgba(17,193,243,0.9)','rgba(255,153,51,0.9)','rgba(17,204,102,0.9)'];
        }
        else {
            color=['rgba(242,130,170,0.9)', 'rgba(17,193,243,0.9)'];
        }
        let option = {

            //设置图表与容器的间隔
            grid: {
                // x:100,      //坐标轴左边与边框的距离
                top: 80,      //坐标轴顶端与边框的距离
                // x2: 40,     //坐标轴右边与边框的距离
                // y2:100,     //坐标轴底端与边框的距离
            },
            title: {
                top:10,
                text: '机器'+this.setDataTypeName(data_type_name,time_type)+'数据',
                textStyle: {
                    //文字颜色
                    color: 'black',
                    //字体风格,'normal','italic','oblique'
                    fontStyle: 'normal',
                    //字体系列
                    fontFamily: 'sans-serif',
                    //字体大小
                    fontSize: 25,
                },
                // x:'center',
                // y:'top',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: data_type_name
            },
            toolbox: {
                show: true,
                feature: {
                    // dataView: {readOnly: true},
                    magicType: {type: [ 'bar','line',]},
                    saveAsImage: {},
                    dataView:{}
                }
            },
            xAxis: {
                type: 'category',
                data: data_x,
                name: '时间('+time_type+')',
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                },
                name: y_name,
            },
            dataZoom: [
                {
                    type:`slider`,
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 100
                }
            ],
            series:this.setSeries(data_type_name,data_y,time_type,color),
            //     [
            //     {
            //         smooth: true,
            //         name: data_type_name,
            //         type: 'line',
            //         data: data_y,
            //     },
            // ]
        };
        return option
    }

    render() {
        return (<div>

                <ReactEcharts
                    option={this.getOptions()}
                    className='react_for_echarts'
                    theme={'macarons'}
                    notMerge={true}
                    style={{height: 450, marginTop: 50}}
                />
            </div>

        )
    }
}

export default MachineData;