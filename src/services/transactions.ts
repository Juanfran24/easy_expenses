import { database, auth } from "../database";
import { collection, addDoc, query, where, orderBy, getDocs, doc, updateDoc} from "firebase/firestore";
import { Transaction } from "../models/Transaction";

export const createTransaction = async (transaction: Omit<Transaction, "id">) => {
    try{
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");

        transaction.userId = user.uid;

        await addDoc(collection(database, "transactions"), transaction);
        return transaction;
    }catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
}

export const getUserTransactions = async (): Promise<Transaction[]> => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");

        const q = query(collection(database, "transactions"), where("userId", "==", user.uid), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const transactions: Transaction[] = querySnapshot.docs.map((doc) => {
            const data = doc.data() as Transaction;
            return { 
                id: doc.id, 
                ...data,
                date: doc.data().date.toDate(),
                createdAt: doc.data().createdAt.toDate(),
                updatedAt: doc.data().updatedAt.toDate(),
            };
        });
        return transactions;

    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
}

export const updateTransaction = async (transactionId: string, transaction: Partial<Transaction>) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");

        const transactionRef = doc(database, "transactions", transactionId);
        await updateDoc(transactionRef, {
            ...transaction,
            updatedAt: new Date()
        });
        return transaction;
    } catch (error) {
        console.error("Error updating transaction:", error);
        throw error;
    }
}