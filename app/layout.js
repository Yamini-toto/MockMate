import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "MockMate",
  description: "AI based mock interview preparation",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
    <head>
<link rel="icon" type="image/png" href="/assets/favicon.png" />
        </head>
      <body
        className={'antialiased scroll-smooth'}
      >
         <Toaster />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
