import React from 'react'
import {withRouter} from 'react-router-dom'

import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {FormGroup} from 'react-bootstrap'
import {Panel} from 'react-bootstrap'

import GmairHeader from "../header/header";

import {adminservice} from "../../service/admin.service";

class LoginForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.process_username = this.process_username.bind(this);
        this.process_password = this.process_password.bind(this);
        this.validate = this.validate.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            username: '',
            password: '',
            filled: false
        };
    }

    process_username(e) {
        this.setState({username: e.target.value}, this.validate)
    }

    process_password(e) {
        this.setState({password: e.target.value}, this.validate)
    }

    validate = () => {
        if (this.state.username !== '' && this.state.password !== '') {
            this.setState({filled: true});
        } else {
            this.setState({filled: false});
        }
    }

    submit = () => {
        adminservice.login(this.state.username, this.state.password, this.props);
    }

    render() {
        return (
            <div>
                <GmairHeader/>
                <Form>
                    <div className="form-signin">
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">管理平台登录</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
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