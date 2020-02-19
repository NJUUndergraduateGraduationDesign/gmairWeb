import axios from 'axios'

// const auth_server = 'http://127.0.0.1:8004/oauth/token'
const auth_server = 'https://microservice.gmair.net/oauth/admin/token'


function login(username, password, props) {
    let auth_url = auth_server;
    let form = new FormData();
    form.set('username', username);
    form.set('password', password);
    form.set('grant_type', 'password');
    form.set('client_secret', '123456');
    form.set('client_id', 'client_2');
    axios.post(auth_url, form)
        .then(function (response) {
            if (response.status === 200) {
                let access_token = response.data.access_token;
                localStorage.setItem('access_token', access_token);
                window.location.href = '/dashboard'
            } else {
                console.log('authentication failed for user: ' + username)
            }
        })
        .catch(() => {
            return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
        });

}

function logout() {
    localStorage.removeItem('access_token');
}

export const adminservice = {
    login,
    logout
}
