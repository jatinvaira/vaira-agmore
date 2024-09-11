import { Prisma, Role } from "@prisma/client";
import { getAuthUserDetails, getUserPermissions } from "./queries";
import { db } from "./db";

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

const __getUsersWithAgencySubAccountPermissionsSidebarOptions = async (
  agencyId: string
) => {
  return await db.user.findFirst({
    where: { Agency: { id: agencyId } },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });
};

export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<
  typeof getUserPermissions
>;

export type AuthUserWithAgencySidebarOptionsSubAccounts =
  Prisma.PromiseReturnType<typeof getAuthUserDetails>;

export type UsersWithAgencySubAccountPermissionsSidebarOptions =
  Prisma.PromiseReturnType<
    typeof __getUsersWithAgencySubAccountPermissionsSidebarOptions
  >;
