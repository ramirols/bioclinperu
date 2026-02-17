"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminResults() {
    const [patients, setPatients] = useState([]);
    const [types, setTypes] = useState([]);
    const [file, setFile] = useState(null);
    const [patientId, setPatientId] = useState("");
    const [typeId, setTypeId] = useState("");

    useEffect(() => {
        const load = async () => {
            const { data: p } = await supabase
                .from("profiles")
                .select("*")
                .eq("role", "user");

            const { data: t } = await supabase
                .from("exam_types")
                .select("*");

            setPatients(p || []);
            setTypes(t || []);
        };

        load();
    }, []);

    const upload = async () => {
        if (!file) return;

        const { data } = await supabase.storage
            .from("resultados")
            .upload(`${Date.now()}-${file.name}`, file);

        await supabase.from("exam_results").insert({
            patient_id: patientId,
            exam_type_id: typeId,
            exam_date: new Date(),
            file_url: data?.path,
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-xl font-bold">Subir Resultado</h2>

            <select
                className="border p-2 rounded w-full"
                onChange={(e) => setPatientId(e.target.value)}
            >
                <option>Seleccionar paciente</option>
                {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.full_name}
                    </option>
                ))}
            </select>

            <select
                className="border p-2 rounded w-full"
                onChange={(e) => setTypeId(e.target.value)}
            >
                <option>Seleccionar tipo</option>
                {types.map((t) => (
                    <option key={t.id} value={t.id}>
                        {t.name}
                    </option>
                ))}
            </select>

            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0])}
            />

            <button
                onClick={upload}
                className="bg-purple-600 text-white px-4 py-2 rounded"
            >
                Subir
            </button>
        </div>
    );
}