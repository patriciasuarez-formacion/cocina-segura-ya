import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, List } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { Button } from "@/components/ui/button";
import { PASOS_DEMO } from "@/data/profesor";

export const Route = createFileRoute("/profesor/demostracion")({
  head: () => ({
    meta: [
      { title: "Modo demostración | La puerta de la cocina" },
      {
        name: "description",
        content: "Vista para proyectar en el aula con los diez pasos de una recepción correcta.",
      },
      { property: "og:title", content: "Modo demostración para el aula" },
      { property: "og:description", content: "Los diez pasos de una recepción correcta." },
    ],
  }),
  component: Demostracion,
});

function Demostracion() {
  const [paso, setPaso] = useState(0);
  const [verTodo, setVerTodo] = useState(false);

  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        titulo="Modo demostración"
        descripcion="Pensado para proyectar en el aula. Avanza paso a paso con texto grande."
      />

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" className="gap-2" onClick={() => setVerTodo((v) => !v)}>
          <List aria-hidden className="size-4" />
          {verTodo ? "Ver paso a paso" : "Ver todo"}
        </Button>
      </div>

      {verTodo ? (
        <ol className="space-y-3">
          {PASOS_DEMO.map((p, i) => (
            <li key={p} className="tarjeta flex gap-4 p-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {i + 1}
              </span>
              <p className="text-lg font-semibold">{p}</p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="tarjeta p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Paso {paso + 1} de {PASOS_DEMO.length}
          </p>
          <p className="mx-auto mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            {PASOS_DEMO[paso]}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="gap-2"
              disabled={paso === 0}
              onClick={() => setPaso((p) => Math.max(0, p - 1))}
            >
              <ArrowLeft aria-hidden className="size-5" />
              Anterior
            </Button>
            <Button
              type="button"
              size="lg"
              className="gap-2"
              disabled={paso === PASOS_DEMO.length - 1}
              onClick={() => setPaso((p) => Math.min(PASOS_DEMO.length - 1, p + 1))}
            >
              Siguiente
              <ArrowRight aria-hidden className="size-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
