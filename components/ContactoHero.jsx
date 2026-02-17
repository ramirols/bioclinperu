"use client";

import Image from "next/image";
import { Calendar, Phone, Mail } from "lucide-react";

export default function ContactoHero() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* Imagen */}
                <div className="relative w-full h-[480px] rounded-2xl overflow-hidden">
                    <Image
                        src="/images/hero-1.jpg"
                        alt="Atención médica a domicilio"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Contenido */}
                <div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Atiéndete con nosotros los 365 días del año
                    </h1>

                    <p className="mt-6 text-gray-600">
                        Coordina fácilmente la fecha y hora de tu atención por nuestros
                        canales: WhatsApp o correo electrónico.
                    </p>

                    {/* Horarios */}
                    <div className="mt-8 flex items-start gap-4 text-cyan-600">
                        <Calendar size={22} />
                        <div className="text-sm">
                            <p>Lunes a sábados: 06:00 - 18:00 horas</p>
                            <p>Domingos: 06:00 - 12:00 horas</p>
                        </div>
                    </div>

                    {/* Canales */}
                    <div className="mt-10 space-y-4">

                        <a
                            href="#"
                            className="flex justify-between items-center border border-gray-200 rounded-xl px-6 py-4 hover:border-cyan-500 transition"
                        >
                            <span className="flex items-center gap-3">
                                <Phone size={20} />
                                Háblanos por WhatsApp
                            </span>
                        </a>

                        <a
                            href="mailto:correo@bioclinperu.com"
                            className="flex justify-between items-center border border-gray-200 rounded-xl px-6 py-4 hover:border-cyan-500 transition"
                        >
                            <span className="flex items-center gap-3">
                                <Mail size={20} />
                                Escríbenos por correo
                            </span>
                        </a>

                    </div>

                </div>
            </div>
        </section>
    );
}