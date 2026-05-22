"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const handleClick = () => {
    setLeaving(true);

    setTimeout(() => {
      router.push("/inventario");
    }, 400);
  };
  return (
      <main className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center transition-all duration-500 
        ${leaving? "scale-110 opacity-0 blur-sm": "scale-100 opacity-100"}`}>
        <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-5xl font-bold tracking-tight leading-10 text-zink-900 dark:text-zinc-50">
            La Fruteria
          </h1>
          <p className="max-w-md text-lg p-3 leading-8 text-zinc-600 dark:text-zinc-400">
            Bienveindo a la aplicación de gestión de inventario.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <button onClick={handleClick}
            className={"group inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-zinc-50 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-blue-500 hover:shadow-2xl dark:bg-blue-500 dark:hover:bg-blue-400"}>
              Ver Inventario
          </button>
        </div>
      </main>
  );
}
