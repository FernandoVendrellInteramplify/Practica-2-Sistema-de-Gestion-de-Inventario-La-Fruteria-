import db,{ getProductoPorId } from "./db";
import { Categoria, InventoryStats,Producto} from "@/types/store";
import { wrapResponse } from "@/utils/api";

export function calculateDiscount(p: Producto): number {
    if (p.descuento === undefined) {
    return p.precioPorKg;
  }
   return (
    p.precioPorKg *
    (1 - p.descuento / 100)
  );
}
export function getInventorySummary(productos: Producto[]): InventoryStats {
    return productos.reduce<InventoryStats>(
    (acumulador, producto) => {
      const precioFinal =
        calculateDiscount(producto);

      acumulador.total += precioFinal * producto.stockKg;
      
      acumulador.categoriaKG[producto.categoria] += producto.stockKg;

      return acumulador;
    },
    {
      total: 0,
      categoriaKG: {Fruta: 0, Verdura: 0, Legumbre: 0, 'Fruto Seco': 0,},
    }
  );
}
export async function updateProductStock(id: number, nuevoStock: number): Promise<void>{
    const respuesta = wrapResponse(getProductoPorId(id))
    const p = respuesta.data
    if (!p){
            return;
    }
    db.prepare(`
    update productos
    set stockKg = ?
    where id = ?
    `).run(nuevoStock,id);
}

