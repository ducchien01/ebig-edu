export interface UserInforItem {
    /* uuid4 */
    id?: string,
    name?: string,
    dateCreated?: number,
    districtID?: number,
    cityID?: number,
    pictureID?: string,
    passWord?: string,
    userName?: string,
    gender?: true,
    birthday?: number,
    listTopic?: string,
    address?: string,
    email?: string,
    peoplesIdentity?: string,
    isActive?: true,
    isDeleted?: true,
    mobile?: string,
    type?: number,
    isPrestige?: true,
    avatarUrl?: string,
    stk?: string,
    fullnameBank?: string,
    branchname?: string,
    bankName?: string,
    bankId?: number,
}

export enum CustomerType {
    student = 0,
    expert = 1,
}