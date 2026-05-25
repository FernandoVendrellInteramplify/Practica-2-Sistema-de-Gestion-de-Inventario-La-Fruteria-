import { DataGrid } from "@/components/DataGrid";
import { getProductos } from "@/lib/db";
import { calculateDiscount, getInventorySummary} from "@/lib/inventory";
import { actualizarStock, crearProducto,borrarProducto } from "@/lib/funtions";
import { wrapResponse } from "@/utils/api";
import Confirm from "@/lib/confirm";



export default function InventarioPagina(){
    const respuesta = wrapResponse(getProductos());
    const p = respuesta.data;
    const sum = getInventorySummary(p);
    
    return (
        
        <main className="min-h-screen bg-zinc-100 px-6 py-10 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <div className="mx-auto max-w-7xl space-y-8">
                <header className="space-y-2">
                    
                        <h1 className="text-6xl font-bold">
                            Inventario
                        </h1>
                </header>
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 text-center">
                    <div  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:scale-110 hover:shadow-blue-600/60 dark:hover:shadow-blue-400/60">
                        <p className="font-bold">Valor total</p>
                        <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{sum.total.toFixed(2)} <small>€</small></p>
                    </div>
                    {Object.entries(sum.categoriaKG).map(([categoria, kilos]) => (<div key={categoria}
                        className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:scale-110 hover:shadow-blue-600/60 dark:hover:shadow-blue-400/60">
                        <p className="font-bold">{categoria}</p>
                        <p className="mt-2 text-2xl font-bold">{kilos} <small>kg</small></p>
                    </div>))}
                </section>
                <section className="space-y-4">
                    <h2 className="text-4xl font-semibold">
                        Productos
                    </h2>
                    <DataGrid
                        datos={p}
                        cabeceras={['Nombre', 'Categoría', 'Precio', 'Stock', 'Estado','Borrar']}
                        renderRow={(producto) =>{
                            const agotado = producto.stockKg === 0;
                            const stockBajo = producto.stockKg > 0 && producto.stockKg < 10;

                            return(
                                <tr key={producto.id} className="hover:bg-blue-600 dark:hover:bg-blue-400 odd:bg-zinc-100 even:bg-zinc-200 dark:odd:bg-zinc-800 dark:even:bg-zinc-900 hover:text-zinc-50 dark:hover:text-zinc-950">
                                   <td className="px-4 py-4 text-center font-bold">
                                        {producto.nombre}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {producto.categoria}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {calculateDiscount(producto).toFixed(2)} <small>€/kg</small>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {producto.stockKg} <small>kg</small>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {agotado && (<span  className="rounded-full bg-red-700 px-3 py-1 text-red-100">Agotado</span>)}
                                        {stockBajo && (<span className="inline-block rounded-full bg-orange-700 px-3 py-1 text-orange-100 animate-[pulseScale_1.2s_ease-in-out_infinite]">Stock Bajo</span>)}
                                        {!agotado && !stockBajo && (<span>Disponible</span>)}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <Confirm formAction={borrarProducto} message="¿Seguro que quieres borrar este producto?" successMessage="Producto eliminado">
                                            <input type="hidden" name="id" value={producto.id} />
                                            <button type="submit" className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-zinc-50 hover:bg-red-700">
                                                🗑
                                            </button>
                                        </Confirm>
                                    </td>
                                </tr>
                            )
                        }}
                    />
                </section>
                <section className="space-y-1">
                    <h2 className="text-3xl font-semibold"> Actualizar stock </h2>
                    <Confirm formAction={actualizarStock} message="¿Actualizar stock del producto?" successMessage="Stock actualizado" 
                    className="flex space-y-2 rounded-2xl border border-zinc-200 bg-zinc-200 p-2 dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="space-y-2 px-3">
                            <label htmlFor="productoId"> Producto </label>
                            <select id="productoId" name="productoId" required
                            className="rounded-xl border border-zinc-300 bg-zinc-100 px-2 py-1 outline-none focus:border-blue-600 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-blue-400 text-center">
                                <option value="">
                                    Selecciona un producto
                                </option>
                                {p.map((producto) => (<option key={producto.id}value={producto.id} disabled={producto.stockKg === 0}>
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
                    </Confirm>
                </section>
                <section>
                     <h2 className="text-2xl font-semibold"> Añadir producto </h2>
                     <Confirm formAction={crearProducto} message="¿Deseas crear este producto?" successMessage="Producto creado correctamente" 
                     className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-2">
                        <input type="text" name="nombre" placeholder="Nombre" required
                        className="rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950"/>

                        <input type="number" name="precioPorKg" placeholder="Precio por kg" min="0" step="0.01" required 
                        className="rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950"/>

                        <input type="number" name="stockKg" placeholder="Stock" min="0" step="1" required 
                        className="rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950"/>

                        <select name="categoria" required className="rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950">
                            <option value="">Categoría</option>
                            <option value="Fruta">Fruta</option>
                            <option value="Verdura">Verdura</option>
                            <option value="Legumbre">Legumbre</option>
                            <option value="Fruto Seco">Fruto Seco</option>
                        </select>

                        <input type="number" name="descuento" placeholder="Descuento %" min="0" max="100" 
                        className="rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950"/>
                        <div>
                            <button type="submit" className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
                                Añadir Producto
                            </button>
                        </div>
                     </Confirm>
                </section>
            </div>
        </main>
    )
}