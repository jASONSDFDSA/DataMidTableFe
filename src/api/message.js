import request from '@/utils/request'

export function getMessages() {
    return request({
        url: '/api/message',
        method: 'get',
    })
}

export function deleteMessage(data) {
    return request({
        url: '/api/message',
        method: 'delete',
        data
    })
}
