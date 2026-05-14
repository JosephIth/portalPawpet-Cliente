# PawPet Portal Cliente

## Descripción

PawPet Portal Cliente es la interfaz de usuario frontend para el sistema de gestión veterinaria PawPet. Esta aplicación React permite a los dueños de mascotas acceder a sus perfiles, ver información de sus mascotas, consultar historiales médicos y gestionar citas veterinarias.

Esta aplicación forma parte de una arquitectura de microservicios que incluye:
- **BFF (Backend for Frontend)**: API Gateway que coordina las llamadas a los microservicios
- **Microservicio de Autenticación**: Manejo de usuarios y tokens JWT
- **Microservicio de Pacientes**: Gestión de información de mascotas
- **Microservicio de Historial**: Registros médicos y vacunaciones

## Características

- **Autenticación segura**: Login y registro con tokens JWT
- **Gestión de mascotas**: Ver y gestionar información de mascotas
- **Historial médico**: Consultar consultas, vacunaciones y tratamientos
- **Interfaz responsiva**: Diseño adaptativo para móviles y desktop
- **UI moderna**: Componentes estilizados con Pets UI Library
- **Actualización en tiempo real**: Recarga automática durante desarrollo

## Requisitos Previos

Antes de instalar y ejecutar la aplicación, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** o **yarn** (viene incluido con Node.js)
- **Git** (para clonar el repositorio)

### Servicios Backend Requeridos

Para que la aplicación funcione completamente, necesitas tener corriendo los siguientes servicios backend:

- BFF en `http://localhost:3000`
- Microservicio de Autenticación en `http://localhost:3001`
- Microservicio de Pacientes en `http://localhost:3002`
- Microservicio de Historial en `http://localhost:3003`

## Instalación

1. **Clona el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd pawpet-portal-cliente
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura las variables de entorno** (opcional):
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

   Si no configuras esta variable, la aplicación usará `http://localhost:3000` por defecto.

## Ejecución

### Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Construcción para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `build/`.

### Ejecutar Tests

Para ejecutar los tests:

```bash
npm test
```

## Estructura del Proyecto

```
pawpet-portal-cliente/
├── public/                 # Archivos estáticos
│   ├── index.html         # HTML principal
│   ├── manifest.json      # Manifiesto PWA
│   └── favicon.ico        # Icono de la aplicación
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── context/           # Contextos de React (AuthContext)
│   ├── pages/             # Páginas/componentes de rutas
│   │   ├── Home.js        # Página principal
│   │   ├── Login.js       # Página de login
│   │   ├── Register.js    # Página de registro
│   │   ├── Pets.js        # Lista de mascotas
│   │   ├── PetDetails.js  # Detalles de mascota
│   │   └── History.js     # Historial médico
│   ├── services/          # Servicios de API
│   │   ├── api.js         # Configuración base de Axios
│   │   ├── authService.js # Servicios de autenticación
│   │   ├── patientService.js # Servicios de pacientes
│   │   └── historialService.js # Servicios de historial
│   ├── App.js             # Componente principal
│   ├── App.css            # Estilos globales
│   └── index.js           # Punto de entrada
├── package.json           # Dependencias y scripts
└── README.md              # Este archivo
```

## Tecnologías Utilizadas

- **React 18**: Framework principal
- **React Router**: Navegación entre páginas
- **Axios**: Cliente HTTP para llamadas API
- **Pets UI Library**: Biblioteca de componentes UI personalizada
- **CSS Modules**: Estilos modulares
- **Create React App**: Herramienta de construcción
- **ESLint**: Linting de código
- **Jest**: Framework de testing

## Configuración Adicional

### Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `REACT_APP_API_URL` | URL del BFF | `http://localhost:3000` |

### Personalización

- **Título de la aplicación**: Modifica `<title>` en `public/index.html`
- **Icono**: Reemplaza `public/favicon.ico` y actualiza referencias en `public/index.html`
- **Manifiesto PWA**: Edita `public/manifest.json` para configuración de app instalable

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Para soporte técnico o preguntas:
- Revisa la documentación de los microservicios backend
- Verifica que todos los servicios estén corriendo
- Consulta los logs de la consola del navegador para errores

---

Desarrollado con ❤️ para amantes de las mascotas
