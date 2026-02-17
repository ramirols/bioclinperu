"use client";

import { CreditCard, Wallet, Home } from "lucide-react";

export default function ContactoConsideraciones() {
    return (
        <section className="py-28 bg-white">
            <div className="container mx-auto px-6">

                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Consideraciones
                    </h2>
                    <p className="text-gray-500 text-sm mt-4">
                        Información importante antes de agendar tu atención.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">

                    {/* Card 1 */}
                    <div className="group p-10 rounded-2xl border border-gray-200 hover:border-cyan-400 transition-all duration-300 bg-white shadow-sm">

                        {/* Icon */}
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-cyan-50 border border-cyan-100 mb-6">
                            <CreditCard size={24} className="text-cyan-600" />
                        </div>

                        <h3 className="font-semibold text-xl text-gray-900 mb-6">
                            Medios de pago
                        </h3>

                        <ul className="space-y-3 text-gray-600 text-sm flex flex-col gap-4">

                            <div className="flex flex-row flex-wrap gap-4 items-center">
                                <li className="flex items-center gap-2">
                                    <Wallet size={16} className="text-gray-400" />
                                    Efectivo (monto exacto)
                                </li>

                                <li className="flex items-center gap-2">
                                    <CreditCard size={16} className="text-gray-400" />
                                    Tarjeta de crédito/débito (POS)
                                </li>
                            </div>

                            <div className="flex flex-row flex-wrap gap-4 items-center">
                                <li className="flex items-center gap-2">
                                    <span className="px-2 py-1 text-xs rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                                        Transferencia
                                    </span>
                                </li>

                                <li className="flex items-center gap-2">
                                    <span className="px-2 py-1 text-xs rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                                        Yape
                                    </span>
                                </li>

                                <li className="flex items-center gap-2">
                                    <span className="px-2 py-1 text-xs rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                                        Plin
                                    </span>
                                </li>
                            </div>
                        </ul>
                    </div>

                    {/* Card 2 */}
                    <div className="group p-10 rounded-2xl border border-gray-200 hover:border-cyan-400 transition-all duration-300 bg-white shadow-sm">

                        {/* Icon */}
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-cyan-50 border border-cyan-100 mb-6">
                            <Home size={24} className="text-cyan-600" />
                        </div>

                        <h3 className="font-semibold text-xl text-gray-900 mb-6">
                            Atención a domicilio
                        </h3>

                        <ul className="space-y-4 text-gray-600 text-sm leading-relaxed">

                            <li>
                                La atención en casa considera un cargo adicional según la zona.
                            </li>

                            <li>
                                El área de cobertura se confirma al momento de coordinar tu cita.
                            </li>

                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}