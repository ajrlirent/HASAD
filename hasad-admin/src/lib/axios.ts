import Axios from 'axios'

const axios = Axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  baseURL: "http://192.168.1.7:8000",
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true
})

export default axios