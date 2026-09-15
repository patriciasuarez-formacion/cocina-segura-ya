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

export const ICONOS_LECCION: Record<string, LucideIcon> = {
  caja: Box,
  calendario: CalendarDays,
  termometro: Thermometer,
  ojo: Eye,
  camion: Truck,
  albaran: ClipboardList,
};

export const ICONOS_ZONA: Record<string, LucideIcon> = {
  refrigeracion: Refrigerator,
  congelador: Snowflake,
  seco: Package,
  frutas: Apple,
  limpieza: SprayCan,
};
