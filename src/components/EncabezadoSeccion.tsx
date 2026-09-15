import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEstado } from "@/lib/estado";
import { leerEnVozAlta } from "@/lib/voz";

export function EncabezadoSeccion({
  titulo,
  descripcion,
  paso,
}: {
  titulo: string;
  descripcion: string;
  paso?: string;
}) {
  const { ajustes } = useEstado();
  return (
    <header className="mb-6">
      {paso && (
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{paso}</p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-extrabold sm:text-3xl">{titulo}</h1>
        {ajustes.vozAlta && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="no-imprimir gap-2"
            onClick={() => leerEnVozAlta(`${titulo}. ${descripcion}`)}
          >
            <Volume2 aria-hidden className="size-4" />
            Escuchar
          </Button>
        )}
      </div>
      <p className="mt-1 max-w-3xl text-muted-foreground">{descripcion}</p>
    </header>
  );
}
