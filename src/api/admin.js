import request from '@/utils/request'

export function getAllUsers() {
    return request({
        url: '/api/admin/users',
        method: 'get'
    })
}

export function getUsersDetails() {
    return request({
        url: '/api/admin/users/details',
        method: 'get'
    })
}

export function getAllTables() {
    return request({
        url: '/api/admin/tables',
        method: 'get',
    })
}

export function submitAuthEdit(data) {
    return request({
        url: '/api/admin/auth',
        method: 'post',
        data
    })
}

export function searchAuth(data) {
    return request({
        url: '/api/admin/auth/search',
        method: 'post',
        data
    })
}

export function getAllPages(data) {
    return request({
        url: '/api/admin/requests/pages',
        method: 'get',
        params: data
    })
}

export function getRequests(data) {
    return request({
        url: '/api/admin/requests',
        method: 'get',
        params: data
    })
}

export function searchRequests(data) {
    return request({
        url: '/api/admin/requests/search',
        method: 'post',
        data
    })
}

export function getSearchPages(data) {
    return request({
        url: '/api/admin/requests/search/pages',
        method: 'post',
        data
    })
}

export function rejectRequest(data) {
    return request({
        url: '/api/admin/requests/reject',
        method: 'post',
        data
    })
}

export function approveRequest(data) {
    return request({
        url: '/api/admin/requests/approve',
        method: 'post',
        data
    })
}

export function publishMessage(data) {
    return request({
        url: '/api/admin/publish',
        method: 'post',
        data
    })
}

export function generateInviteCode(data) {
    return request({
        url: '/api/admin/invitecode',
        method: 'post',
        data
    })
}

export function deleteAPI(data) {
    return request({
        url: '/api/admin/apiinfo',
        method: 'delete',
        data
    })
}

export function getSysInfo() {
    return request({
        url: '/api/admin/sysinfo',
        method: 'get'
    })
}