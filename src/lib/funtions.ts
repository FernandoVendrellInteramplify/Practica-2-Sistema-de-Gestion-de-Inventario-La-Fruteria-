'use server';
import { updateProductStock } from "@/lib/inventory";
import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { Categoria } from '@/types/store';



export async function actualizarStock(formData: FormData): Promise<void> {
  const id = Number(formData.get('productoId'));

  const nuevoStock = Number(formData.get('nuevoStock'));

  if (Number.isNaN(id)) { return; }

  if (Number.isNaN(nuevoStock)) { return; }

  if (nuevoStock < 0) { return; }

  await updateProductStock(id, nuevoStock);

  revalidatePath('/inventario');
}


export async function crearProducto(
  formData: FormData
): Promise<void> {

  const nombre = formData.get(
    'nombre'
  )?.toString();

  const precioPorKg = Number(
    formData.get('precioPorKg')
  );

  const stockKg = Number(
    formData.get('stockKg')
  );

  const categoria = formData.get(
    'categoria'
  ) as Categoria;

  const descuentoRaw =
    formData.get('descuento');

  const descuento =
    descuentoRaw === ''
      ? null
      : Number(descuentoRaw);

  if (!nombre) {
    return;
  }

  if (Number.isNaN(precioPorKg)) {
    return;
  }

  if (Number.isNaN(stockKg)) {
    return;
  }

  db.prepare(`
    INSERT INTO productos (
      nombre,
      precioPorKg,
      stockKg,
      categoria,
      descuento
    )
    VALUES (?, ?, ?, ?, ?)
  `).run(nombre,precioPorKg, stockKg, categoria, descuento);
}

export async function borrarProducto(
  formData: FormData
): Promise<void> {

  const id = Number(
    formData.get('id')
  );

  if (Number.isNaN(id)) {
    return;
  }

  db.prepare(`
    DELETE FROM productos
    WHERE id = ?
  `).run(id);
}