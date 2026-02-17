"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdminDashboard from "@/components/AdminDashboard";
import UserExamList from "@/components/UserExamList";

export default function Dashboard() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            const { data: user } = await supabase.auth.getUser();

            const { data } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.user?.id)
                .single();

            setRole(data?.role);
        };

        getProfile();
    }, []);

    if (!role) return <p>Cargando...</p>;

    return role === "admin" ? <AdminDashboard /> : <UserExamList />;
}