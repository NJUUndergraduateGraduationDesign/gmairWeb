import React from 'react';
import {Menu, Layout} from 'antd';
import './ant_mydefine.css'
import Avatar from "antd/es/avatar";
import {adminservice} from "../../service/admin.service";
import {Dropdown} from "antd";
import {Icon} from "antd";
import {userStatisticservice} from "../../service/userStatistic.service";

const {Header} = Layout;

class GmairHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'none',
            currentUid: '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        if (e.key === "http://www.gmair.net" || e.key === "https://mall.jd.com/index-748610.html") {
            const w = window.open('about:blank');
            w.location.href = '' + e.key

        } else {
            window.location.href = '' + e.key
        }
    };

    logout = (e) => {
        adminservice.logout();
    };

    getCurrentUid = () => {
        adminservice.getCurrentUid().then(response => {
            if (response.code === 200) {
                this.setState({
                    currentUid: response.data
                })
            }
        })
    };

    componentDidMount(){
        this.getCurrentUid();
    }


    render() {
        let log = null;
        let logout = null;
        const uid=this.state.currentUid;
        if (uid != null) {
            logout = <Menu><Menu.Item key="logout" onClick={this.logout}>登出</Menu.Item></Menu>
            if (uid === 'admin') {
                log = <Dropdown overlay={logout} trigger={['click']}>
                    <a style={{float: "right", marginRight: '20px'}} className="ant-dropdown-link"
                       onClick={e => e.preventDefault()}>
                        <Avatar style={{marginRight: '10px'}}>A</Avatar>
                        <span>{uid}</span>
                        <Icon type="down" style={{color: "white", marginLeft: '10px'}}/>
                    </a>
                </Dropdown>
            } else {
                log = <Dropdown overlay={logout} trigger={['click']}>
                    <a style={{float: "right", marginRight: '20px'}} className="ant-dropdown-link"
                       onClick={e => e.preventDefault()}>
                        <Avatar style={{color: '#f56a00', backgroundColor: '#fde3cf', marginRight: '10px'}}>U</Avatar>
                        <span>{uid}</span>
                        <Icon type="down" style={{color: "white", marginLeft: '10px'}}/>
                    </a>
                </Dropdown>
            }
        }
        return <div className="header" style={{height: `64px`}}>
            <div className="logo"></div>
            <Menu theme="dark" mode="horizontal" style={{lineHeight: '64px'}}>
                <Menu.Item>果麦新风</Menu.Item>
                <Menu.Item key="http://www.gmair.net/" onClick={this.handleClick}>官网</Menu.Item>
                <Menu.Item key="https://mall.jd.com/index-748610.html" onClick={this.handleClick}>商城</Menu.Item>
                {log}
            </Menu>


        </div>
    }
}

export default GmairHeader

