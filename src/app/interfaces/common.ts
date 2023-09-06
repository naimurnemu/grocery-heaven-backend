import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
    meta: {
        page: number;
        limit: number;
        total: number;
    };
    data: T;
};

export type IEmail = {
    to: string;
    subject: string;
    text?: string;
    html: string;
}
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions

export type AuthUser = {
    userId: string;
    email: string;
    role: string;
    iat: number;
    exp: number
}

export enum ROLE {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    USER = 'user'
}