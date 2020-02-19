import React from 'react'
import {Layout} from 'antd';
import {Route} from 'react-router-dom'
import LoginForm from "../form/login_form";


const Page = () => (
    <div>
        <Layout>
            <Layout>
                <Route exact path="/" render={() => (<LoginForm/>)}/>
                <Route exact path="/index" render={() => (<LoginForm/>)}/>
            </Layout>
        </Layout>

    </div>
)

export default Page
