import React, {Component} from 'react';
import GmairHeader from "../header/header";
import {Breadcrumb, Layout} from "antd";
import Sidebar from "../sidebar/sidebar";
import Footer from "../header/footer";

const {Content} = Layout;

class UnAuthorized extends Component{
    render(){
        return <div>
            <GmairHeader/>
            <Layout>
                <Sidebar/>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>提示</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 480}}>
                        <h1>无权限</h1>
                    </Content>
                </Layout>
            </Layout>
            <Footer/>
        </div>
    }
}

export default UnAuthorized;