import axios from "axios";

const auth_server = 'localhost:8080'
//从后台获取省份信息
function obtain_province(){
    let request_province_url='/location/china/userList';
    return axios.get(request_province_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//根据省份ID从后台获取市信息
function obtain_city(province){
    let request_city_url='/location/province/userList?province=' + province;
    return axios.get(request_city_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//根据城市ID从后台获取区信息
function obtain_district(cityId){
    let access_token = localStorage.getItem('access_token');
    let request_district_url='/location/'+cityId+'/districts?access_token=' + access_token;
    return axios.get(request_district_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//传入地址从后台解析经纬度
function obtain_latLng(address){
    let access_token=localStorage.getItem('access_token');
    let geolocation_latLng_url = '/location/address/resolve';
    let form = new FormData();
    form.append('address', address);
    form.append('access_token', access_token);
    return axios.post(geolocation_latLng_url, form).then(response => {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
};

function get_city_list() {
    let url = "https://cashier.youzan.com/wsctrade/uic/address/getAllRegion.json";
    return axios.get(url).then(response=>{
        console.log(response)
        return response;
    }).catch(()=>{
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}
export const geolocationservice = {
    obtain_province,obtain_city,obtain_latLng,get_city_list,obtain_district
}
