# 🚀 Frontend - UPLIN

Este repositorio contiene el código fuente del frontend del proyecto **UPLIN**. El desarrollo se encuentra organizado por ramas para facilitar el trabajo en equipo y mantener un flujo limpio de integración y despliegue.

---

## 📌 Objetivo

El objetivo de este repositorio es centralizar y organizar el desarrollo del frontend propio del proyecto. Para la primera versión (MVP), el producto se lanzará utilizando **Systeme.io** como plataforma base. Más adelante, se realizará una migración completa hacia un frontend personalizado desarrollado con tecnologías modernas.

---

## Tecnologías Planificadas

- **React** + **Next.js**
- **TypeScript**
- **Vercel** (para deploy)
- **TailwindCSS** (para estilos)

---

## ⚙️ Estructura de Ramas

El repositorio está organizado siguiendo un flujo de trabajo colaborativo con ramas bien definidas:

- **`main`**: rama principal, contiene solo código estable y listo para producción.
- **`dev`**: rama de integración, donde se combinan y testean los desarrollos individuales antes de pasar a producción.
- **`devTomi`**, **`devAndrea`**, **`devMarco`**: ramas personales para el desarrollo individual de cada integrante del equipo.

Cada miembro trabaja en su propia rama y, una vez completadas y probadas las funcionalidades, realiza un _pull request_ hacia `dev`. Cuando la rama `dev` alcanza un estado estable y validado, se integra a `main`.

---

## ⚠️ Estado Actual

Actualmente, el equipo está organizando la estructura inicial del proyecto. El código del frontend personalizado aún no ha sido implementado, ya que la primera versión será desplegada en Systeme.io. Este repositorio se irá completando a medida que avance la planificación y el desarrollo técnico.

---

## 🚀 Deploy

El despliegue se realizará en **[Vercel](https://vercel.com/)**, permitiendo integración continua desde GitHub y facilitando vistas previas automáticas por rama.

---

## 🤝 Colaboración

Cada integrante del equipo trabajará en su rama individual. Se recomienda mantener commits descriptivos, revisar el código antes de subir y realizar Pull Requests hacia `dev` con cambios validados y funcionales.

---

## Conclusión

Este repositorio representa el punto de partida para el desarrollo del frontend propio del proyecto. Si bien el primer MVP se lanzará sobre **Systeme.io**, ya se está planificando la migración a una solución personalizada con tecnologías modernas.

Por el momento, **no se han definido las integraciones con API ni la conexión a bases de datos**. Estas decisiones se tomarán en etapas posteriores del proyecto, en función de las necesidades y del backend que se elija implementar.

El enfoque actual está puesto en:

- Organizar el equipo y el flujo de trabajo.
- Definir las tecnologías base.
- Dejar listo el entorno para iniciar el desarrollo cuando sea necesario.
