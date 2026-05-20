'use server';
import { updateProductStock } from "@/lib/inventory";
import { revalidatePath } from 'next/cache'; 



export async function actualizarStock(formData: FormData): Promise<void> {
  const id = Number(formData.get('productoId'));

  const nuevoStock = Number(formData.get('nuevoStock'));

  if (Number.isNaN(id)) { return; }

  if (Number.isNaN(nuevoStock)) { return; }

  if (nuevoStock < 0) { return; }

  await updateProductStock(id, nuevoStock);

  revalidatePath('/inventario');
}