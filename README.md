# DOCUMENTACIÓN FRONTEND - UPLIN
Este repositorio contiene el código fuente del equipo **Frontend** del proyecto **UPLIN**.  
El desarrollo se encuentra organizado por ramas para facilitar el trabajo en equipo y mantener un flujo limpio de integración y despliegue.

## 🚀 Tecnologías Planificadas
- React + Next.js  
- TypeScript  
- TailwindCSS (para estilos)  
- Framer Motion (para animaciones)  
- React Icons (para íconos)  
- Vercel (para deploy)  

## ⚙️ Instalación y ejecución
Clonar el repositorio:  
```bash
git clone https://github.com/Uplinhr/uplinhr.git
```
Instalar dependencias:  
```bash
npm install
```
Ejecutar en modo desarrollo:  
```bash
npm run dev
```

## 🔑 Variables de entorno
Crear un archivo **`.env.local`** en la raíz del proyecto con el siguiente contenido:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000   # para trabajar en local
NEXT_PUBLIC_API_URL=http://backend-uplin.vercel.app   # para el deploy, NO usar en local
```

## 🌿 Estructura de Ramas
El repositorio está organizado siguiendo un flujo de trabajo colaborativo con ramas bien definidas:
- **main** → rama principal, contiene solo código estable y listo para producción.  
- **dev** → rama de integración, donde se combinan y testean los desarrollos individuales antes de pasar a producción.  
- **devTomi, devAndre, devMarco, devDani, devMari, devVicky** → ramas personales para el desarrollo individual de cada integrante del equipo.  

Cada miembro trabaja en su propia rama y, una vez completadas y probadas las funcionalidades, realiza un **pull request** hacia `dev`.  
Cuando la rama `dev` alcanza un estado estable y validado, se integra a `main` donde automáticamente se hará el deploy en Vercel.

## 🤝 Colaboración
Cada integrante del equipo trabajará en su rama individual. Se recomienda:
- Mantener commits descriptivos.  
- Revisar el código antes de subir.  
- Hacer un `git pull` en la rama correspondiente antes de subir cambios, para evitar conflictos y errores.  
- Realizar **Pull Requests hacia `dev`** solo con cambios validados y funcionales.  

## 📂 Estructura del Proyecto
```
uplinhr/
├── public/                 # Imágenes y contenido necesario para la web
├── src/                    # Código fuente del frontend
│   ├── app/                # Páginas y redirecciones (Next.js App Router, NO son client components)
│   │   ├── academy/        # Submódulo academy
│   │   ├── careers/        # Careers y vacantes
│   │   ├── cursosCompletos/# Páginas de cursos completos
│   │   └── dashboard/      # Dashboard de user y admin
│   ├── components/         # Componentes reutilizables
│   │   ├── navbar/
│   │   ├── footer/
│   │   ├── login/
│   │   ├── webinars/
│   │   ├── admincomponents/ # Pestañas del dashboard admin
│   │   └── ProtectedRoute.tsx # Protección de rutas de UPLIN Management
│   ├── interfaces/         # Tipos e interfaces TypeScript (centralizadas en index.ts)
│   ├── services/           # Conexión con el backend usando fetch + try/catch
│   │   ├── adminService.ts   # Servicios relacionados al dashboard admin
│   │   ├── authService.ts    # Inicio de sesión
│   │   └── userService.ts    # Servicios de usuario
│   ├── store/              # Estados globales con Zustand
│   │   ├── useAdminStore.ts
│   │   ├── useAuthStore.ts
│   │   └── useUserStore.ts
│   ├── utils/              # Funciones utilitarias y datos estáticos
│   │   ├── webinarsData.ts   # Texto para generar cards automáticamente
│   │   ├── cursosCompletos/
│   │   ├── cardDetails.ts
│   │   └── faqs.ts           # Módulos de cada curso (genera las cards)
│   └── views/              # Vistas client-side
│       ├── careers/          # Pages de careers y vacantes
│       ├── cursosCompletos/  # Pages de cada curso completo
│       └── dashboard/        # Pages de dashboard user y admin
```
