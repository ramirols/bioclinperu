"use client";

import Link from "next/link";
import { Phone, Mail, ArrowUpRight, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-white text-gray-600 border-t border-gray-200 rounded-t-3xl">
            <div className="container mx-auto px-6 py-12">

                {/* Grid principal */}
                <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 text-center sm:text-left">

                    {/* Logo */}
                    <div className="flex flex-col items-center sm:items-start">
                        <Image src="/logo.png" alt="Logo" width={100} height={100} />
                        <p className="mt-4 text-sm tracking-wide text-gray-500">
                            Bioclin Perú
                        </p>
                    </div>

                    {/* Navegación */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 uppercase mb-5 tracking-wider">
                            Navegación
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "Inicio", href: "/" },
                                { name: "Exámenes", href: "/examenes" },
                                { name: "Ver Resultados", href: "/ver-resultados" },
                                { name: "Contacto", href: "/contacto" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="group inline-flex items-center gap-2 transition-all duration-300 hover:text-teal-600"
                                    >
                                        {item.name}
                                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 uppercase mb-5 tracking-wider">
                            Contactar
                        </h4>

                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link
                                    href="tel:+51982690461"
                                    className="group inline-flex items-center gap-3 transition-all duration-300 hover:text-teal-600"
                                >
                                    <Phone className="w-4 h-4 text-teal-600" />
                                    <span>+51 982 690 461</span>
                                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="mailto:referencias@bioclinperu.com"
                                    className="group inline-flex items-center gap-3 transition-all duration-300 hover:text-teal-600"
                                >
                                    <Mail className="w-4 h-4 text-teal-600" />
                                    <span>referencias@bioclinperu.com</span>
                                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Redes Sociales */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 uppercase mb-5 tracking-wider">
                            Redes Sociales
                        </h4>

                        <div className="flex justify-center sm:justify-start gap-4">
                            <Link href="#" className="p-2 rounded-full bg-gray-100 hover:bg-teal-600 hover:text-white transition-all duration-500 hover:rotate-12">
                                <Facebook className="w-4 h-4" />
                            </Link>

                            <Link href="#" className="p-2 rounded-full bg-gray-100 hover:bg-teal-600 hover:text-white transition-all duration-500 hover:rotate-12">
                                <Instagram className="w-4 h-4" />
                            </Link>

                            <Link href="#" className="p-2 rounded-full bg-gray-100 hover:bg-teal-600 hover:text-white transition-all duration-500 hover:rotate-12">
                                <Twitter className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider centrado (NO ancho completo) */}
                <div className="mt-8 border-t border-gray-200 w-full mx-auto" />

                {/* Bottom */}
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                    <p
                        className="hover:text-teal-600 transition-colors duration-300"
                    >
                        "Siempre en la vanguardia de la innovación en servicios médicos."
                    </p>

                    <span>
                        © {new Date().getFullYear()} Bioclin Perú
                    </span>
                </div>
            </div>
        </footer>
    );
}