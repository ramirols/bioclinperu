"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CreateUserForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const createUser = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (data.user) {
            await supabase.from("profiles").insert({
                id: data.user.id,
                full_name: name,
                role: "user",
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold mb-4">Crear Paciente</h2>

            <input
                placeholder="Nombre"
                className="border p-2 w-full mb-3"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Email"
                className="border p-2 w-full mb-3"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                type="password"
                className="border p-2 w-full mb-3"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={createUser}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Crear
            </button>
        </div>
    );
}