import React from 'react';
import ReactEcharts from 'echarts-for-react';
import '../../../node_modules/echarts/theme/macarons'

class MachineData extends React.Component {
    constructor(props) {
        super(props);
    }

    dataZoomStart(time_type){
        let start;
        if(time_type==="天"){
            start=0;
        }else{
            start=70;
        }
        return start;
    }
    setSeries(data_type_name,data,time_type){
        if(time_type==="小时"){
            let series=[];
            for(let i=0;i<data.length;i++){
                series.push({
                    smooth: true,
                    name: data_type_name[i],
                    type: 'bar',
                    data: data[i],
                    // symbolSize: 10,
                    // markPoint : {
                    //     data : [
                    //         {type : 'max', name: '最大值'},
                    //         {type : 'min', name: '最小值'}
                    //     ]
                    // }
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         position: 'top',
                    //         formatter: '{@[3]}',
                    //     }
                    // },
                    // markLine : {
                    //     lineStyle: {
                    //         normal: {
                    //             type: 'dashed'
                    //         }
                    //     },
                    //     data : [
                    //         [{type : 'min'}, {type : 'max'}]
                    //     ]
                    // }
                })
            }
            return series;
        }else {
            let series=[];
            for(let i=0;i<data.length;i++){
                series.push({
                    smooth: true,
                    name: data_type_name[i],
                    type: 'bar',
                    data: data[i],
                    symbolSize: 10,
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         position: 'top',
                    //     }
                    // }

                })
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

    render() {
        let {time_length,data_type_name,data_y,time_type,y_name,data_x} =this.props;

        let option = {
            color: ['#F282AA', '#11C1F3','#ff9933'],
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
                    start: this.dataZoomStart(time_type),
                    end: 100
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: this.dataZoomStart(time_type),
                    end: 100
                }
            ],
            series:this.setSeries(data_type_name,data_y,time_type),
            //     [
            //     {
            //         smooth: true,
            //         name: data_type_name,
            //         type: 'line',
            //         data: data_y,
            //     },
            // ]
        };
        return (<div>

                <ReactEcharts
                    option={option}
                    className='react_for_echarts'
                    theme={'macarons'}
                    style={{height: 450, marginTop: 50}}
                />
            </div>

        )
    }
}

export default MachineData;