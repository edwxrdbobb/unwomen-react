"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/main.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <Header />
          {children}
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
