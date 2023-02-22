
import { ChatDetail } from './../entity/ChatDetail';

export const getChatsByGrop = async (groupId: number) => {
    const response = await fetch(`http://localhost:8080/chat/group/${groupId}`,
    {
        credentials: 'include'
    })
    const data: ChatDetail[] = await response.json()
    return data
}