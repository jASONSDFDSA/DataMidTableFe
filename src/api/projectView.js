import request from '@/utils/request'

export function getProjects() {
    return request({
        url: '/api/project',
        method: 'get',
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