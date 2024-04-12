import { NextRequest, NextResponse } from "next/server";
import { register } from "@/lib/firebase/service"

export const POST = async(req: Request) => {
    const body = await req.json();

    if (!body.username){
        return NextResponse.json({status: 500, message: "username tidak boleh kosong"})
    }else if (!body.email){
        return NextResponse.json({status: 500, message: "email tidak boleh kosong"})
    }else if(!body.password){
        return NextResponse.json({status: 500, message: "password tidak boleh kosong"})
    }else {
        const res = await register(body)
        return NextResponse.json({status: res.status, message: res.message})
    }
}