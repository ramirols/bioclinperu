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
        title: "Prepárate para ingresar a la universidad que sueñas",
        description: "Programas intensivos, docentes expertos y resultados comprobados.",
        image: "/images/hero-1.jpg",
        cta: "/ciclos",
    },
    {
        title: "Ciclos especiales San Marcos, UNI y Villarreal",
        description: "Entrena con simulacros reales y docentes especializados.",
        image: "/images/hero-1.jpg",
        cta: "/ciclos",
    },
    {
        title: "Clases grabadas, material gratuito y acompañamiento",
        description: "Accede a nuestra videoteca y recursos exclusivos.",
        image: "/images/hero-1.jpg",
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
                className="h-[520px] md:h-[750px]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <div className="relative h-full w-full overflow-hidden">

                                {/* Imagen con leve zoom activo */}
                                <div className={`absolute inset-0 transition-transform duration-1000 ease-out ${isActive ? "scale-105" : "scale-100"}`}>
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
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