import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import storage from '../store/storage'

const service = axios.create({
    timeout: 20000
});

service.interceptors.request.use(
    config => {
        if (storage.get('token')) {
            config.headers['Authorization'] = storage.get('token');
        }
        console.log(config);
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 20000 && res.code !== 0 && res.code !== 200) {
            ElMessage({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            });
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    storage.set('token', '');
                    location.reload();
                });
            }
            return Promise.reject(new Error(res.msg || 'Error'));
        } else {
            const { data } = response;
            const { code } = data;
            if (code === 0) {
                const { data: res } = data
                return res
            } else if (code === 200) {
                return data
            } else {
                // 返回数据
                return res
            }
        }
    },
    error => {
        console.log('err' + error) // for debug
        ElMessage({
          message: error.msg,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
    }
);

export default service;