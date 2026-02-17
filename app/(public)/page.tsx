import Slider from "@/components/Slider";
import QuienesSomos from "@/components/QuienesSomos";
import Ventajas from "@/components/Ventajas";
import ComoFunciona from "@/components/ComoFunciona";
import Servicios from "@/components/Servicios";
import CTAReserva from "@/components/CTAReserva";

export default function Inicio() {
  return (
    <div>
      <Slider />
      <QuienesSomos />
      <Ventajas />
      <ComoFunciona />
      <Servicios />
      <CTAReserva />
    </div>
  );
}