import React from 'react';
import ReactEcharts from 'echarts-for-react';
import '../../../node_modules/echarts/theme/macarons'

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
                    smooth: true,
                    name: data_type_name,
                    type: 'bar',
                    data: data_y,
                    areaStyle:{
                        normal:{
                            color:'#f17a52',
                            opacity:0.08
                        }
                    },
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