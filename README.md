# 🎨 Paletize

**Paletize** es una herramienta web que permite extraer automáticamente las paletas de colores utilizadas en cualquier repositorio público de GitHub. Es ideal para desarrolladores y diseñadores que desean conocer los colores que inspiran proyectos reales.

![Captura Principal](./screenshots/home.png)

---

## 🌐 Demo en producción

👉 [paletize.vercel.app](https://paletize.vercel.app)

---

## 🧠 ¿Cómo funciona?

1. El usuario inicia sesión (puede usar Google, GitHub o un usuario personalizado).
2. Ingresa la URL de un repositorio público de GitHub.
3. La aplicación analiza el código del proyecto y extrae todos los colores encontrados en archivos CSS, SCSS, JS, JSX, TS, TSX y otros.
4. Se genera una paleta visual con los colores utilizados en ese repositorio.

---

## ✨ Características principales

- Autenticación segura con Clerk.
- Extracción inteligente de colores desde cualquier repositorio.
- Interfaz intuitiva y moderna.
- Diseño responsive.
- Copia rápida del color al portapapeles con notificación toast.
- Ejemplos de prueba incluidos para facilitar el uso.

---

## 🔐 Autenticación con Clerk

Para garantizar que solo usuarios autenticados puedan generar paletas, utilizamos [**Clerk**](https://clerk.dev):

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
| **Vercel**       | Hosting y despliegue del proyecto          |

---

## 📸 Capturas de pantalla

### 🏠 Pantalla principal
![Pantalla principal](./screenshots/home.png)

### 🔐 Autenticación con Clerk
![Inicio de sesión](./screenshots/login.png)

### 🎨 Paleta de colores generada
![Paleta generada](./screenshots/palette.png)

> Puedes reemplazar estos archivos en la carpeta `/screenshots`.

---

## 🧪 Repositorios de ejemplo

Si no sabes por dónde empezar, puedes probar con estos repositorios populares:

- `https://github.com/lolalolitaland.com`
- `https://github.com/la-velada-web-oficial`
- `https://github.com/jsconf.es`

---

## ⚙️ Cómo correr el proyecto localmente

```bash
git clone https://github.com/tu-usuario/paletize.git
cd paletize
npm install
npm run dev
