import React from 'react';
import ReactEcharts from 'echarts-for-react';
import '../../../node_modules/echarts/theme/macarons'

class PropertyRadar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        let {y_name,data} =this.props;

        let indicator = [{
            name: '室内PM2.5',
            max: 50
        },
            {
                name: '室外PM2.5',
                max: 50
            },
            {
                name: 'CO₂',
                max: 2000
            },
            {
                name: '湿度',
                max: 200,
                //  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
            },
            {
                name: '温度',
                max: 40
            },
            {
                name: '风量',
                max: 200
            }
        ];
        let dataS = [{
            name:'环境综合数据',
            value: data,
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#4A99FF',
                        shadowColor: '#4A99FF',
                        shadowBlur: 10,
                    },
                    shadowColor: '#5dfcff',
                    shadowBlur: 10,
                },
            },
            areaStyle: {
                normal: { // 单项区域填充样式
                    color: {
                        type: 'linear',
                        x: 0, //右
                        y: 0, //下
                        x2: 1, //左
                        y2: 1, //上
                        colorStops: [{
                            offset: 0,
                            color: '#4A99FF'
                        }, {
                            offset: 0.5,
                            color: 'rgba(0,0,0,0)'
                        }, {
                            offset: 1,
                            color: '#4A99FF'
                        }],
                        globalCoord: false
                    },
                    opacity: 1 // 区域透明度
                }
            }
        }
        ];
        let option = {
            title: {
                text: '环境综合数据',
                left:'center',
                textStyle: {
                    //文字颜色
                    color: '#010537',
                    //字体风格,'normal','italic','oblique'
                    fontStyle: 'normal',
                    //字体系列
                    fontFamily: 'sans-serif',
                    //字体大小
                    fontSize: 20,
                }
            },
            tooltip: {
                trigger: 'item',
            },
            radar: {
                radius:'65%',
                // shape: 'circle',
                center:['50%','50%'],
                name: {
                    show: true,
                    textStyle: {
                        color: 'black',
                        fontSize:'16',
                        fontStyle: 'italic',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                nameGap:'2',
                indicator: indicator,
                splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                    show: true,
                    areaStyle: { // 分隔区域的样式设置。
                        color: ['rgba(10, 17, 36, 0.7)',], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                        shadowColor: 'rgba(0, 0, 0, 1)',
                        shadowBlur: 100,
                    }
                },
                axisLine: { //指向外圈文本的分隔线样式
                    lineStyle: {
                        color: 'white',
                        width: 0.2, // 分隔线线宽
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'white', // 分隔线颜色
                        width: 0.2, // 分隔线线宽
                    }
                },
            },
            series: [{
                type: 'radar',
                data: dataS,
            }
            ]
        };
        return (
            <div>
                <ReactEcharts
                    option={option}
                    notMerge={true}
                    className='react_for_echarts'
                    theme={'macarons'}
                    style={{marginTop:50,height:500,width:500}}
                />
            </div>
        )
    }
}

export default PropertyRadar;