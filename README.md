# Cocina Segura Ya

Crea una aplicación web educativa completa, responsive e interactiva llamada “La puerta de la cocina”, dirigida a alumnado de primer curso de Grado Básico de Cocina.

La aplicación servirá para aprender y practicar la recepción, el control y el almacenamiento correcto de materias primas en una cocina profesional.

IDIOMA Y NIVEL

Todo el contenido debe estar en español.

Utiliza frases cortas, vocabulario claro y explicaciones adecuadas para alumnado de nivel inicial.

Evita bloques largos de texto.

Destaca visualmente las ideas importantes.

Cuando aparezca un término técnico, incluye una explicación sencilla.

No añadas datos técnicos o sanitarios que no estén especificados en este prompt.

No inventes normativa, temperaturas ni procedimientos adicionales.

OBJETIVO DE APRENDIZAJE

Al finalizar el recorrido, el alumno debe ser capaz de:

Recibir un pedido de materias primas.

Aplicar los seis controles básicos de recepción.

Decidir si un producto se acepta, se acepta con observación o se rechaza.

Justificar su decisión.

Registrar la recepción correctamente.

Guardar cada producto en la zona adecuada.

Aplicar el método PEPS/FIFO.

Evitar la contaminación cruzada.

CONCEPTO VISUAL

Diseña una interfaz moderna, amable y profesional inspirada en una cocina didáctica.

Paleta de colores:

Verde para “Aceptar”.

Amarillo o ámbar para “Aceptar con observación”.

Rojo para “Rechazar”.

Azul oscuro o gris carbón para navegación y encabezados.

Fondo crema o gris muy claro.

Blanco para tarjetas y zonas de contenido.

Estilo:

Limpio, juvenil y accesible.

Tarjetas grandes con bordes redondeados.

Iconos fáciles de reconocer: termómetro, calendario, caja, nariz, ojo, cámara frigorífica, congelador, almacén, productos de limpieza y semáforo.

Botones grandes y fáciles de pulsar.

Tipografía sans serif muy legible.

Buen contraste de color.

Evita que el color sea el único indicador: acompáñalo siempre con texto e iconos.

Incluye animaciones discretas al responder actividades.

Usa ilustraciones o iconos de alimentos y cocina, no fotografías desagradables de productos deteriorados.

ARQUITECTURA DE LA APLICACIÓN

Crea dos recorridos principales:

Modo Alumno.

Modo Profesor.

La pantalla inicial debe incluir:

Título: “La puerta de la cocina”.

Subtítulo: “Si no entra bien, no sale bien”.

Texto breve: “Aprende a recibir, revisar y guardar alimentos de forma segura”.

Botón “Entrar como alumno”.

Botón “Entrar como profesor”.

Indicador visual de progreso para el modo alumno.

No es necesario implementar autenticación real en la primera versión. El cambio de modo puede hacerse mediante botones. Diseña la estructura para que posteriormente se pueda añadir inicio de sesión y base de datos.

NAVEGACIÓN DEL MODO ALUMNO

Incluye estas secciones:

Inicio.

Aprende.

Practica.

Almacena.

Reto del semáforo.

Evaluación.

Mi progreso.

Permite avanzar paso a paso, pero también volver a una sección anterior.

PÁGINA DE INICIO DEL ALUMNO

Muestra:

Un saludo sencillo.

El objetivo de la sesión.

Duración estimada: 90 minutos.

Una pregunta motivadora:

“¿Qué pasa si entra en la cocina un pollo a 12 °C y nadie lo comprueba?”

Incluye tres respuestas seleccionables:

No pasa nada.

Puede romperse la cadena de frío y causar un riesgo.

Se guarda directamente en el congelador.

La respuesta correcta es la segunda. Después de responder, muestra esta idea:

“La seguridad alimentaria empieza en la puerta de recepción, no en el fuego”.

Presenta también las tres decisiones posibles mediante tarjetas:

ACEPTAR: el producto cumple los controles.

ACEPTAR CON OBSERVACIÓN: el producto puede entrar, pero hay que registrar una incidencia y avisar al proveedor.

RECHAZAR: existe un incumplimiento o riesgo que impide aceptar el producto.

SECCIÓN APRENDE

Crea seis lecciones breves, una por cada control de recepción. Cada lección debe incluir:

Icono.

Explicación sencilla.

Ejemplo correcto.

Señal de alarma.

Una pregunta rápida.

Botón “Entendido, continuar”.

LECCIÓN 1. ESTADO DEL ENVASE

Explicación:

“El envase protege el alimento. Si el envase falla, el alimento puede dejar de ser seguro”.

Señales de rechazo:

Envase roto.

Envase abierto.

Envase abombado.

Óxido.

Caja mojada.

Golpes fuertes.

Pérdida del envasado al vacío.

Bolsa hinchada o floja.

Lata abollada en el cierre.

Lata abombada.

Idea destacada:

“Una lata abombada o abollada en el cierre se rechaza siempre”.

LECCIÓN 2. FECHAS

Explica visualmente la diferencia:

Fecha de caducidad:

Se utiliza en productos como carne, pescado y lácteos frescos.

Marca un límite de seguridad.

Si está vencida, el producto se rechaza.

Consumo preferente:

Aparece en productos como arroz, pasta y conservas.

Se relaciona principalmente con la calidad.

En una cocina profesional no se acepta un producto con la fecha superada.

Regla práctica del curso:

“Si queda menos de un tercio de la vida útil y el producto no se utilizará enseguida, se rechaza o se acepta con observación”.

LECCIÓN 3. TEMPERATURA

Crea una tabla visual y tarjetas de consulta rápida con estos datos exactos:

Refrigerados en general: temperatura correcta de 0 °C a 4 °C. Rechazar si supera 6 °C.

Carnes frescas: temperatura correcta de 0 °C a 4 °C. Rechazar si supera 6 °C.

Pescado fresco: temperatura correcta de 0 °C a 2 °C y sobre hielo. Rechazar si supera 4 °C o llega sin hielo.

Lácteos y huevo líquido: temperatura correcta de 0 °C a 4 °C. Rechazar si supera 6 °C.

Congelados: -18 °C o más frío. Rechazar si supera -12 °C o presenta señales de descongelación.

Productos secos y conservas: ambiente seco entre 10 °C y 20 °C. Rechazar si se han almacenado al sol o en un ambiente húmedo.

Añade una demostración interactiva de un termómetro. El alumno debe seleccionar la temperatura observada y decidir si acepta o rechaza el producto.

Incluye esta instrucción:

“El termómetro debe estar limpio y desinfectado. La sonda se desinfecta antes y después de cada medición”.

LECCIÓN 4. ASPECTO, OLOR, COLOR Y TEXTURA

Presenta una comparación visual:

Aspecto correcto:

Limpio.

Sin moho.

Sin líquidos extraños.

Señales de alarma:

Moho.

Baba.

Hielo interior en productos congelados.

Olor correcto:

Propio del alimento.

Suave.

Señales de alarma:

Ácido.

Amoniacal.

Rancio.

Olor a cerrado.

Color correcto:

Vivo.

Uniforme.

Señales de alarma:

Verdoso.

Gris.

Manchas oscuras.

Textura correcta:

Firme.

Elástica.

Señales de alarma:

Blanda.

Pegajosa.

Viscosa.

Reseca.

LECCIÓN 5. LIMPIEZA DEL TRANSPORTE

Explica que también se revisan:

El vehículo.

La caja de reparto.

La ropa y las manos del repartidor.

La ausencia de restos, suciedad, animales y malos olores.

La separación entre alimentos crudos y alimentos listos para consumir.

El mantenimiento del frío.

Idea destacada:

“Un transporte sucio o sin frío puede ser motivo de rechazo aunque el producto parezca correcto”.

LECCIÓN 6. CORRESPONDENCIA CON EL PEDIDO

El alumno debe comparar el pedido, el albarán y la mercancía recibida.

Elementos que debe comprobar:

Producto.

Marca.

Calibre o formato.

Cantidad.

Peso.

Precio.

Idea destacada:

“Nunca se firma un albarán sin comprobar antes la mercancía”.

Si faltan productos, sobran unidades o llega otra referencia, debe anotarse la incidencia antes de firmar.

SECCIÓN PRACTICA

Crea una simulación interactiva titulada “Recibe tu pedido”.

El alumno recibe una caja virtual con productos. Cada producto debe abrirse como una tarjeta con:

Nombre.

Ilustración.

Temperatura.

Estado del envase.

Fecha.

Aspecto y olor.

Información del albarán.

Zona de almacenamiento propuesta.

El alumno debe revisar los datos y seleccionar:

Aceptar.

Aceptar con observación.

Rechazar.

Después debe escribir o seleccionar el motivo.

No muestres la respuesta correcta hasta que el alumno confirme. Después ofrece:

Corrección inmediata.

Explicación breve.

Control que debía aplicar.

Puntos obtenidos.

Botón para pasar al siguiente producto.

Utiliza estos diez casos:

CASO 1

Producto: bandeja de pollo fresco.

Datos:

Temperatura: 11 °C.

Líquido acumulado en la bandeja.

Respuesta esperada:

“Rechazar por rotura de la cadena de frío”.

CASO 2

Producto: lata de tomate triturado.

Datos:

Lata abombada.

Óxido en el borde.

Respuesta esperada:

“Rechazar por riesgo grave y falta de integridad del envase. No abrir ni probar”.

CASO 3

Producto: brik de leche entera.

Datos:

Fecha de caducidad vencida hace cuatro días.

Respuesta esperada:

“Rechazar porque el producto está caducado”.

CASO 4

Producto: bolsa de guisantes congelados.

Datos:

Bloque duro de hielo en el interior.

Bolsa blanda.

Respuesta esperada:

“Rechazar porque presenta indicios de descongelación y recongelación”.

CASO 5

Producto: merluza fresca.

Datos:

Llega sin hielo.

Ojos hundidos.

Olor amoniacal.

Respuesta esperada:

“Rechazar porque el pescado no es apto”.

CASO 6

Producto: queso rallado envasado.

Datos:

Bolsa perforada.

Ha perdido el vacío.

Respuesta esperada:

“Rechazar porque el envase no está íntegro”.

CASO 7

Producto: saco de arroz de 5 kg.

Datos:

Producto interior correcto.

Saco mojado por fuera y sucio de barro.

Respuesta esperada:

“Aceptar con observación, trasladar el producto a un recipiente limpio y registrar la incidencia”.

CASO 8

Producto: tarrina de nata para montar.

Datos:

Etiqueta incompleta.

No se leen el lote ni la fecha.

Respuesta esperada:

“Rechazar porque no se puede garantizar la trazabilidad”.

CASO 9

Producto: caja de tomates.

Datos:

Se pidieron 10 kg.

Llegan 7 kg.

Tres piezas tienen moho.

Respuesta esperada:

“Aceptar con observación, registrar la cantidad que falta y retirar las piezas con moho”.

CASO 10

Producto: garrafa de desinfectante.

Datos:

Llega dentro de la misma caja que los alimentos.

Respuesta esperada:

“Aceptar con observación, separar inmediatamente y avisar al proveedor”.

Añade tres productos correctos para practicar la decisión “Aceptar”:

Pasta seca con envase íntegro, fecha vigente y pedido correcto.

Aceite con envase limpio, cerrado y albarán correcto.

Conserva sin golpes, óxido ni abombamiento y con fecha vigente.

Incluye tres niveles:

Nivel 1: cinco productos y pistas visibles.

Nivel 2: diez productos con alguna ayuda.

Nivel 3: pedido completo sin pistas.

SECCIÓN ALMACENA

Crea una actividad de arrastrar y soltar. El alumno debe colocar cada producto en una de estas zonas:

CÁMARA DE REFRIGERACIÓN

Temperatura: de 0 °C a 4 °C.

Carnes, pescados, lácteos y productos elaborados.

Todo debe estar tapado y etiquetado.

En la parte superior: alimentos cocinados y listos para consumir.

En la parte inferior: alimentos crudos.

El pescado se sitúa en la zona más fría.

CONGELADOR

Temperatura: -18 °C o menos.

Los congelados deben guardarse inmediatamente.

No se debe romper la cadena de frío.

Nunca se recongela un producto descongelado.

Debe etiquetarse con la fecha de entrada.

ALMACÉN SECO

Temperatura orientativa: de 10 °C a 20 °C.

Espacio seco y ventilado.

Para harinas, arroz, pasta, legumbres, conservas y aceite.

Los productos se colocan en estanterías.

Nunca se dejan en el suelo.

Deben separarse de la pared y protegerse del sol.

FRUTAS Y VERDURAS

Temperatura orientativa: de 8 °C a 12 °C.

Espacio ventilado.

Utilizar cajas perforadas o rejillas.

Mantenerlas separadas de otros alimentos.

No lavarlas hasta el momento de uso.

Retirar las piezas dañadas.

PRODUCTOS DE LIMPIEZA

Guardar siempre en un armario o local separado.

El espacio debe estar cerrado y señalizado.

Nunca colocar productos de limpieza encima o cerca de alimentos.

Mantenerlos en su envase original y con su etiqueta.

Cuando el alumno coloque un producto:

Si acierta, muestra una confirmación y una explicación breve.

Si falla, permite un segundo intento y ofrece una pista.

No penalices el primer error en el nivel inicial.

Añade una segunda actividad para ordenar verticalmente una cámara:

Alimentos cocinados y listos para consumir arriba.

Alimentos crudos abajo.

Pescado en la zona más fría.

Todo tapado y etiquetado.

SECCIÓN PEPS FIFO

Crea una explicación animada del método PEPS/FIFO:

“Primero En Entrar, Primero En Salir. Lo que llegó antes se utiliza antes”.

Representa una estantería con productos antiguos y nuevos.

El alumno debe realizar tres acciones:

Etiquetar cada producto con la fecha de entrada y la fecha de caducidad.

Colocar los productos nuevos detrás o debajo.

Elegir primero el producto más antiguo situado delante.

Explica sus ventajas:

Reduce el desperdicio.

Evita productos caducados.

Reduce costes.

Mejora la seguridad alimentaria.

Incluye también esta ampliación:

“PCPS o FEFO significa que se utiliza primero el producto que caduca antes. Es especialmente útil con productos frescos”.

SECCIÓN NORMAS DE HIGIENE Y SEGURIDAD

Crea una lista interactiva de comprobación con estas normas:

Lavarse las manos antes y después de la recepción.

Lavarse las manos al cambiar de tipo de producto.

Utilizar ropa de trabajo completa.

Usar chaquetilla, delantal, gorro y calzado antideslizante.

Utilizar guantes limpios cuando corresponda.

Guardar refrigerados y congelados en menos de 15 minutos.

Separar productos crudos de cocinados.

Separar alimentos de productos de limpieza.

Retirar el cartón exterior antes de entrar en la cámara.

Desinfectar la sonda antes y después de medir.

No colocar ningún producto en el suelo.

Levantar pesos utilizando las piernas y no la espalda.

Mantener el suelo seco y los pasillos despejados.

Tapar y etiquetar cualquier producto que cambie de envase.

Incluir en la etiqueta el nombre, la fecha de entrada y la fecha límite.

RETO DEL SEMÁFORO

Crea un juego rápido con ocho situaciones. Cada situación aparece durante 20 segundos y el alumno debe pulsar:

Verde: aceptar.

Amarillo: aceptar con observación.

Rojo: rechazar.

Casos:

Yogur a 3 °C y con fecha correcta: verde.

Lata abombada: rojo.

Saco de harina en el suelo del camión: amarillo.

Langostinos congelados con escarcha interior: rojo.

Lechugas con dos hojas deterioradas: amarillo.

Leche caducada ayer: rojo.

Aceite correcto: verde.

Carne a 8 °C: rojo.

Después de cada respuesta:

Indica si es correcta.

Muestra una justificación en una frase.

Enseña el control que debía aplicarse.

Actualiza la puntuación.

Al finalizar, muestra:

Número de aciertos.

Porcentaje.

Controles que conviene repasar.

Botón “Repetir”.

Botón “Continuar a la evaluación”.

FICHA DIGITAL DE RECEPCIÓN

Crea un formulario que permita registrar:

Nombre o número del grupo.

Fecha.

Hora.

Responsable.

Producto.

Cantidad.

Fecha del producto.

Temperatura.

Estado del envase.

Estado de la fecha.

Decisión: aceptar, aceptar con observación o rechazar.

Motivo.

Firma o nombre del receptor.

Firma o nombre del proveedor.

Funciones:

Añadir y eliminar filas de productos.

Validar los campos obligatorios.

Mostrar errores con lenguaje sencillo.

Guardar borrador automáticamente en el navegador.

Imprimir la ficha.

Exportarla a PDF si la función puede implementarse de forma estable.

Reiniciar la ficha mediante un cuadro de confirmación.

EVALUACIÓN FINAL

Incluye cinco preguntas:

¿A qué temperatura se recibe un refrigerado y un congelado?

Respuesta esperada:

“Los refrigerados se reciben entre 0 °C y 4 °C y se rechazan por encima de 6 °C. Los congelados deben llegar a -18 °C o más fríos y se rechazan por encima de -12 °C o si muestran señales de descongelación”.

Llega una lata abombada y con óxido. ¿Qué haces?

Respuesta esperada:

“Se rechaza. No se abre ni se prueba porque el envase no es seguro”.

¿Cuál es la diferencia entre caducidad y consumo preferente?

Respuesta esperada:

“La caducidad marca un límite de seguridad. El consumo preferente se relaciona principalmente con la calidad. En cocina profesional no se aceptan productos con ninguna de las dos fechas superada”.

¿Qué significa PEPS/FIFO?

Respuesta esperada:

“Primero en entrar, primero en salir. Lo nuevo se coloca detrás o debajo y se utiliza antes lo más antiguo”.

Indica tres medidas para evitar la contaminación cruzada.

Respuestas válidas:

Separar crudos y cocinados.

Colocar cocinados arriba y crudos abajo.

Retirar el cartón exterior.

Separar los productos de limpieza.

Lavarse las manos.

Desinfectar la sonda.

Tapar y etiquetar los alimentos.

Utiliza distintos tipos de pregunta:

Opción múltiple.

Verdadero o falso.

Clasificación.

Respuesta breve.

Caso práctico.

La puntuación total será sobre 10.

Criterios de resultado:

De 8 a 10: “¡Muy buen trabajo! Puedes recibir un pedido con seguridad”.

De 5 a 7,9: “Vas por buen camino. Revisa los controles indicados”.

Menos de 5: “Necesitas practicar un poco más. Repite las actividades con pistas”.

Permite repetir la evaluación y conserva el mejor resultado.

BILLETE DE SALIDA

Al terminar, solicita dos respuestas:

“Hoy he aprendido que…”

“Lo que más me costó decidir fue…”

Guárdalas junto con el resultado de la sesión.

MI PROGRESO

Crea un panel para el alumno con:

Porcentaje total completado.

Lecciones terminadas.

Aciertos en la práctica.

Puntuación del semáforo.

Mejor nota de evaluación.

Insignias conseguidas.

Controles que necesita repasar.

Insignias:

“Inspector de envases”.

“Guardián del frío”.

“Experto en fechas”.

“Almacenero seguro”.

“Maestro PEPS”.

“Pedido perfecto”.

Guarda el progreso inicialmente mediante localStorage para que no se pierda al recargar la página.

MODO PROFESOR

Crea un panel diferenciado con estas secciones:

Guía de la sesión.

Modo demostración.

Resultados.

Fichas de recepción.

Lista de cotejo.

Configuración de actividades.

GUÍA DE LA SESIÓN DE 90 MINUTOS

Muestra una línea temporal y un temporizador opcional:

Minutos 0-10: inicio, pregunta motivadora, objetivo y caso real.

Minutos 10-30: explicación de los seis controles.

Minutos 30-40: almacenamiento por zonas y método PEPS/FIFO.

Minutos 40-50: demostración del profesor.

Minutos 50-75: práctica en grupos.

Minutos 75-80: puesta en común.

Minutos 80-90: semáforo, conclusiones y billete de salida.

Permite marcar cada fase como completada.

MODO DEMOSTRACIÓN

Crea una vista para proyectar en el aula con texto grande y navegación paso a paso:

Lavarse las manos y preparar guantes, termómetro, albarán y bolígrafo.

Revisar el vehículo, la caja de reparto y la presentación del repartidor.

Comparar albarán y pedido.

Revisar primero congelados, después refrigerados y finalmente productos secos.

Medir y registrar la temperatura.

Revisar envase, etiqueta y fecha.

Comprobar aspecto, olor, color y textura.

Decidir: aceptar, aceptar con observación o rechazar.

Registrar la decisión y las incidencias.

Retirar el embalaje exterior y guardar aplicando PEPS/FIFO.

Incluye botones “Anterior”, “Siguiente” y “Ver todo”.

LISTA DE COTEJO DEL PROFESOR

Crea una tabla editable con tres estados:

Logrado.

En proceso.

No logrado.

Criterios:

Se prepara correctamente: higiene de manos, guantes y materiales.

Comprueba el albarán y su correspondencia con el pedido.

Mide y registra correctamente la temperatura.

Revisa el envase y detecta defectos.

Interpreta las fechas.

Valora aspecto, olor, color y textura.

Decide y justifica con criterio.

Completa correctamente la ficha de recepción.

Coloca cada producto en su zona.

Aplica PEPS/FIFO y evita la contaminación cruzada.

Trabaja en equipo y respeta su rol.

Permite:

Escribir el nombre del alumno o grupo.

Añadir observaciones.

Guardar la evaluación.

Imprimirla.

Exportarla a PDF o CSV si es técnicamente estable.

Incluye esta leyenda:

Logrado: domina el criterio sin ayuda.

En proceso: lo realiza con apoyo o con errores leves.

No logrado: no lo realiza o comete un error grave de seguridad.

PRÁCTICA EN GRUPOS

Incluye una herramienta para formar grupos de tres o cuatro alumnos y asignar estos roles:

Recepcionista: mide y revisa.

Secretario: completa la ficha.

Almacenero: coloca los productos.

Portavoz: explica las decisiones.

Permite rotar los roles en una nueva ronda.

ADAPTACIONES DE ACCESIBILIDAD Y APRENDIZAJE

Incluye un botón visible llamado “Modo de apoyo”.

Cuando esté activado:

Reduce la práctica a cinco productos.

Utiliza defectos muy visibles.

Sustituye respuestas escritas por casillas.

Muestra pictogramas de termómetro, envase, calendario, olor y semáforo.

Mantiene visibles las temperaturas clave.

Presenta una instrucción cada vez.

Ofrece más tiempo.

Lee las instrucciones en voz alta mediante la síntesis de voz del navegador si está disponible.

Permite aumentar el tamaño del texto.

Elimina animaciones si el usuario prefiere movimiento reducido.

Permite realizar la evaluación mediante selección visual en lugar de escritura extensa.

La aplicación debe poder utilizarse completamente con teclado y debe incluir etiquetas accesibles para lectores de pantalla.

DATOS Y PRIVACIDAD

Para la primera versión:

Utiliza datos simulados.

Guarda progreso, fichas y evaluaciones en localStorage.

No solicites apellidos, correo electrónico ni otros datos personales.

Añade una opción para borrar todos los datos guardados en el dispositivo.

Separa claramente los datos de demostración de los datos introducidos por el usuario.

Prepara la arquitectura para una futura integración con Supabase, pero no hagas que Supabase sea obligatorio para ejecutar la primera versión.

COMPONENTES REUTILIZABLES

Crea componentes para:

Tarjeta de producto.

Selector del semáforo.

Indicador de temperatura.

Tarjeta de control.

Zona de almacenamiento.

Barra de progreso.

Pregunta de evaluación.

Tabla de resultados.

Lista de cotejo.

Insignia.

Temporizador de clase.

Mensajes de corrección.

REQUISITOS TÉCNICOS

Utiliza React y TypeScript.

Utiliza Tailwind CSS.

Emplea componentes de shadcn/ui cuando sean apropiados.

Utiliza Lucide React para los iconos.

Organiza el código en componentes pequeños y reutilizables.

Mantén los contenidos educativos separados de los componentes visuales mediante archivos de datos.

Implementa rutas claras para cada sección.

Haz que la aplicación funcione correctamente en ordenador, tableta y móvil.

Evita dependencias innecesarias.

No dejes botones sin funcionalidad.

No utilices texto de relleno.

No muestres errores técnicos al alumnado.

Incluye estados vacíos, carga y confirmación cuando corresponda.

Añade una opción de impresión con estilos limpios para fichas y evaluaciones.

Comprueba que no haya desbordamientos horizontales.

Mantén visibles los botones principales en pantallas pequeñas.

CRITERIOS DE CALIDAD

La aplicación final debe:

Ser comprensible para un alumno que entra por primera vez.

Mostrar una acción principal clara en cada pantalla.

Ofrecer respuesta inmediata en todas las actividades.

Explicar los errores sin ridiculizar ni penalizar.

Permitir repetir las actividades.

Mantener coherencia entre temperaturas, decisiones y explicaciones.

Diferenciar claramente el modo alumno y el modo profesor.

Ser accesible y funcionar con teclado.

Conservar el progreso al recargar.

Tener una experiencia visual atractiva sin parecer infantil.

Estar completamente terminada y navegable.

ORDEN DE IMPLEMENTACIÓN

Construye primero una versión funcional completa con:

Pantalla inicial.

Modo alumno.

Seis lecciones.

Simulación de productos.

Actividad de almacenamiento.

Juego del semáforo.

Evaluación.

Progreso con localStorage.

Modo profesor.

Lista de cotejo e impresión.

Después revisa toda la aplicación y corrige:

Enlaces o botones que no funcionen.

Textos cortados.

Problemas de visualización móvil.

Incoherencias de puntuación.

Errores en las respuestas correctas.

Falta de contraste o etiquetas accesibles.

Entrega una aplicación funcional, no solamente un diseño estático.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a6011c58-d668-4513-8c0a-496345a838da).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
