export interface Category {
  id?: string;
  name: string;
  type: "Ingreso" | "Gasto";
  icon: string;
  color: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
