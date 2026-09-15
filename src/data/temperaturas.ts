export type FilaTemperatura = {
  id: string;
  familia: string;
  correcta: string;
  rechazo: string;
  min: number;
  max: number;
  limiteRechazo: number;
};

export const TABLA_TEMPERATURAS: FilaTemperatura[] = [
  {
    id: "refrigerados",
    familia: "Refrigerados en general",
    correcta: "De 0 °C a 4 °C",
    rechazo: "Rechazar si supera 6 °C",
    min: 0,
    max: 4,
    limiteRechazo: 6,
  },
  {
    id: "carnes",
    familia: "Carnes frescas",
    correcta: "De 0 °C a 4 °C",
    rechazo: "Rechazar si supera 6 °C",
    min: 0,
    max: 4,
    limiteRechazo: 6,
  },
  {
    id: "pescado",
    familia: "Pescado fresco",
    correcta: "De 0 °C a 2 °C y sobre hielo",
    rechazo: "Rechazar si supera 4 °C o llega sin hielo",
    min: 0,
    max: 2,
    limiteRechazo: 4,
  },
  {
    id: "lacteos",
    familia: "Lácteos y huevo líquido",
    correcta: "De 0 °C a 4 °C",
    rechazo: "Rechazar si supera 6 °C",
    min: 0,
    max: 4,
    limiteRechazo: 6,
  },
  {
    id: "congelados",
    familia: "Congelados",
    correcta: "-18 °C o más frío",
    rechazo: "Rechazar si supera -12 °C o presenta señales de descongelación",
    min: -30,
    max: -18,
    limiteRechazo: -12,
  },
  {
    id: "secos",
    familia: "Productos secos y conservas",
    correcta: "Ambiente seco entre 10 °C y 20 °C",
    rechazo: "Rechazar si se han almacenado al sol o en ambiente húmedo",
    min: 10,
    max: 20,
    limiteRechazo: 20,
  },
];

export const AVISO_SONDA =
  "El termómetro debe estar limpio y desinfectado. La sonda se desinfecta antes y después de cada medición.";
