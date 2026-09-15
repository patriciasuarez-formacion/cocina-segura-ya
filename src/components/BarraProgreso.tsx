import { Progress } from "@/components/ui/progress";

export function BarraProgreso({
  valor,
  etiqueta,
  detalle,
}: {
  valor: number;
  etiqueta: string;
  detalle?: string;
}) {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
        <span className="font-semibold">{etiqueta}</span>
        <span className="font-bold tabular-nums">{valor}%</span>
      </div>
      <Progress
        value={valor}
        aria-label={`${etiqueta}: ${valor} por ciento`}
        className="h-3 bg-muted"
      />
      {detalle && <p className="mt-1 text-xs text-muted-foreground">{detalle}</p>}
    </div>
  );
}
