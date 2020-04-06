import React from 'react'
import {Layout} from 'antd';
import {Route} from 'react-router-dom'
import LoginForm from "../form/login_form";
import DashboardAdmin from "../dashboard/dashboardAdmin";
import MachineOwnerList from "../machine/machine_owner_list";
import MachineData from "../machine/machine_data";
import DashboardUser from "../dashboard/dashboardUser";
import ReportUser from "../report/reportUser";
import DashboardAdminPart from "../dashboard/dashboardAdminPart";
import ForecastUser from "../forecast/forecastUser"

export default[
    {
        path:"/dashBoardAdmin",
        userRole:["admin"],
        component:DashboardAdmin
    },
    {
        path:"/dashboardAdminPart/:province",
        userRole:["admin"],
        component:DashboardAdminPart
    },
    {
        path:"/machine/data_list",
        userRole:["admin"],
        component:MachineOwnerList
    },
    {
        path:"/dashBoardUser",
        userRole:["user"],
        component:DashboardUser
    },
    {
        path:"/user/report",
        userRole:["user"],
        component:ReportUser
    },
    {
        path:"/user/forecast",
        userRole:["user"],
        component:ForecastUser
    },
    {
        path:"/machine/data/:uid",
        userRole:["user","admin"],
        component:MachineData
    },
]