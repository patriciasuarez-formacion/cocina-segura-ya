export type Insignia = {
  id: string;
  nombre: string;
  emoji: string;
  comoSeGana: string;
};

export const INSIGNIAS: Insignia[] = [
  { id: "envases", nombre: "Inspector de envases", emoji: "📦", comoSeGana: "Termina la lección del envase y acierta sus casos en la práctica." },
  { id: "frio", nombre: "Guardián del frío", emoji: "🌡️", comoSeGana: "Termina la lección de temperatura y supera el reto del semáforo." },
  { id: "fechas", nombre: "Experto en fechas", emoji: "📅", comoSeGana: "Termina la lección de fechas y acierta los casos de caducidad." },
  { id: "almacen", nombre: "Almacenero seguro", emoji: "🏷️", comoSeGana: "Completa la actividad de almacenamiento por zonas." },
  { id: "peps", nombre: "Maestro PEPS", emoji: "🔁", comoSeGana: "Completa la actividad de PEPS/FIFO." },
  { id: "pedido", nombre: "Pedido perfecto", emoji: "🧾", comoSeGana: "Completa el nivel 3 de la práctica con 80 % de aciertos." },
];
