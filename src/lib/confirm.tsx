'use client'

import { useState } from "react";
import { toast } from "sonner";

type ConfirmProps = {
  formAction: (formData: FormData) => Promise<void>;
  message: string;
  successMessage?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Confirm({
  formAction,
  message,
  successMessage,
  children,
  className,
}: ConfirmProps) {

  const [open, setOpen] = useState(false);

  const [success, setSuccess] =
    useState(false);

  const [pendingData, setPendingData] =
    useState<FormData | null>(null);

  async function handleSubmit(
    formData: FormData
  ) {

    setPendingData(formData);

    setOpen(true);
  }

  async function confirmAction() {

    if (!pendingData) return;

    await formAction(pendingData);

    setOpen(false);

    toast.success(successMessage);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }


  return (
    <>
      <form action={handleSubmit} className={className}>
        {children}
      </form>

      {/*Confirmación */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50">
          <div className="w-full max-w-md rounded-2xl bg-zinc-100 p-6 shadow-2xl border border-zinc-200 shadow-blue-600/30 dark:bg-zinc-800 dark:border-zinc-950">
            <h2 className="text-2xl font-bold text-zinc-900 text-center dark:text-zinc-100">
                Inventario Frutería
            </h2>

            <p className="mt-3 text-zinc-700 text-center dark:text-zinc-300">
              {message}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" onClick={() => setOpen(false)}
                className="rounded-xl bg-red-700 px-4 py-2 text-zinc-50 hover:bg-red-600">
                Cancelar
              </button>
              
              <button type="button" onClick={confirmAction}
                className="rounded-xl bg-blue-600 px-4 py-2 text-zinc-50 hover:bg-blue-400">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}