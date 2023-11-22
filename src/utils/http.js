import axios from 'axios'
import {useUserStore} from "@/stores/user";

const httpInstance = axios.create({
    baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net/",
    timeout: 5000
})

httpInstance.interceptors.request.use(config => {
        const userStore = useUserStore()
        const token = userStore.userInfo.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }, e => Promise.reject(e)
)

httpInstance.interceptors.response.use(res => res.data,
    e => Promise.reject(e))

export default httpInstance
