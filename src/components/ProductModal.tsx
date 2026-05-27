"use client";

import { useState } from "react";
import Confirm from "@/lib/confirm";

type ProductModalProps = {
  title: string;
  buttonText: string;
  submitText: string;

  formAction: (
    formData: FormData
  ) => Promise<void>;

  defaultValues?: {
    id?: number;
    nombre?: string;
    precioPorKg?: number;
    stockKg?: number;
    categoria?: string;
    descuento?: number | null;
  };
};

export default function ProductModal({
  title,
  buttonText,
  submitText,
  formAction,
  defaultValues,
}: ProductModalProps) {

  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)} disabled={defaultValues?.stockKg === 0}
        className={defaultValues?.id ?"rounded-lg bg-blue-600 px-2 py-2 text-sm font-medium text-zinc-50 hover:bg-blue-800"
        :"rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"}>
        {buttonText}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ">
          <div className="w-full max-w-lg rounded-2xl dark:bg-zinc-950  bg-zinc-100 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {title}
              </h2>
            </div>

            <Confirm formAction={async (formData) => {await formAction(formData);setOpen(false);}}
              message={defaultValues?.id ? "¿Deseas actualizar este producto?" : "¿Deseas crear este producto?"}
              successMessage={defaultValues?.id ? "Producto actualizado correctamente" : "Producto creado correctamente"}
              className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-2">
              <input type="hidden" name="id" value={defaultValues?.id}/>

              <input type="text" name="nombre" placeholder="Nombre" defaultValue={defaultValues?.nombre} required
              className="text-zinc-950 dark:text-zinc-50 rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950"/>

              <input type="number" name="precioPorKg" placeholder="Precio por kg" defaultValue={defaultValues?.precioPorKg} min="0" step="0.01" required 
              className="text-zinc-950 dark:text-zinc-50 rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950"/>

              <input type="number" name="stockKg" placeholder="Stock" min="0" step="1" defaultValue={defaultValues?.stockKg} required 
              className="text-zinc-950 dark:text-zinc-50 rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950"/>

              <select name="categoria" defaultValue={defaultValues?.categoria} required className="text-zinc-950 dark:text-zinc-50 rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950">
                <option value="">Categoría</option>
                <option value="Fruta">Fruta</option>
                <option value="Verdura">Verdura</option>
                <option value="Legumbre">Legumbre</option>
                <option value="Fruto Seco">Fruto Seco</option>
              </select>

              <input type="number" name="descuento" placeholder="Descuento %" defaultValue={defaultValues?.descuento ?? ""} min="0" max="100" 
              className="text-zinc-950 dark:text-zinc-50 rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950"/>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setOpen(false)}
                  className="rounded-xl bg-red-700 px-4 py-2 text-zinc-50 hover:bg-red-600">
                  Cancelar
                </button>
                <button type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-zinc-50 hover:bg-blue-500">
                  {submitText}
                </button>
              </div>
            </Confirm>
          </div>
        </div>
      )}
    </>
  );
}