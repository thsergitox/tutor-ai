Nuestro proyecto de nombre “Tutor Personalizado del Idioma Inglés con Interfaces No Convencionales - TutorAI”, tiene como objetivo desarrollar una plataforma interactiva que permita a los usuarios (estudiantes universitarios, docentes de idiomas, profesionales) mejorar sus habilidades de conversación en inglés. El sistema utilizará un avatar con voz realista, ofrecerá escenarios de práctica generados por IA, proporcionará retroalimentación fonética en tiempo real, lecciones estructuradas según el MCER,Marco Común Europeo de Referencia para las lenguas básicamente el A1, 2, B1, B2, C1 y C2, y funcionalidades de comunidad para fomentar el aprendizaje colaborativo y la motivación, todo ello a través de interfaces no convencionales y personalizadas.

Ahora, respecto a implementar un módulo de ayuda contextual potenciado con IA a nuestro proyecto; actualmente nuestro tutor personalizado y avatar sonoro, ya cumple con la capacidad de un módulo como este, pues nuestro sistema no solo responde a las entradas del usuario, sino que también analiza su progreso, errores y contexto de uso para ofrecer retroalimentación personalizada, adaptar el contenido y guiar la conversación. Por lo tanto, el 'módulo de ayuda potenciado por IA' que se solicita para este parcial ya está acoplado en el proyecto, por lo que los siguientes puntos a tomar para esta pregunta 1, se responderán con mucha naturalidad sin realizar cambios drásticos en la arquitectura e idea misma de nuestro proyecto.
Punto a)
Comencemos disponiendo la lista de todos los casos de uso definidos actualmente en mi proyecto, para luego en el punto c proceder con sus definiciones formales de caso de uso (flujo de eventos, precondiciones, postcondiciones y flujos alternativos):

1.  CU-NT1: Generar Escenario IA
Propósito: Permitir al usuario definir un tema y un rol para una conversación simulada, donde el sistema (a través de IA) genera un diálogo dinámico para la práctica.
2.  CU-NT3: Interacción con Avatar Sonoro
Propósito: Proveer una interfaz de conversación natural y atractiva mediante un avatar que responde con voz realista y ofrece retroalimentación auditiva.
3.  CU-T3: Visualizar Dashboard de Progreso
 Propósito: Mostrar al usuario sus estadísticas de aprendizaje, progreso en lecciones, metas alcanzadas y rachas, para motivar y darle una visión clara de su avance.
4.  CU-NT6: Generar Lección Personalizada
Propósito: Elaborar, mediante IA, módulos de aprendizaje y práctica estructurados y alineados al MCER, adaptados al nivel y necesidades del usuario.
5.  CU-COM1: Participar en Reto Global de Conversación 
Propósito: Incentivar la práctica continua y la competencia sana mediante un desafío comunitario (ej. "30 días de conversación") con seguimiento de progreso y recompensas.
6.  CU-COM2: Gestionar Grupos de Estudio
Propósito: Permitir a los usuarios crear, unirse y participar en grupos de estudio temáticos o de nivel para fomentar el aprendizaje colaborativo y el intercambio de conocimientos.
7.  CU-COM3: Realizar Intercambio de Idiomas 
Propósito: Facilitar la conexión entre usuarios (estudiantes y/o hablantes nativos) para sesiones de práctica conversacional mutua en un entorno seguro y estructurado.
8.  CU-COM4: Consultar Leaderboard
Propósito: Mostrar un ranking de los usuarios más participativos o con mejor desempeño en retos y actividades, fomentando la motivación y la competencia.
9. CU-COM5: Explorar y Conectar con Usuarios Online
Propósito: Permitir a los usuarios ver quién está activo en la plataforma y establecer conexiones directas para práctica o colaboración espontánea.
10. CU-DOC1: Crear Contenido Docente Asistido por IA
Propósito: Facilitar a los docentes la creación de material de estudio y escenarios de práctica utilizando plantillas y sugerencias generadas por IA, optimizando su tiempo.
11. CU-DOC2: Administrar Cursos y Estudiantes
Propósito: Proveer a los docentes un panel para gestionar sus cursos, inscribir estudiantes, asignar tareas y hacer seguimiento detallado de su progreso individual y grupal.
12. CU-SYS1: Autenticación de Usuario
Propósito: Gestionar de forma segura el acceso de los usuarios a la plataforma mediante múltiples proveedores de autenticación.
13. CU-SYS2: Realizar Test de Nivel Inicial
Propósito: Evaluar el nivel de competencia en inglés del usuario (basado en MCER) al registrarse para personalizar su ruta de aprendizaje desde el inicio.