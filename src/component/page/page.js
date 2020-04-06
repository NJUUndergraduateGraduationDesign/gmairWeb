import React from 'react'
import {Layout} from 'antd';
import {Route} from 'react-router-dom'
import LoginForm from "../form/login_form";
import AuthorizedRoute from "./AuthorizedRoute";
import routerConfig from "./router.config"

const Page = () => (
    <div>
        <Route exact path="/" render={() => (<LoginForm/>)}/>
        <Route exact path="/index" render={() => (<LoginForm/>)}/>
        {routerConfig.map(rc => {
            const {path, userRole, component} = rc;
            return <AuthorizedRoute path={path} userRole={userRole} component={component}/>
        })}
    </div>
);

export default Page
