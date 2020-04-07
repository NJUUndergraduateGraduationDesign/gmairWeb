import React from "react";
import {Route, Redirect} from "react-router-dom"
import UnAuthorized from "./unAuthorized";

class AuthorizedRoute extends React.Component {
    componentWillMount() {
        let userRole = localStorage.getItem("userType");
        let userName = localStorage.getItem("userName");
        this.setState({currentUserRole: userRole, currentUserName: userName});
    }

    render() {
        let {path, userRole, component} = this.props;
        let currentUserRole=this.state.currentUserRole;
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
