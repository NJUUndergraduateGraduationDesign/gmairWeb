import axios from "axios";

const geolocation_url = "https://microservice.gmair.net/management";
//根据不同条件从后台获取订单
function obtain_order_list(startTime,endTime,provinceName,cityName,status){
    let access_token = localStorage.getItem('access_token');
    let time_select_url=geolocation_url +'/order/list?access_token='+access_token+'&startTime='+startTime
        +'&endTime'+endTime+'&provinceName='+provinceName+'&cityName='+cityName+'&status='+status;
    return axios.get(time_select_url).then(function (response) {
        return response.data;
    }).catch(()=>{
        return{responseCode:'RESPONSE_ERROR',description: 'Fail to obtain time_select message'}
    })
}

//从后台获取省份信息
function obtain_province(){
    let access_token = localStorage.getItem('access_token');
    let request_province_url=geolocation_url + '/location/province/list?access_token=' + access_token;
    return axios.get(request_province_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//根据省份ID从后台获取市信息
function obtain_city(provinceId){
    let access_token = localStorage.getItem('access_token');
    let request_city_url=geolocation_url +'/location/' + provinceId + '/cities?access_token=' + access_token;
    return axios.get(request_city_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//根据城市ID从后台获取区信息
function obtain_district(cityId){
    let access_token = localStorage.getItem('access_token');
    let request_district_url=geolocation_url +'/location/'+cityId+'/districts?access_token=' + access_token;
    return axios.get(request_district_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//传入地址从后台解析经纬度
function obtain_latLng(address){
    let access_token=localStorage.getItem('access_token');
    let geolocation_latLng_url = geolocation_url+'/location/address/resolve';
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
    obtain_order_list,obtain_province,obtain_city,obtain_latLng,get_city_list,obtain_district
}
