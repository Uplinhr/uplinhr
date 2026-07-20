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
- BotPenguin (Chatbot)

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
- **devTomi, devAndre, devMarco, devDani, devMari, devVicky, devMuri** → ramas personales para el desarrollo individual de cada integrante del equipo.  

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
├── public/                          # assets estáticos
└── src/
    ├── app/                         # routing (Next.js App Router)
    │   ├── academy/
    │   ├── careers/
    │   │   └── jobOpenings/
    │   ├── cursosCompletos/
    │   │   ├── crearAreaRRHH/elegir-pais/
    │   │   ├── datosConHumanidad/elegir-pais/
    │   │   ├── liderazgoDeEquipos/elegir-pais/
    │   │   ├── maternidadYLiderazgo/elegir-pais/
    │   │   └── neuroliderazgo/elegir-pais/
    │   ├── dashboard/
    │   │   ├── admin/
    │   │   └── user/
    │   ├── login/
    │   ├── planes/
    │   ├── politicas-privacidad/
    │   ├── preguntas-frecuentes/
    │   ├── quienes-somos/
    │   ├── restablecer-clave/
    │   ├── servicios/
    │   │   ├── consultorias/
    │   │   ├── creditos/elegir-pais/
    │   │   └── ppStaffing/
    │   └── terminos-condiciones/
    │
    ├── components/                  # UI reutilizable / específica
    │   ├── adminComponents/
    │   ├── banner/
    │   ├── biblioteca/
    │   ├── BotonPrimario/
    │   ├── BotonSecundario/
    │   ├── BotonTerceario/
    │   ├── BotonVolume/
    │   ├── botPenguin/
    │   ├── Button/
    │   ├── Card/
    │   ├── CardServices/
    │   ├── careers/
    │   ├── ConsultoriasCard/
    │   ├── cursosCompletos/
    │   ├── EyebrowPill/
    │   ├── footer/
    │   ├── Login/
    │   ├── navbar/
    │   ├── planCard/
    │   ├── qaCard/
    │   ├── resetPassword/
    │   ├── ScrollToTop/
    │   ├── SectionTag/
    │   ├── ServiceHero/
    │   ├── simulador/
    │   ├── strategicAlliances/
    │   ├── Testimonios/
    │   ├── Title/
    │   └── webinars/
    │
    ├── hooks/                       # custom hooks (useSimulator, usePaquetes, etc.)
    ├── interfaces/                  # tipos TS centralizados
    ├── services/                    # capa de acceso a datos/API
    │   └── googleSheets/
    ├── store/                       # estado global (Zustand)
    ├── utils/                       # datos estáticos y helpers
    │   ├── biblioteca/
        ├── home/
        ├── legal/
        ├── planes/
        ├── preguntas-frecuentes/
        ├── quienes-somos/
        └── servicios/
            ├── consultorias/
            ├── creditos/
            ├── membresias/
            └── ppStaffing/
                └── components/
```
