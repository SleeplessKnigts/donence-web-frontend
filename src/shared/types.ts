export interface RecyclePoint {
    recyclePointDetail: string;
    lat: number;
    lng: number;
    recyclyPointPlaceType: "Yağ" | "Elektronik" | "Kağıt" | "Plastik" | "Pil" | "Cam";
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

export interface Issuer{
    latitude: number,
    longitude: number,
    postalCode: string,
}

export interface UserRequest{
    requestType: "Yağ" | "Elektronik" | "Kağıt" | "Plastik" | "Pil" | "Cam", 
    creationDate: Date,
    isActive:boolean,
    issuer: Issuer,
}

export interface CollectionEvent{
    eventDetail:string,
    materialType:string,
    lat:number,
    lng:number,
}

export interface News{
    heading: string,
    imageUrl: string,
    content: string,
}
export interface NewsResponse {
    heading: string,
    imageUrl: string,
    content: string,
    createdAt: string,
    id: string,
}