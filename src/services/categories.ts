import { database, auth } from "../database";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { Category } from "../models/Category";
import { useStore } from "../store";

export const createCategory = async (category: Omit<Category, "id">) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");

        category.userId = user.uid;
        
        if (!category.createdAt) category.createdAt = new Date();
        if (!category.updatedAt) category.updatedAt = new Date();

        const docRef = await addDoc(collection(database, "categories"), category);
        
        const newCategory = {
            id: docRef.id,
            ...category
        };

        // Actualizar el store con la nueva categoría
        const store = useStore.getState();
        store.setCategories([...store.categories, newCategory]);
        
        return newCategory;
    } catch (error) {
        console.error("Error al crear la categoría:", error);
        throw error;
    }
}

export const getUserCategories = async (): Promise<Category[]> => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");
        const q = query(
            collection(database, "categories"), 
            where("userId", "==", user.uid),
            orderBy("name", "asc")
        );
        
        const querySnapshot = await getDocs(q);
        const categories: Category[] = querySnapshot.docs.map((doc) => {
            const data = doc.data() as Category;
            return { 
                id: doc.id, 
                ...data,
                createdAt: doc.data().createdAt.toDate(),
                updatedAt: doc.data().updatedAt.toDate(),
            };
        });
        
        return categories;
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        throw error;
    }
}
