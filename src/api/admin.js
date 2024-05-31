import request from '@/utils/request'

export function getAllUsers() {
    return request({
        url: '/api/admin/users',
        method: 'get'
    })
}

export function publishMessage(data) {
    return request({
        url: '/api/admin/publish',
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