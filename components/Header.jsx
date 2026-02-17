"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiLogIn } from "react-icons/fi";
import { useState } from "react";

const links = [
    { label: "Inicio", href: "/" },
    { label: "Ver resultados", href: "/ver-resultados" },
    { label: "Contacto", href: "/contacto" },
];

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border-b border-white/20">
            <nav className="container mx-auto flex items-center justify-between px-6 h-[72px]">
                <Link href="/" className="flex items-center gap-2 group">
                    {/* <Image
                        src="/logo.png"
                        alt="Logo"
                        width={55}
                        height={100}
                        className="object-contain transition duration-500 group-hover:rotate-12 group-hover:scale-110"
                    /> */}

                    <h1 className="text-2xl font-bold">Bioclin Perú</h1>
                </Link>

                <ul className="hidden md:flex items-center gap-7">
                    {links.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link href={link.href} className="relative font-bold group">
                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${active
                                            ? "text-accent"
                                            : "text-secondary"
                                            }`}
                                    >
                                        {link.label}
                                    </span>

                                    {!active && (
                                        <span className="absolute inset-0 w-full bg-gradient-to-r from-[#2ef4ed] to-[#2fc8bf] bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {link.label}
                                        </span>
                                    )}

                                    <span
                                        className={`absolute left-1/2 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-[#2ef4ed] via-[#2fc8bf] to-[#2ef4ed] transition-all duration-500 ease-out ${active
                                            ? "w-full -translate-x-1/2"
                                            : "w-0 -translate-x-1/2 group-hover:w-full"
                                            }`}
                                    />

                                    <span className="absolute inset-x-0 -bottom-3 h-6 rounded-full bg-[#2ef4ed]/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-2xl text-gray-700 hover:text-accent transition"
                >
                    {open ? <FiX /> : <FiMenu />}
                </button>
            </nav>

            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="bg-white/95 backdrop-blur-xl border-t border-gray-200 px-6 py-6 flex flex-col gap-5">
                    {links.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`block text-lg font-medium transition ${active
                                        ? "text-accent drop-shadow-[0_0_6px_rgba(46,244,237,.4)]"
                                        : "text-gray-700 hover:text-accent"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </header>
    );
}