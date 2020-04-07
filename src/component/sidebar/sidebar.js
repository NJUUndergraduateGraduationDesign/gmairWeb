import React from 'react';
import {Menu, Icon, Layout} from 'antd'
import Avatar from "antd/es/avatar";
import {machine_data_service} from "../../service/machine_data.service";

const {SubMenu} = Menu;
const {Sider} = Layout;

let ID=null;
let items=null;
let url='/machine/data/'+localStorage.getItem('userName');

class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            current: '',
            collapsed: false,
            defaultOpenKeys:[]
        }
        this.handleClick = this.handleClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        if(localStorage.getItem("userType")==='admin'){
            ID=  <div style={{margin:'0 auto',textAlign:"center"}}>
                <Avatar size={80} style={{fontSize:'30px',margin:30,marginTop:'50px'}}>A</Avatar>
                <div style={{fontSize:'16px',margin:'40px'}}>用户名：{localStorage.getItem("userName")}</div>
                <div style={{fontSize:'16px',margin:'30px',marginBottom:'30px'}}>身份：管理员</div>
            </div>;
            items=
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                    style={{height: '100%', borderRight: 0}}
                    defaultOpenKeys={this.state.defaultOpenKeys}
                >
                    {ID}
                    <Menu.Item key="/dashboardAdmin">
                        <Icon type="dashboard"/>
                        <span>数据总览</span>
                    </Menu.Item>
                    <Menu.Item key="/machine/data_list">
                        <Icon type="area-chart"/>
                        <span>机器数据</span>
                    </Menu.Item>
                </Menu>
        }
        else{
            // let inf={uid:'11',codeValue:'6666', isPower:0, mode:0, bindTime:'2019-06-06 12:00:00',heat:1,city:'南京'};
            machine_data_service.obtain_uid(localStorage.getItem("userName")).then(response => {
                let inf = response.data;
                let mode;
                if (inf.mode=== 0) {
                    mode = "自动";
                }
                else if (inf.mode=== 1){
                    mode = "睡眠";
                }
                else {
                    mode = "手动";
                }
                ID=  <div style={{margin:'0 auto',textAlign:"center"}}>
                    <Avatar size={80} style={{color: '#f56a00', backgroundColor: '#fde3cf',fontSize:'30px',margin:'30px',marginTop:'50px'}}>U</Avatar>
                    <div style={{fontSize:'16px',marginTop:'35px'}}>uid：{localStorage.getItem("userName")}</div>
                    <div style={{fontSize:'16px',marginTop:'35px'}}>二维码：{inf.codeValue}</div>
                    <div style={{fontSize:'16px',marginTop:'35px'}}>是否工作：{inf.isPower?'是':'否'}</div>
                    <div style={{fontSize:'16px',marginTop:'35px'}}>工作模式：{mode}</div>
                    <div style={{fontSize:'16px',marginTop:'35px'}}>辅热：{inf.heat?'开':'关'}</div>
                    <div style={{fontSize:'16px',marginTop:'35px'}}>城市：{inf.city}</div>
                    <div style={{fontSize:'16px',marginTop:'35px',marginBottom:'20px',lineHeight:'130%'}}>绑定时间：{inf.bindTime}</div>
                </div>;
                items=
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="inline"
                        style={{height: '100%', borderRight: 0}}
                        defaultOpenKeys={this.state.defaultOpenKeys}
                    >
                        {ID}
                        <Menu.Item key="/dashboardUser">
                            <Icon type="dashboard"/>
                            <span>机器数据总览</span>
                        </Menu.Item>
                        <Menu.Item key={url}>
                            <Icon type="area-chart"/>
                            <span>机器数据统计</span>
                        </Menu.Item>
                        <Menu.Item key="/user/report">
                            <Icon type="book"/>
                            <span>机器数据月报</span>
                        </Menu.Item>
                        <Menu.Item key="/user/forecast">
                            <Icon type="radar-chart"/>
                            <span>机器数据预测</span>
                        </Menu.Item>
                    </Menu>
                this.forceUpdate();
            });

        }
    }

    componentDidMount(){
        if(this.props.current!==undefined){
            this.setState({
                current:this.props.current,
            })
        }
        if(this.props.defaultOpenKeys!==undefined){
            this.setState({
                defaultOpenKeys:this.props.defaultOpenKeys
            })
        }

    }



    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        window.location.href = '' + e.key
    }

    render() {

        return <Sider
                      width={200}
                      theme="light"
                      style={{background: '#fff'}}>
            {items}
        </Sider>
    }
}

export default Sidebar
