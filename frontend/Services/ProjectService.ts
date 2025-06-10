import { Project } from '../Models/Project'
import { axiosClient } from "./apiClient"


export const getProjects = () => {
  return axiosClient.get('/Projects')
}

export const getProject = (id: number) => {
  return axiosClient.get(`/Projects/${id}`)
}

export const updateProject = (id: number, project: Project) => {
  return axiosClient.put(`/Projects/${id}`, project)
}

export const createProject = (project: Project) => {
  return axiosClient.post(`/Projects`, project)
}

export const deleteProject = (id: number) => {
  return axiosClient.delete(`/Projects${id}`)
}