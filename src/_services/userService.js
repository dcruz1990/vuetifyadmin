export const userService = {
    login,
    logout,
    getAll,
    checkAuth,
    updateUser
};

let baseUrl = 'http://127.0.0.1:5050/api'

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(baseUrl + '/auth/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.user));
                localStorage.setItem('token', JSON.stringify(user.token))
            }
            return user;
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

function getAll() {
    const myheader = {
        'Content-Type': 'Application/json'
    }
    const requestOptions = {
        method: 'GET',
        headers: myheader
    };

    return fetch(baseUrl + '/users', requestOptions).then(handleResponse);
}

function checkAuth() {
    let token = localStorage.getItem('token')
    if (!token) {
        return false
    }
    return true
}

function updateUser(userdata) {
    let token = JSON.parse(localStorage.getItem('token'))
    let userid = JSON.parse(localStorage.getItem("user")).id
    console.log(userid)
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(userdata)
    };

    return fetch(baseUrl + '/users/' + userid, requestOptions)
        .then(handleResponse)

}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
                // logout();
                // console.log("esto se ejecuta")
                // // location.reload(true);
            }


        }

        return data;
    });
}

