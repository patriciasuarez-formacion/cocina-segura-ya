export type PreguntaOpcion = {
  id: string;
  tipo: "opcion";
  enunciado: string;
  etiquetaTipo: string;
  puntos: number;
  control: string;
  opciones: string[];
  correcta: number;
  solucion: string;
};

export type PreguntaCaso = {
  id: string;
  tipo: "caso";
  enunciado: string;
  etiquetaTipo: string;
  puntos: number;
  control: string;
  opciones: string[];
  correcta: number;
  solucion: string;
};

export type PreguntaVF = {
  id: string;
  tipo: "vf";
  enunciado: string;
  etiquetaTipo: string;
  puntos: number;
  control: string;
  afirmaciones: { texto: string; correcta: boolean }[];
  solucion: string;
};

export type PreguntaBreve = {
  id: string;
  tipo: "breve";
  enunciado: string;
  etiquetaTipo: string;
  puntos: number;
  control: string;
  palabrasClave: string[][];
  opcionesApoyo: string[];
  correctaApoyo: number;
  solucion: string;
};

export type PreguntaMulti = {
  id: string;
  tipo: "multi";
  enunciado: string;
  etiquetaTipo: string;
  puntos: number;
  control: string;
  opciones: string[];
  validas: number[];
  seleccionar: number;
  solucion: string;
};

export type Pregunta =
  | PreguntaOpcion
  | PreguntaCaso
  | PreguntaVF
  | PreguntaBreve
  | PreguntaMulti;

export const PREGUNTAS: Pregunta[] = [
  {
    id: "p1",
    tipo: "opcion",
    etiquetaTipo: "Opción múltiple",
    enunciado: "¿A qué temperatura se recibe un refrigerado y un congelado?",
    puntos: 2,
    control: "temperatura",
    opciones: [
      "Refrigerados de 0 °C a 4 °C, rechazo por encima de 6 °C. Congelados a -18 °C o más fríos, rechazo por encima de -12 °C o con señales de descongelación",
      "Refrigerados de 0 °C a 10 °C y congelados a -5 °C",
      "Refrigerados a temperatura ambiente y congelados a 0 °C",
    ],
    correcta: 0,
    solucion:
      "Los refrigerados se reciben entre 0 °C y 4 °C y se rechazan por encima de 6 °C. Los congelados deben llegar a -18 °C o más fríos y se rechazan por encima de -12 °C o si muestran señales de descongelación.",
  },
  {
    id: "p2",
    tipo: "caso",
    etiquetaTipo: "Caso práctico",
    enunciado: "Llega una lata abombada y con óxido. ¿Qué haces?",
    puntos: 2,
    control: "envase",
    opciones: [
      "La rechazo. No la abro ni la pruebo porque el envase no es seguro",
      "La abro para comprobar si el contenido huele bien",
      "La acepto con observación y la uso hoy mismo",
    ],
    correcta: 0,
    solucion: "Se rechaza. No se abre ni se prueba porque el envase no es seguro.",
  },
  {
    id: "p3",
    tipo: "vf",
    etiquetaTipo: "Verdadero o falso",
    enunciado: "¿Cuál es la diferencia entre caducidad y consumo preferente?",
    puntos: 2,
    control: "fechas",
    afirmaciones: [
      { texto: "La fecha de caducidad marca un límite de seguridad.", correcta: true },
      {
        texto: "El consumo preferente se relaciona principalmente con la calidad.",
        correcta: true,
      },
      {
        texto: "En cocina profesional sí se acepta un producto con el consumo preferente superado.",
        correcta: false,
      },
    ],
    solucion:
      "La caducidad marca un límite de seguridad. El consumo preferente se relaciona principalmente con la calidad. En cocina profesional no se aceptan productos con ninguna de las dos fechas superada.",
  },
  {
    id: "p4",
    tipo: "breve",
    etiquetaTipo: "Respuesta breve",
    enunciado: "¿Qué significa PEPS/FIFO? Explícalo con tus palabras.",
    puntos: 2,
    control: "peps",
    palabrasClave: [
      ["entrar", "entra", "llega", "llegó", "antiguo", "primero"],
      ["salir", "sale", "usa", "utiliza", "gasta"],
    ],
    opcionesApoyo: [
      "Primero en entrar, primero en salir. Lo nuevo se coloca detrás o debajo y se usa antes lo más antiguo",
      "Primero en entrar, último en salir",
      "Se usa primero el producto más nuevo",
    ],
    correctaApoyo: 0,
    solucion:
      "Primero en entrar, primero en salir. Lo nuevo se coloca detrás o debajo y se utiliza antes lo más antiguo.",
  },
  {
    id: "p5",
    tipo: "multi",
    etiquetaTipo: "Clasificación",
    enunciado: "Indica tres medidas para evitar la contaminación cruzada. Selecciona exactamente tres.",
    puntos: 2,
    control: "sensorial",
    opciones: [
      "Separar crudos y cocinados",
      "Colocar cocinados arriba y crudos abajo",
      "Retirar el cartón exterior",
      "Separar los productos de limpieza",
      "Lavarse las manos",
      "Desinfectar la sonda",
      "Tapar y etiquetar los alimentos",
      "Dejar las cajas en el suelo de la cámara",
      "Guardar la lejía junto a la harina",
    ],
    validas: [0, 1, 2, 3, 4, 5, 6],
    seleccionar: 3,
    solucion:
      "Son válidas: separar crudos y cocinados, colocar cocinados arriba y crudos abajo, retirar el cartón exterior, separar los productos de limpieza, lavarse las manos, desinfectar la sonda, y tapar y etiquetar los alimentos.",
  },
];

export const PUNTOS_TOTALES = PREGUNTAS.reduce((s, p) => s + p.puntos, 0);

export function mensajeResultado(nota: number): string {
  if (nota >= 8) return "¡Muy buen trabajo! Puedes recibir un pedido con seguridad.";
  if (nota >= 5) return "Vas por buen camino. Revisa los controles indicados.";
  return "Necesitas practicar un poco más. Repite las actividades con pistas.";
}
