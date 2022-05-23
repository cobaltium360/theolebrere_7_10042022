import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3000/api",

  })

  instance.interceptors.request.use(async config => {
    const token = localStorage.getItem('token');
    if(token){
      config.headers.authorization = "Bearer " + token;
    }
    return config
  });

export { instance }