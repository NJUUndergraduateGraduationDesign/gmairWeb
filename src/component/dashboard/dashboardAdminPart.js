import React, {Component} from 'react';
import GmairHeader from "../header/header";
import {Breadcrumb, Card, Layout, Statistic} from "antd";
import Sidebar from "../sidebar/sidebar";
import ProvinceMap from "../echarts/provinceMap";
import {userStatisticservice} from "../../service/userStatistic.service";
import Map from "../echarts/map";
import PeopleNumber from "../echarts/peopleNumber";
import CategoryPie from "../echarts/categoryPie";
import Footer from "../header/footer";

let totalUser =0;
let newUser =0;
let province;
class DashboardAdminPart extends Component {
    constructor() {
        super();
        this.state={
            data_x_newPeopleNumber:'',
            data_y_newPeopleNumber:''
        }
    }

    sortCreateTime(data){
        data.sort(function(a,b){
            return new Date(a.createTime) - new Date(b.createTime)
        });
    }

    getPieData(){
        //分类图
        // userStatisticservice.UserCategoryEnvironmentProvince(province).then(response=>{
        let response={data:[]};
        let data_environment=[];
        response.data={1:200,2:300,3:600,4:500,5:400};
        data_environment.push({name:'优',value:response.data[1]});
        data_environment.push({name:'较优',value:response.data[2]});
        data_environment.push({name:'普通',value:response.data[3]});
        data_environment.push({name:'较差',value:response.data[4]});
        data_environment.push({name:'差',value:response.data[5]});
        this.setState({
            data_environment:data_environment
        });
        // });
        // userStatisticservice.UserCategoryEffectProvince(province).then(response=>{
        let data_effect=[];
        response.data={1:200,2:300,3:600,4:500};
        data_effect.push({name:'环境优无需改善',value:response.data[1]});
        data_effect.push({name:'环境差但效果好',value:response.data[2]});
        data_effect.push({name:'环境差效果一般',value:response.data[3]});
        data_effect.push({name:'环境差效果差',value:response.data[4]});
        this.setState({
            data_effect:data_effect
        });
        // })
    }

    componentDidMount() {
        province=this.props.match.params.province;
        userStatisticservice.provinceUser(province).then(response=>{
            // totalUser=response.data.totalUser;
            // newUser=response.data.newUser;
        })

        //曲线图
        // userStatisticservice.NewUserNumberPerMonthProvince(province).then(response=>{
        let data_x=[];
        let data_y=[];
        let response={data:[]};
        response.data=[{createTime:'2020-03',number:230},{createTime:'2020-02',number:2300},{createTime:'2020-01',number:1500},{createTime:'2019-12',number:2030}
            ,{createTime:'2019-11',number:3230},{createTime:'2019-10',number:1230},{createTime:'2019-09',number:230},{createTime:'2019-08',number:2300},
            {createTime:'2019-07',number:1500},{createTime:'2019-06',number:2030}
            ,{createTime:'2019-05',number:3230},{createTime:'2019-04',number:1230}]
        this.sortCreateTime(response.data);
        for (let i=0;i<response.data.length;i++){
            data_x.push(response.data[i].createTime);
            data_y.push(response.data[i].number);
        }
        this.setState({
            data_x_newPeopleNumber:data_x,
            data_y_newPeopleNumber:data_y
        });
        // })
        this.getPieData()
    }

    render() {
        const statisticComponent={
            width:200,
            margin: 100,
            marginTop:50,
            marginBottom:30,
            backgroundColor:'rgba(176,196,222,0.25)',
            borderRadius:50,
            display:'inline-block'
        }
        const valueType={
            fontSize:40
        }
        const divp ={
            display:'inline-block',
            height:400,
            width:'50%',
            marginBottom: 45
        };
        return <div>
            <GmairHeader/>
            <Layout>
                <Sidebar/>
                <Layout style={{padding: '0 24px 24px',width:`100%`}}>
                    <Breadcrumb style={{margin: '16px 0'}} separator=">">
                        <Breadcrumb.Item href="/dashboardAdmin">数据总览</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.props.match.params.province}数据统计</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{backgroundColor: `white`, paddingTop: `25px`,textAlign:`center`}}>
                        <div style={{width: '95%', height: '700px',float:'left',marginLeft:10}}>
                            <ProvinceMap province={this.props.match.params.province}/>
                        </div>
                        <div>
                            <Card style={statisticComponent} >
                                <Statistic title={this.props.match.params.province+'用户总数'} value={totalUser} suffix={'个'} valueStyle={valueType} />
                            </Card>
                            <Card style={statisticComponent}>
                                <Statistic title="当月新增用户数" value={newUser} suffix={'个'} valueStyle={valueType}/>
                            </Card>
                        </div>
                        <div style={{marginLeft:20,marginRight:20}}>
                            <PeopleNumber time_length={6} data_type_name={['新增用户']}
                                          y_name="天" time_type="月" data_x={this.state.data_x_newPeopleNumber}
                                          data_y={this.state.data_y_newPeopleNumber}/>
                        </div>
                        <div style={divp}>
                            <CategoryPie data_type_name={['优','较优','普通','较差','差']} y_name="个"
                                         data_type="用户环境分类统计" data={this.state.data_environment}/>
                        </div>
                        <div style={divp}>
                            <CategoryPie data_type_name={['环境优无需改善','环境差但效果好','环境差效果一般','环境差效果差']} y_name="个"
                                         data_type="用户效果分类统计" data={this.state.data_effect}/>
                        </div>
                    </div>
                </Layout>
            </Layout>
            <Footer/>
        </div>
    }
}

export default DashboardAdminPart;