import { collection, getDocs, getFirestore, getDoc, query, where, addDoc, doc } from "firebase/firestore";
import app  from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);


export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function register(data: {
    username: string;
    email: string;
    password: string
},
) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", data.email),
    );
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if (users.length > 0) {
        return { status: false, statusCode: 400, message: "Email Already exist" };
    } else {
        data.password = await bcrypt.hash(data.password, 10);
        try {
            await addDoc(collection(firestore, "users"), data);
            return { status: true, statusCode:200, message: 'Register Success' };
        } catch (error) {
            return { status: false,statusCode:400, message: "Register Failed" };
        }
    }
}

export async function login(data: { email: string, password: string }) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", data.email),
    );

    const snapshot = await getDocs(q);
    const userDocs = snapshot.docs;

    if (userDocs.length > 0) {
        const user = userDocs[0].data();

        // Periksa apakah properti password tersedia
        if (user.password) {
            // Bandingkan hash dari kata sandi yang diberikan dengan hash yang tersimpan
            const passwordMatch = await bcrypt.compare(data.password, user.password);
            if (passwordMatch) {
                // Jika cocok, kembalikan data pengguna
                return {
                    id: userDocs[0].id,
                    ...user,
                };
            }
        }
    }
    // Jika tidak ditemukan atau kata sandi tidak cocok, kembalikan null
    return null;
}