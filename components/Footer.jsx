"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-white text-gray-600">
            <div className="container mx-auto px-6 py-14 grid gap-10 md:grid-cols-4 justify-center">

                {/* Logo */}
                <div>
                    <h3 className="text-2xl font-bold text-teal-700">
                        <Image src="/logo.png" alt="Logo" width={100} height={100} />
                    </h3>
                    <p className="text-sm tracking-wide text-gray-500">
                        Bioclin Perú
                    </p>
                </div>

                {/* Navegación */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-700 uppercase mb-4">
                        Navegación
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="/examenes">Examenes</Link></li>
                        <li><Link href="/ver-resultados">Ver Resultados</Link></li>
                        <li><Link href="/contacto">Contacto</Link></li>
                    </ul>
                </div>

                {/* Contactar */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-700 uppercase mb-4">
                        Contactar
                    </h4>

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-teal-600" />
                            <span>51982690461</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-teal-600" />
                            <span>referencias@bioclinperu.com</span>
                        </div>
                    </div>
                </div>

                {/* Redes Sociales */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-700 uppercase mb-4">
                        Redes Sociales
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#">Facebook</Link></li>
                        <li><Link href="#">Instagram</Link></li>
                        <li><Link href="#">Twitter</Link></li>
                    </ul>
                </div>
            </div>

            {/* Línea divisoria */}
            <div className="border-t border-gray-300" />

            {/* Bottom */}
            <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <Link href="#">Términos y condiciones</Link>

                <span>© {new Date().getFullYear()} Bioclin Perú</span>
            </div>
        </footer>
    );
}