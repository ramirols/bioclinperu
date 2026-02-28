"use client";

import {
    Droplets,
    Microscope,
    FlaskConical,
    ShieldCheck,
    Baby,
    HeartPulse,
    TestTube,
} from "lucide-react";

const services = [
    {
        title: "Rutina",
        icon: Droplets,
        description: "Exámenes básicos de control general",
        items: [
            "Hematologías",
            "Pruebas de embarazo",
            "Examen Orina y Heces",
            "Otros",
        ],
    },
    {
        title: "Perfiles",
        icon: Microscope,
        description: "Evaluaciones completas por especialidad",
        items: [
            "Perfil 20",
            "Perfil 21",
            "Pre Operatorio",
            "Pre Natal",
            "Lipídico",
            "Pediátrico",
        ],
    },
    {
        title: "Pruebas Especiales",
        icon: FlaskConical,
        description: "Estudios hormonales e inmunológicos",
        items: [
            "Hormonas Tiroideas",
            "PSA",
            "Insulina",
            "Infecciosas",
            "Inmunológicas",
            "Otros",
        ],
    },
    {
        title: "Bacteriología",
        icon: TestTube,
        description: "Análisis microbiológicos especializados",
        items: [
            "Urocultivo",
            "Coprocultivo",
            "Espermacultivo",
            "Cultivo de secreciones",
            "Otros",
        ],
    },
    {
        title: "Pruebas Alérgicas",
        icon: ShieldCheck,
        description: "Detección de alergias alimentarias y ambientales",
        items: [
            "Rack Alimentos",
            "Inhalantes",
            "Mixtos",
            "Pediátricos",
        ],
    },
    {
        title: "Pesquisa Neonatal",
        icon: Baby,
        description: "Tamizaje para recién nacidos",
        items: ["Prueba de Talón para Recién Nacidos"],
    },
    {
        title: "Espermatograma",
        icon: HeartPulse,
        description: "Evaluación de fertilidad masculina",
        items: ["Previa Cita"],
    },
];

export default function Servicios() {
    return (
        <section className="bg-slate-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* HERO */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 text-sm font-medium bg-primary text-white rounded-full mb-4">
                        Nuestros Servicios
                    </span>

                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        Áreas de Nuestros Exámenes
                    </h1>

                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Ofrecemos una amplia variedad de estudios clínicos con tecnología
                        moderna y resultados confiables.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={index}
                                className="group bg-white border border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                {/* Icon + Title */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                                        <Icon size={22} />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Items como badges */}
                                <div className="flex flex-wrap gap-2">
                                    {service.items.map((item, i) => (
                                        <span
                                            key={i}
                                            className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-cyan-100 hover:text-cyan-700 transition"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}