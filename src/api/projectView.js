import request from '@/utils/request'

export function getProjects() {
    return request({
        url: '/api/project',
        method: 'get',
    })
}

export function getProjectDetails(projectname) {
    return request({
        url: '/api/project/' + projectname,
        method: 'get',
    })
}