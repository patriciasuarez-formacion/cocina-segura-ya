import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Shuffle, Trash2, Users } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROLES_GRUPO } from "@/data/profesor";

export const Route = createFileRoute("/profesor/grupos")({
  head: () => ({
    meta: [
      { title: "Práctica en grupos | La puerta de la cocina" },
      {
        name: "description",
        content: "Forma grupos de tres o cuatro alumnos y reparte los roles de la recepción.",
      },
      { property: "og:title", content: "Práctica en grupos y reparto de roles" },
      { property: "og:description", content: "Recepcionista, secretario, almacenero y portavoz." },
    ],
  }),
  component: Grupos,
});

function Grupos() {
  const [nombres, setNombres] = useState<string[]>([]);
  const [nuevo, setNuevo] = useState("");
  const [tamano, setTamano] = useState(4);
  const [grupos, setGrupos] = useState<string[][]>([]);
  const [rotacion, setRotacion] = useState(0);

  function anadir() {
    const limpio = nuevo.trim();
    if (!limpio) return;
    setNombres((n) => [...n, limpio]);
    setNuevo("");
  }

  function formar() {
    const mezclados = [...nombres].sort(() => Math.random() - 0.5);
    const resultado: string[][] = [];
    for (let i = 0; i < mezclados.length; i += tamano) {
      resultado.push(mezclados.slice(i, i + tamano));
    }
    setGrupos(resultado);
    setRotacion(0);
  }

  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        titulo="Práctica en grupos"
        descripcion="Añade los nombres, forma grupos de tres o cuatro y reparte los roles. Puedes rotarlos en cada ronda."
      />

      <section className="tarjeta p-5" aria-labelledby="roles">
        <h2 id="roles" className="flex items-center gap-2 font-extrabold">
          <Users aria-hidden className="size-5 text-brand" />
          Roles del equipo
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {ROLES_GRUPO.map((r) => (
            <li key={r.nombre} className="rounded-xl bg-muted px-3 py-2 text-sm">
              <span className="font-bold">{r.nombre}:</span> {r.detalle}
            </li>
          ))}
        </ul>
      </section>

      <section className="tarjeta p-5" aria-labelledby="alumnos">
        <h2 id="alumnos" className="font-extrabold">
          Alumnado de la clase
        </h2>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <div className="min-w-48 flex-1">
            <Label htmlFor="nuevo-alumno">Nombre (solo el nombre)</Label>
            <Input
              id="nuevo-alumno"
              className="mt-1"
              value={nuevo}
              onChange={(e) => setNuevo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  anadir();
                }
              }}
            />
          </div>
          <Button type="button" className="gap-2" onClick={anadir}>
            <Plus aria-hidden className="size-4" />
            Añadir
          </Button>
          <div>
            <Label htmlFor="tamano">Alumnos por grupo</Label>
            <Input
              id="tamano"
              type="number"
              min={3}
              max={4}
              className="mt-1 w-28"
              value={tamano}
              onChange={(e) => setTamano(Math.min(4, Math.max(3, Number(e.target.value) || 3)))}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            disabled={nombres.length < 3}
            onClick={formar}
          >
            <Shuffle aria-hidden className="size-4" />
            Formar grupos
          </Button>
        </div>

        {nombres.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Todavía no has añadido ningún nombre.
          </p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {nombres.map((n, i) => (
              <li key={`${n}-${i}`} className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-semibold">
                {n}
                <button
                  type="button"
                  aria-label={`Quitar a ${n}`}
                  onClick={() => setNombres((l) => l.filter((_, j) => j !== i))}
                  className="text-danger"
                >
                  <Trash2 aria-hidden className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {grupos.length > 0 && (
        <section aria-labelledby="grupos-formados">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="grupos-formados" className="text-xl font-extrabold">
              Grupos y roles
            </h2>
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => setRotacion((r) => r + 1)}
            >
              <Shuffle aria-hidden className="size-4" />
              Rotar roles (nueva ronda)
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {grupos.map((g, i) => (
              <div key={i} className="tarjeta p-5">
                <h3 className="font-extrabold">Grupo {i + 1}</h3>
                <ul className="mt-3 space-y-2">
                  {g.map((alumno, j) => {
                    const rol = ROLES_GRUPO[(j + rotacion) % ROLES_GRUPO.length]!;
                    return (
                      <li key={alumno} className="rounded-xl bg-muted px-3 py-2 text-sm">
                        <span className="font-bold">{alumno}</span> · {rol.nombre}: {rol.detalle}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
