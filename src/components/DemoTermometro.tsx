import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { IndicadorTemperatura } from "@/components/IndicadorTemperatura";
import { MensajeCorreccion } from "@/components/MensajeCorreccion";
import { SelectorSemaforo } from "@/components/SelectorSemaforo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AVISO_SONDA, TABLA_TEMPERATURAS } from "@/data/temperaturas";
import type { Decision } from "@/data/productos";

export function DemoTermometro() {
  const [familiaId, setFamiliaId] = useState("refrigerados");
  const [temp, setTemp] = useState(3);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [comprobado, setComprobado] = useState(false);

  const familia = TABLA_TEMPERATURAS.find((f) => f.id === familiaId) ?? TABLA_TEMPERATURAS[0]!;
  const esCongelado = familia.id === "congelados";
  const min = esCongelado ? -30 : -5;
  const max = esCongelado ? 0 : 25;

  const correcta = temp >= familia.min && temp <= familia.max;
  const rechazo = esCongelado ? temp > familia.limiteRechazo : temp > familia.limiteRechazo;
  const estado: "correcta" | "limite" | "rechazo" = rechazo
    ? "rechazo"
    : correcta
      ? "correcta"
      : "limite";
  const esperada: Decision = rechazo ? "rechazar" : correcta ? "aceptar" : "observacion";
  const acierto = decision === esperada;

  function reiniciar() {
    setComprobado(false);
    setDecision(null);
  }

  return (
    <section aria-labelledby="demo-termo" className="tarjeta p-6">
      <h2 id="demo-termo" className="text-xl font-extrabold">
        Prueba el termómetro
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Elige el producto, mueve el termómetro y decide qué harías.
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="familia-producto">Producto que recibes</Label>
            <Select
              value={familiaId}
              onValueChange={(v) => {
                setFamiliaId(v);
                setTemp(v === "congelados" ? -20 : 3);
                reiniciar();
              }}
            >
              <SelectTrigger id="familia-producto" className="mt-1">
                <SelectValue placeholder="Elige un producto" />
              </SelectTrigger>
              <SelectContent>
                {TABLA_TEMPERATURAS.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.familia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="temp-slider">Temperatura observada</Label>
            <Slider
              id="temp-slider"
              className="mt-3"
              min={min}
              max={max}
              step={1}
              value={[temp]}
              onValueChange={(v) => {
                setTemp(v[0] ?? 0);
                reiniciar();
              }}
              aria-label="Temperatura observada en grados Celsius"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              De {min} °C a {max} °C. También puedes usar las flechas del teclado.
            </p>
          </div>

          <IndicadorTemperatura valor={`${temp} °C`} estado={estado} />
          <p className="rounded-xl bg-muted px-3 py-2 text-sm font-semibold">
            {familia.familia}: {familia.correcta}. {familia.rechazo}.
          </p>
        </div>

        <div className="space-y-4">
          <SelectorSemaforo
            valor={decision}
            onChange={(v) => setDecision(v)}
            disabled={comprobado}
            compacto
            etiquetaGrupo="¿Qué haces con esta temperatura?"
          />
          {!comprobado ? (
            <Button
              type="button"
              disabled={decision === null}
              onClick={() => setComprobado(true)}
              className="w-full"
            >
              Comprobar decisión
            </Button>
          ) : (
            <>
              <MensajeCorreccion
                acierto={acierto}
                titulo={acierto ? "¡Decisión correcta!" : "Revisa el criterio"}
              >
                <p>
                  A {temp} °C, este producto se {esperada === "aceptar" ? "acepta" : esperada === "observacion" ? "acepta con observación" : "rechaza"}.
                </p>
                <p>{familia.rechazo}.</p>
              </MensajeCorreccion>
              <Button type="button" variant="outline" className="w-full" onClick={reiniciar}>
                Probar otra vez
              </Button>
            </>
          )}
        </div>
      </div>

      <p className="mt-5 flex items-start gap-2 rounded-xl bg-cold-soft px-4 py-3 text-sm font-bold text-cold">
        <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0" />
        {AVISO_SONDA}
      </p>
    </section>
  );
}
