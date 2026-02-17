"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UserExamList() {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const load = async () => {
            const { data: user } = await supabase.auth.getUser();

            const { data } = await supabase
                .from("exam_results")
                .select("*")
                .eq("patient_id", user.user?.id);

            setExams(data || []);
        };

        load();

        const channel = supabase
            .channel("realtime-exams")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "exam_results" },
                load
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="p-10 container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Mis Resultados</h1>

            {exams.map((exam) => (
                <div
                    key={exam.id}
                    className="border rounded-xl p-6 mb-4 shadow-sm"
                >
                    <h3 className="font-semibold">{exam.exam_type}</h3>
                    <p className="text-sm text-gray-500">
                        Fecha: {exam.exam_date}
                    </p>

                    <a
                        href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resultados/${exam.file_url}`}
                        target="_blank"
                        className="text-blue-600 underline mt-3 inline-block"
                    >
                        Ver PDF
                    </a>
                </div>
            ))}
        </div>
    );
}