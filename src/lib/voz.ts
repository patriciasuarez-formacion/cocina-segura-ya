/** Lectura en voz alta con la síntesis del navegador, si está disponible. */
export function leerEnVozAlta(texto: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  try {
    window.speechSynthesis.cancel();
    const mensaje = new SpeechSynthesisUtterance(texto);
    mensaje.lang = "es-ES";
    mensaje.rate = 0.95;
    window.speechSynthesis.speak(mensaje);
    return true;
  } catch {
    return false;
  }
}

export function pararVoz() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}
