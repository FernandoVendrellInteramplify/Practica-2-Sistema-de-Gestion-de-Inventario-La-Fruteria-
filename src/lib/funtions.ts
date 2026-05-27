'use server';

import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { Categoria } from '@/types/store';

export async function editarProducto(
  formData: FormData
): Promise<void> {

  const id = Number(
    formData.get("id")
  );

  const nombre =
    formData.get("nombre")?.toString();

  const precioPorKg = Number(
    formData.get("precioPorKg")
  );

  const stockKg = Number(
    formData.get("stockKg")
  );

  const categoria =
    formData.get("categoria");

  const descuentoRaw =
    formData.get("descuento");

  const descuento =
    descuentoRaw === ""
      ? null
      : Number(descuentoRaw);

  db.prepare(`
    UPDATE productos
    SET
      nombre = ?,
      precioPorKg = ?,
      stockKg = ?,
      categoria = ?,
      descuento = ?
    WHERE id = ?
  `).run(
    nombre,
    precioPorKg,
    stockKg,
    categoria,
    descuento,
    id
  );

  revalidatePath("/inventario");
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

  revalidatePath('/inventario');
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

  revalidatePath('/inventario');
}