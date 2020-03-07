import React from 'react';
import ReactEcharts from 'echarts-for-react';
import '../../../node_modules/echarts/theme/macarons'
import echarts from 'echarts';

class OpenTimePie extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        let {percent,time} =this.props;
        var highlight = 'white';
        var demoData = [
            {
                name: time,
                value: percent,
                unit: '%',
                pos: ['50%', '50%'],
                range: [0, 100],
                colora: 'rgba(151,209,242,0.6)',
                colorb: 'rgba(108,216,244,0.9)',
            }

        ];
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b},{c}%'
            },
            title: {
                text: '用户每天平均开机时间',
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
            series: (function() {
                var result = [];

                demoData.forEach(function(item) {
                    result.push(

                        { //外圆
                            type: 'pie',
                            radius: '70%',
                            center: ['50%', '50%'],
                            z: 0,
                            itemStyle: {
                                normal: {
                                    shadowBlur: 80,
                                    color: 'rgba(10, 17, 36, 0.7)',
                                    shadowColor: 'rgba(0, 0, 0, 0.8)'
                                }
                            },
                            hoverAnimation: false,
                            label: {
                                show: false,
                            },
                            tooltip: {
                                show: false
                            },
                            data: [120],
                            animationType: "scale"
                        },

                        // 内侧指针、数值显示
                        {
                            name: item.name,
                            type: 'gauge',
                            center: item.pos,
                            radius: '65%',
                            startAngle: 225,
                            endAngle: -45,
                            min: 0,
                            max: 100,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 2,
                                    color: [
                                        [
                                            item.value / 100, new echarts.graphic.LinearGradient(
                                            0, 0, 1, 0, [{
                                                offset: 0,
                                                color: 'rgba(255,255,255,0)',
                                            },
                                                {
                                                    offset: 1,
                                                    color: 'white',
                                                }
                                            ]
                                        )
                                        ],
                                        [
                                            1, 'rgba(255,255,255,0)'
                                        ]
                                    ]
                                }
                            },
                            axisTick: {
                                show: 0,
                            },
                            splitLine: {
                                show: 0,
                            },
                            axisLabel: {
                                show: 0
                            },
                            pointer: {
                                show: 0,
                            },
                            detail: {
                                show: 0
                            },
                            data: [{
                                value: item.value,
                            }]
                        },
                        // 外围刻度
                        {
                            type: 'gauge',
                            center: item.pos,
                            radius: '55%', // 1行3个
                            splitNumber: item.splitNum || 10,
                            min: 0,
                            max: 100,
                            startAngle: 225,
                            endAngle: -45,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 1,
                                    color: [
                                        [1, 'rgba(0,0,0,0)']
                                    ]
                                }
                            }, //仪表盘轴线
                            axisTick: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(255,255,255,0.6)',
                                    width: 1,
                                    shadowBlur:100
                                },
                                length: -6
                            }, //刻度样式
                            splitLine: {
                                show: true,
                                length: 10,
                                lineStyle: {
                                    color: 'rgba(242,250,255,0.6)'
                                }
                            }, //分隔线样式
                            axisLabel: {
                                show: true,
                                distance: 2,
                                textStyle: {
                                    color: 'white',
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            },
                            pointer: {
                                show: 0
                            },
                            detail: {
                                show: 0
                            }
                        },

                        // 内侧指针、数值显示
                        {
                            name: item.name,
                            type: 'gauge',
                            center: item.pos,
                            radius: '55%',
                            startAngle: 225,
                            endAngle: -45,
                            min: 0,
                            max: 100,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 50,
                                    color: [
                                        [
                                            item.value / 100, new echarts.graphic.LinearGradient(
                                            0, 1, 1, 0, [{
                                                offset: 0,
                                                color: 'rgba(0,0,0,0)',
                                            },
                                                {
                                                    offset: 1,
                                                    color: item.colorb,
                                                }
                                            ]
                                        )
                                        ],
                                        [
                                            1, 'rgba(0,0,0, 0)'
                                        ]
                                    ]
                                }
                            },
                            axisTick: {
                                show: 0,
                            },
                            splitLine: {
                                show: 0,
                            },
                            axisLabel: {
                                show: 0
                            },
                            pointer: {
                                show: true,
                                length: '102%',
                                width: 3
                            },
                            title: {
                                show: true,
                                offsetCenter: [0, '65%'],
                                color: 'white',
                                fontSize: 20,
                                /* backgroundColor: "#D8d8d8",*/
                                borderRadius: 21,
                                padding: 5
                            },
                            detail: {
                                show: true,
                                offsetCenter: [0, 0],
                                textStyle: {
                                    fontSize: 25,
                                    color: '#fffffb'
                                },
                                formatter: [
                                    '{value}' + (item.unit || ''),
                                    /* '{name|' + item.name + '}'*/
                                ].join('\n'),

                                rich: {
                                    name: {
                                        fontSize: 20,
                                        lineHeight: 10,
                                        color: '#ffffff',
                                        padding: [30, 0, 0, 0]
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: highlight,
                                }
                            },
                            data: [{
                                value: item.value,
                                name: item.name
                            }]
                        }
                    );
                });

                return result;
            })()
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

export default OpenTimePie;