import React from 'react'
import {Layout} from 'antd';
import {Route} from 'react-router-dom'
import LoginForm from "../form/login_form";
import DashboardAdmin from "../dashboard/dashboardAdmin";
import MachineOwnerList from "../machine/machine_owner_list";
import MachineData from "../machine/machine_charts";
import DashboardUser from "../dashboard/dashboardUser";

const Page = () => (
    <div>
        <Layout>
            <Layout>
                <Route exact path="/" render={() => (<LoginForm/>)}/>
                <Route exact path="/index" render={() => (<LoginForm/>)}/>
                <Route path='/dashboardAdmin' render={() => (<DashboardAdmin/>)}/>
                <Route path='/dashboardUser' render={() => (<DashboardUser/>)}/>
                <Route path="/machine/data_list" render={() => (<MachineOwnerList/>)}/>
                <Route path="/machine/data/:qrcode" component={MachineData}/>
            </Layout>
        </Layout>

    </div>
)

export default Page
