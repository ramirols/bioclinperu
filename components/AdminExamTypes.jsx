"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminExamTypes() {
    const [types, setTypes] = useState([]);
    const [name, setName] = useState("");

    const fetchTypes = async () => {
        const { data } = await supabase.from("exam_types").select("*");
        setTypes(data || []);
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    const createType = async () => {
        await supabase.from("exam_types").insert({ name });
        setName("");
        fetchTypes();
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-xl font-bold">Tipos de Examen</h2>

            <div className="flex gap-4">
                <input
                    placeholder="Nuevo tipo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded flex-1"
                />
                <button
                    onClick={createType}
                    className="bg-blue-600 text-white px-4 rounded"
                >
                    Agregar
                </button>
            </div>

            {types.map((t) => (
                <div key={t.id} className="border p-2 rounded">
                    {t.name}
                </div>
            ))}
        </div>
    );
}