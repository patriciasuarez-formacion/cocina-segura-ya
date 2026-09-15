import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TemporizadorClase({ minutos = 90 }: { minutos?: number }) {
  const [restante, setRestante] = useState(minutos * 60);
  const [activo, setActivo] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!activo) return;
    ref.current = setInterval(() => {
      setRestante((r) => (r <= 1 ? 0 : r - 1));
    }, 1000);
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [activo]);

  useEffect(() => {
    if (restante === 0) setActivo(false);
  }, [restante]);

  const mm = String(Math.floor(restante / 60)).padStart(2, "0");
  const ss = String(restante % 60).padStart(2, "0");

  return (
    <div className="tarjeta flex flex-wrap items-center gap-4 p-4">
      <p
        className="font-display text-4xl font-extrabold tabular-nums"
        role="timer"
        aria-live="off"
      >
        {mm}:{ss}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => setActivo((a) => !a)} className="gap-2">
          {activo ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
          {activo ? "Pausar" : "Iniciar"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          onClick={() => {
            setActivo(false);
            setRestante(minutos * 60);
          }}
        >
          <RotateCcw aria-hidden className="size-4" />
          Reiniciar
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">Temporizador opcional de la sesión.</p>
    </div>
  );
}
