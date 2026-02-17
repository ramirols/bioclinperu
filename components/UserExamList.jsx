"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FileText, Calendar, LogOut, User, Loader2 } from "lucide-react";

export default function UserExamList() {
    const [exams, setExams] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            setUserInfo(user);

            const { data } = await supabase
                .from("exam_results")
                .select(`
                    id,
                    exam_date,
                    file_url,
                    exam_types!exam_results_exam_type_id_fkey(name),
                    profiles!exam_results_patient_id_fkey (
                        full_name
                    )
                `)
                .eq("patient_id", user.id)
                .order("exam_date", { ascending: false });

            setExams(data || []);
            setLoading(false);
        };

        load();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-screen space-x-2">
            <Loader2 className="animate-spin text-indigo-600" size={24} />
            <p className="text-xl font-bold text-indigo-600">Cargando datos...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto p-8 space-y-8">

                {/* ===== HEADER ===== */}
                <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                            <User className="text-indigo-600" />
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">
                                Bienvenido{exams?.[0]?.profiles?.full_name
                                    ? `, ${exams[0].profiles.full_name}`
                                    : ""}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {userInfo?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={async () => {
                            await supabase.auth.signOut();
                            window.location.href = "/";
                        }}
                        className="flex cursor-pointer items-center gap-2 text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                    >
                        <LogOut size={16} />
                        Cerrar sesión
                    </button>
                </div>

                {/* ===== TITLE ===== */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                        Mis Exámenes
                    </h2>
                    <p className="text-sm text-gray-500">
                        Aquí puedes ver y descargar tus resultados médicos
                    </p>
                </div>

                {/* ===== EMPTY STATE ===== */}
                {exams.length === 0 && (
                    <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                        <FileText size={40} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">
                            Aún no tienes exámenes registrados
                        </p>
                    </div>
                )}

                {/* ===== EXAMS LIST ===== */}
                <div className="grid gap-4">
                    {exams.map((exam) => (
                        <div
                            key={exam.id}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition flex justify-between items-center"
                        >
                            <div className="space-y-2">
                                {/* Badge */}
                                {exam.exam_types?.name && (
                                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
                                        {exam.exam_types.name}
                                    </span>
                                )}

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar size={14} />
                                    {new Date(exam.exam_date).toLocaleDateString()}
                                </div>
                            </div>

                            <a
                                href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resultados/${exam.file_url}`}
                                target="_blank"
                                className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
                            >
                                <FileText size={18} />
                                Ver PDF
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}