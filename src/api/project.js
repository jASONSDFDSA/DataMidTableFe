import request from '@/utils/request'

export function applyAuth(data) {
    return request({
        url: '/api/applyauth',
        method: 'post',
        data
    })
}

export function getMyProject() {
    return request({
        url: '/api/developer/project',
        method: 'get',
    })
}

export function importNewImg(data) {
    return request({
        url: '/api/developer/project/img',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}