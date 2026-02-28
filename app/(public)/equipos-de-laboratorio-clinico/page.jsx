"use client";

import Image from "next/image";
import {
    Cpu,
    Activity,
    Microscope,
    FlaskConical,
    TestTube,
    Waves,
} from "lucide-react";

const equipment = [
    {
        title: "Sistema pre-analítico Cobas p 512",
        description:
            "Permite construir un flujo de trabajo eficiente y garantizar máxima seguridad en los resultados.",
        image: "/images/equipos/cobas-p512.png",
        icon: Cpu,
    },
    {
        title: "COBAS 8000 Modular Analyzer",
        description:
            "Sistema automatizado de acceso aleatorio para inmunoensayos y análisis fotométricos de alto rendimiento.",
        image: "/images/equipos/cobas-8000.png",
        icon: Microscope,
    },
    {
        title: "CA 600 SYSMEX",
        description:
            "Analizador automático de coagulación sanguínea compacto y preciso para diagnóstico in vitro.",
        image: "/images/equipos/ca600.png",
        icon: Activity,
    },
    {
        title: "STA Compact Max",
        description:
            "Analizador de hemostasia con gran capacidad de muestras y acceso aleatorio eficiente.",
        image: "/images/equipos/sta-compact.png",
        icon: FlaskConical,
    },
    {
        title: "BC 6200",
        description:
            "Analizador hematológico automático con reporte de múltiples parámetros en líquidos biológicos.",
        image: "/images/equipos/bc6200.png",
        icon: TestTube,
    },
    {
        title: "iSmart 30 PRO",
        description:
            "Analizador de electrolitos diseñado para medición cuantitativa de sodio, potasio y cloruro.",
        image: "/images/equipos/ismart30.png",
        icon: Waves,
    },
];

export default function EquiposDeLaboratorioClinico() {
    return (
        <section className="bg-slate-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* HERO */}
                <div className="text-center mb-20">
                    <span className="inline-block px-4 py-1 text-sm font-medium bg-cyan-100 text-cyan-700 rounded-full mb-4">
                        Tecnología de Precisión
                    </span>

                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        Nuestros Equipos de Laboratorio
                    </h1>

                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Contamos con equipamiento automatizado de última generación para
                        garantizar resultados confiables, rápidos y seguros.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {equipment.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                {/* Imagen */}
                                <div className="relative h-56 w-full bg-white flex items-center justify-center p-6">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Contenido */}
                                <div className="p-6">

                                    {/* Icono */}
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                                            <Icon size={18} />
                                        </div>

                                        <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                                            Equipo Automatizado
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        {item.description}
                                    </p>

                                    {/* Línea decorativa */}
                                    <div className="mt-6 w-12 h-[2px] bg-cyan-500 rounded-full" />
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}