# Denis & Svetlana — Landing sobre la búsqueda de piso en Valencia

Landing estático (HTML/CSS/JS) para presentar a la pareja Denis (38) y Svetlana (37), sin hijos ni mascotas, que buscan un piso acogedor en Valencia.  
La página está disponible en **español** y **inglés** con un interruptor ES/EN visible en la cabecera.

## Estructura del proyecto

- `index.html` — página principal (ES por defecto, con textos que cambian a EN vía JavaScript).
- `styles.css` — estilos, diseño visual, tipografía y versión responsive.
- `script.js` — interruptor de idioma ES/EN y diccionarios de textos.
- `assets/` — carpeta pensada para futuras fotos (actualmente vacía o con placeholders).

## Cómo probar el landing en local

1. Descarga o clona este repositorio en tu ordenador.
2. Abre la carpeta del proyecto.
3. Abre el archivo `index.html` directamente en el navegador  
   (doble clic o arrastrar el archivo a una ventana de navegador).

> Nota: para que todo funcione igual que en producción, también puedes servir la carpeta con un servidor estático simple (por ejemplo `npx serve .`), pero no es obligatorio.

## Despliegue en GitHub Pages

Sigue estos pasos para publicar el sitio usando GitHub Pages:

1. Crea un nuevo repositorio en GitHub (por ejemplo `valencia-flat-landing`).
2. Sube todos los archivos del proyecto a la rama `main` del repositorio.
3. En GitHub, ve a **Settings → Pages**.
4. En la sección **Build and deployment**:
   - En **Source**, elige **Deploy from a branch**.
   - En **Branch**, selecciona `main` y la carpeta `/ (root)`.
5. Guarda los cambios. GitHub generará una URL del tipo:

   - `https://<tu-usuario>.github.io/valencia-flat-landing/`

6. Espera 1–2 minutos y abre la URL generada para comprobar que el landing se ve correctamente.

## Personalización rápida

- **Fotos**: sustituye los bloques con borde punteado por tus fotos reales:
  - Guarda tus imágenes en la carpeta `assets/`.
  - Cambia en `index.html` las zonas con las clases `photo-placeholder` por etiquetas `<img src="assets/tu-foto.jpg" alt="...">`.
- **Contactos reales**:
  - En `index.html`, busca la sección con `id="contact"`.
  - Sustituye el email, teléfono y enlaces de mensajería por tus datos reales.

## Notas técnicas

- No se usan frameworks; sólo HTML/CSS/JS plano, ideal para GitHub Pages.
- El idioma preferido del usuario se guarda en `localStorage`, por lo que la página recordará la última elección entre ES y EN.

