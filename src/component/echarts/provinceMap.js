import React from 'react';
import '../../../node_modules/echarts/theme/macarons'
import echarts from 'echarts';
import {geolocationservice} from "../../service/geolocation.service";
import EChartsGL from "echarts-gl/dist/echarts-gl";
import 'echarts/map/js/china';
//加载地图
import 'echarts/map/js/china';
import 'echarts/map/js/province/anhui';
import 'echarts/map/js/province/aomen';
import 'echarts/map/js/province/beijing';
import 'echarts/map/js/province/chongqing';
import 'echarts/map/js/province/fujian';
import 'echarts/map/js/province/gansu';
import 'echarts/map/js/province/guangdong';
import 'echarts/map/js/province/guangxi';
import 'echarts/map/js/province/guizhou';
import 'echarts/map/js/province/hainan';
import 'echarts/map/js/province/hebei';
import 'echarts/map/js/province/heilongjiang';
import 'echarts/map/js/province/henan';
import 'echarts/map/js/province/hunan';
import 'echarts/map/js/province/hubei'
import 'echarts/map/js/province/jiangsu';
import 'echarts/map/js/province/jiangxi';
import 'echarts/map/js/province/jilin';
import 'echarts/map/js/province/liaoning';
import 'echarts/map/js/province/neimenggu';
import 'echarts/map/js/province/ningxia';
import 'echarts/map/js/province/qinghai';
import 'echarts/map/js/province/shandong';
import 'echarts/map/js/province/shanghai';
import 'echarts/map/js/province/shanxi';
import 'echarts/map/js/province/shanxi1';
import 'echarts/map/js/province/sichuan';
import 'echarts/map/js/province/taiwan';
import 'echarts/map/js/province/tianjin';
import 'echarts/map/js/province/xianggang';
import 'echarts/map/js/province/xinjiang';
import 'echarts/map/js/province/xizang';
import 'echarts/map/js/province/yunnan';
import 'echarts/map/js/province/zhejiang';


var data;
var myChart;
var province;

class ProvinceMap extends React.Component {
    constructor(props) {
        super(props);
        this.randomData=this.randomData.bind(this);
    }
    randomData() {
        return Math.round(Math.random()*1000);
    }

    componentDidMount() {
        myChart= echarts.init(document.getElementById('mainMap'),'macarons');
        myChart.showLoading();
        province = this.props.province;
        var province2=province;
        if(province==='新疆'){
            province2='新疆维吾尔族自治区';
        }
        else if(province==='西藏'){
            province2='西藏藏族自治区';
        }
        else if(province==='内蒙古'){
            province2='内蒙古自治区';
        }
        else if(province==='宁夏'){
            province2='宁夏回族自治区';
        }
        else if(province==='广西'){
            province2='广西壮族自治区';
        }
        else if((province==='北京')||(province==='天津')||(province==='重庆')||(province==='上海')){
            province2=province+'市';
        }
        else{
            province2=province+'省';
        }
        geolocationservice.obtain_city(province2).then(response => {
            data=response.data;
            // data=[
            //     {name: '南京市',value: this.randomData() },
            //     {name: '无锡市',value:this.randomData() },
            //     {name: '徐州市',value:this.randomData() },
            //     {name: '常州市',value:this.randomData() },
            //     {name: '苏州市',value:this.randomData() },
            //     {name: '南通市',value:this.randomData() },
            //     {name: '连云港市',value:this.randomData() },
            //     {name: '淮安市',value:this.randomData() },
            //     {name: '盐城市',value:this.randomData() },
            //     {name: '扬州市',value:this.randomData() },
            //     {name: '镇江市',value:this.randomData() },
            //     {name: '泰州市',value:this.randomData() },
            //     {name: '宿迁市',value:this.randomData() }
            // ];
            this.initalECharts();
        })
    }

    initalECharts() {
        myChart.hideLoading();
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
                text: province+'用户人数分布',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                min: 0,
                max: 300,
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
                    map: province,
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
            <div style={{ width: '89%', height: '700px' }} id='mainMap' />
        )
    }
}

export default ProvinceMap;