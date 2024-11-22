"use client"
import Footer from "@/components/footer";
import Header from "@/components/header";
import { AuthProvider } from "@/context/AuthContext";
import '@/styles/main.css';
import Favicon from "@/components/Favicon";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Favicon />
      </head>
      <body className="min-h-screen">
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

