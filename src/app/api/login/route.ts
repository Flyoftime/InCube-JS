import {NextResponse} from "next/server"
import {collection, addDoc} from"firebase/firestore";
import bcrypt from 'bcrypt';

const