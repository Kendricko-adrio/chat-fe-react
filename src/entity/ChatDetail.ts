export interface ChatDetail{

    GroupID: number;
    UserFromID: number;
    Message: string;
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date;
}

export interface ChatSend {
    to: number;
    message: string;
}

// {
//     "GroupID": 1,
//     "UserFromID": 2,
//     "Message": "From user 2",
//     "ID": 1,
//     "CreatedAt": "2022-09-10T20:25:01.252764+07:00",
//     "UpdatedAt": "2022-09-10T20:25:01.252764+07:00",
//     "DeletedAt": null
// },