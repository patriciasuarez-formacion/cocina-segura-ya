import { Thermometer } from "lucide-react";
import { TABLA_TEMPERATURAS } from "@/data/temperaturas";

export function TablaTemperaturas() {
  return (
    <section aria-labelledby="tabla-temp" className="space-y-4">
      <h2 id="tabla-temp" className="flex items-center gap-2 text-xl font-extrabold">
        <Thermometer aria-hidden className="size-5 text-cold" />
        Temperaturas de recepción
      </h2>

      {/* Tabla para pantallas grandes */}
      <div className="tarjeta hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Temperatura correcta y criterio de rechazo por familia de productos
          </caption>
          <thead className="bg-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-extrabold">
                Producto
              </th>
              <th scope="col" className="px-4 py-3 font-extrabold text-success">
                Temperatura correcta
              </th>
              <th scope="col" className="px-4 py-3 font-extrabold text-danger">
                Se rechaza si...
              </th>
            </tr>
          </thead>
          <tbody>
            {TABLA_TEMPERATURAS.map((f) => (
              <tr key={f.id} className="border-t">
                <th scope="row" className="px-4 py-3 font-bold">
                  {f.familia}
                </th>
                <td className="px-4 py-3">{f.correcta}</td>
                <td className="px-4 py-3">{f.rechazo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas de consulta rápida en móvil */}
      <div className="grid gap-3 md:hidden">
        {TABLA_TEMPERATURAS.map((f) => (
          <div key={f.id} className="tarjeta p-4">
            <h3 className="font-extrabold">{f.familia}</h3>
            <p className="mt-2 rounded-lg bg-success-soft px-3 py-2 text-sm font-semibold text-success">
              Correcto: {f.correcta}
            </p>
            <p className="mt-2 rounded-lg bg-danger-soft px-3 py-2 text-sm font-semibold text-danger">
              {f.rechazo}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
