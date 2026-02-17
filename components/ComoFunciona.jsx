"use client";

import { CalendarCheck, TestTube2, FileCheck2 } from "lucide-react";

export default function ComoFunciona() {
    const pasos = [
        {
            icon: CalendarCheck,
            step: "01",
            title: "Agenda tu atención",
            description:
                "Programa tu toma de muestra por WhatsApp o formulario web.",
        },
        {
            icon: TestTube2,
            step: "02",
            title: "Realizamos la toma",
            description:
                "Nuestro personal realiza la toma bajo protocolos certificados.",
        },
        {
            icon: FileCheck2,
            step: "03",
            title: "Procesamiento y resultados",
            description:
                "Entregamos al laboratorio de referencia y recibes tus resultados online.",
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 text-center">

                {/* Header */}
                <span className="text-cyan-500 font-semibold uppercase tracking-wider">
                    ¿Cómo Funciona?
                </span>

                <h2 className="text-4xl font-bold text-gray-900 mt-4">
                    Proceso simple y seguro
                </h2>

                {/* Steps */}
                <div className="relative mt-20">

                    {/* Línea conectora (desktop) */}
                    <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-cyan-100" />

                    <div className="grid md:grid-cols-3 gap-16 relative">
                        {pasos.map((paso, index) => {
                            const Icon = paso.icon;

                            return (
                                <div key={index} className="relative text-center">

                                    {/* Número */}
                                    <div className="text-cyan-100 text-7xl font-extrabold absolute -top-6 left-1/2 -translate-x-1/2 -z-10 select-none">
                                        {paso.step}
                                    </div>

                                    {/* Icono */}
                                    <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-cyan-50 border border-cyan-100 shadow-sm">
                                        <Icon size={28} className="text-cyan-600" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold mt-8 text-gray-900">
                                        {paso.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 mt-4 text-sm leading-relaxed max-w-xs mx-auto">
                                        {paso.description}
                                    </p>

                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}