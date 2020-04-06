import React from 'react';
import ReactEcharts from 'echarts-for-react';
import '../../../node_modules/echarts/theme/macarons'
import echarts from 'echarts'

class PeopleNumber extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount(){

    }

    getOptions = () =>{
        let {time_length,data_type_name,data_y,time_type,y_name,data_x} =this.props;
        let color;
        let option = {
            color: '#ff9933',
            //设置图表与容器的间隔
            grid: {
                // x:100,      //坐标轴左边与边框的距离
                top: 80,      //坐标轴顶端与边框的距离
                // x2: 40,     //坐标轴右边与边框的距离
                // y2:100,     //坐标轴底端与边框的距离
            },
            title: {
                top:10,
                text: '近一年每月用户增长统计',
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
            series:
                [
                {
                    lineStyle: {
                        normal: {
                            color: "#ff784f"   // 线条颜色
                        }
                    },
                    areaStyle: { //区域填充样式
                        normal: {
                            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1.5, [
                                { offset: 0,  color: 'rgba(255,118,78,0.9)'},
                                { offset: 0.7,  color: 'rgba(255,234,255,0)'}
                            ], false),

                            shadowColor: 'rgba(215,71,49,0.9)', //阴影颜色
                            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        }
                    },
                    itemStyle:{
                        normal: {
                            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1.8, [
                                { offset: 0,  color: 'rgba(255,96,72,0.9)'},
                                { offset: 0.7,  color: 'rgba(255,255,255,0)'}
                            ], false),

                            shadowColor: 'rgba(215,70,37,0.9)', //阴影颜色
                            shadowBlur: 20 ,//shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        }
                    },
                    smooth: true,
                    name: data_type_name,
                    type: 'bar',
                    data: data_y,
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                        }
                    }
                },
            ]
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

export default PeopleNumber;