"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
    {
        description: "Imagen de persona sosteniendo sus manos en el pecho dando información de tomar pruebas a domicilio",
        image: "/images/hero1.jpg",
        cta: "/ciclos",
    },
    {
        description: "Imagen de persona saliendod de una consulta médica satisfecha con sus resultados",
        image: "/images/hero-2.jpg",
        cta: "/ciclos",
    },
    {
        description: "Imagen de laboratorio con equipos de análisis",
        image: "/images/hero-3.webp",
        cta: "/videoteca",
    },
];

export default function Slider() {
    return (
        <section className="relative overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                speed={750}
                loop
                grabCursor
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{ clickable: true }}
                className="h-[220px] md:h-[750px]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <div className="relative h-full w-full overflow-hidden">

                                {/* Imagen con leve zoom activo */}
                                <div className={`absolute inset-0 transition-transform duration-1000 ease-out ${isActive ? "scale-105" : "scale-100"}`}>
                                    <Image
                                        src={slide.image}
                                        alt={slide.description}
                                        fill
                                        priority={index === 0}
                                        sizes="100vw"
                                        className="object-cover"
                                    />
                                </div>

                                {/* Overlay único (ya no duplicado) */}
                                <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/30 to-black/30" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(46,244,237,0.15),transparent_55%)]" />
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}