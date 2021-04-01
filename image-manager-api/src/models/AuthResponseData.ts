import { IAuthResponseData } from '../interfaces/IAuthResponseData';

export class AuthResponseData implements IAuthResponseData {
    email!: string;
    id!: string;
    token!: string;
    expiresIn!: number;
}