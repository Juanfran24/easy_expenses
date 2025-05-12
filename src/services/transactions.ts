import { database, auth } from "../database";
import { collection, addDoc, query, where, orderBy, getDocs, doc, updateDoc, deleteDoc} from "firebase/firestore";
import { Transaction } from "../models/Transaction";

export const createTransaction = async (transaction: Omit<Transaction, "id">) => {
    try{
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");

        transaction.userId = user.uid;
        transaction.endDate = transaction.endDate ?? null;
        transaction.dayOfMonth = transaction.dayOfMonth ?? null;

        await addDoc(collection(database, "transactions"), transaction);
        return transaction;
    }catch (error) {
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
                date: (data.date as any)?.toDate ? (data.date as any).toDate() : data.date,
                createdAt: doc.data().createdAt.toDate(),
                updatedAt: doc.data().updatedAt.toDate(),
            };
        });
        return transactions;

    } catch (error) {
        throw error;
    }
}

export const updateTransaction = async (transactionId: string, transaction: Partial<Transaction>) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");

        transaction.endDate = transaction.endDate ?? null;

        const transactionRef = doc(database, "transactions", transactionId);
        await updateDoc(transactionRef, {
            ...transaction,
            updatedAt: new Date()
        });
        return transaction;
    } catch (error) {
        throw error;
    }
}

export const deleteTransaction = async (transactionId: string) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");
        const transactionRef = doc(database, "transactions", transactionId);
        await deleteDoc(transactionRef);
    } catch (error) {
        throw error;
    }
}