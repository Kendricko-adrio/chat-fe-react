export interface Group{
    Id : Number;
    CreatedAt : string;
    UpdatedAt : string;
    DeletedAt? : string;
    GroupName : string;
    GroupType : string;
} 

// "ID": 1,
//             "CreatedAt": "2022-09-10T20:24:51.251847+07:00",
//             "UpdatedAt": "2022-09-10T20:24:51.251847+07:00",
//             "DeletedAt": null,
//             "GroupName": "group1",
//             "GroupType": "Personal"