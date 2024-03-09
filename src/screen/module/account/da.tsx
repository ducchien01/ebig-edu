export interface LoginItem {
    type: string,
    code: string,
    mode: number
}

export interface RegisterItem {
    id: string,
    userName: string,
    password: string,
    name?: string,
    dateCreated?: number,
    birthDay?: number,
    mobile?: string,
    email?: string,
    gender?: true
}