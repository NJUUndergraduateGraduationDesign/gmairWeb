import axios from "axios";

function totalUser() {
    let request_total_url='/statistic/user/china';
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function provinceUser(province) {
    let request_total_url='/statistic/user/province?province='+province;
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}
export const userStatisticservice = {
    totalUser,provinceUser
}
