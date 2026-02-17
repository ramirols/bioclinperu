"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";
import { FileText, Trash2, Pencil, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminDashboard({ handleLogout }) {
    const [examTypes, setExamTypes] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingType, setEditingType] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const {
        register: registerType,
        handleSubmit: handleSubmitType,
        reset: resetType,
        formState: { errors: typeErrors },
    } = useForm();

    // ================= FETCH DATA =================
    const fetchData = async () => {
        const { data: types } = await supabase
            .from("exam_types")
            .select("*")
            .order("created_at", { ascending: false });

        const { data: profiles } = await supabase
            .from("profiles")
            .select("*")
            .eq("role", "user")
            .order("created_at", { ascending: false });

        const { data: resultsData } = await supabase
            .from("exam_results")
            .select(`*, exam_types(name)`);

        // Merge manual
        const merged = profiles.map((profile) => {
            const result = resultsData?.find(
                (r) => r.patient_id === profile.id
            );

            return {
                profile,
                result: result || null,
            };
        });

        setExamTypes(types || []);
        setResults(merged || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ================= CREATE EXAM TYPE =================
    const createExamType = async (data) => {
        try {
            await supabase.from("exam_types").insert({
                name: data.name,
            });

            toast.success("Tipo creado");
            resetType();
            fetchData();
        } catch {
            toast.error("Error creando tipo");
        }
    };

    // ================= UPDATE EXAM TYPE =================
    const updateExamType = async () => {
        try {
            await supabase
                .from("exam_types")
                .update({ name: editingType.name })
                .eq("id", editingType.id);

            toast.success("Tipo actualizado");
            setEditingType(null);
            fetchData();
        } catch {
            toast.error("Error actualizando tipo");
        }
    };

    // ================= DELETE EXAM TYPE =================
    const deleteExamType = async (id) => {
        try {
            await supabase.from("exam_types").delete().eq("id", id);
            toast.success("Tipo eliminado");
            fetchData();
        } catch {
            toast.error("Error eliminando tipo");
        }
    };

    // ================= CREATE USER + RESULT =================
    const onSubmit = async (formData) => {
        try {
            if (!formData.file?.[0]) {
                toast.error("Debes subir un PDF");
                return;
            }

            // Crear usuario
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (error) throw error;

            // Insert profile
            await supabase.from("profiles").insert({
                id: data.user.id,
                full_name: formData.name,
                role: formData.role,
            });

            // Subir PDF
            const fileName = `${Date.now()}-${formData.file[0].name}`;

            const { error: uploadError } = await supabase.storage
                .from("resultados")
                .upload(fileName, formData.file[0]);

            if (uploadError) throw uploadError;

            // Crear resultado
            await supabase.from("exam_results").insert({
                patient_id: data.user.id,
                exam_type_id: formData.examType,
                exam_date: new Date(),
                file_url: fileName,
            });

            toast.success("Usuario y resultado creados 🚀");
            reset();
            fetchData();
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ================= DELETE RESULT =================
    const deleteResult = async (id, filePath) => {
        try {
            await supabase.storage.from("resultados").remove([filePath]);
            await supabase.from("exam_results").delete().eq("id", id);

            toast.success("Resultado eliminado");
            fetchData();
        } catch {
            toast.error("Error eliminando");
        }
    };

    // ================= UPDATE USER =================
    const saveUserChanges = async () => {
        try {
            // 1️⃣ Update profile
            await supabase
                .from("profiles")
                .update({
                    full_name: editingUser.profile.full_name,
                    role: editingUser.profile.role,
                })
                .eq("id", editingUser.profile.id);

            // 2️⃣ PDF
            let fileName = editingUser.result?.file_url ?? null;

            if (editingUser.newFile) {
                fileName = `${Date.now()}-${editingUser.newFile.name}`;

                const { error: uploadError } = await supabase.storage
                    .from("resultados")
                    .upload(fileName, editingUser.newFile);

                if (uploadError) throw uploadError;

                if (editingUser.result?.file_url) {
                    await supabase.storage
                        .from("resultados")
                        .remove([editingUser.result.file_url]);
                }
            }

            // 3️⃣ Result
            if (editingUser.result?.id) {
                // UPDATE
                const { error } = await supabase
                    .from("exam_results")
                    .update({
                        exam_type_id: editingUser.result.exam_type_id,
                        file_url: fileName,
                    })
                    .eq("id", editingUser.result.id);

                if (error) throw error;
            } else {
                // INSERT
                const { error } = await supabase
                    .from("exam_results")
                    .insert({
                        patient_id: editingUser.profile.id,
                        exam_type_id: editingUser.result?.exam_type_id,
                        exam_date: new Date(),
                        file_url: fileName,
                    });

                if (error) throw error;
            }

            toast.success("Cambios guardados ✅");
            setEditingUser(null);
            fetchData();
        } catch (e) {
            console.error(e);
            toast.error("Error guardando cambios");
        }
    };

    // ================= ELIMINAR USUARIO =================
    const deleteUser = async (userId) => {
        try {
            // 1️⃣ Obtener resultado si existe
            const { data: result } = await supabase
                .from("exam_results")
                .select("*")
                .eq("patient_id", userId)
                .single();

            // 2️⃣ Eliminar archivo si existe
            if (result?.file_url) {
                await supabase.storage
                    .from("resultados")
                    .remove([result.file_url]);
            }

            // 3️⃣ Eliminar resultado
            await supabase
                .from("exam_results")
                .delete()
                .eq("patient_id", userId);

            // 4️⃣ Eliminar profile
            await supabase
                .from("profiles")
                .delete()
                .eq("id", userId);

            // 5️⃣ Llamar API para eliminar auth user
            await fetch("/api/delete-user", {
                method: "POST",
                body: JSON.stringify({ userId }),
            });

            toast.success("Usuario eliminado correctamente");
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error("Error eliminando usuario");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen space-x-2">
            <Loader2 className="animate-spin text-indigo-600" size={24} />
            <p className="text-xl font-bold text-indigo-600">Cargando datos...</p>
        </div>
    );

    return (
        <div className="container mx-auto p-10 space-y-10">
            <h1 className="text-3xl font-bold">Panel Administrador</h1>

            <button
                onClick={handleLogout}
                className="bg-red-500 focus:outline-none cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded"
            >
                Cerrar Sesión
            </button>

            {/* ================= CREAR TIPO ================= */}
            <div className="bg-white p-6 rounded-xl shadow space-y-6">
                <h2 className="font-bold text-lg mb-4">
                    Crear Tipo de Examen
                </h2>

                <form
                    onSubmit={handleSubmitType(createExamType)}
                    className="flex gap-4"
                >
                    <div className="flex-1">
                        <input
                            className="border rounded-lg border-gray-300 p-2 w-full focus:outline-none"
                            placeholder="Ej: Hemograma"
                            {...registerType("name", {
                                required: "El nombre es obligatorio",
                            })}
                        />
                        {typeErrors?.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {typeErrors.name.message}
                            </p>
                        )}
                    </div>

                    <button className="bg-primary cursor-pointer hover:bg-primary/80 text-white px-4 rounded">
                        Crear
                    </button>
                </form>

                {/* ===== LISTADO DE TIPOS EXISTENTES ===== */}
                <div className="space-y-3">
                    {examTypes.map((type) => (
                        <div
                            key={type.id}
                            className="border rounded-lg border-gray-300 p-3 flex justify-between items-center"
                        >
                            {editingType?.id === type.id ? (
                                <>
                                    <input
                                        className="border rounded-lg border-gray-300 p-2 flex-1 mr-4 focus:outline-none"
                                        value={editingType.name}
                                        onChange={(e) =>
                                            setEditingType({
                                                ...editingType,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                    <button
                                        onClick={updateExamType}
                                        className="text-green-600 cursor-pointer"
                                    >
                                        Guardar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p>{type.name}</p>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setEditingType(type)}
                                            className="text-yellow-600 cursor-pointer"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() => deleteExamType(type.id)}
                                            className="text-red-600 cursor-pointer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= CREAR USUARIO ================= */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-bold text-lg mb-4">
                    Crear Usuario + Resultado
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <input
                            className="border rounded-lg border-gray-300 p-2 w-full focus:outline-none"
                            placeholder="Nombre"
                            {...register("name", {
                                required: "El nombre es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "Mínimo 3 caracteres",
                                },
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            className="border rounded-lg border-gray-300 p-2 w-full focus:outline-none"
                            placeholder="Email"
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Email inválido",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="border rounded-lg border-gray-300 p-2 w-full pr-10 focus:outline-none"
                            placeholder="Password"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 6,
                                    message: "Mínimo 6 caracteres",
                                },
                            })}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-sm text-gray-500 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <select
                        className="border rounded-lg border-gray-300 p-2 w-full focus:outline-none"
                        {...register("role", {
                            required: "El rol es obligatorio",
                        })}
                    >
                        <option value="">Seleccionar Rol</option>
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>

                    {errors.role && (
                        <p className="text-red-500 text-sm">
                            {errors.role.message}
                        </p>
                    )}

                    <div>
                        <select
                            className="border rounded-lg border-gray-300 p-2 w-full focus:outline-none"
                            {...register("examType", {
                                required: "Selecciona un tipo de examen",
                            })}
                        >
                            <option value="">Seleccionar Tipo</option>
                            {examTypes.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>

                        {errors.examType && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.examType.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="file"
                            accept="application/pdf"
                            {...register("file", {
                                required: "Debes subir un PDF",
                            })}
                        />

                        {errors.file && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.file.message}
                            </p>
                        )}
                    </div>

                    <button
                        disabled={isSubmitting}
                        className="bg-primary cursor-pointer hover:bg-primary/80 text-white w-full py-2 rounded"
                    >
                        {isSubmitting ? "Creando..." : "Crear"}
                    </button>
                </form>
            </div>

            {/* ================= RESULTADOS ================= */}
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
                <h2 className="font-bold text-lg">Usuarios Registrados</h2>

                {results.map((item) => (
                    <div
                        key={item.profile.id}
                        className="border rounded-lg border-gray-300 p-4 flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold">{item.profile.full_name}</p>

                            {item.result ? (
                                <p className="text-sm text-gray-500">
                                    {item.result.exam_types?.name}
                                </p>
                            ) : (
                                <p className="text-sm text-red-500">
                                    ⚠️ Sin resultado registrado
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4 items-center">
                            {/* VER PDF (si existe) */}
                            {item.result && (
                                <button
                                    onClick={() =>
                                        window.open(
                                            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resultados/${item.result.file_url}`,
                                            "_blank"
                                        )
                                    }
                                    className="cursor-pointer bg-primary text-white px-4 py-1 rounded flex items-center gap-2"
                                >
                                    <FileText size={18} />
                                    Ver PDF
                                </button>
                            )}

                            {/* EDITAR (SIEMPRE DISPONIBLE) */}
                            <button
                                onClick={() =>
                                    setEditingUser({
                                        profile: item.profile,
                                        result: item.result ?? null,
                                    })
                                }
                                className="text-yellow-600 bg-yellow-100 cursor-pointer px-4 py-1 rounded flex items-center gap-2"
                                title="Editar usuario"
                            >
                                <Pencil size={18} />
                                Editar
                            </button>

                            {/* ELIMINAR USUARIO (solo si existe) */}
                            {item.result && (
                                <button
                                    onClick={() =>
                                        deleteUser(item.profile.id)
                                    }
                                    className="text-red-600 bg-red-100 cursor-pointer px-4 py-1 rounded flex items-center gap-2"
                                    title="Eliminar usuario"
                                >
                                    <Trash2 size={18} />
                                    Eliminar
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= MODAL EDIT ================= */}
            {editingUser && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-[420px] space-y-4">

                        <h3 className="font-bold text-lg">Editar usuario</h3>

                        {/* Nombre */}
                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            id="full_name"
                            className="border p-2 w-full cursor-pointer border-gray-300 rounded outline-none"
                            value={editingUser.profile.full_name}
                            placeholder="Cambiar nombre"
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    profile: { ...editingUser.profile, full_name: e.target.value },
                                })
                            }
                        />

                        {/* Rol */}
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                        <select
                            id="role"
                            className="border p-2 w-full cursor-pointer border-gray-300 rounded outline-none"
                            value={editingUser.profile.role}
                            placeholder="Cambiar rol"
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    profile: { ...editingUser.profile, role: e.target.value },
                                })
                            }
                        >
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>

                        {/* Tipo examen */}
                        <label htmlFor="exam_type_id" className="block text-sm font-medium text-gray-700">Tipo examen</label>
                        <select
                            id="exam_type_id"
                            className="border p-2 w-full cursor-pointer border-gray-300 rounded outline-none"
                            value={editingUser.result?.exam_type_id || ""}
                            placeholder="Cambiar tipo examen"
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    result: {
                                        ...editingUser.result,
                                        exam_type_id: e.target.value,
                                    },
                                })
                            }
                        >
                            <option value="">Seleccionar tipo</option>
                            {examTypes.map((t) => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>

                        {/* PDF */}
                        <label className="block text-sm font-medium text-gray-700">
                            Documento actual
                        </label>

                        {editingUser.result?.file_url ? (
                            <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                                <button
                                    onClick={() =>
                                        window.open(
                                            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resultados/${editingUser.result.file_url}`,
                                            "_blank"
                                        )
                                    }
                                    className="text-blue-600 text-sm underline"
                                >
                                    Ver PDF actual
                                </button>

                                <button
                                    onClick={async () => {
                                        try {
                                            await supabase.storage
                                                .from("resultados")
                                                .remove([editingUser.result.file_url]);

                                            await supabase
                                                .from("exam_results")
                                                .update({ file_url: null })
                                                .eq("id", editingUser.result.id);

                                            setEditingUser({
                                                ...editingUser,
                                                result: {
                                                    ...editingUser.result,
                                                    file_url: null,
                                                },
                                            });

                                            toast.success("PDF eliminado");
                                        } catch {
                                            toast.error("Error eliminando PDF");
                                        }
                                    }}
                                    className="text-red-600 text-sm"
                                >
                                    Eliminar PDF
                                </button>
                            </div>
                        ) : (
                            <p className="text-sm text-red-500">No hay documento subido</p>
                        )}

                        <label className="block text-sm font-medium text-gray-700 mt-3">
                            Subir nuevo PDF
                        </label>

                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    newFile: e.target.files[0],
                                })
                            }
                        />

                        <button
                            disabled={!editingUser.result?.exam_type_id}
                            className="bg-primary hover:bg-primary/80 cursor-pointer text-white w-full py-2 rounded disabled:opacity-50"
                            onClick={saveUserChanges}
                        >
                            Guardar cambios
                        </button>

                        <button
                            className="text-sm text-red-600 w-full cursor-pointer hover:text-red-800 bg-red-100 p-2 rounded"
                            onClick={() => setEditingUser(null)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}