import React from 'react';
import {Menu, Icon, Layout} from 'antd'

const {SubMenu} = Menu;
const {Sider} = Layout;

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
        let items=null;
        if(sessionStorage.getItem("userType")==='admin'){
            items=
                <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="inline"
                style={{height: '100%', borderRight: 0}}
                defaultOpenKeys={this.state.defaultOpenKeys}
            >
                <Menu.Item key="/dashboardAdmin">
                    <Icon type="dashboard"/>
                    <span>总体数据</span>
                </Menu.Item>
                <Menu.Item key="/machine/data_list">
                    <Icon type="area-chart"/>
                    <span>机器数据</span>
                </Menu.Item>
            </Menu>
        }
        else{
            items=
                <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="inline"
                style={{height: '100%', borderRight: 0}}
                defaultOpenKeys={this.state.defaultOpenKeys}
            >
                <Menu.Item key="/dashboardUser">
                    <Icon type="dashboard"/>
                    <span>机器月报</span>
                </Menu.Item>
                <Menu.Item key="/machine/data_list">
                    <Icon type="area-chart"/>
                    <span>机器数据</span>
                </Menu.Item>
            </Menu>
        }
        return <Sider collapsible
                      collapsed={this.state.collapsed}
                      onCollapse={this.toggle}
                      width={200}
                      theme="light"
                      style={{background: '#fff'}}>
            {items}
        </Sider>
    }
}

export default Sidebar
