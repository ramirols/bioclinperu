"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Droplets, Microscope, Timer } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
    {
        Icon: Droplets,
        categoryTitle: "Precisión Vital",
        mainPhrase: "Una muestra, respuestas claras para tu salud.",
        description: "Persona sosteniendo manos en el pecho",
        image: "/images/hero1.jpg",
    },
    {
        Icon: Microscope,
        categoryTitle: "Análisis Profundo",
        mainPhrase: "Tecnología que traduce tu sangre en bienestar.",
        description: "Persona saliendo de consulta",
        image: "/images/hero-2.jpg",
    },
    {
        Icon: Timer,
        categoryTitle: "Tiempo de Respuesta",
        mainPhrase: "Resultados rápidos. Decisiones acertadas hoy.",
        description: "Laboratorio con equipos",
        image: "/images/hero-3.webp",
    },
];

export default function Slider() {
    return (
        <section className="relative overflow-hidden w-full">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                speed={1000}
                loop
                grabCursor
                autoplay={{
                    delay: 6500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{ clickable: true }}
                className="
    h-[65vh] sm:h-[85vh] md:h-[650px]
    [&_.swiper-pagination]:bottom-20
    md:[&_.swiper-pagination]:bottom-6
  "
            >
                {slides.map((slide, index) => {
                    const IconComponent = slide.Icon;

                    return (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                <div className="relative h-full w-full overflow-hidden flex items-center justify-center">

                                    {/* Imagen fondo */}
                                    <div
                                        className={`absolute inset-0 transition-transform duration-[4000ms] ease-out ${isActive ? "scale-110" : "scale-100"
                                            }`}
                                    >
                                        <Image
                                            src={slide.image}
                                            alt={slide.description}
                                            fill
                                            priority={index === 0}
                                            sizes="100vw"
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/55" />

                                    {/* Glow */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,211,238,0.15),transparent_60%)]" />

                                    {/* Contenido */}
                                    <div
                                        className={`relative z-10 text-center px-5 md:px-6 max-w-xl md:max-w-4xl transition-all duration-1000 ${isActive
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-8"
                                            }`}
                                    >

                                        {/* Badge */}
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 md:mb-6">
                                            <IconComponent
                                                size={16}
                                                className="text-cyan-400"
                                                strokeWidth={2.5}
                                            />
                                            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white uppercase tracking-widest">
                                                {slide.categoryTitle}
                                            </span>
                                        </div>

                                        {/* Título */}
                                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-snug md:leading-tight tracking-tight">
                                            {slide.mainPhrase}
                                        </h2>

                                        {/* Línea */}
                                        <div className="mt-6 mx-auto w-16 h-[2px] bg-cyan-400/70 rounded-full" />
                                    </div>

                                    {/* Glass inferior */}
                                    <div
                                        className={`justify-center absolute bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 z-20 transition-all duration-1000 ${isActive
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 px-4 py-2 md:px-5 md:py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

                                            <div className="flex flex-col leading-tight text-center md:text-left">
                                                <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                                                    Con el respaldo de:
                                                </span>
                                                <span className="text-xs md:text-sm text-white font-medium">
                                                    Nuestro Partner Oficial
                                                </span>
                                            </div>

                                            <div className="w-px h-8 bg-white/20 hidden md:block" />

                                            <div className="relative w-20 md:w-24 h-7 md:h-8 transition duration-300">
                                                <Image
                                                    src="/images/logo-laboratorioems.png"
                                                    alt="Logo Respaldo"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}