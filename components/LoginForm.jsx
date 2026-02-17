"use client";

import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        const normalizedUsername = data.username.trim().toLowerCase();
        const fakeEmail = `${normalizedUsername}@clinica.com`;

        const { error } = await supabase.auth.signInWithPassword({
            email: fakeEmail,
            password: data.password,
        });

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success("Bienvenido 👋");
        router.push("/dashboard");
    };

    return (
        <div className="flex flex-1 items-center justify-center px-4 h-[55vh]">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Badge */}
                <span className="inline-block mb-4 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Acceso a resultados
                </span>

                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    Iniciar sesión
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                    Consulta tus resultados de laboratorio de forma segura
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email */}
                    <div>
                        <input
                            type="text"
                            placeholder="Usuario"
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none
                                ${errors.username
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-primary"
                                }`}
                            {...register("username", {
                                required: "El usuario es obligatorio",
                            })}
                        />

                        {errors.username && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none
                                ${errors.password
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-primary"
                                }`}
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 6,
                                    message: "Mínimo 6 caracteres",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cursor-pointer bg-primary hover:bg-primary/80 transition text-white font-semibold py-3 rounded-lg disabled:opacity-50"
                    >
                        {isSubmitting ? "Ingresando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}