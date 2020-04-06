import axios from "axios";

function totalUser() {
    let request_total_url = '/statistic/admin/china/total';
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function provinceUser(province) {
    let request_total_url = '/statistic/admin/province/total?province=' + province;
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function NewUserNumberPerMonthProvince(province) {
    let request_total_url = '/statistic/admin/province/newNumberPerMonth?province=' + province;
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function NewUserNumberPerMonthChina() {
    let request_total_url = '/statistic/admin/china/newNumberPerMonth';
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function UserCategoryEnvironmentChina() {
    let request_total_url = '/statistic/admin/china/categoryEnvironment';
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function UserCategoryEnvironmentProvince(province) {
    let request_total_url = '/statistic/admin/province/categoryEnvironment?province=' + province;
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function UserCategoryEffectChina() {
    let request_total_url = '/statistic/admin/china/categoryEffect';
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function UserCategoryEffectProvince(province) {
    let request_total_url = '/statistic/admin/province/categoryEffect?province=' + province;
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function userRadarData() {
    let request_total_url = '/statistic/user/radar';
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function userOpenTimeData() {
    let request_total_url = '/statistic/user/openTime';
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function calendarPm25() {
    let request_total_url = '/statistic/user/calendar/pm25';
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function calendarOpenTime() {
    let request_total_url = '/statistic/user/calendar/openTime';
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function getForecastData() {
    let request_total_url = '/statistic/user/forecastData';
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

export const userStatisticservice = {
    totalUser,
    provinceUser,
    NewUserNumberPerMonthChina,
    NewUserNumberPerMonthProvince,
    UserCategoryEffectChina,
    UserCategoryEffectProvince,
    UserCategoryEnvironmentChina,
    UserCategoryEnvironmentProvince,
    userRadarData,
    calendarOpenTime,
    calendarPm25,
    userOpenTimeData,
    getForecastData
};
