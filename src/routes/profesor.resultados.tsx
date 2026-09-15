import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { TablaResultados } from "@/components/TablaResultados";
import { Button } from "@/components/ui/button";
import { CONTROLES, LECCIONES } from "@/data/lecciones";
import { INSIGNIAS } from "@/data/insignias";
import { controlesARepasar, insigniasGanadas, porcentajeTotal, useEstado } from "@/lib/estado";

export const Route = createFileRoute("/profesor/resultados")({
  head: () => ({
    meta: [
      { title: "Resultados del alumnado | La puerta de la cocina" },
      {
        name: "description",
        content: "Resumen de progreso, práctica, semáforo y evaluación guardados en este dispositivo.",
      },
      { property: "og:title", content: "Resultados del alumnado" },
      { property: "og:description", content: "Progreso, práctica, semáforo y evaluación." },
    ],
  }),
  component: Resultados,
});

function Resultados() {
  const estado = useEstado();
  const practicas = Object.values(estado.practica);
  const ganadas = insigniasGanadas(estado);
  const repasar = controlesARepasar(estado);

  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        titulo="Resultados"
        descripcion="Datos de la sesión guardados en este dispositivo. Cada dispositivo guarda su propia sesión."
      />

      <div className="no-imprimir">
        <Button type="button" variant="outline" className="gap-2" onClick={() => window.print()}>
          <Printer aria-hidden className="size-4" />
          Imprimir resultados
        </Button>
      </div>

      <TablaResultados
        titulo="Resumen de la sesión"
        cabeceras={["Indicador", "Valor"]}
        filas={[
          ["Progreso total", `${porcentajeTotal(estado)} %`],
          ["Lecciones completadas", `${estado.leccionesCompletadas.length} de ${LECCIONES.length}`],
          [
            "Reto del semáforo",
            estado.semaforo
              ? `${estado.semaforo.aciertos} de ${estado.semaforo.total} (${estado.semaforo.porcentaje} %)`
              : "Sin datos",
          ],
          [
            "Mejor nota de evaluación",
            estado.evaluacion ? `${estado.evaluacion.mejorNota} / 10` : "Sin datos",
          ],
          ["Insignias conseguidas", `${ganadas.length} de ${INSIGNIAS.length}`],
          ["Fichas de recepción guardadas", estado.fichas.length],
        ]}
      />

      <section aria-labelledby="tabla-practica">
        <h2 id="tabla-practica" className="text-xl font-extrabold">
          Práctica por niveles
        </h2>
        <div className="mt-3">
          <TablaResultados
            cabeceras={["Nivel", "Aciertos", "Productos", "Puntos", "Controles fallados"]}
            filas={practicas.map((p) => [
              `Nivel ${p.nivel}`,
              p.aciertos,
              p.total,
              p.puntos,
              p.fallos.map((f) => CONTROLES[f] ?? f).join("; ") || "Ninguno",
            ])}
            vacio="El alumnado todavía no ha completado ninguna ronda de práctica."
          />
        </div>
      </section>

      <section aria-labelledby="repaso-clase">
        <h2 id="repaso-clase" className="text-xl font-extrabold">
          Controles para repasar en clase
        </h2>
        {repasar.length === 0 ? (
          <p className="tarjeta mt-3 p-6 text-muted-foreground">
            Sin controles pendientes por ahora.
          </p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {repasar.map((c) => (
              <li
                key={c}
                className="rounded-xl bg-warning-soft px-4 py-3 font-semibold text-warning-foreground"
              >
                {CONTROLES[c] ?? "Método PEPS/FIFO"}
              </li>
            ))}
          </ul>
        )}
      </section>

      {estado.billete && (
        <section className="tarjeta p-6" aria-labelledby="billete-clase">
          <h2 id="billete-clase" className="text-xl font-extrabold">
            Billete de salida del alumno
          </h2>
          <p className="mt-2">
            <span className="font-bold">Hoy he aprendido que…</span> {estado.billete.aprendido}
          </p>
          <p className="mt-1">
            <span className="font-bold">Lo que más me costó decidir fue…</span> {estado.billete.costo}
          </p>
        </section>
      )}
    </div>
  );
}
