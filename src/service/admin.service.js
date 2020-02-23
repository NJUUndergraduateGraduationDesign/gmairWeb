import axios from 'axios'

// const auth_server = 'http://127.0.0.1:8004/oauth/token'
const auth_server = '/login'


function login(username, password, type,loginForm) {
    let auth_url = auth_server;
    axios.get(auth_url, {
        params: {
            'type':type,
            'username':username
        }
    })
        .then(function (response) {
            if (response.status === 200) {
                if (response.data[0].result === true) {//连后端时去掉0
                    let userName = username;
                    let userType = type;
                    sessionStorage.setItem('userName', userName);
                    sessionStorage.setItem('userType', userType);
                    if(userType==='admin') {
                        window.location.href = '/dashboardAdmin';
                    }
                    else {
                        window.location.href = '/dashboardUser';
                    }
                }
                else {
                    loginForm.openNotification("鉴权失败", "不存在该用户");
                    //loginForm.setState({ visible: true });
                }
            } else {
                alert('error!');
                console.log('authentication failed for user: ' + username)
            }
        })
        .catch(() => {
            loginForm.openNotification("鉴权失败", "不存在该用户");
            //loginForm.setState({ visible: true });
            return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
        });

}

function logout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userType');
    window.location.href = '/'
}

export const adminservice = {
    login,
    logout
}
