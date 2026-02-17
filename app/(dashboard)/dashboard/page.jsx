"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdminDashboard from "@/components/AdminDashboard";
import UserExamList from "@/components/UserExamList";
import { useRouter } from "next/navigation";

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

    if (!role) return <p>Cargando...</p>;

    return role === "admin"
        ? <AdminDashboard handleLogout={handleLogout} />
        : <UserExamList handleLogout={handleLogout} />;
}