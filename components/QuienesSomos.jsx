"use client";

import { Target, Eye } from "lucide-react";
import Image from "next/image";

export default function QuienesSomos() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Imagen */}
                <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src="/images/about-us.jpg"
                        alt="Equipo profesional BIOCLIN Perú"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Contenido */}
                <div>
                    <span className="text-cyan-500 font-semibold uppercase tracking-wider">
                        Quiénes Somos
                    </span>

                    <h2 className="text-4xl font-bold text-gray-900 mt-4 leading-tight">
                        Especialistas en fase preanalítica y procesamiento de muestras con más de 17 años de experiencia
                    </h2>

                    <p className="text-gray-600 mt-6 leading-relaxed"> Somos un equipo liderado por Tecnólogo Médico colegiado, enfocados en garantizar una toma, conservación y transporte de muestras bajo estrictos protocolos de bioseguridad. </p>

                    <p className="text-gray-600 mt-4 leading-relaxed"> Trabajamos con un Laboratorios Acreditado y de primer nivel asegurando precisión, trazabilidad y resultados confiables para usted y su familia. </p>

                    {/* Misión y Visión */}
                    <div className="mt-12 grid gap-10 sm:grid-cols-2">

                        {/* Misión */}
                        <div className="relative pl-6 border-l border-cyan-200">
                            <span className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full mb-4">
                                <Target className="w-4 h-4" />
                                Nuestra misión
                            </span>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Misión
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed">
                                Proporcionar un servicio profesional, seguro y confiable de
                                toma, recolección y envío de muestras biológicas, cumpliendo
                                rigurosamente los estándares de calidad preanalítica,
                                bioseguridad y conservación.
                            </p>
                        </div>

                        {/* Visión */}
                        <div className="relative pl-6 border-l border-cyan-200">
                            <span className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full mb-4">
                                <Eye className="w-4 h-4" />
                                Nuestra visión
                            </span>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Visión
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed">
                                Consolidarnos como una empresa referente en el Perú en
                                servicios externos de toma de muestras biológicas, reconocida
                                por su excelencia técnica, ética profesional y compromiso con
                                la salud de la población.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}