# TutorAI - Asistente de Chat Educativo Potenciado por IA

Una aplicación de tutoría inteligente que combina chat basado en texto con conversaciones de voz impulsadas por la IA Conversacional de ElevenLabs.

## Descripción General del Proyecto
Nuestro proyecto de nombre "Tutor Personalizado del Idioma Inglés con Interfaces No Convencionales - TutorAI", tiene como objetivo desarrollar una plataforma interactiva que permita a los usuarios (estudiantes universitarios, docentes de idiomas, profesionales) mejorar sus habilidades de conversación en inglés. El sistema utilizará un avatar con voz realista, ofrecerá escenarios de práctica generados por IA, proporcionará retroalimentación fonética en tiempo real, lecciones estructuradas según el MCER (Marco Común Europeo de Referencia para las lenguas: A1, A2, B1, B2, C1 y C2), y funcionalidades de comunidad para fomentar el aprendizaje colaborativo y la motivación, todo ello a través de interfaces no convencionales y personalizadas.

## Funcionalidades Clave
Basado en los casos de uso del proyecto, TutorAI ofrece las siguientes funcionalidades principales:
- **Generar Escenario IA (CU-NT1):** Permitir al usuario definir un tema y un rol para una conversación simulada, donde el sistema (a través de IA) genera un diálogo dinámico para la práctica.
- **Interacción con Avatar Sonoro (CU-NT3):** Proveer una interfaz de conversación natural y atractiva mediante un avatar que responde con voz realista y ofrece retroalimentación auditiva.
- **Visualizar Dashboard de Progreso (CU-T3):** Mostrar al usuario sus estadísticas de aprendizaje, progreso en lecciones, metas alcanzadas y rachas, para motivar y darle una visión clara de su avance.
- **Generar Lección Personalizada (CU-NT6):** Elaborar, mediante IA, módulos de aprendizaje y práctica estructurados y alineados al MCER, adaptados al nivel y necesidades del usuario.
- **Participar en Reto Global de Conversación (CU-COM1):** Incentivar la práctica continua y la competencia sana mediante un desafío comunitario (ej. "30 días de conversación") con seguimiento de progreso y recompensas.
- **Gestionar Grupos de Estudio (CU-COM2):** Permitir a los usuarios crear, unirse y participar en grupos de estudio temáticos o de nivel para fomentar el aprendizaje colaborativo y el intercambio de conocimientos.
- **Realizar Intercambio de Idiomas (CU-COM3):** Facilitar la conexión entre usuarios (estudiantes y/o hablantes nativos) para sesiones de práctica conversacional mutua en un entorno seguro y estructurado.
- **Consultar Leaderboard (CU-COM4):** Mostrar un ranking de los usuarios más participativos o con mejor desempeño en retos y actividades, fomentando la motivación y la competencia.
- **Explorar y Conectar con Usuarios Online (CU-COM5):** Permitir a los usuarios ver quién está activo en la plataforma y establecer conexiones directas para práctica o colaboración espontánea.
- **Crear Contenido Docente Asistido por IA (CU-DOC1):** Facilitar a los docentes la creación de material de estudio y escenarios de práctica utilizando plantillas y sugerencias generadas por IA, optimizando su tiempo.
- **Administrar Cursos y Estudiantes (CU-DOC2):** Proveer a los docentes un panel para gestionar sus cursos, inscribir estudiantes, asignar tareas y hacer seguimiento detallado de su progreso individual y grupal.
- **Autenticación de Usuario (CU-SYS1):** Gestionar de forma segura el acceso de los usuarios a la plataforma mediante múltiples proveedores de autenticación.
- **Realizar Test de Nivel Inicial (CU-SYS2):** Evaluar el nivel de competencia en inglés del usuario (basado en MCER) al registrarse para personalizar su ruta de aprendizaje desde el inicio.

## Características Técnicas

- 🎯 **Tutoría Potenciada por IA**: Obtén ayuda con diversas materias a través de una interfaz de chat inteligente.
- 🎙️ **Conversaciones por Voz**: Habla naturalmente con el tutor de IA utilizando la tecnología de voz de ElevenLabs.
- 🌐 **Actividad de Voz en Tiempo Real**: La retroalimentación visual muestra cuándo la IA está escuchando o hablando.
- 💬 **Soporte de Modo Dual**: Cambia entre chat de texto y conversaciones por voz.
- 🎨 **Interfaz de Usuario Moderna**: Interfaz limpia y receptiva con indicadores de voz animados.
- 🔊 **Controles de Audio**: Ajuste de volumen, funcionalidad de silencio y selección de micrófono.

## Prerrequisitos

- Node.js 18 o posterior
- Una cuenta de [ElevenLabs](https://elevenlabs.io) con acceso API
- Un agente de IA Conversacional de ElevenLabs configurado

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/yourusername/tutor-ai.git
cd tutor-ai
```

2. Instala las dependencias:
```bash
pnpm install
# o
npm install
# o
yarn install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

4. Configura tu archivo `.env.local`:
```env
# Configuración de ElevenLabs
ELEVENLABS_API_KEY=tu_clave_api_aqui
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=tu_id_de_agente_aqui
```

## Primeros Pasos

1. Ejecuta el servidor de desarrollo:
```bash
pnpm dev
# o
npm run dev
# o
yarn dev
```

2. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

3. Navega a un chat o haz clic en "Nueva Conversación" para comenzar.

4. Haz clic en el botón del micrófono para habilitar las conversaciones por voz.

## Configuración del Agente de ElevenLabs

### Tipos de Agentes y Autenticación

Los agentes de ElevenLabs vienen en dos tipos:

1. **Agentes Públicos**: Se puede acceder directamente solo con el ID del agente.
2. **Agentes Privados**: Requieren autenticación del lado del servidor con clave API.

### Pasos de Configuración

1. **Crea tu agente** en el [Panel de ElevenLabs](https://elevenlabs.io/app/conversational-ai).
2. **Configura los ajustes de voz**:
   - Asegúrate de que la voz esté habilitada (no en modo solo texto).
   - Selecciona el modelo de voz apropiado.
   - Haz coincidir la configuración de idioma con tu uso previsto.
3. **Anota el tipo de tu agente**:
   - Agentes públicos: Copia el ID del agente.
   - Agentes privados: Copia el ID del agente y genera una clave API.

### Importante: No se Necesita Configuración de Eventos de Cliente

A diferencia de lo que algunos tutoriales antiguos podrían sugerir, **NO** necesitas configurar eventos de cliente en el panel. El SDK maneja los eventos de transcripción automáticamente a través de la devolución de llamada `onMessage`.

### Prueba de Funciones de Voz

Visita `/test-docs` para una interfaz de prueba que sigue la documentación oficial exactamente. Esta página incluye:
- Alternar entre modos de agente público/privado.
- Registro de mensajes en tiempo real.
- Información detallada de depuración.

Para la interfaz de prueba original con características adicionales, visita `/test-elevenlabs`.

## Estructura del Proyecto

```
tutor-ai/
├── src/
│   ├── app/              # Páginas del enrutador de la aplicación Next.js
│   │   ├── chat/        # Componentes relacionados con el chat
│   │   └── layout/      # Componentes de diseño (barras laterales, etc.)
│   ├── hooks/           # Hooks personalizados de React
│   │   └── useElevenLabsChat.ts  # Integración con ElevenLabs
│   └── providers/       # Proveedores de contexto
├── public/              # Activos estáticos
└── .env.local          # Variables de entorno
```

## Solución de Problemas

### Las Transcripciones de Voz No Funcionan

1. **Revisa la consola del navegador** en busca de mensajes de error.
2. **Verifica que los permisos del micrófono** estén concedidos.
3. **Asegúrate de la configuración del agente** en el panel de ElevenLabs:
   - La voz está habilitada (no solo texto).
   - La configuración de idioma es correcta.
   - Ninguna configuración de privacidad bloquea las transcripciones.

### Sin Salida de Audio

1. Revisa el volumen del sistema y los permisos de audio del navegador.
2. Verifica que el agente de IA tenga una voz seleccionada.
3. Asegúrate de que no haya configuraciones de silencio activas.

### Problemas de Conexión

1. Verifica que tu clave API sea correcta.
2. Comprueba que el ID del agente coincida con tu agente de ElevenLabs.
3. Asegúrate de tener una conexión a internet activa.

## Características Clave Explicadas

### Detección de Actividad de Voz
La aplicación monitorea la entrada del micrófono y proporciona retroalimentación visual:
- **Efectos de onda** cuando se detecta voz.
- **Medidor de nivel de audio** que muestra el volumen de entrada.
- **Indicadores de estado** para los estados de escucha/habla.

### Selección de Micrófono
- Detecta automáticamente los micrófonos disponibles.
- Guarda la preferencia en localStorage.
- Permite cambiar entre dispositivos.

### Historial de Mensajes
- Muestra transcripciones tanto de texto como de voz.
- Diferencia entre mensajes del usuario y de la IA.
- Muestra marcas de tiempo para cada mensaje.

## Desarrollo

### Scripts Disponibles

- `pnpm dev` - Iniciar servidor de desarrollo
- `pnpm build` - Compilar para producción
- `pnpm start` - Iniciar servidor de producción
- `pnpm lint` - Ejecutar ESLint

### Pila Tecnológica

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **IA de Voz**: ElevenLabs Conversational AI
- **Iconos**: Lucide React
- **Gestión de Estado**: React Context + Hooks

## Diagrama de Módulos de la Aplicación (Rutas de <code>src/app/</code>)

Este diagrama ilustra los principales módulos de ruta dentro del directorio `src/app/`:

```mermaid
classDiagram
    direction BT
    class src_app as "src/app" {
        <<Directorio>>
    }
    class api_module as "api" {
        <<Módulo de Ruta>>
        "- /elevenlabs-signed-url"
    }
    class chat_module as "chat" {
        <<Módulo de Ruta>>
        "- /[id]"
    }
    class community_module as "community" {
        <<Módulo de Ruta>>
        "- / (índice)"
    }
    class dashboard_module as "dashboard" {
        <<Módulo de Ruta>>
        "- / (índice)"
    }
    class lessons_module as "lessons" {
        <<Módulo de Ruta>>
        "- /[lessonId]"
    }
    class test_docs_module as "test-docs" {
        <<Módulo de Ruta>>
        "- / (índice)"
    }
    class test_elevenlabs_module as "test-elevenlabs" {
        <<Módulo de Ruta>>
        "- / (índice)"
    }

    src_app --> api_module : contiene
    src_app --> chat_module : contiene
    src_app --> community_module : contiene
    src_app --> dashboard_module : contiene
    src_app --> lessons_module : contiene
    src_app --> test_docs_module : contiene
    src_app --> test_elevenlabs_module : contiene
```

## Contribuciones

1. Haz un fork del repositorio.
2. Crea tu rama de funcionalidad (`git checkout -b feature/amazing-feature`).
3. Confirma tus cambios (`git commit -m 'Add amazing feature'`).
4. Empuja a la rama (`git push origin feature/amazing-feature`).
5. Abre una Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

## Agradecimientos

- [ElevenLabs](https://elevenlabs.io) por la increíble tecnología de IA de voz.
- [Next.js](https://nextjs.org) por el potente framework de React.
- [Tailwind CSS](https://tailwindcss.com) por el framework CSS de utilidad primero.
