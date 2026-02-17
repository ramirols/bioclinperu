"use client";

import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-center" reverseOrder={false} />
            {children}
        </div>
    );
}