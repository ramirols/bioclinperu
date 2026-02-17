"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UploadExamForm() {
    const [file, setFile] = useState(null);
    const [patientId, setPatientId] = useState("");
    const [examType, setExamType] = useState("");

    const upload = async () => {
        if (!file) return;

        const { data } = await supabase.storage
            .from("resultados")
            .upload(`/${Date.now()}-${file.name}`, file);

        const fileUrl = data?.path;

        await supabase.from("exam_results").insert({
            patient_id: patientId,
            exam_type: examType,
            exam_date: new Date(),
            file_url: fileUrl,
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold mb-4">Subir Resultado</h2>

            <input
                placeholder="ID Paciente"
                className="border p-2 w-full mb-3"
                onChange={(e) => setPatientId(e.target.value)}
            />

            <input
                placeholder="Tipo de examen"
                className="border p-2 w-full mb-3"
                onChange={(e) => setExamType(e.target.value)}
            />

            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <button
                onClick={upload}
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
                Subir PDF
            </button>
        </div>
    );
}