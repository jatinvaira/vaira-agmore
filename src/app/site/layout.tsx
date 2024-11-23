import Navigation from "@/components/site/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";
import FooterPage from "./footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <Navigation />

      <main className="">{children}</main>

      <FooterPage />
    </ClerkProvider>
  );
};

export default layout;
