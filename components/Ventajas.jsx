"use client";

import { ShieldCheck, Microscope, Truck, Users } from "lucide-react";

const ventajas = [
    {
        icon: ShieldCheck,
        title: "Bioseguridad estricta",
        description:
            "Protocolos rigurosos en cada toma y manipulación de muestra.",
    },
    {
        icon: Microscope,
        title: "Equipamiento moderno",
        description:
            "Materiales certificados para conservación adecuada.",
    },
    {
        icon: Truck,
        title: "Transporte especializado",
        description:
            "Cadena de frío y trazabilidad garantizada.",
    },
    {
        icon: Users,
        title: "Personal calificado",
        description:
            "Profesionales con amplia experiencia clínica.",
    },
];

export default function Ventajas() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 text-center">

                <span className="text-cyan-500 font-semibold uppercase tracking-wider">
                    Nuestras Ventajas
                </span>

                <h2 className="text-4xl font-bold text-gray-900 mt-4">
                    ¿Por qué elegirnos?
                </h2>

                <div className="grid md:grid-cols-4 gap-10 mt-14">
                    {ventajas.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
                        >
                            <item.icon className="w-10 h-10 text-cyan-500 mx-auto" />
                            <h3 className="text-xl font-semibold mt-6">{item.title}</h3>
                            <p className="text-gray-600 mt-4 text-sm">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}