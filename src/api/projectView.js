import request from '@/utils/request'

export function getProjects(offset, limit) {
    return request({
        url: '/api/project',
        method: 'get',
        params: {
            offset: offset,
            limit: limit
        }
    })
}

export function getProjectDetails(projectname) {
    return request({
        url: '/api/projectDetail',
        method: 'get',
        params: {
            projectname: projectname
        }
    })
}

export function getProjectPages(limit) {
    return request({
        url: '/api/project/pages',
        method: 'get',
        params: {
            limit: limit
        }
    })
}

export function getSearchProjectPages(data) {
    return request({
        url: '/api/project/search/pages',
        method: 'post',
        data
    })
}

export function searchProjects(data) {
    return request({
        url: '/api/project/search',
        method: 'post',
        data
    })
}