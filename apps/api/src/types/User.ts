export type User = {
    id: string;
    username: string;
    hash: string;
    salt: string;
    admin: boolean;
}