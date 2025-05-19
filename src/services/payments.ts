import { database, auth } from "../database";
import { collection, addDoc, query, where, orderBy, getDocs, doc, updateDoc, deleteDoc} from "firebase/firestore";
import { Payment } from "../models/Payment";

export const createPayment = async (payment: Omit<Payment, "id">) => {
    try{
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");

        payment.userId = user.uid;
        payment.isPaid = payment.isPaid ?? false;
        payment.paidDate = payment.paidDate ?? null;
        payment.createdAt = new Date();
        payment.updatedAt = new Date();

        await addDoc(collection(database, "payments"), payment);
        return payment;
    }catch (error) {
        throw error;
    }
}

export const getUserPayments = async (): Promise<Payment[]> => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");

        const q = query(collection(database, "payments"), where("userId", "==", user.uid), orderBy("expirationDate", "asc"));
        const querySnapshot = await getDocs(q);
        const payments: Payment[] = querySnapshot.docs.map((doc) => {
            const data = doc.data() as Payment;
            return { 
                id: doc.id, 
                ...data,
                expirationDate: (data.expirationDate as any)?.toDate ? (data.expirationDate as any).toDate() : data.expirationDate,
                paidDate: (data.paidDate as any)?.toDate ? (data.paidDate as any).toDate() : data.paidDate,
                createdAt: doc.data().createdAt.toDate(),
                updatedAt: doc.data().updatedAt.toDate(),
            };
        });
        return payments;

    } catch (error) {
        throw error;
    }
}

export const updatePayment = async (paymentId: string, payment: Partial<Payment>) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");

        const paymentRef = doc(database, "payments", paymentId);
        await updateDoc(paymentRef, {
            ...payment,
            updatedAt: new Date()
        });
        return payment;
    } catch (error) {
        console.error("Error al actualizar el pago:", error);
        throw error;
    }
}

export const deletePayment = async (paymentId: string) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");
        const paymentRef = doc(database, "payments", paymentId);
        await deleteDoc(paymentRef);
    } catch (error) {
        throw error;
    }
}

export const markAsPaid = async (paymentId: string, isPaid: boolean) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");
        
        const paymentRef = doc(database, "payments", paymentId);
        await updateDoc(paymentRef, {
            isPaid: isPaid,
            paidDate: isPaid ? new Date() : null,
            updatedAt: new Date()
        });
    } catch (error) {
        console.error("Error al marcar el pago:", error);
        throw error;
    }
}

