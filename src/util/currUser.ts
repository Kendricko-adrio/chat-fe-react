
import { Response } from '../entity/Response';
import { postIsAuth } from '../services/UserService';
import { User } from './../entity/User';
export class CurrUser{

    private user: User | null | undefined;

    private constructor() {}

    private static instance: CurrUser;

    static getInstance(): CurrUser {
        if (!CurrUser.instance) {
            CurrUser.instance = new CurrUser();
        }
        return CurrUser.instance;
    }

    async getAuth(): Promise<boolean>{
        const response : Response<any> = await postIsAuth();
        if (response.status !== 200) {
            this.setUser(undefined);
            return false;
        }
        this.setUser(response.data);
        return true;
    }

    getUser(): User | null{

        if(this.user != null){
            return this.user;
        }
        const dataUser = localStorage.getItem('user');
        if (dataUser == undefined || dataUser == null) {
            return null;
        }
        this.user = JSON.parse(dataUser) as User;
        console.log(this.user);
        
        if (this.user == undefined || this.user == null) {
            return null;
        }
        return this.user;
    }
    setUser(user?: User) {
        this.user = user;
        if (user === undefined) {
            localStorage.removeItem('user');
            return;
        }
        localStorage.setItem('user', JSON.stringify(user));
    }

    // getUser(): string | null{

    //     if(this.username != null){
    //         return this.username;
    //     }
    //     this.username = localStorage.getItem('username');
    //     if (this.username == undefined || this.username == null) {
    //         return null;
    //     }
    //     return this.username;
    // }

    // setUser(username: string) {
    //     this.username = username;
    //     localStorage.setItem('username', username);
    // }

}