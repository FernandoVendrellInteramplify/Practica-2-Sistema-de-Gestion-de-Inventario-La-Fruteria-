interface DataGridProps<T> {
  datos: T[];
  cabeceras: string[];
  renderRow: (item: T) => React.ReactNode;
}

export function DataGrid<T>({datos, cabeceras, renderRow,}: DataGridProps<T>) {
  return (<div>
    <table className="min-w-full divide-y ">
        <thead>
            <tr>
                {cabeceras.map((cabecera) =>(<th key={cabecera} className="text-2xl">
                {cabecera}
                </th>))}
            </tr>
        </thead>
        <tbody className="divide-y">
            {datos.map((item) => renderRow(item))}
        </tbody>
    </table>
  </div>);
}