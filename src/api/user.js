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

export function logout() {
    return request({
        url: '/api/user/logout',
        method: 'post'
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
export function apply(data) {
    return request({
        url: '/api/auth/apply',
        method: 'post',
        data
    })
}