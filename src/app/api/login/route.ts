import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { login } from "@/lib/firebase/service";

export const POST = async (request: Request) => {
    try {
        const body = await request.json();

        // Ambil data pengguna dari Firebase berdasarkan alamat email
        const user = await login({ email: body.email, password: body.password });

        // Jika pengguna tidak ditemukan, kirim respons dengan status 401
        if (!user) {
            return NextResponse.json({ message: "Email atau kata sandi salah." }, { status: 401 });
        }

        // Jika email dan kata sandi cocok, kirim respons dengan status 200
        return NextResponse.json({ message: "Login berhasil." }, { status: 200 });
    } catch (error) {
        console.error("Error during login:", error);
        // Tangani kesalahan dan kirim respons dengan status 500
        return NextResponse.json({ message: "Terjadi kesalahan saat proses login." }, { status: 500 });
    }
}
