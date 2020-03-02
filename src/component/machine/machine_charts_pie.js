import React from 'react';
import ReactEcharts from 'echarts-for-react';
import '../../../node_modules/echarts/theme/macarons'

class Machine_charts_pie extends React.Component {
    constructor(props) {
        super(props);
    }

    setDataTypeName(data_type_name,time_type){
        if(time_type==="普通1"){
            return "多日";
        }
        else if(time_type==="普通2"){
            return "当日";
        }
        else if(time_type==="预测1"){
            return "多日预测";
        }
        else if(time_type==="预测2"){
            return "当日预测";
        }
    }

    componentDidMount(){

    }

    render() {
        let {time_length,data_type_name,y_name,time_type,data} =this.props;
        let option = {
            color: ['#F282AA', '#11C1F3','#ff9933'],
            title: {
                top:10,
                text: '机器'+this.setDataTypeName(data_type_name,time_type)+'平均数据',
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
            legend: {
                orient: 'vertical',
                top: 20,
                right: 5,
                data: data_type_name
            },
            tooltip: {
                // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis'
                trigger: 'item',
                showDelay: 20,   // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                hideDelay: 20,   // 隐藏延迟，单位ms
                backgroundColor: 'rgba(255,255,255,0.7)',  // 提示框背景颜色
                textStyle: {
                    fontSize: '16px',
                    color: '#000'  // 设置文本颜色 默认#FFF
                },
                // formatter设置提示框显示内容
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: '{b} : {c}'+y_name+' ({d}%)'
            },
            series: [
                {
                    name: '机器数据',
                    type: 'pie',
                    // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
                    radius: ['20%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                    center: ['50%', '60%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                    data: data,
                    // itemStyle 设置饼状图扇形区域样式
                    itemStyle: {
                        // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                        // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 2,
                            shadowColor: 'rgba(30, 144, 255，0.5)'
                        }
                    },
                    // 设置值域的那指向线
                    labelLine: {
                        normal: {
                            show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                        }
                    },
                    // 设置值域的标签
                    label: {
                        normal: {
                            position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                            // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                            // {a}指series.name  {b}指series.data的name
                            // {c}指series.data的value  {d}%指这一部分占总数的百分比
                            formatter: '{d}%'
                        }
                    }
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
                    style={{marginTop:50,height:400}}
                />
            </div>
        )
    }
}

export default Machine_charts_pie;