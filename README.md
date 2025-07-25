# 🚀 Frontend - UPLIN

Este repositorio contiene el código fuente del frontend del proyecto **UPLIN**. El desarrollo se encuentra organizado por ramas para facilitar el trabajo en equipo y mantener un flujo limpio de integración y despliegue.

---

## 📌 Objetivo

El objetivo de este repositorio es centralizar y organizar el desarrollo del frontend propio del proyecto. Para la primera versión (MVP), el producto se lanzará utilizando **Systeme.io** como plataforma base. Más adelante, se realizará una migración completa hacia un frontend personalizado desarrollado con tecnologías modernas.

---

## 🧰 Tecnologías Planificadas

- **React** + **Next.js**
- **TypeScript**
- **TailwindCSS** (para estilos)
- **Vercel** (para deploy)
- **React Icons** (para íconos)
- **Framer Motion** (para animaciones)
- **Vercel** (para deploy)
- **React Icons** (para íconos)
- **Framer Motion** (para animaciones)

---

## ⚙️ Estructura de Ramas

El repositorio está organizado siguiendo un flujo de trabajo colaborativo con ramas bien definidas:

- **`main`**: rama principal, contiene solo código estable y listo para producción.
- **`dev`**: rama de integración, donde se combinan y testean los desarrollos individuales antes de pasar a producción.
- **`devTomi`**, **`devAndrea`**, **`devMarco`**: ramas personales para el desarrollo individual de cada integrante del equipo.

Cada miembro trabaja en su propia rama y, una vez completadas y probadas las funcionalidades, realiza un _pull request_ hacia `dev`. Cuando la rama `dev` alcanza un estado estable y validado, se integra a `main`.

---

## 🗂️ Estructura del Proyecto

La estructura actual del proyecto está organizada de la siguiente manera:

```
uplin-frontend/
├── public/                 # Archivos públicos accesibles desde la raíz (imágenes, íconos, etc.)
├── src/                    # Código fuente del frontend
│   ├── app/                # Entradas principales (rutas con Next.js App Router)
│   ├── components/         # Componentes reutilizables
│   ├── interfaces/         # Tipos e interfaces TypeScript
│   ├── utils/              # Funciones utilitarias y helpers para renderización de componentes
│   └── views/              # Vistas principales organizadas por página o feature

---

## 🤝 Colaboración

Cada integrante del equipo trabajará en su rama individual. Se recomienda mantener commits descriptivos, revisar el código antes de subir y realizar Pull Requests hacia dev con cambios validados y funcionales.