import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {BookOpen, Moon, Sun} from "lucide-react";

const inter = Inter({subsets:["latin"]})

export const metadata: Metadata = {
  title: "Kitaab Sathi",
  description: "Discover, rate and review your favourite books!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className="h-full">
      <body className={`${inter.className} h-full bg-slate-50 text-slate-900 dark:text-slate-50 antialiased flex flex-col`}>

        <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/85 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/>
              <span>Kitaab Sathi</span>
            </div>

            <nav className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                Your #1 Reading Buddy
              </span>
            </nav>
            
          </div>        
        </header>
        
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
