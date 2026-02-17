"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FileText, Trash2 } from "lucide-react";

export default function AdminExamList() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExams = async () => {
        const { data } = await supabase
            .from("exam_results")
            .select(`
        *,
        profiles (
          full_name
        )
      `)
            .order("created_at", { ascending: false });

        setExams(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchExams();

        const channel = supabase
            .channel("realtime-admin")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "exam_results" },
                fetchExams
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const deleteExam = async (id, filePath) => {
        // eliminar archivo del storage
        await supabase.storage.from("resultados").remove([filePath]);

        // eliminar registro
        await supabase.from("exam_results").delete().eq("id", id);

        fetchExams();
    };

    if (loading) return <p>Cargando resultados...</p>;

    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-6">Resultados Registrados</h2>

            <div className="space-y-4">
                {exams.map((exam) => (
                    <div
                        key={exam.id}
                        className="border rounded-xl p-5 flex justify-between items-center hover:shadow-md transition"
                    >
                        <div>
                            <p className="font-semibold text-gray-900">
                                {exam.exam_type}
                            </p>

                            <p className="text-sm text-gray-500">
                                Paciente: {exam.profiles?.full_name}
                            </p>

                            <p className="text-sm text-gray-400">
                                Fecha: {exam.exam_date}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <a
                                href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resultados/${exam.file_url}`}
                                target="_blank"
                                className="flex items-center gap-2 text-blue-600 hover:underline"
                            >
                                <FileText size={18} />
                                Ver PDF
                            </a>

                            <button
                                onClick={() => deleteExam(exam.id, exam.file_url)}
                                className="text-red-600 hover:text-red-800 transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {exams.length === 0 && (
                    <p className="text-gray-500 text-sm">
                        No hay resultados registrados.
                    </p>
                )}
            </div>
        </div>
    );
}