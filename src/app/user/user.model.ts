export interface User {
    id: number;
    name: string;
    phones: Array<string>,
    roles: Array<string>,
    // avatarSrc: string;
    // isClient?: boolean;
}

export const GuestUser: User = {
    id: 0,
    name: 'guest',
    phones: [],
    roles: [],
}