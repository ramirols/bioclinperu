"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPatients() {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const fetchPatients = async () => {
        const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("role", "user");

        setPatients(data || []);
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const createPatient = async () => {
        const password = "Paciente123*";

        const { data } = await supabase.auth.signUp({
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

        fetchPatients();
    };

    const updatePatient = async (id, newName) => {
        await supabase
            .from("profiles")
            .update({ full_name: newName })
            .eq("id", id);

        fetchPatients();
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-xl font-bold">Pacientes</h2>

            <div className="grid md:grid-cols-3 gap-4">
                <input
                    placeholder="Nombre"
                    className="border p-2 rounded"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder="Email"
                    className="border p-2 rounded"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    onClick={createPatient}
                    className="bg-green-600 text-white rounded px-4"
                >
                    Crear
                </button>
            </div>

            <div className="space-y-2">
                {patients.map((p) => (
                    <div
                        key={p.id}
                        className="flex justify-between border p-3 rounded"
                    >
                        <span>{p.full_name}</span>

                        <button
                            onClick={() =>
                                updatePatient(
                                    p.id,
                                    prompt("Nuevo nombre:", p.full_name)
                                )
                            }
                            className="text-blue-600"
                        >
                            Editar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}