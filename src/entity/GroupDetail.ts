import { Group } from './Group';
import { User } from './User';


export interface GroupDetailResponse {
    UserID: number;
    GroupID: number;
    Group: Group;
    User: User;
}