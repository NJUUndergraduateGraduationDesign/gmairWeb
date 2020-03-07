import React from 'react';
import '../../../node_modules/echarts/theme/macarons'
import echarts from 'echarts';
import EChartsGL from "echarts-gl/dist/echarts-gl";
import {geolocationservice} from "../../service/geolocation.service";
import 'echarts/map/js/china';

var data;
var myChart

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.randomData=this.randomData.bind(this);
    }
    randomData() {
        return Math.round(Math.random()*1000);
    }

    clickMap = () => {
        myChart.on('click', function(params){
            let province=params.name;
            window.location.href='/dashboardAdminPart/'+province;
        });
    }
    componentDidMount() {
        geolocationservice.obtain_province().then(response => {
            let remove=0
            data=response.data;
            for (let i in data){
                if(data[i].name === '广西壮族自治区'){
                    data[i].name='广西'
                }
                else if(data[i].name === '内蒙古自治区'){
                    data[i].name='内蒙古'
                }
                else if(data[i].name === '新疆维吾尔族自治区'){
                    data[i].name='新疆'
                }
                else if(data[i].name === '宁夏回族自治区'){
                    data[i].name='宁夏'
                }
                else if(data[i].name === '西藏藏族自治区'){
                    data[i].name='西藏'
                }
                else if(data[i].name === '未知'){
                    remove=i;
                }
                else {
                    data[i].name=data[i].name.substring(0,data[i].name.length-1)
                }
            }
            data.splice(remove,1)
            // data=[
            //     {name: '北京',value: this.randomData() },
            //     {name: '天津',value:this.randomData() },
            //     {name: '上海',value:this.randomData() },
            //     {name: '重庆',value:this.randomData() },
            //     {name: '河北',value:this.randomData() },
            //     {name: '河南',value:this.randomData() },
            //     {name: '云南',value:this.randomData() },
            //     {name: '辽宁',value:this.randomData() },
            //     {name: '黑龙江',value:this.randomData() },
            //     {name: '湖南',value:this.randomData() },
            //     {name: '安徽',value:this.randomData() },
            //     {name: '山东',value:this.randomData() },
            //     {name: '新疆',value:this.randomData() },
            //     {name: '江苏',value:this.randomData() },
            //     {name: '浙江',value:this.randomData() },
            //     {name: '江西',value:this.randomData() },
            //     {name: '湖北',value:this.randomData() },
            //     {name: '广西',value:this.randomData() },
            //     {name: '甘肃',value:this.randomData() },
            //     {name: '山西',value:this.randomData() },
            //     {name: '内蒙古',value:this.randomData() },
            //     {name: '陕西',value:this.randomData() },
            //     {name: '吉林',value:this.randomData() },
            //     {name: '福建',value:this.randomData() },
            //     {name: '贵州',value:this.randomData() },
            //     {name: '广东',value:this.randomData() },
            //     {name: '青海',value:this.randomData() },
            //     {name: '西藏',value:this.randomData() },
            //     {name: '四川',value:this.randomData() },
            //     {name: '宁夏',value:this.randomData() },
            //     {name: '海南',value:this.randomData() },
            //     {name: '台湾',value:this.randomData() },
            //     {name: '香港',value:this.randomData() },
            //     {name: '澳门',value:this.randomData() }
            // ];
            this.initalECharts();
            this.clickMap();
        })
    }

    initalECharts() {
        myChart= echarts.init(document.getElementById('mainMap'),'macarons');
        myChart.setOption({
            title: {
                top:10,
                textStyle: {
                    //字体风格,'normal','italic','oblique'
                    fontStyle: 'normal',
                    //字体系列
                    fontFamily: 'sans-serif',
                    //字体大小
                    fontSize: 25,
                },
                text: '全国用户人数分布',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                min: 0,
                max: 800,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true,
                color: 'red'
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '用户人数',
                    type: 'map3D',
                    map: 'china',
                    zoom: 1, //当前视角的缩放比例
                    roam: true, //是否开启平游或缩放
                    scaleLimit: { //滚轮缩放的极限控制
                        min: 1,
                        max: 5
                    },
                    label: {
                        normal: {
                            textStyle: {
                                fontStyle:'bold',
                                fontSize: 12,
                                color: 'black'
                            },
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle:{
                        borderWidth:0.25
                    },
                    postEffect: {
                        enable: true,
                        colorCorrection: {
                            lookupTexture: '/asset/get/s/data-1497261115431-B1XrEJ2f-.jpg'
                        }
                    },
                    light: {
                        main: {
                            intensity: 1,
                            shadow: true,
                            alpha: 150,
                            beta: 70
                        },
                    },
                    groundPlane: {
                        show: true
                    },
                    data:data
                },
            ],
        })
    }
    render() {
        return (
            <div style={{ width: '100%', height: '700px' }} id='mainMap' />
        )
    }
}

export default Map;