import { database, auth } from "../database";
import { collection, addDoc, query, where, orderBy, getDocs, doc, updateDoc, deleteDoc} from "firebase/firestore";
import { Transaction } from "../models/Transaction";
import { useStore } from "../store";

export const createTransaction = async (transaction: Omit<Transaction, "id">) => {
    try{
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");

        transaction.userId = user.uid;
        transaction.endDate = transaction.endDate ?? null;
        transaction.dayOfMonth = transaction.dayOfMonth ?? null;

        const docRef = await addDoc(collection(database, "transactions"), transaction);
        
        const newTransaction = {
            id: docRef.id,
            ...transaction
        };

        const store = useStore.getState();
        store.setTransactionList([newTransaction, ...store.transactions]);
        
        return newTransaction;
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
                endDate: (data.endDate as any)?.toDate ? (data.endDate as any).toDate() : data.endDate,
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
        transaction.dayOfMonth = transaction.dayOfMonth ?? null;

        console.log("Transacción:", transactionId, transaction);
        const transactionRef = doc(database, "transactions", transactionId);
        await updateDoc(transactionRef, {
            ...transaction,
            updatedAt: new Date()
        });
        const store = useStore.getState();
        const updatedTransactions = store.transactions.map((tx) => 
            tx.id === transactionId 
                ? { 
                    ...tx, 
                    ...transaction, 
                    updatedAt: new Date() 
                } 
                : tx
        );
        store.setTransactionList(updatedTransactions);
        
        return transaction;
    } catch (error) {
        console.error("Error al actualizar la transacción:", error);
        throw error;
    }
}

export const deleteTransaction = async (transactionId: string) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");
        const transactionRef = doc(database, "transactions", transactionId);
        await deleteDoc(transactionRef);
        
        const store = useStore.getState();
        const updatedTransactions = store.transactions.filter(tx => tx.id !== transactionId);
        store.setTransactionList(updatedTransactions);
    } catch (error) {
        throw error;
    }
}