
import { GroupDetailResponse } from './../entity/GroupDetail';
import { User } from './../entity/User';

export const GetAllGroups = async (username: string) => {
    const response = await fetch(`http://localhost:8080/group-detail/user/${username}`, {
        credentials: 'include'
    })
    const data: GroupDetailResponse[] = await response.json()
    return data
}

export const getUserByUsername = async (username: string) => {
    const response = await fetch(`http://localhost:8080/user/username/${username}`,{
        credentials: 'include'
    })
    const data : User = await response.json()
    return data
}

export const postUserLogin = async (username: string, password: string) => {
    const response = await fetch(`http://localhost:8080/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: `username=${username}&password=${password}`,
        credentials: 'include'
    })
    const data = await response.json()
    return data
}

export const postIsAuth = async () => {
    const response = await fetch(`http://localhost:8080/is-auth`, {
        method: 'POST',
        credentials: 'include'
    })
    const data = await response.json()
    return data
}