import React from "react";
import Sidebar from "../sidebar/sidebar";
import {Route} from 'react-router-dom'
import GmairHeader from "../header/header";

class State extends React.Component {
    constructor(props) {
        super(props);
        let data = [];
        this.state = {data: data, max: 0};
    }

    render() {
        let option =
            {
                title: {
                    text: '各省设备数量',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['order']
                },
                visualMap: {
                    min: 0,
                    max: this.state.max,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'],           // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center'
                },
                series: [
                    {
                        name: 'CO2',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data: this.state.data
                    }
                ]
            };
        return (
            <div>
                <GmairHeader/>
                <div className="listWrap">

                    <div className="page-content">
                        <div className="container-fluid">
                            <Route path='/machine' component={Sidebar}></Route>
                            {/*<div className="block" style={{background:"#4ABDAC",marginLeft: "20%"}}>*/}
                            {/*<h3 style={{textAlign:"center",paddingTop:60}}>所有设备<br/>100</h3>*/}
                            {/*</div>*/}
                            {/*<div className="block" style={{background:"#FC4A1A"}}>*/}
                            {/*<h3 style={{textAlign:"center",paddingTop:60}}>当前在线设备<br/>100</h3>*/}
                            {/*</div>*/}
                            {/*<div className="block" style={{background:"#F7B733"}}>*/}
                            {/*<h3 style={{textAlign:"center",paddingTop:60}}>今日上线设备<br/>100</h3>*/}
                            {/*</div>*/}
                            {/*<div style={{width:1000,margin:"20%"}}>*/}
                            {/*<ReactEcharts*/}
                            {/*option={option}*/}
                            {/*style={{height: 800, width: 974}}*/}
                            {/*className='react_for_echarts'*/}
                            {/*theme={'macarons'}*/}
                            {/*/>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default State