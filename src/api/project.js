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

export function submitIntro(data) {
    return request({
        url: '/api/developer/project/intro',
        method: 'post',
        data
    })
}

export function submitMember(data) {
    return request({
        url: '/api/developer/project/member',
        method: 'post',
        data
    })
}

export function deleteMember(data) {
    return request({
        url: '/api/developer/project/member',
        method: 'delete',
        data
    })
}

export function submitSync(data) {
    return request({
        url: '/api/developer/project/table',
        method: 'post',
        data
    })
}

export function deleteTable(data) {
    return request({
        url: '/api/developer/project/table',
        method: 'delete',
        data
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