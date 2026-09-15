import { useEffect } from "react";
import { Accessibility, Type, Volume2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cambiarAjuste, useEstado } from "@/lib/estado";
import { pararVoz } from "@/lib/voz";
import { cn } from "@/lib/utils";

/** Aplica al documento las preferencias de accesibilidad guardadas. */
export function AplicarAjustes() {
  const { ajustes } = useEstado();
  useEffect(() => {
    const clases = document.body.classList;
    clases.toggle("texto-grande", ajustes.textoGrande);
    clases.toggle("sin-animaciones", ajustes.sinAnimaciones);
  }, [ajustes.textoGrande, ajustes.sinAnimaciones]);
  return null;
}

export function BotonModoApoyo() {
  const { ajustes } = useEstado();
  const activo = ajustes.modoApoyo;
  return (
    <Button
      type="button"
      variant={activo ? "default" : "outline"}
      aria-pressed={activo}
      onClick={() => cambiarAjuste("modoApoyo", !activo)}
      className={cn("gap-2", activo && "bg-success text-success-foreground hover:bg-success/90")}
    >
      <Sparkles aria-hidden className="size-4" />
      Modo de apoyo{activo ? ": activado" : ""}
    </Button>
  );
}

export function PanelAccesibilidad() {
  const { ajustes } = useEstado();
  const opciones = [
    {
      id: "textoGrande",
      etiqueta: "Texto más grande",
      valor: ajustes.textoGrande,
      Icono: Type,
    },
    {
      id: "sinAnimaciones",
      etiqueta: "Sin animaciones",
      valor: ajustes.sinAnimaciones,
      Icono: Sparkles,
    },
    {
      id: "vozAlta",
      etiqueta: "Leer en voz alta",
      valor: ajustes.vozAlta,
      Icono: Volume2,
    },
  ] as const;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className="gap-2">
          <Accessibility aria-hidden className="size-4" />
          <span className="hidden sm:inline">Accesibilidad</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <p className="mb-3 font-bold">Ajustes de accesibilidad</p>
        <div className="space-y-4">
          {opciones.map((o) => (
            <div key={o.id} className="flex items-center justify-between gap-3">
              <Label htmlFor={`aj-${o.id}`} className="flex items-center gap-2 text-sm">
                <o.Icono aria-hidden className="size-4" />
                {o.etiqueta}
              </Label>
              <Switch
                id={`aj-${o.id}`}
                checked={o.valor}
                onCheckedChange={(v) => {
                  cambiarAjuste(o.id, v);
                  if (o.id === "vozAlta" && !v) pararVoz();
                }}
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Toda la aplicación se puede usar con el teclado: tabulador para avanzar y Intro o barra
          espaciadora para pulsar.
        </p>
      </PopoverContent>
    </Popover>
  );
}
