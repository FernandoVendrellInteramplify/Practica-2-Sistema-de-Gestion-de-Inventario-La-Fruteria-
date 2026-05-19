export type Categoria =
    |'Fruta'|'Verdura'|'Legumbre'|'Fruto Seco';

export interface Producto{
    readonly id: number;
    nombre: string;
    precioPorKg: number;
    stockKg: number;
    categoria: Categoria;
    descuento?: number;
}

export interface InventoryStats{
    total: number;
    categoriaKG: Record<Categoria,number>;
}