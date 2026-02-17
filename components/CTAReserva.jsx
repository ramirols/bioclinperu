"use client";

import Link from "next/link";

export default function CTAReserva() {
    return (
        <section className="py-24 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-center">
            <div className="container mx-auto px-6 max-w-3xl">

                <h2 className="text-4xl font-bold leading-tight">
                    Agenda tu toma de muestra hoy mismo
                </h2>

                <p className="mt-6 text-lg text-cyan-100">
                    Atención rápida, segura y con resultados confiables.
                    Nuestro equipo está listo para ayudarte.
                </p>

                <div className="mt-10 flex justify-center gap-6 flex-wrap">
                    <Link
                        href="/contacto"
                        className="bg-white text-cyan-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                        Reservar cita
                    </Link>

                    <Link
                        href="https://wa.me/51999999999"
                        target="_blank"
                        className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-cyan-600 transition"
                    >
                        WhatsApp
                    </Link>
                </div>

            </div>
        </section>
    );
}