import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModeToggle } from "@/components/global/mode-toggle";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agmore",
  description: "All in one Agency Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          

          <ModalProvider>{children}
            <Toaster/>
            
          </ModalProvider>
        </ThemeProvider>
        </body>
      </html>
    
  );
}
