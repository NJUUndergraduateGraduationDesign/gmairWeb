import React from 'react';
import ReactEcharts from 'echarts-for-react';
import '../../../node_modules/echarts/theme/macarons'
import echarts from 'echarts';


class HeatCalendar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }


    render() {
        let {type,data} =this.props;
        let title;
        let max;
        let unit;
        let color=[];
        if(type==='pm25'){
            title='2019全年数据统计';
            max=50;
            unit='μg/m³';
            color= ['#ebedf0', '#ffeb9b', '#c96524', '#9a0301'];
        }
        else {
            max=1440;
            unit='min';
            color= ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196027'];
        }
            var obj = {
                range: '2019',
                cellSize: ['auto',15],
                left: 70,
                right: 30,
                yearLabel: {
                    show: true,
                    formatter:data.name,
                    // formatter:index[i].name,
                    fontSize: 16,
                    textStyle: {
                        color: '#5c5c5c'
                    }
                },
                top:100
            }
            var obj1 = {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 0,
                data: data.value,
                tooltip: {
                    formatter:function(data){
                        return data.value[0]+'<br/>'+data.value[1]+unit
                    },
                }

            }

        let option = {
            title: {
                top:5,
                text: title,
                left:'left',
                textStyle: {
                    //文字颜色
                    color: 'black',
                    //字体风格,'normal','italic','oblique'
                    fontStyle: 'normal',
                    //字体系列
                    fontFamily: 'sans-serif',
                    //字体大小
                    fontSize: 25,
                }
            },
            tooltip: {
                position: 'top'
            },
            visualMap: {
                min: 0,
                max: max,
                calculable: true,
                orient: 'horizontal',
                left: 'right',
                top: 'top',
                show: true,
                inRange: {
                    color:color
                },
            },


            calendar: [obj],
            series: [obj1]
        };
        return (
            <div>
                <ReactEcharts
                    option={option}
                    notMerge={true}
                    className='react_for_echarts'
                    style={{height:250}}
                />
            </div>
        )
    }
}

export default HeatCalendar;