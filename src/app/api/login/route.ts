import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { login } from "@/lib/firebase/service";

export const POST = async (req: Request) => {
    const body = await req.json();

    // Ambil data pengguna dari Firebase
    const user = await login(body.email);

    // Jika pengguna tidak ditemukan, kirim respons dengan status 401
    if (!user) {
        return NextResponse.json({ message: "Email tidak ditemukan." }, { status: 401 });
    }

    // Bandingkan kata sandi yang diberikan dengan kata sandi pengguna yang tersimpan
    const userPasswordMatch = await bcrypt.compare(body.password, user.passwordHash);

    // Jika kata sandi tidak cocok, kirim respons dengan status 401
    if (!userPasswordMatch) {
        return NextResponse.json({ message: "Password salah." }, { status: 401 });
    }

    // Jika email dan kata sandi cocok, kirim respons dengan status 200
    return NextResponse.json({ message: "Login berhasil." }, { status: 200 });
}
