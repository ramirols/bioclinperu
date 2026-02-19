"use client";

import Image from "next/image";

export default function QuienesSomos() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src="/images/about-us.jpg"
                        alt="Equipo profesional BIOCLIN"
                        fill
                        className="object-cover"
                    />
                </div>

                <div>
                    <span className="text-cyan-500 font-semibold uppercase tracking-wider">
                        Quiénes Somos
                    </span>

                    <h2 className="text-4xl font-bold text-gray-900 mt-4 leading-tight">
                        Especialistas en fase preanalítica con más de 17 años de experiencia
                    </h2>

                    <p className="text-gray-600 mt-6 leading-relaxed">
                        Somos un equipo liderado por Tecnólogo Médico colegiado, enfocados en
                        garantizar una toma, conservación y transporte de muestras bajo estrictos
                        protocolos de bioseguridad.
                    </p>

                    <p className="text-gray-600 mt-4 leading-relaxed">
                        Trabajamos con laboratorios de referencia acreditados, asegurando
                        precisión, trazabilidad y resultados confiables para pacientes,
                        empresas y centros médicos.
                    </p>
                </div>

            </div>
        </section>
    );
}