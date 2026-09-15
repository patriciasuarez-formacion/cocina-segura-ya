import type { Decision } from "./productos";

export type CasoSemaforo = {
  id: string;
  situacion: string;
  emoji: string;
  respuesta: Decision;
  justificacion: string;
  control: string;
};

export const CASOS_SEMAFORO: CasoSemaforo[] = [
  {
    id: "s1",
    situacion: "Yogur a 3 °C y con fecha correcta",
    emoji: "🥛",
    respuesta: "aceptar",
    justificacion: "Está entre 0 °C y 4 °C y la fecha es válida.",
    control: "temperatura",
  },
  {
    id: "s2",
    situacion: "Lata abombada",
    emoji: "🥫",
    respuesta: "rechazar",
    justificacion: "Una lata abombada se rechaza siempre.",
    control: "envase",
  },
  {
    id: "s3",
    situacion: "Saco de harina en el suelo del camión",
    emoji: "🌾",
    respuesta: "observacion",
    justificacion: "El producto puede servir, pero hay que registrar la incidencia y avisar al proveedor.",
    control: "transporte",
  },
  {
    id: "s4",
    situacion: "Langostinos congelados con escarcha interior",
    emoji: "🦐",
    respuesta: "rechazar",
    justificacion: "La escarcha interior indica descongelación previa.",
    control: "temperatura",
  },
  {
    id: "s5",
    situacion: "Lechugas con dos hojas deterioradas",
    emoji: "🥬",
    respuesta: "observacion",
    justificacion: "Se retiran las hojas dañadas y se registra la incidencia.",
    control: "sensorial",
  },
  {
    id: "s6",
    situacion: "Leche caducada ayer",
    emoji: "🥛",
    respuesta: "rechazar",
    justificacion: "La caducidad es un límite de seguridad.",
    control: "fechas",
  },
  {
    id: "s7",
    situacion: "Aceite correcto",
    emoji: "🫒",
    respuesta: "aceptar",
    justificacion: "Envase limpio y cerrado, fecha vigente y albarán correcto.",
    control: "pedido",
  },
  {
    id: "s8",
    situacion: "Carne a 8 °C",
    emoji: "🥩",
    respuesta: "rechazar",
    justificacion: "Los refrigerados se rechazan por encima de 6 °C.",
    control: "temperatura",
  },
];

export const SEGUNDOS_POR_CASO = 20;
