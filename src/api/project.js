import request from '@/utils/request'

export function applyAuth(data) {
    return request({
        url: '/api/applyauth',
        method: 'post',
        data
    })
}