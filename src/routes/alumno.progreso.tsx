import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { BarraProgreso } from "@/components/BarraProgreso";
import { TarjetaInsignia } from "@/components/TarjetaInsignia";
import { TablaResultados } from "@/components/TablaResultados";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { INSIGNIAS } from "@/data/insignias";
import { LECCIONES, CONTROLES } from "@/data/lecciones";
import {
  borrarTodo,
  controlesARepasar,
  insigniasGanadas,
  porcentajeTotal,
  useEstado,
} from "@/lib/estado";

export const Route = createFileRoute("/alumno/progreso")({
  head: () => ({
    meta: [
      { title: "Mi progreso | La puerta de la cocina" },
      {
        name: "description",
        content: "Panel del alumno: lecciones, aciertos, insignias y controles que conviene repasar.",
      },
      { property: "og:title", content: "Mi progreso" },
      { property: "og:description", content: "Lecciones, aciertos, insignias y repaso." },
    ],
  }),
  component: Progreso,
});

function Progreso() {
  const estado = useEstado();
  const ganadas = insigniasGanadas(estado);
  const repasar = controlesARepasar(estado);
  const practicas = Object.values(estado.practica);
  const aciertosPractica = practicas.reduce((s, p) => s + p.aciertos, 0);
  const totalPractica = practicas.reduce((s, p) => s + p.total, 0);

  return (
    <div className="space-y-8">
      <EncabezadoSeccion
        titulo="Mi progreso"
        descripcion="Aquí ves todo lo que has completado. Se guarda en este dispositivo."
      />

      <div className="tarjeta p-6">
        <BarraProgreso valor={porcentajeTotal(estado)} etiqueta="Sesión completada" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Dato titulo="Lecciones terminadas" valor={`${estado.leccionesCompletadas.length} / ${LECCIONES.length}`} />
        <Dato
          titulo="Aciertos en la práctica"
          valor={totalPractica > 0 ? `${aciertosPractica} / ${totalPractica}` : "Sin datos"}
        />
        <Dato
          titulo="Puntuación del semáforo"
          valor={estado.semaforo ? `${estado.semaforo.aciertos} / ${estado.semaforo.total}` : "Sin datos"}
        />
        <Dato
          titulo="Mejor nota de evaluación"
          valor={estado.evaluacion ? `${estado.evaluacion.mejorNota} / 10` : "Sin datos"}
        />
      </div>

      <section aria-labelledby="insignias">
        <h2 id="insignias" className="text-xl font-extrabold">
          Insignias
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGNIAS.map((i) => (
            <TarjetaInsignia key={i.id} insignia={i} ganada={ganadas.includes(i.id)} />
          ))}
        </div>
      </section>

      <section aria-labelledby="repaso">
        <h2 id="repaso" className="text-xl font-extrabold">
          Controles que necesitas repasar
        </h2>
        {repasar.length === 0 ? (
          <p className="tarjeta mt-4 p-6 text-muted-foreground">
            Todavía no hay controles pendientes de repaso. Haz alguna actividad para verlos aquí.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {repasar.map((c) => (
              <li key={c} className="tarjeta flex flex-wrap items-center justify-between gap-3 p-4">
                <span className="font-semibold">{CONTROLES[c] ?? "Método PEPS/FIFO"}</span>
                {LECCIONES.some((l) => l.id === c) && (
                  <Button asChild size="sm" variant="outline">
                    <Link to="/alumno/aprende/$leccionId" params={{ leccionId: c }}>
                      Repasar la lección
                    </Link>
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="practica-tabla">
        <h2 id="practica-tabla" className="text-xl font-extrabold">
          Resultados de la práctica
        </h2>
        <div className="mt-4">
          <TablaResultados
            cabeceras={["Nivel", "Aciertos", "Productos", "Puntos"]}
            filas={practicas.map((p) => [`Nivel ${p.nivel}`, p.aciertos, p.total, p.puntos])}
            vacio="Todavía no has hecho ninguna ronda de práctica."
          />
        </div>
      </section>

      {estado.billete && (
        <section className="tarjeta p-6" aria-labelledby="billete-guardado">
          <h2 id="billete-guardado" className="text-xl font-extrabold">
            Tu billete de salida
          </h2>
          <p className="mt-2">
            <span className="font-bold">Hoy he aprendido que…</span> {estado.billete.aprendido}
          </p>
          <p className="mt-1">
            <span className="font-bold">Lo que más me costó decidir fue…</span>{" "}
            {estado.billete.costo}
          </p>
        </section>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="button" variant="outline" className="gap-2 text-danger">
            <Trash2 aria-hidden className="size-4" />
            Borrar todos mis datos de este dispositivo
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Borrar todos los datos?</AlertDialogTitle>
            <AlertDialogDescription>
              Se borrarán tu progreso, las fichas y las evaluaciones guardadas en este dispositivo.
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={borrarTodo}>Sí, borrar todo</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Dato({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <div className="tarjeta p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{titulo}</p>
      <p className="mt-1 font-display text-2xl font-extrabold">{valor}</p>
    </div>
  );
}
