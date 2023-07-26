// import { Model } from "mongoose";

import { IAdminUser } from "../adminUser/adminUser.interface";

// enum Role {
//     SUPERADMIN = 'super_admin',
//     ADMIN = 'admin',
//     // USER = ''
// }


export type IAdminAuth = IAdminUser & {
    token: string;
};

// export type AdminUserModel = Model<IAdminUser, Record<string, unknown>>;