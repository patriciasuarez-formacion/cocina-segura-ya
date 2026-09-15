import { createFileRoute } from "@tanstack/react-router";
import { Trash2, Database } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { borrarTodo, cambiarAjuste, useEstado } from "@/lib/estado";

export const Route = createFileRoute("/profesor/configuracion")({
  head: () => ({
    meta: [
      { title: "Configuración de actividades | La puerta de la cocina" },
      {
        name: "description",
        content: "Ajusta el nivel de práctica, el tiempo del semáforo y las opciones de accesibilidad.",
      },
      { property: "og:title", content: "Configuración de actividades" },
      { property: "og:description", content: "Nivel, tiempo del semáforo y accesibilidad." },
    ],
  }),
  component: Configuracion,
});

function Configuracion() {
  const { ajustes } = useEstado();

  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        titulo="Configuración de actividades"
        descripcion="Estos ajustes se aplican al modo alumno en este dispositivo."
      />

      <section className="tarjeta space-y-5 p-6" aria-labelledby="actividades">
        <h2 id="actividades" className="text-lg font-extrabold">
          Actividades
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Label htmlFor="modo-apoyo" className="max-w-md">
            Modo de apoyo (menos productos, pistas visibles, motivos para elegir y más tiempo)
          </Label>
          <Switch
            id="modo-apoyo"
            checked={ajustes.modoApoyo}
            onCheckedChange={(v) => cambiarAjuste("modoApoyo", v)}
          />
        </div>

        <div className="max-w-xs">
          <Label htmlFor="nivel">Nivel de práctica recomendado</Label>
          <Select
            value={String(ajustes.nivelPorDefecto)}
            onValueChange={(v) => cambiarAjuste("nivelPorDefecto", Number(v))}
          >
            <SelectTrigger id="nivel" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Nivel 1: 5 productos con pistas</SelectItem>
              <SelectItem value="2">Nivel 2: 10 productos con alguna ayuda</SelectItem>
              <SelectItem value="3">Nivel 3: pedido completo sin pistas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="max-w-sm">
          <Label htmlFor="segundos">
            Segundos por situación en el reto del semáforo: {ajustes.segundosSemaforo}
          </Label>
          <Slider
            id="segundos"
            className="mt-3"
            min={10}
            max={60}
            step={5}
            value={[ajustes.segundosSemaforo]}
            onValueChange={(v) => cambiarAjuste("segundosSemaforo", v[0] ?? 20)}
          />
        </div>
      </section>

      <section className="tarjeta space-y-4 p-6" aria-labelledby="datos">
        <h2 id="datos" className="flex items-center gap-2 text-lg font-extrabold">
          <Database aria-hidden className="size-5 text-brand" />
          Datos y privacidad
        </h2>
        <p className="text-sm text-muted-foreground">
          Todo se guarda solo en este dispositivo: progreso, fichas y evaluaciones. No se piden
          apellidos ni correo electrónico. Los casos de práctica son datos de ejemplo del curso.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="outline" className="gap-2 text-danger">
              <Trash2 aria-hidden className="size-4" />
              Borrar todos los datos del dispositivo
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Borrar todos los datos?</AlertDialogTitle>
              <AlertDialogDescription>
                Se borrará el progreso del alumnado, las fichas de recepción y las listas de cotejo
                guardadas aquí. No se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={borrarTodo}>Sí, borrar todo</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  );
}
