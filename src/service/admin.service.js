import axios from 'axios'

function login(username, password, type,loginForm) {
    let auth_url ='/login';
    axios.get(auth_url, {
        params: {
            'type':type,
            'userName':username,
            'password':password
        }
    })
        .then(function (response) {
            if (response.status === 200) {
                if (response.data.data === true) {//连后端时去掉0
                    let userName = username;
                    let userType = type;
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('userType', userType);
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
    let auth_url ='/logout';
    axios.get(auth_url, {})
        .then(function (response) {
            if (response.status === 200) {
                localStorage.removeItem('userName');
                localStorage.removeItem('userType');
                window.location.href = '/'
            } else {
                console.log('logout failed');
            }
        })
        .catch(() => {
            return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
        });
}

export const adminservice = {
    login,
    logout
};
