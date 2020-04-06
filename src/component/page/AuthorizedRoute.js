import React from "react";
import {Route, Redirect} from "react-router-dom"
import UnAuthorized from "./unAuthorized";
import {adminservice} from "../../service/admin.service";

class AuthorizedRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUid:''
        };
    }

    componentWillMount() {
        this.getCurrentUid();
    }

    getCurrentUid = () => {
        adminservice.getCurrentUid().then(response => {
            if (response.code === 200) {
                this.setState({
                    currentUid: response.data
                })
            }
        })
    };

    render() {
        let {path, userRole, component} = this.props;
        let currentUserRole=adminservice.getRoleByUid(this.state.currentUid);
        console.log(path,currentUserRole,userRole);
        if (!currentUserRole) {
            //当前用户未登录
            return <Route path={path} render={() => <Redirect to={{pathname: "/"}}/>}/>
        } else if (!userRole.includes(currentUserRole)) {
            //当前用户身份与路由不匹配
            return <Route path={path} component={UnAuthorized}/>
        } else {
            return <Route path={path} component={component}/>
        }
    }
}

export default AuthorizedRoute
