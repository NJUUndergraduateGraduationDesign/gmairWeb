import axios from 'axios'

function reportData() {
    let request_total_url = '/report';
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

export const reportService = {
    reportData
};
