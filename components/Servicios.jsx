"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    Home,
    Building2,
    ShieldCheck,
} from "lucide-react";

const categorias = [
    {
        id: "domicilio",
        label: "Toma a Domicilio",
        icon: Home,
    },
    {
        id: "empresas",
        label: "Servicios Empresariales",
        icon: Building2,
    },
    {
        id: "gestion",
        label: "Gestión Preanalítica",
        icon: ShieldCheck,
    },
];

const contenido = {
    domicilio: [
        "Toma de muestras pediátricas y adultos",
        "Pacientes oncológicos y adultos mayores",
        "Sangre venosa, arterial y capilar",
        "Recolección de orina y heces",
        "Muestras especiales",
    ],
    empresas: [
        "Exámenes ocupacionales",
        "Campañas preventivas",
        "Perfiles bioquímicos y hematológicos",
        "Perfiles hormonales y tumorales",
        "Evaluaciones periódicas empresariales",
    ],
    gestion: [
        "Identificación y rotulado de muestras",
        "Conservación según tipo de muestra",
        "Transporte bajo cadena de frío",
        "Control de calidad interno",
        "Coordinación con laboratorio acreditado",
    ],
};

export default function Servicios() {
    const [active, setActive] = useState("domicilio");

    return (
        <section className="py-28 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-cyan-500 font-semibold uppercase tracking-wider">
                        Nuestros servicios
                    </h2>
                    <p className="text-4xl font-bold text-gray-900 mt-4 leading-tight">
                        Servicios especializados con protocolos estrictos de calidad y bioseguridad
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mt-16">
                    {categorias.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = active === cat.id;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActive(cat.id)}
                                className={`flex cursor-pointer items-center gap-3 px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300
                  ${isActive
                                        ? "bg-primary text-white border-primary shadow-md"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                                    }`}
                            >
                                <Icon size={16} />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="mt-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.25 }}
                            className="grid md:grid-cols-3 gap-6"
                        >
                            {contenido[active].map((item, index) => (
                                <motion.a
                                    href="/contacto"
                                    target="_blank"
                                    key={item}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.04 }}
                                    className="group cursor-pointer bg-white hover:bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between">
                                        <span className="text-gray-800 font-medium text-sm">
                                            {item}
                                        </span>

                                        <CheckCircle2
                                            size={18}
                                            className="text-gray-300 group-hover:text-emerald-500 transition"
                                        />
                                    </div>

                                    {/* Badge */}
                                    <div className="mt-4">
                                        <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary text-white">
                                            Disponible
                                        </span>
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}