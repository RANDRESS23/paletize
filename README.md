# 🎨 Paletize - Obten paletas de colores de tus proyectos de GitHub

**Paletize** es una herramienta web que permite extraer automáticamente las paletas de colores utilizadas en cualquier repositorio público de GitHub. Es ideal para desarrolladores y diseñadores que desean conocer los colores que inspiran proyectos reales.

![paletize](https://github.com/user-attachments/assets/1b105747-67f9-405b-887a-bdb308763ad2)


---

## 🌐 Demo en producción

👉 [paletize.vercel.app](https://paletize.vercel.app)

---

## 🧠 ¿Cómo funciona?

1. El usuario inicia sesión (puede usar Google, GitHub o un usuario personalizado).
2. Ingresa la URL de un repositorio público de GitHub.
3. La aplicación analiza el código del proyecto y extrae todos los colores encontrados en archivos CSS, SCSS, SASS, HTML, y otros.
4. Se genera una paleta visual con los colores utilizados en ese repositorio.

---

## ✨ Características principales

- Autenticación segura con Clerk.
- Extracción inteligente de colores desde cualquier repositorio.
- Interfaz intuitiva y moderna.
- Diseño responsive.
- Copia rápida del color al portapapeles.
- Ejemplos de prueba incluidos para facilitar el uso.

---

## 🔐 Autenticación con Clerk

Para garantizar que solo usuarios autenticados puedan generar paletas, utilizamos [**Clerk**](https://clerk.com/):

- Permite inicio de sesión con Google, GitHub o nombre de usuario.
- Solo los usuarios logueados pueden analizar repositorios y generar paletas.
- Clerk se encarga de toda la gestión de usuarios y sesiones de manera segura y eficiente.

---

## 🛠️ Tecnologías utilizadas

| Tecnología       | Uso                                      |
|------------------|-------------------------------------------|
| **React**        | Librería principal para la interfaz        |
| **Next.js**      | Framework de React con renderizado SSR    |
| **Tailwind CSS** | Diseño rápido, responsive y moderno        |
| **Clerk**        | Autenticación segura                       |
| **Sonner**       | Notificaciones tipo toast elegantes        |
| **Lucide Icons** | Íconos ligeros y modernos                  |
| **GitHub REST API** | Para obtener el contenido de los repos |
| **DeepSeek API** | Para obtener la paleta de colores de los repos |
| **Vercel**       | Hosting y despliegue del proyecto          |

---

## 📸 Capturas de pantalla

### 🏠 Pantalla principal
![paletize](https://github.com/user-attachments/assets/88a89a4e-08ae-4474-a893-a1319bf0fc0e)

### 🔐 Autenticación con Clerk
![paletize-clerk](https://github.com/user-attachments/assets/b34cf6c0-7573-4e3e-be51-8bf8a1effdec)

### 🎨 Paleta de colores generada
![paletize-palette](https://github.com/user-attachments/assets/122917c3-5413-4b2e-aefc-5e597e747509)

---

## 🧪 Repositorios de ejemplo

Si no sabes por dónde empezar, puedes probar con estos repositorios populares:

- `https://github.com/midudev/lolalolitaland.com`
- `https://github.com/midudev/la-velada-web-oficial`
- `https://github.com/midudev/jsconf.es`

---

## ⚙️ Cómo correr el proyecto localmente

```bash
git clone https://github.com/RANDRESS23/paletize.git
cd paletize
pnpm install
pnpm run dev
