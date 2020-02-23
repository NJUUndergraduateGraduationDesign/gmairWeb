import axios from "axios";

const machine_data_url = "https://microservice.gmair.net/management";
//获取二维码列表
function obtain_uid_list(curPage, pageSize, uid, createTimeGTE, createTimeLTE, overCountGTE, overCountLTE){
    let access_token=localStorage.getItem("access_token");
    let uid_list_url=machine_data_url+"/machine/consumer/owner/machine/list?curPage="+curPage+"&pageSize="
        +pageSize+"&access_token="+access_token+"&uid="+uid+"&createTimeGTE="+createTimeGTE+"&createTimeLTE="+createTimeLTE+
        "&overCount="+overCountGTE+"&overCountLTE="+overCountLTE;
    return axios.get(uid_list_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//获取以小时为粒度的机器数据
function obtain_machine_data_hour(uid,lastNhour,data_type) {
    let access_token=localStorage.getItem("access_token");
    let data_hour_url=machine_data_url+"/data/analysis/machine/status/"+data_type+"/lastNhour?uid="+uid+"&lastNhour="+lastNhour+"&access_token="+access_token;
    return axios.get(data_hour_url).then(function (response) {
        return response.data;
    }).catch(()=>{
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//获取以天为粒度的机器数据
function obtain_machine_data_day(uid,lastNday,data_type) {
    let access_token=localStorage.getItem("access_token");
    let data_hour_url=machine_data_url+"/data/analysis/machine/status/"+data_type+"/lastNday?uid="+uid+"&lastNday="+lastNday+"&access_token="+access_token;
    return axios.get(data_hour_url).then(function (response) {
        return response.data;
    }).catch(()=>{
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//根据cityId获取城市名称
function obtain_cityName(cityId) {
    let access_token=localStorage.getItem("access_token");
    let data_hour_url=machine_data_url+"/location/city/profile?cityId="+cityId+"&access_token="+access_token;
    return axios.get(data_hour_url).then(function (response) {
        return response.data;
    }).catch(()=>{
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function check_exist(uid) {
    let access_token = localStorage.getItem("access_token");
    let uid_url = machine_data_url + '/machine/uid/status';
    let form = new FormData();
    form.append('uid', uid);
    form.append('access_token', access_token);
    return axios.post(uid_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'};
    })
}

function probe_component(model_id, component_name) {
    let access_token = localStorage.getItem('access_token');
    let probe_component_url = machine_data_url + '/machine/model/component/probe?access_token=' + access_token + '&modelId=' + model_id + '&componentName=' + component_name;
    return axios.get(probe_component_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to fetch component for model ' + model_id
        };
    })
}

function config_screen(uid,screen) {
    let access_token = localStorage.getItem('access_token');
    let url = machine_data_url + '/machine/config/screen';
    let form = new FormData();
    form.append('uid', uid);
    form.append('screen', screen);
    form.append('access_token', access_token);
    return axios.post(url,form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to config screen'
        };
    })
}

export  const machine_data_service = {
    obtain_uid_list,obtain_machine_data_day,obtain_machine_data_hour,
    obtain_cityName,check_exist,probe_component,config_screen
}
