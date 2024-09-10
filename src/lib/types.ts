import { Prisma, Role } from "@prisma/client";
import { getAuthUserDetails, getUserPermissions } from "./queries";


export type NotificationWithUser = {
  subAccountId: string | undefined;
  id: string;
  notification: string; // Ensure this property exists in your Notification model
  createdAt: Date;
  User: {
    id: string;
    name: string;
    avatarUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
    agencyId: string | null;
  };
}[];

export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<typeof getUserPermissions>

export type AuthUserWithAgencySidebarOptionsSubAccounts = Prisma.PromiseReturnType<typeof getAuthUserDetails>