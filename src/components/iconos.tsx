import {
  Box,
  CalendarDays,
  Thermometer,
  Eye,
  Truck,
  ClipboardList,
  Refrigerator,
  Snowflake,
  Package,
  Apple,
  SprayCan,
  type LucideIcon,
} from "lucide-react";

const LECCION: Record<string, LucideIcon> = {
  caja: Box,
  calendario: CalendarDays,
  termometro: Thermometer,
  ojo: Eye,
  camion: Truck,
  albaran: ClipboardList,
};

const ZONA: Record<string, LucideIcon> = {
  refrigeracion: Refrigerator,
  congelador: Snowflake,
  seco: Package,
  frutas: Apple,
  limpieza: SprayCan,
};

export function iconoLeccion(clave: string): LucideIcon {
  return LECCION[clave] ?? Box;
}

export function iconoZona(clave: string): LucideIcon {
  return ZONA[clave] ?? Package;
}
