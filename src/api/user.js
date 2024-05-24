import request from '../utils/request'


// Login
export function login(data) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
    })
}

export function getInfo() {
    return request({
        url: '/api/user/info',
        method: 'get'
    })
}

// Signup
export function signup(data) {
    return request({
        url: '/api/auth/signup',
        method: 'post',
        data
    })
}

// Apply for admin
// export function apply(data) {
//     return request({
//         url: '/api/auth/apply',
//         method: 'post',
//         data
//     })
// }

// Change password
export function changePassword(data) {
    return request({
        url: '/api/user/password',
        method: 'put',
        data
    })
}