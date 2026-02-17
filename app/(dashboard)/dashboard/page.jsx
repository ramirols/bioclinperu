"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdminDashboard from "@/components/AdminDashboard";
import UserExamList from "@/components/UserExamList";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";

export default function Dashboard() {
    const router = useRouter();
    const [role, setRole] = useState(null);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/");
                return;
            }

            const { data } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            setRole(data?.role);
        };

        getProfile();
    }, [router]);

    if (!role) return (
        <div className="flex items-center justify-center h-screen space-x-2">
            <Loader2 className="animate-spin text-indigo-600" size={24} />
            <p className="text-xl font-bold text-indigo-600">Cargando...</p>
        </div>
    );

    return role === "admin"
        ? <AdminDashboard handleLogout={handleLogout} />
        : <UserExamList handleLogout={handleLogout} />;
}