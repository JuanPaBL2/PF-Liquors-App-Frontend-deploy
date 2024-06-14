import { Footer } from "@/components/footer/footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/navBar/navbar";
import Providers from "@/store/providers";
import AuthStore from "@/components/authStore/AuthStore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthStore>
            <NavBar />
            <div className="pt-16">
              {/* fuente plus-jakarta */}
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
                rel="stylesheet"
              />
              {/* ----------- */}
              {children}
            </div>
            <Footer />
          </AuthStore>
        </Providers>
      </body>
    </html>
  );
}
