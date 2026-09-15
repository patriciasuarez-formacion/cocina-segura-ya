import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Printer, Save, Download, Trash2 } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { MensajeCorreccion } from "@/components/MensajeCorreccion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CRITERIOS_COTEJO, LEYENDA_COTEJO } from "@/data/profesor";
import { borrarCotejo, guardarCotejo, useEstado, type RegistroCotejo } from "@/lib/estado";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profesor/cotejo")({
  head: () => ({
    meta: [
      { title: "Lista de cotejo | La puerta de la cocina" },
      {
        name: "description",
        content: "Evalúa cada criterio como logrado, en proceso o no logrado, con observaciones.",
      },
      { property: "og:title", content: "Lista de cotejo del profesor" },
      { property: "og:description", content: "Criterios de evaluación de la recepción." },
    ],
  }),
  component: Cotejo,
});

type Valor = "logrado" | "proceso" | "no" | "";

const ESTADOS: { valor: Exclude<Valor, "">; etiqueta: string; clase: string }[] = [
  { valor: "logrado", etiqueta: "Logrado", clase: "border-success bg-success-soft text-success" },
  { valor: "proceso", etiqueta: "En proceso", clase: "border-warning bg-warning-soft text-warning-foreground" },
  { valor: "no", etiqueta: "No logrado", clase: "border-danger bg-danger-soft text-danger" },
];

function Cotejo() {
  const { cotejo } = useEstado();
  const [alumno, setAlumno] = useState("");
  const [valores, setValores] = useState<Record<string, Valor>>({});
  const [observaciones, setObservaciones] = useState("");
  const [aviso, setAviso] = useState<{ ok: boolean; texto: string } | null>(null);

  function guardar() {
    if (!alumno.trim()) {
      setAviso({ ok: false, texto: "Escribe el nombre del alumno o del grupo antes de guardar." });
      return;
    }
    const registro: RegistroCotejo = {
      id: crypto.randomUUID(),
      alumno: alumno.trim(),
      fecha: new Date().toISOString().slice(0, 10),
      valores,
      observaciones,
    };
    guardarCotejo(registro);
    setAviso({ ok: true, texto: "Evaluación guardada en este dispositivo." });
    setAlumno("");
    setValores({});
    setObservaciones("");
  }

  function exportarCSV() {
    const cabecera = ["Alumno o grupo", "Fecha", ...CRITERIOS_COTEJO.map((c) => c.texto), "Observaciones"];
    const filas = cotejo.map((r) => [
      r.alumno,
      r.fecha,
      ...CRITERIOS_COTEJO.map((c) => {
        const v = r.valores[c.id];
        return v === "logrado" ? "Logrado" : v === "proceso" ? "En proceso" : v === "no" ? "No logrado" : "";
      }),
      r.observaciones.replace(/\n/g, " "),
    ]);
    const csv = [cabecera, ...filas]
      .map((f) => f.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";"))
      .join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "lista-de-cotejo.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        titulo="Lista de cotejo"
        descripcion="Marca cada criterio y añade observaciones. Puedes guardar, imprimir o exportar a CSV."
      />

      <section className="tarjeta p-5" aria-labelledby="leyenda">
        <h2 id="leyenda" className="font-extrabold">
          Leyenda
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {LEYENDA_COTEJO.map((l) => (
            <li key={l.estado} className="rounded-xl bg-muted px-3 py-2 text-sm">
              <span className="font-bold">{l.estado}:</span> {l.texto}
            </li>
          ))}
        </ul>
      </section>

      <div className="max-w-sm">
        <Label htmlFor="alumno">Alumno o grupo</Label>
        <Input
          id="alumno"
          className="mt-1"
          value={alumno}
          onChange={(e) => setAlumno(e.target.value)}
          placeholder="Grupo 2"
        />
      </div>

      <div className="tarjeta overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Criterios de evaluación de la recepción</caption>
          <thead className="bg-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-extrabold">
                Criterio
              </th>
              <th scope="col" className="px-4 py-3 font-extrabold">
                Valoración
              </th>
            </tr>
          </thead>
          <tbody>
            {CRITERIOS_COTEJO.map((c) => (
              <tr key={c.id} className="border-t align-top">
                <th scope="row" className="px-4 py-3 font-semibold">
                  {c.texto}
                </th>
                <td className="px-4 py-3">
                  <div role="group" aria-label={c.texto} className="flex flex-wrap gap-2">
                    {ESTADOS.map((e) => (
                      <button
                        key={e.valor}
                        type="button"
                        aria-pressed={valores[c.id] === e.valor}
                        onClick={() => setValores((v) => ({ ...v, [c.id]: e.valor }))}
                        className={cn(
                          "min-h-11 rounded-xl border-2 px-3 py-2 text-sm font-bold transition",
                          valores[c.id] === e.valor
                            ? e.clase
                            : "border-border bg-card hover:bg-muted",
                        )}
                      >
                        {e.etiqueta}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <Label htmlFor="obs">Observaciones</Label>
        <Textarea
          id="obs"
          rows={3}
          className="mt-1"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />
      </div>

      {aviso && (
        <MensajeCorreccion acierto={aviso.ok} titulo={aviso.ok ? "Guardado" : "Falta un dato"}>
          <p>{aviso.texto}</p>
        </MensajeCorreccion>
      )}

      <div className="no-imprimir flex flex-wrap gap-3">
        <Button type="button" className="gap-2" onClick={guardar}>
          <Save aria-hidden className="size-4" />
          Guardar evaluación
        </Button>
        <Button type="button" variant="outline" className="gap-2" onClick={() => window.print()}>
          <Printer aria-hidden className="size-4" />
          Imprimir o guardar en PDF
        </Button>
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          disabled={cotejo.length === 0}
          onClick={exportarCSV}
        >
          <Download aria-hidden className="size-4" />
          Exportar a CSV
        </Button>
      </div>

      <section aria-labelledby="guardadas">
        <h2 id="guardadas" className="text-xl font-extrabold">
          Evaluaciones guardadas
        </h2>
        {cotejo.length === 0 ? (
          <p className="tarjeta mt-3 p-6 text-muted-foreground">Todavía no hay evaluaciones guardadas.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {cotejo.map((r) => {
              const logrados = Object.values(r.valores).filter((v) => v === "logrado").length;
              return (
                <li key={r.id} className="tarjeta flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-bold">{r.alumno}</p>
                    <p className="text-sm text-muted-foreground">
                      {r.fecha} · {logrados} criterios logrados de {CRITERIOS_COTEJO.length}
                    </p>
                    {r.observaciones && <p className="mt-1 text-sm">{r.observaciones}</p>}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="no-imprimir gap-2 text-danger"
                    onClick={() => borrarCotejo(r.id)}
                  >
                    <Trash2 aria-hidden className="size-4" />
                    Eliminar
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
