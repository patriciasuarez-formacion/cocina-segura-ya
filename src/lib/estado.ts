/**
 * Estado de la aplicación guardado en localStorage.
 * Preparado para migrar a una base de datos (Lovable Cloud) en el futuro:
 * toda la lectura y escritura pasa por las funciones de este archivo.
 */
import { useSyncExternalStore } from "react";

export type Ficha = {
  id: string;
  grupo: string;
  fecha: string;
  hora: string;
  responsable: string;
  receptor: string;
  proveedor: string;
  lineas: LineaFicha[];
  demo?: boolean;
};

export type LineaFicha = {
  id: string;
  producto: string;
  cantidad: string;
  fechaProducto: string;
  temperatura: string;
  envase: string;
  estadoFecha: string;
  decision: "aceptar" | "observacion" | "rechazar" | "";
  motivo: string;
};

export type RegistroCotejo = {
  id: string;
  alumno: string;
  fecha: string;
  valores: Record<string, "logrado" | "proceso" | "no" | "">;
  observaciones: string;
  demo?: boolean;
};

export type ResultadoPractica = {
  nivel: number;
  aciertos: number;
  total: number;
  puntos: number;
  fallos: string[];
};

export type Estado = {
  version: number;
  nombre: string;
  leccionesCompletadas: string[];
  inicioRespondido: boolean;
  practica: Record<string, ResultadoPractica>;
  almacenaCompletado: boolean;
  almacenaAciertos: number;
  camaraCompletada: boolean;
  pepsCompletado: boolean;
  normasMarcadas: string[];
  semaforo: { aciertos: number; total: number; porcentaje: number; repasar: string[] } | null;
  evaluacion: { mejorNota: number; intentos: number; repasar: string[] } | null;
  billete: { aprendido: string; costo: string } | null;
  fichas: Ficha[];
  cotejo: RegistroCotejo[];
  ajustes: {
    modoApoyo: boolean;
    textoGrande: boolean;
    sinAnimaciones: boolean;
    vozAlta: boolean;
    nivelPorDefecto: number;
    segundosSemaforo: number;
  };
};

const CLAVE = "puerta-cocina-v1";

export const ESTADO_INICIAL: Estado = {
  version: 1,
  nombre: "",
  leccionesCompletadas: [],
  inicioRespondido: false,
  practica: {},
  almacenaCompletado: false,
  almacenaAciertos: 0,
  camaraCompletada: false,
  pepsCompletado: false,
  normasMarcadas: [],
  semaforo: null,
  evaluacion: null,
  billete: null,
  fichas: [],
  cotejo: [],
  ajustes: {
    modoApoyo: false,
    textoGrande: false,
    sinAnimaciones: false,
    vozAlta: false,
    nivelPorDefecto: 1,
    segundosSemaforo: 20,
  },
};

let estado: Estado = ESTADO_INICIAL;
let cargado = false;
const oyentes = new Set<() => void>();

function leerDisco(): Estado {
  if (typeof window === "undefined") return ESTADO_INICIAL;
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    if (!crudo) return ESTADO_INICIAL;
    const datos = JSON.parse(crudo) as Partial<Estado>;
    return {
      ...ESTADO_INICIAL,
      ...datos,
      ajustes: { ...ESTADO_INICIAL.ajustes, ...(datos.ajustes ?? {}) },
    };
  } catch {
    return ESTADO_INICIAL;
  }
}

function avisar() {
  oyentes.forEach((f) => f());
}

function suscribir(cb: () => void) {
  if (!cargado) {
    cargado = true;
    estado = leerDisco();
  }
  oyentes.add(cb);
  return () => {
    oyentes.delete(cb);
  };
}

function snapshot() {
  return estado;
}

function snapshotServidor() {
  return ESTADO_INICIAL;
}

export function actualizarEstado(cambio: (e: Estado) => Estado) {
  if (!cargado) {
    cargado = true;
    estado = leerDisco();
  }
  estado = cambio(estado);
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch {
    /* almacenamiento no disponible: la sesión sigue funcionando en memoria */
  }
  avisar();
}

export function useEstado(): Estado {
  return useSyncExternalStore(suscribir, snapshot, snapshotServidor);
}

export function borrarTodo() {
  try {
    window.localStorage.removeItem(CLAVE);
  } catch {
    /* ignorar */
  }
  estado = ESTADO_INICIAL;
  avisar();
}

/* ------------------------- acciones ------------------------- */

export function completarLeccion(id: string) {
  actualizarEstado((e) =>
    e.leccionesCompletadas.includes(id)
      ? e
      : { ...e, leccionesCompletadas: [...e.leccionesCompletadas, id] },
  );
}

export function guardarPractica(r: ResultadoPractica) {
  actualizarEstado((e) => ({ ...e, practica: { ...e.practica, [r.nivel]: r } }));
}

export function guardarSemaforo(datos: NonNullable<Estado["semaforo"]>) {
  actualizarEstado((e) => ({
    ...e,
    semaforo: !e.semaforo || datos.aciertos > e.semaforo.aciertos ? datos : e.semaforo,
  }));
}

export function guardarEvaluacion(nota: number, repasar: string[]) {
  actualizarEstado((e) => ({
    ...e,
    evaluacion: {
      mejorNota: Math.max(nota, e.evaluacion?.mejorNota ?? 0),
      intentos: (e.evaluacion?.intentos ?? 0) + 1,
      repasar: nota >= (e.evaluacion?.mejorNota ?? 0) ? repasar : (e.evaluacion?.repasar ?? repasar),
    },
  }));
}

export function guardarBillete(aprendido: string, costo: string) {
  actualizarEstado((e) => ({ ...e, billete: { aprendido, costo } }));
}

export function guardarFicha(ficha: Ficha) {
  actualizarEstado((e) => ({
    ...e,
    fichas: [ficha, ...e.fichas.filter((f) => f.id !== ficha.id)],
  }));
}

export function borrarFicha(id: string) {
  actualizarEstado((e) => ({ ...e, fichas: e.fichas.filter((f) => f.id !== id) }));
}

export function guardarCotejo(reg: RegistroCotejo) {
  actualizarEstado((e) => ({
    ...e,
    cotejo: [reg, ...e.cotejo.filter((c) => c.id !== reg.id)],
  }));
}

export function borrarCotejo(id: string) {
  actualizarEstado((e) => ({ ...e, cotejo: e.cotejo.filter((c) => c.id !== id) }));
}

export function cambiarAjuste<K extends keyof Estado["ajustes"]>(
  clave: K,
  valor: Estado["ajustes"][K],
) {
  actualizarEstado((e) => ({ ...e, ajustes: { ...e.ajustes, [clave]: valor } }));
}

/* ------------------------- cálculos ------------------------- */

export function insigniasGanadas(e: Estado): string[] {
  const ganadas: string[] = [];
  const practicas = Object.values(e.practica);
  const aciertosTotales = practicas.reduce((s, p) => s + p.aciertos, 0);
  if (e.leccionesCompletadas.includes("envase") && aciertosTotales >= 3) ganadas.push("envases");
  if (e.leccionesCompletadas.includes("temperatura") && (e.semaforo?.porcentaje ?? 0) >= 60)
    ganadas.push("frio");
  if (e.leccionesCompletadas.includes("fechas") && aciertosTotales >= 3) ganadas.push("fechas");
  if (e.almacenaCompletado) ganadas.push("almacen");
  if (e.pepsCompletado) ganadas.push("peps");
  const n3 = e.practica["3"];
  if (n3 && n3.total > 0 && n3.aciertos / n3.total >= 0.8) ganadas.push("pedido");
  return ganadas;
}

export function porcentajeTotal(e: Estado): number {
  const hitos = [
    e.inicioRespondido,
    e.leccionesCompletadas.length >= 6,
    Object.keys(e.practica).length > 0,
    e.almacenaCompletado,
    e.camaraCompletada,
    e.pepsCompletado,
    e.semaforo !== null,
    e.evaluacion !== null,
    e.billete !== null,
    e.normasMarcadas.length >= 10,
  ];
  return Math.round((hitos.filter(Boolean).length / hitos.length) * 100);
}

export function controlesARepasar(e: Estado): string[] {
  const lista = new Set<string>();
  Object.values(e.practica).forEach((p) => p.fallos.forEach((f) => lista.add(f)));
  e.semaforo?.repasar.forEach((f) => lista.add(f));
  e.evaluacion?.repasar.forEach((f) => lista.add(f));
  return [...lista];
}
