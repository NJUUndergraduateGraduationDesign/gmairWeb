import axios from 'axios'

function reportData(uid) {
    let request_total_url='/report?uid='+uid;
    return axios.get(request_total_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

export const reportService = {
    reportData
}
