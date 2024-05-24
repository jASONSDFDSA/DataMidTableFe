import request from '@/utils/request'

export function getMessages(offset, limit) {
    return request({
        url: '/api/message',
        method: 'get',
        params: {
            offset: offset,
            limit: limit
        }
    })
}

export function getPages(limit) {
    return request({
        url: '/api/message/pages',
        method: 'get',
        params: {
            limit: limit
        }
    })
}

export function getSearchPages(data) {
    return request({
        url: '/api/message/search/pages',
        method: 'post',
        data
    })
}

export function searchMessages(data) {
    return request({
        url: '/api/message/search',
        method: 'post',
        data
    })
}

export function deleteMessage(data) {
    return request({
        url: '/api/message',
        method: 'delete',
        data: {
            id: data
        }
    })
}
