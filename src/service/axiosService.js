import axios from 'axios'

const axiosService = axios.create();

axiosService.interceptors.response.use(function (response) {
    if (response.data.code === 401) {
        if()
    }
});

export default axiosService;