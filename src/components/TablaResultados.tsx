import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TablaResultados({
  cabeceras,
  filas,
  vacio = "Todavía no hay datos.",
  titulo,
}: {
  cabeceras: string[];
  filas: (string | number)[][];
  vacio?: string;
  titulo?: string;
}) {
  if (filas.length === 0) {
    return (
      <div className="tarjeta p-6 text-center text-muted-foreground">
        <p>{vacio}</p>
      </div>
    );
  }
  return (
    <div className="tarjeta overflow-x-auto">
      <Table>
        {titulo && <caption className="sr-only">{titulo}</caption>}
        <TableHeader>
          <TableRow>
            {cabeceras.map((c) => (
              <TableHead key={c} className="font-bold text-foreground">
                {c}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filas.map((f, i) => (
            <TableRow key={i}>
              {f.map((celda, j) => (
                <TableCell key={j}>{celda}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
