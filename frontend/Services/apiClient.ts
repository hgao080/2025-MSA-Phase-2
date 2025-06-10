import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: `http://localhost:5006/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})