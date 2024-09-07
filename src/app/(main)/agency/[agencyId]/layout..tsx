import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@/lib/queries";
import React, { useEffect } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Sidebar from '@/components/sidebar'
import Unauthorized from "@/components/unauthorized";

type Props = {
  children: React.ReactNode;
  params: { agencyId: string };
};

const layout = async ({ children, params }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();
  
  if (!user) {
    return redirect("/");
  }

  if (!agencyId) {
    return redirect("/agency");
  }
  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  )
    return <Unauthorized />;

  let allNoti: any = [];
  const notifications = getNotificationAndUser(agencyId);
  if (notifications) {
    allNoti = notifications;
  }

  return (
    <div className="h-screen overflow-hidden">
      {/* <Sidebar id={params.agencyId} type="agency"> </Sidebar>
      <div className="md:pl-[300px] ">{children}</div> */}
      {children}
    </div>
  );
};

export default layout;
