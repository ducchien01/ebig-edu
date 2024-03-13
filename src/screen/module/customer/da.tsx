interface ObjWithKnownKeys {
    [k: string]: any;
}

interface UserInforItem {
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

export const parseUserInfor = ({ json }: { json?: ObjWithKnownKeys | null }) => {
    if (json) {
        let data: UserInforItem = { ...json }
        return data
    } else {
        return null
    }
}