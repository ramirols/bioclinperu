import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
    const { username, password, full_name, role } = await req.json();

    const normalizedUsername = username.trim().toLowerCase();
    const fakeEmail = `${normalizedUsername}@clinica.com`;

    // Verificar si ya existe
    const { data: existing } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("username", normalizedUsername)
        .maybeSingle();

    if (existing) {
        return Response.json(
            { error: "El usuario ya existe" },
            { status: 400 }
        );
    }

    // Crear usuario
    const { data, error } =
        await supabaseAdmin.auth.admin.createUser({
            email: fakeEmail,
            password,
            email_confirm: true,
        });

    if (error) {
        return Response.json({ error: error.message }, { status: 400 });
    }

    const userId = data.user.id;

    // Crear profile
    const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .insert({
            id: userId,
            full_name,
            role,
            username: normalizedUsername,
        });

    if (profileError) {
        await supabaseAdmin.auth.admin.deleteUser(userId);

        return Response.json(
            { error: "Error creando profile" },
            { status: 500 }
        );
    }

    return Response.json({ userId });
}