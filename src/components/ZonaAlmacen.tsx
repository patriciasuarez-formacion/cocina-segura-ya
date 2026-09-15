import { ICONOS_ZONA } from "@/components/iconos";
import { cn } from "@/lib/utils";
import type { Zona } from "@/data/zonas";

export function ZonaAlmacen({
  zona,
  children,
  resaltada,
  onSoltar,
  onClick,
  seleccionable,
}: {
  zona: Zona;
  children?: React.ReactNode;
  resaltada?: boolean;
  onSoltar?: () => void;
  onClick?: () => void;
  seleccionable?: boolean;
}) {
  const Icono = ICONOS_ZONA[zona.icono];
  const Contenedor = seleccionable ? "button" : "div";
  return (
    <Contenedor
      type={seleccionable ? "button" : undefined}
      onClick={onClick}
      onDragOver={(e: React.DragEvent) => {
        if (onSoltar) e.preventDefault();
      }}
      onDrop={(e: React.DragEvent) => {
        e.preventDefault();
        onSoltar?.();
      }}
      className={cn(
        "tarjeta flex w-full flex-col p-4 text-left transition",
        resaltada && "ring-4 ring-brand/30",
        seleccionable && "hover:-translate-y-0.5 hover:shadow-lift",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cold-soft text-cold">
          <Icono aria-hidden className="size-5" />
        </span>
        <div className="min-w-0">
          <h3 className="font-extrabold leading-tight">{zona.nombre}</h3>
          <p className="text-xs font-semibold text-muted-foreground">{zona.temperatura}</p>
        </div>
      </div>
      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
        {zona.reglas.map((r) => (
          <li key={r} className="flex gap-2">
            <span aria-hidden>•</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
      {children}
    </Contenedor>
  );
}
