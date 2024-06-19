import request from '@/utils/request'

export function getAvgs(id) {
    return request({
        url: '/api/message/avgs',
        method: 'get',
        params: {
            id: id
        }
    })
}