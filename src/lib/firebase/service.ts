import { collection, getDocs, getFirestore, getDoc , query, where, addDoc } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);


export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));

    const data =snapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
    }));

    return data
}

// export async function retrieveDataById(collectionName: string, id:string){
//     const snapshot = await getDoc(doc(firestore, collectionName, id));
//     const data = snapshot.data();
//     return data;
// }

export async function register(data:{
    username:string;
    email:string;
    password:string
},callback: Function){
    const q = query(collection(firestore, "users"), 
    where("email", "==", data.email),
    );
    const snapshot = await getDocs (q);
    const users = snapshot.docs.map ((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if (users.length > 0){
        callback ({status: false, message:"Email Already exist"});
    } else {
        data.password = await bcrypt.hash(data.password, 10);

        await addDoc(collection(firestore, "users"),data).then (()=>{
            callback({status:true, message: 'Register Success'});
        }).catch((error) => {
            callback ({status: false, message: error.message});
        });
    }
}