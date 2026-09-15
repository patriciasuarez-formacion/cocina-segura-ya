export type Zona = {
  id: string;
  nombre: string;
  icono: "refrigeracion" | "congelador" | "seco" | "frutas" | "limpieza";
  temperatura: string;
  reglas: string[];
};

export const ZONAS: Zona[] = [
  {
    id: "refrigeracion",
    nombre: "Cámara de refrigeración",
    icono: "refrigeracion",
    temperatura: "De 0 °C a 4 °C",
    reglas: [
      "Carnes, pescados, lácteos y productos elaborados",
      "Todo tapado y etiquetado",
      "Arriba: alimentos cocinados y listos para consumir",
      "Abajo: alimentos crudos",
      "El pescado, en la zona más fría",
    ],
  },
  {
    id: "congelador",
    nombre: "Congelador",
    icono: "congelador",
    temperatura: "-18 °C o menos",
    reglas: [
      "Los congelados se guardan inmediatamente",
      "No se rompe la cadena de frío",
      "Nunca se recongela un producto descongelado",
      "Etiquetar con la fecha de entrada",
    ],
  },
  {
    id: "seco",
    nombre: "Almacén seco",
    icono: "seco",
    temperatura: "De 10 °C a 20 °C (orientativa)",
    reglas: [
      "Espacio seco y ventilado",
      "Harinas, arroz, pasta, legumbres, conservas y aceite",
      "Siempre en estanterías, nunca en el suelo",
      "Separados de la pared y protegidos del sol",
    ],
  },
  {
    id: "frutas",
    nombre: "Frutas y verduras",
    icono: "frutas",
    temperatura: "De 8 °C a 12 °C (orientativa)",
    reglas: [
      "Espacio ventilado",
      "Cajas perforadas o rejillas",
      "Separadas de otros alimentos",
      "No lavarlas hasta el momento de uso",
      "Retirar las piezas dañadas",
    ],
  },
  {
    id: "limpieza",
    nombre: "Productos de limpieza",
    icono: "limpieza",
    temperatura: "Armario o local separado",
    reglas: [
      "Espacio cerrado y señalizado",
      "Nunca encima ni cerca de alimentos",
      "En su envase original y con su etiqueta",
    ],
  },
];

export type ItemAlmacen = {
  id: string;
  nombre: string;
  emoji: string;
  zona: string;
  pista: string;
  explicacion: string;
};

export const ITEMS_ALMACEN: ItemAlmacen[] = [
  {
    id: "a1",
    nombre: "Filetes de ternera",
    emoji: "🥩",
    zona: "refrigeracion",
    pista: "Es carne fresca: necesita de 0 °C a 4 °C.",
    explicacion: "Carne fresca tapada y etiquetada, en la parte baja de la cámara.",
  },
  {
    id: "a2",
    nombre: "Merluza fresca",
    emoji: "🐟",
    zona: "refrigeracion",
    pista: "El pescado va en la zona más fría de la cámara.",
    explicacion: "El pescado se coloca en la zona más fría de la cámara, tapado.",
  },
  {
    id: "a3",
    nombre: "Helado de vainilla",
    emoji: "🍨",
    zona: "congelador",
    pista: "Necesita -18 °C o menos.",
    explicacion: "Congelado: se guarda inmediatamente y se etiqueta con la fecha de entrada.",
  },
  {
    id: "a4",
    nombre: "Guisantes congelados",
    emoji: "🫛",
    zona: "congelador",
    pista: "Los congelados se guardan los primeros.",
    explicacion: "Al congelador sin demora, para no romper la cadena de frío.",
  },
  {
    id: "a5",
    nombre: "Saco de harina",
    emoji: "🌾",
    zona: "seco",
    pista: "Producto seco: estantería, nunca el suelo.",
    explicacion: "Almacén seco, en estantería, separado de la pared y protegido del sol.",
  },
  {
    id: "a6",
    nombre: "Latas de conserva",
    emoji: "🥫",
    zona: "seco",
    pista: "Ambiente seco entre 10 °C y 20 °C.",
    explicacion: "Conservas al almacén seco, colocando las nuevas detrás (PEPS).",
  },
  {
    id: "a7",
    nombre: "Aceite de oliva",
    emoji: "🫒",
    zona: "seco",
    pista: "Va con las conservas y las harinas.",
    explicacion: "Almacén seco, protegido del sol y del calor.",
  },
  {
    id: "a8",
    nombre: "Lechugas",
    emoji: "🥬",
    zona: "frutas",
    pista: "Espacio ventilado de 8 °C a 12 °C.",
    explicacion: "Frutas y verduras en cajas perforadas y sin lavar hasta su uso.",
  },
  {
    id: "a9",
    nombre: "Manzanas",
    emoji: "🍎",
    zona: "frutas",
    pista: "Fruta: cajas perforadas y ventilación.",
    explicacion: "Separadas de otros alimentos y retirando las piezas dañadas.",
  },
  {
    id: "a10",
    nombre: "Yogures",
    emoji: "🥛",
    zona: "refrigeracion",
    pista: "Lácteo fresco: de 0 °C a 4 °C.",
    explicacion: "Lácteos en cámara de refrigeración, tapados y etiquetados.",
  },
  {
    id: "a11",
    nombre: "Lejía alimentaria",
    emoji: "🧴",
    zona: "limpieza",
    pista: "Nunca cerca de los alimentos.",
    explicacion: "Armario cerrado y señalizado, en su envase original.",
  },
  {
    id: "a12",
    nombre: "Desengrasante",
    emoji: "🧼",
    zona: "limpieza",
    pista: "Va en un armario separado y señalizado.",
    explicacion: "Los productos de limpieza se guardan siempre separados de los alimentos.",
  },
];

export type BaldaCamara = {
  id: string;
  nombre: string;
  descripcion: string;
  emoji: string;
  posicion: number;
};

export const BALDAS_CAMARA: BaldaCamara[] = [
  {
    id: "b1",
    nombre: "Alimentos cocinados y listos para consumir",
    descripcion: "Tapados y etiquetados. Siempre arriba.",
    emoji: "🍲",
    posicion: 1,
  },
  {
    id: "b2",
    nombre: "Lácteos y productos elaborados",
    descripcion: "Tapados y etiquetados, en la zona intermedia.",
    emoji: "🧀",
    posicion: 2,
  },
  {
    id: "b3",
    nombre: "Carnes crudas",
    descripcion: "Abajo, para que no goteen sobre otros alimentos.",
    emoji: "🥩",
    posicion: 3,
  },
  {
    id: "b4",
    nombre: "Pescado crudo",
    descripcion: "En la zona más fría, la parte más baja.",
    emoji: "🐟",
    posicion: 4,
  },
];
