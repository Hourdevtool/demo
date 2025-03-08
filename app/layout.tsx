import { Kanit } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Metadata } from "next";
import { LoadingProvider } from "./context/LoadingContext";
import { AuthProvider } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";
export const metadata: Metadata = {
  title: "Myapp",
  description: "E-larning MyWebApp",
  keywords: "E-larning",
  icons: [
    { rel: "icon", type: "image/svg+xml", url: "/logo.svg", sizes: "512x512" },
  ],
};
const kanit = Kanit({
  weight: "400",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={kanit.className}>
      <body className="overflow-x-hidden">
        <LoadingProvider>
          <AuthProvider>
            <CourseProvider>{children}</CourseProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
