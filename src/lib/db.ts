import Database from 'better-sqlite3';
import { Producto } from '@/types/store';

const db= new Database('fruteria.db');

db.exec(`
  create table if not exists productos (
    id integer primary key autoincrement,
    nombre text not null,
    precioPorKg numeric not null,
    stockKg numeric not null,
    categoria text not null,
    descuento numeric
  )
`);

const hayProductos= db.prepare('select count(*) as total from productos')
    .get() as {total: number};

if (hayProductos.total === 0) {
    const insertar= db.prepare(`
    insert into productos (
      nombre,
      precioPorKg,
      stockKg,
      categoria,
      descuento
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  const semilla= [
    ['Manzana', 2.5, 50, 'Fruta', 10],
    ['Plátano', 1.9, 8, 'Fruta', null],
    ['Tomate', 3.2, 30, 'Verdura', 5],
    ['Lentejas', 4.1, 20, 'Legumbre', null],
    ['Almendras', 12.5, 5, 'Fruto Seco', 15],
    ['Naranjas', 2.2, 0, 'Fruta', null],
  ];

  const insertarSemilla=db.transaction(() => {
    for (const producto of semilla) {
      insertar.run(...producto);
    }
  });

  insertarSemilla();
}

export function getProductos(): Producto[] {
  return db
    .prepare(`
      select
        id,
        nombre,
        precioPorKg,
        stockKg,
        categoria,
        descuento
      from productos
    `)
    .all() as Producto[];
}

export function getProductoPorId(
  id: number
): Producto | undefined {
  return db
    .prepare(`
      select
        id,
        nombre,
        precioPorKg,
        stockKg,
        categoria,
        descuento
      from productos
      where id = ?
    `)
    .get(id) as Producto | undefined;
}

export default db;