export const FASES_SESION = [
  { id: "f1", rango: "0-10 min", minutos: 10, titulo: "Inicio", detalle: "Pregunta motivadora, objetivo y caso real." },
  { id: "f2", rango: "10-30 min", minutos: 20, titulo: "Los seis controles", detalle: "Explicación de los seis controles de recepción." },
  { id: "f3", rango: "30-40 min", minutos: 10, titulo: "Almacenamiento y PEPS", detalle: "Zonas de almacenamiento y método PEPS/FIFO." },
  { id: "f4", rango: "40-50 min", minutos: 10, titulo: "Demostración", detalle: "Demostración del profesor con el modo proyección." },
  { id: "f5", rango: "50-75 min", minutos: 25, titulo: "Práctica en grupos", detalle: "Grupos de 3 o 4 con roles asignados." },
  { id: "f6", rango: "75-80 min", minutos: 5, titulo: "Puesta en común", detalle: "Se comparten decisiones y dudas." },
  { id: "f7", rango: "80-90 min", minutos: 10, titulo: "Cierre", detalle: "Semáforo, conclusiones y billete de salida." },
];

export const PASOS_DEMO = [
  "Lavarse las manos y preparar guantes, termómetro, albarán y bolígrafo.",
  "Revisar el vehículo, la caja de reparto y la presentación del repartidor.",
  "Comparar albarán y pedido.",
  "Revisar primero congelados, después refrigerados y finalmente productos secos.",
  "Medir y registrar la temperatura.",
  "Revisar envase, etiqueta y fecha.",
  "Comprobar aspecto, olor, color y textura.",
  "Decidir: aceptar, aceptar con observación o rechazar.",
  "Registrar la decisión y las incidencias.",
  "Retirar el embalaje exterior y guardar aplicando PEPS/FIFO.",
];

export const CRITERIOS_COTEJO = [
  { id: "k1", texto: "Se prepara correctamente: higiene de manos, guantes y materiales." },
  { id: "k2", texto: "Comprueba el albarán y su correspondencia con el pedido." },
  { id: "k3", texto: "Mide y registra correctamente la temperatura." },
  { id: "k4", texto: "Revisa el envase y detecta defectos." },
  { id: "k5", texto: "Interpreta las fechas." },
  { id: "k6", texto: "Valora aspecto, olor, color y textura." },
  { id: "k7", texto: "Decide y justifica con criterio." },
  { id: "k8", texto: "Completa correctamente la ficha de recepción." },
  { id: "k9", texto: "Coloca cada producto en su zona." },
  { id: "k10", texto: "Aplica PEPS/FIFO y evita la contaminación cruzada." },
  { id: "k11", texto: "Trabaja en equipo y respeta su rol." },
];

export const LEYENDA_COTEJO = [
  { estado: "Logrado", texto: "Domina el criterio sin ayuda." },
  { estado: "En proceso", texto: "Lo realiza con apoyo o con errores leves." },
  { estado: "No logrado", texto: "No lo realiza o comete un error grave de seguridad." },
];

export const ROLES_GRUPO = [
  { nombre: "Recepcionista", detalle: "Mide y revisa." },
  { nombre: "Secretario", detalle: "Completa la ficha." },
  { nombre: "Almacenero", detalle: "Coloca los productos." },
  { nombre: "Portavoz", detalle: "Explica las decisiones." },
];
