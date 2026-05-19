import { DataGrid } from "@/components/DataGrid";
import { getProductos } from "@/lib/db";
import { calculateDiscount, getInventorySummary, actualizarStock} from "@/lib/inventory";


export default function InventarioPagina(){
    const p = getProductos();
    const sum = getInventorySummary(p);
    
    return (
        <main className="min-h-screen bg-zinc-100 px-6 py-10 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <div className="mx-auto max-w-7xl space-y-8">
                <header className="space-y-2">
                    <h1 className="text-4xl font-bold">
                        Inventario
                    </h1>
                </header>
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    <div  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="font-bold">Valor total</p>
                        <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{sum.total.toFixed(2)} €</p>
                    </div>
                    {Object.entries(sum.categoriaKG).map(([categoria, kilos]) => (<div key={categoria}
                        className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="font-bold">{categoria}</p>
                        <p className="mt-2 text-2xl font-semibold">{kilos} kg</p>
                    </div>))}
                </section>
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Productos
                    </h2>
                    <DataGrid
                        datos={p}
                        cabeceras={['Nombre', 'Categoría', 'Precio', 'Stock', 'Estado',]}
                        renderRow={(producto) =>{
                            const agotado = producto.stockKg === 0;
                            const stockBajo = producto.stockKg > 0 && producto.stockKg < 10;

                            return(
                                <tr key={producto.id}>
                                   <td className="px-4 py-4 text-center">
                                        {producto.nombre}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {producto.categoria}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {calculateDiscount(producto).toFixed(2)} €/kg
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {producto.stockKg} kg
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {agotado && (<span  className="rounded-full bg-red-700 px-3 py-1 text-red-100">Agotado</span>)}
                                        {stockBajo && (<span className="rounded-full bg-orange-700 px-3 py-1 text-orange-100">Stock Bajo</span>)}
                                        {!agotado && !stockBajo && (<span>Disponible</span>)}
                                    </td>
                                </tr>
                            )
                        }}
                    />
                </section>
                <section className="space-y-1">
                    <h2 className="text-2xl font-semibold"> Actualizar stock </h2>
                    <form action={actualizarStock} className="flex space-y-2 rounded-2xl border border-zinc-200 bg-zinc-100 p-2 dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="space-y-2 px-3">
                            <label htmlFor="productoId"> Producto </label>
                            <select id="productoId" name="productoId" required
                            className="rounded-xl border border-zinc-300 bg-zinc-100 px-2 py-1 outline-none focus:border-blue-600 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-blue-400 text-center">
                                <option value="">
                                    Selecciona un producto
                                </option>
                                {p.map((producto) => (<option key={producto.id}value={producto.id}>
                                    {producto.nombre}
                                    </option>))}
                            </select>
                        </div>
                        <div className="space-y-2 px-3">
                            <label htmlFor="nuevoStock">Nuevo Stock </label>
                            <input id="nuevoStock" type="number" name="nuevoStock" min={0} required
                            className="rounded-xl border border-zinc-300 bg-zinc-100 px-2 py-1 outline-none focus:border-blue-600 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-blue-400 text-center"/>
                        </div>
                        <button type="submit" className="rounded-xl bg-blue-600 px-2 py-1 font-medium text-zinc-50 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
                                    Actualizar
                        </button>
                    </form>
                </section>
            </div>
        </main>
    )
}