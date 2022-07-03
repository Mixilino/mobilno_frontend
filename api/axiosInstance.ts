import axios, {AxiosRequestConfig} from "axios";

const config: AxiosRequestConfig = {baseURL: 'http://192.168.100.14:8080'};
const axiosInstanceTs = axios.create(config);
// axiosInstanceTs.interceptors.response.use(response => {
//     return response
// }, error => {
//     if (error.response.status === 401) {
//         alert('Unauthorized');
//     }
// })

export default axiosInstanceTs;