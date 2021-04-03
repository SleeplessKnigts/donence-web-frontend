export interface RecyclePoint {
    recyclePointDetail: string;
    lat: number;
    lng: number;
}
export interface AssignRole {
    email: string;
    role: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_DRIVER" 
}

export interface UserInfo{
    email: string,
    imageUrl: string,
    lat: number,
    lng: number,
    fname: string,
}

export interface UserRequest{
    requestType: string, 
    creationDate: Date,
    isActive:boolean,
}

export interface CollectionEvent{
    eventDetail:string,
    materialType:string,
    lat:number,
    lng:number,
}

export interface News {
    heading: string,
    imageUrl: string,
    content: string,
}