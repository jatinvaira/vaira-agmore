import { db } from "@/lib/db";
import EditorProvider from "@/providers/editor/editor-provider";
import { redirect } from "next/navigation";
import React from "react";
import FunnelEditorNavigation from "./_components/funnel-editor-navigation";
import FunnelEditorSidebar from "./_components/funnel-editor-sidebar";
import FunnelEditor from "./_components/funnel-editor";

type Props = {
  params: {
    subaccountId: string;
    funnelId: string;
    funnelPageId: string;
  };
};

const Page = async ({ params }: Props) => {
  const funnelPageDetails = await db.funnelPage.findFirst({
    where: {
      id: params.funnelPageId,
    },
  });
  if (!funnelPageDetails) {
    return redirect(
      `/subaccount/${params.subaccountId}/funnels/${params.funnelId}`
    );
  }

  return (
    <div>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-auto">
        <EditorProvider
          subaccountId={params.subaccountId}
          funnelId={params.funnelId}
          pageDetails={funnelPageDetails}
        >
          <div className="fixed left-0 right-0 z-[1000] bg-background">
            <FunnelEditorNavigation
              funnelId={params.funnelId}
              funnelPageDetails={funnelPageDetails}
              subaccountId={params.subaccountId}
            />
          </div>
          <div className="mt-28 m-2 mr-0 z-[-1000] h-full flex justify-center">
            <FunnelEditor funnelPageId={params.funnelPageId} />
          </div>
          <FunnelEditorSidebar subaccountId={params.subaccountId} />
        </EditorProvider>
      </div>
    </div>
  );
};

export default Page;
