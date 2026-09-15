export type PreguntaRapida = {
  texto: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
};

export type Leccion = {
  id: string;
  numero: number;
  titulo: string;
  icono: "caja" | "calendario" | "termometro" | "ojo" | "camion" | "albaran";
  resumen: string;
  explicacion: string;
  ejemploCorrecto: string[];
  senalesAlarma: string[];
  ideaDestacada: string;
  pregunta: PreguntaRapida;
};

export const LECCIONES: Leccion[] = [
  {
    id: "envase",
    numero: 1,
    titulo: "Estado del envase",
    icono: "caja",
    resumen: "El envase es la primera barrera de protección del alimento.",
    explicacion:
      "El envase protege el alimento. Si el envase falla, el alimento puede dejar de ser seguro.",
    ejemploCorrecto: [
      "Caja seca y sin golpes",
      "Bolsa al vacío bien pegada al producto",
      "Lata lisa, sin óxido y con el cierre entero",
    ],
    senalesAlarma: [
      "Envase roto",
      "Envase abierto",
      "Envase abombado",
      "Óxido",
      "Caja mojada",
      "Golpes fuertes",
      "Pérdida del envasado al vacío",
      "Bolsa hinchada o floja",
      "Lata abollada en el cierre",
      "Lata abombada",
    ],
    ideaDestacada: "Una lata abombada o abollada en el cierre se rechaza siempre.",
    pregunta: {
      texto: "Llega una lata abombada. ¿Qué haces?",
      opciones: ["La acepto si la fecha está bien", "La rechazo siempre", "La abro para olerla"],
      correcta: 1,
      explicacion: "Una lata abombada se rechaza siempre. No se abre ni se prueba.",
    },
  },
  {
    id: "fechas",
    numero: 2,
    titulo: "Fechas",
    icono: "calendario",
    resumen: "Caducidad y consumo preferente no significan lo mismo.",
    explicacion:
      "La fecha de caducidad marca un límite de seguridad. El consumo preferente se relaciona principalmente con la calidad. En una cocina profesional no se acepta un producto con la fecha superada.",
    ejemploCorrecto: [
      "Caducidad: carne, pescado y lácteos frescos. Si está vencida, se rechaza",
      "Consumo preferente: arroz, pasta y conservas",
      "Etiqueta legible, con lote y fecha visibles",
    ],
    senalesAlarma: [
      "Fecha de caducidad vencida",
      "Consumo preferente superado",
      "Etiqueta borrada o incompleta",
      "No se puede leer el lote",
    ],
    ideaDestacada:
      "Regla del curso: si queda menos de un tercio de la vida útil y el producto no se utilizará enseguida, se rechaza o se acepta con observación.",
    pregunta: {
      texto: "Un brik de leche caducó hace cuatro días. ¿Qué haces?",
      opciones: [
        "Lo acepto, la leche aguanta",
        "Lo rechazo, está caducado",
        "Lo acepto con observación",
      ],
      correcta: 1,
      explicacion: "La caducidad es un límite de seguridad. Producto caducado, producto rechazado.",
    },
  },
  {
    id: "temperatura",
    numero: 3,
    titulo: "Temperatura",
    icono: "termometro",
    resumen: "La cadena de frío no se puede romper en la puerta.",
    explicacion:
      "Cada familia de productos tiene su temperatura correcta de recepción. Si se supera el límite, el producto se rechaza.",
    ejemploCorrecto: [
      "Pollo fresco a 3 °C",
      "Pescado a 1 °C y sobre hielo",
      "Congelados a -20 °C, sin escarcha interior",
    ],
    senalesAlarma: [
      "Refrigerado por encima de 6 °C",
      "Pescado por encima de 4 °C o sin hielo",
      "Congelado por encima de -12 °C",
      "Señales de descongelación",
    ],
    ideaDestacada:
      "El termómetro debe estar limpio y desinfectado. La sonda se desinfecta antes y después de cada medición.",
    pregunta: {
      texto: "Una bandeja de carne fresca marca 8 °C. ¿Qué haces?",
      opciones: ["Aceptar", "Aceptar con observación", "Rechazar"],
      correcta: 2,
      explicacion: "Los refrigerados se rechazan por encima de 6 °C. 8 °C es rechazo.",
    },
  },
  {
    id: "sensorial",
    numero: 4,
    titulo: "Aspecto, olor, color y textura",
    icono: "ojo",
    resumen: "Tus sentidos también son un control de recepción.",
    explicacion:
      "Mira, huele y toca (con guantes) el producto. Si algo no es propio del alimento, hay que actuar.",
    ejemploCorrecto: [
      "Aspecto: limpio, sin moho, sin líquidos extraños",
      "Olor: propio del alimento y suave",
      "Color: vivo y uniforme",
      "Textura: firme y elástica",
    ],
    senalesAlarma: [
      "Aspecto: moho, baba, hielo interior en congelados",
      "Olor: ácido, amoniacal, rancio o a cerrado",
      "Color: verdoso, gris o con manchas oscuras",
      "Textura: blanda, pegajosa, viscosa o reseca",
    ],
    ideaDestacada:
      "Un olor amoniacal en pescado indica que el producto no es apto. Se rechaza.",
    pregunta: {
      texto: "El pescado huele a amoniaco. ¿Qué control ha fallado?",
      opciones: ["La correspondencia con el pedido", "Aspecto, olor, color y textura", "Las fechas"],
      correcta: 1,
      explicacion: "El olor amoniacal es una señal de alarma sensorial. Se rechaza el producto.",
    },
  },
  {
    id: "transporte",
    numero: 5,
    titulo: "Limpieza del transporte",
    icono: "camion",
    resumen: "Se revisa el vehículo, la caja de reparto y al repartidor.",
    explicacion:
      "También se revisan el vehículo, la caja de reparto, y la ropa y las manos del repartidor.",
    ejemploCorrecto: [
      "Vehículo limpio y con frío",
      "Caja de reparto sin restos ni suciedad",
      "Crudos separados de los alimentos listos para consumir",
      "Repartidor con ropa limpia y manos limpias",
    ],
    senalesAlarma: [
      "Restos de comida o suciedad",
      "Presencia de animales",
      "Malos olores",
      "Crudos mezclados con listos para consumir",
      "El frío no se mantiene",
    ],
    ideaDestacada:
      "Un transporte sucio o sin frío puede ser motivo de rechazo aunque el producto parezca correcto.",
    pregunta: {
      texto: "La caja de reparto lleva restos y malos olores. ¿Puedes rechazar?",
      opciones: [
        "No, el producto va envasado",
        "Sí, el transporte también se controla",
        "Solo si el producto está caliente",
      ],
      correcta: 1,
      explicacion: "La limpieza del transporte es uno de los seis controles de recepción.",
    },
  },
  {
    id: "pedido",
    numero: 6,
    titulo: "Correspondencia con el pedido",
    icono: "albaran",
    resumen: "Pedido, albarán y mercancía deben coincidir.",
    explicacion:
      "Compara el pedido, el albarán y la mercancía recibida antes de firmar nada.",
    ejemploCorrecto: [
      "Producto y marca coinciden",
      "Calibre o formato correcto",
      "Cantidad y peso correctos",
      "Precio igual al acordado",
    ],
    senalesAlarma: [
      "Faltan productos",
      "Sobran unidades",
      "Llega otra referencia o marca",
      "El peso no coincide",
    ],
    ideaDestacada:
      "Nunca se firma un albarán sin comprobar antes la mercancía. Si falta, sobra o cambia algo, se anota la incidencia antes de firmar.",
    pregunta: {
      texto: "Pediste 10 kg de tomate y llegan 7 kg. ¿Qué haces antes de firmar?",
      opciones: [
        "Firmo y luego llamo",
        "Anoto la incidencia en el albarán antes de firmar",
        "No recibo nada",
      ],
      correcta: 1,
      explicacion: "La incidencia se anota antes de firmar. La firma confirma lo recibido.",
    },
  },
];

export const CONTROLES: Record<string, string> = {
  envase: "Control 1. Estado del envase",
  fechas: "Control 2. Fechas",
  temperatura: "Control 3. Temperatura",
  sensorial: "Control 4. Aspecto, olor, color y textura",
  transporte: "Control 5. Limpieza del transporte",
  pedido: "Control 6. Correspondencia con el pedido",
};
