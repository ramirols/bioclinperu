"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (!error) router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 bg-white shadow-xl rounded-2xl w-96">
                <h2 className="text-xl font-bold mb-6">Iniciar Sesión</h2>

                <input
                    className="w-full border p-3 rounded-lg mb-4"
                    placeholder="Correo"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full border p-3 rounded-lg mb-6"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg"
                >
                    Entrar
                </button>
            </div>
        </div>
    );
}