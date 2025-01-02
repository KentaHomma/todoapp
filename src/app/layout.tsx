import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/dashboard.css";
import MainNav from "@/components/dashboard/navigation/main-nav";
import { TodoProvider } from "@/contexts/TodoContext";
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODOダッシュボード",
  description: "シンプルなTODOリスト管理アプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <TodoProvider>
          <div className="dashboard-layout">
            <MainNav />
            {children}
          </div>
        </TodoProvider>
      </body>
    </html>
  );
}
