import request from '@/utils/request'

export function getApiList(offset, limit) {
    return request({
        url: '/api/apiinfo',
        method: 'get',
        params: {
            offset: offset,
            limit: limit
        }
    })
}

export function getApiPages(limit) {
    return request({
        url: '/api/apiinfo/pages',
        method: 'get',
        params: {
            limit: limit
        }
    })
}

export function getSearchPages(data) {
    return request({
        url: '/api/apiinfo/search/pages',
        method: 'post',
        data
    })
}

export function searchAPIs(data) {
    return request({
        url: '/api/apiinfo/search',
        method: 'post',
        data
    })
}

export function getAPIDetails(id) {
    return request({
        url: '/api/apiinfo/details',
        method: 'get',
        params: {
            id: id
        }
    })
}

export function saveAPI(data) {
    return request({
        url: '/api/apiinfo',
        method: 'post',
        data
    })
}