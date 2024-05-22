import request from '@/utils/request'

export function getProjects() {
    return request({
        url: '/api/project',
        method: 'get',
    })
}