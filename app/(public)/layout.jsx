"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Toaster } from "react-hot-toast";

export default function PublicLayout({ children }) {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <Toaster position="top-center" reverseOrder={false} />
            <Header />

            <div className="flex-1 pt-[73px]">
                {children}
            </div>

            <Footer />
            <WhatsAppWidget />
        </div>
    );
}