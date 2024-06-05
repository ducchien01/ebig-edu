export interface CenterItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    address?: string,
    thumbnailId?: string,
    phone?: string,
    ownerId?: string,
    establishDate?: number,
    qrCode?: string,
    description?: string,
    pictureId?: string,
    topicId?: string,
    latitude?: number,
    longitude?: number
}

export enum CenterPermisson {
    owner = 0,
    admin = 1,
    member = 2,
}

export interface CustomerCenterItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    customerId?: string,
    centerId?: string,
    permisson?: number,
}
