import React from 'react'
import {withRouter} from 'react-router-dom'

import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {FormGroup} from 'react-bootstrap'
import {Panel} from 'react-bootstrap'
import {notification, Radio} from "antd";
import {Alert} from "antd";

import GmairHeader from "../header/header";

import {adminservice} from "../../service/admin.service";


class LoginForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.process_username = this.process_username.bind(this);
        this.process_password = this.process_password.bind(this);
        this.process_type = this.process_type.bind(this);
        this.validate = this.validate.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            username: '',
            password: '',
            filled: false,
            type:'',
            visible: false
        };
    }

    handleClose = () => {
        this.setState({ visible: false });
    };

    process_username(e) {
        this.setState({username: e.target.value}, this.validate)
    }

    process_password(e) {
        this.setState({password: e.target.value}, this.validate)
    }

    process_type(e) {
        this.setState({type: e.target.value}, this.validate)
    }

    validate = () => {
        if (this.state.username !== '' && this.state.password !== '') {
            this.setState({filled: true});
        } else {
            this.setState({filled: false});
        }
    }

    submit = () => {
        let result=adminservice.login(this.state.username, this.state.password, this.state.type,this);
    }

    openNotification = (message, description) => {
        notification.error({
            message: message,
            description: description,
        });
    };

    render() {
        const bgGround={
            display:'inline-block',
            margin:'0 auto',
            height: '100vh',
            width:'100%',
            backgroundImage: 'url('+require("../../../public/img/background.jpg")+')',
            backgroundSize: 'cover',
            backgroundAttachment:'fixed',
            overflow: 'auto',
        }
        return (
            <div style={bgGround}>
                <GmairHeader/>
                <div>
                    {this.state.visible ? (
                        <Alert
                            message="鉴权失败"
                            type="error"
                            closable
                            afterClose={this.handleClose}
                            style={{maxWidth:'200px', margin:'0 auto'}}
                            showIcon
                        />
                    ) : null}
                </div>
                <Form>
                    <div className="form-signin">
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">管理平台登录</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <Radio.Group buttonStyle="solid" onChange={this.process_type}>
                                    <Radio.Button value="admin" style={{minWidth:'194px',textAlign:"center"}}>管理员</Radio.Button>
                                    <Radio.Button value="user" style={{minWidth:'194px',textAlign:"center",marginRight:'0'}}>用户</Radio.Button>
                                </Radio.Group>
                                <FormGroup bsClass="input-group form-line">
                                    <span className="input-group-addon"><i
                                        className="glyphicon glyphicon-user"></i></span>
                                    <FormControl type="text" value={this.state.username} placeholder="请输入用户名"
                                                 onChange={this.process_username}></FormControl>
                                    <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup bsClass="input-group form-line">
                                <span className="input-group-addon" id="sizing-addon1"><i
                                    className="glyphicon glyphicon-lock"></i></span>
                                    <FormControl type="password" value={this.state.password} placeholder="请输入账户密码"
                                                 onChange={this.process_password}></FormControl>
                                </FormGroup>
                                <Button className="btn-lg btn-block" bsStyle="primary" onClick={this.submit}
                                        disabled={!this.state.filled}>登录</Button>
                            </Panel.Body>
                        </Panel>
                    </div>
                </Form>
            </div>
        );
    }
}

export default withRouter(LoginForm)