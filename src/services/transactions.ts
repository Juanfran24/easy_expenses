import { database, auth } from "../database";
import { collection, addDoc} from "firebase/firestore";
import { Transaction } from "../models/Transaction";

export const createTransaction = async (transaction: Omit<Transaction, "id">) => {
    try{
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");

        transaction.userId = user.uid;

        await addDoc(collection(database, "transactions"), transaction);
        console.log("Transaction created successfully:", transaction);
        return transaction;
    }catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
}