# 🛍️ Mi Tienda - E-commerce con Panel Admin

Una tienda online completa con panel de administrador, construida para desplegar en Netlify.

## ✨ Características

### 🏪 Tienda Pública
- ✅ Catálogo de productos responsivo
- 🔍 Búsqueda y filtros en tiempo real  
- 🛒 Carrito de compras funcional
- 📱 Integración con WhatsApp para pedidos
- 🎨 Diseño moderno y atractivo
- 📱 Completamente responsive

### 🔧 Panel de Administrador
- 🔐 Login seguro con contraseña
- ➕ Agregar/eliminar productos
- 📷 Subida de imágenes con drag & drop
- 💾 Actualización automática vía GitHub API
- 🔄 Copia de seguridad automática
- 📊 Vista detallada de productos

## 🚀 Despliegue Rápido

### 1. Preparar el Repositorio

```bash
# Clonar o crear nuevo repositorio
git clone https://github.com/tu-usuario/mi-tienda.git
cd mi-tienda

# Crear la estructura de carpetas
mkdir -p public/assets/{images,css,js}
mkdir -p netlify/functions
mkdir -p data

# Copiar archivos según la estructura del proyecto
```

### 2. Estructura de Archivos

```
mi-tienda/
├── public/
│   ├── index.html              # Página principal (tienda)
│   ├── admin.html              # Panel de administrador
│   └── assets/
│       └── images/
│           └── default.jpg     # Imagen por defecto
├── netlify/
│   └── functions/
│       ├── update-products.js  # Actualizar productos
│       └── get-products.js     # Obtener productos  
├── data/
│   └── products.json          # Base de datos de productos
├── netlify.toml               # Configuración Netlify
├── package.json               # Dependencias
└── README.md                  # Este archivo
```

### 3. Configurar GitHub

1. **Crear Token Personal:**
   - Ve a GitHub → Settings → Developer settings → Personal access tokens
   - Genera un token con permisos `repo`
   - Guarda el token de forma segura

2. **Subir código a GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

### 4. Configurar Netlify

1. **Conectar Repositorio:**
   - Ve a [Netlify](https://netlify.com)
   - New site from Git → GitHub
   - Selecciona tu repositorio

2. **Configurar Variables de Entorno:**
   En Site settings → Environment variables, agrega:
   ```
   GITHUB_TOKEN=ghp_tu_token_aqui
   GITHUB_REPO=tu-usuario/mi-tienda
   ```

3. **Deploy Settings:**
   - Build command: `npm install` (opcional)
   - Publish directory: `public`
   - Functions directory: `netlify/functions`

### 5. Personalizar

**Cambiar datos de contacto:**
```javascript
// En index.html, línea ~X
const WHATSAPP_NUMBER = '573001234567'; // Tu número de WhatsApp

// En admin.html, línea ~X  
const ADMIN_KEY = 'mitienda2024'; // Tu clave secreta
```

**Personalizar diseño:**
- Modifica los colores en las variables CSS
- Cambia el nombre de la tienda en los headers
- Agrega tu logo reemplazando los emojis

## 🔧 Uso del Sistema

### Panel de Administrador

1. **Acceder:** `tu-sitio.netlify.app/admin`
2. **Login:** Usar la clave configurada (`mitienda2024` por defecto)
3. **Agregar productos:**
   - Completar formulario
   - Subir imagen (opcional)
   - Marcar como activo
   - Guardar

### Tienda Pública

1. **Ver productos:** Los productos aparecen automáticamente
2. **Buscar:** Usar la barra de búsqueda
3. **Filtrar:** Usar los botones de filtro
4. **Comprar:** 
   - Agregar al carrito
   - O comprar directamente vía WhatsApp

## 🔄 Flujo de Actualización

```
Admin sube producto → Netlify Function → GitHub API → products.json actualizado → Tienda se actualiza automáticamente
```

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Instalar Netlify CLI
npm install -g netlify-cli

# Iniciar desarrollo local
netlify dev

# Sitio disponible en: http://localhost:8888
```

## 📱 Integración WhatsApp

El sistema envía automáticamente mensajes estructurados:

```
🛒 NUEVO PEDIDO

• Camiseta Premium - $45.000 x1
• Zapatos Deportivos - $120.000 x1

💰 Total: $165.000

¡Hola! Me gustaría realizar este pedido...
```

## 🔒 Seguridad

- ✅ Headers de seguridad configurados
- ✅ Validación de entrada en formularios
- ✅ Tokens de GitHub como variables de entorno
- ✅ CORS habilitado solo para dominios necesarios

## 🐛 Solución de Problemas

### Productos no se actualizan
- Verificar variables de entorno en Netlify
- Revisar permisos del token de GitHub
- Comprobar logs en Netlify Functions

### Imágenes no aparecen
- Subir imagen `default.jpg` a `/public/assets/images/`
- Verificar rutas de imágenes en el código

### Error de CORS
- Verificar configuración en `netlify.toml`
- Revisar headers en las funciones

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en Netlify
2. Verifica la consola del navegador
3. Comprueba que todas las variables estén configuradas

## 📄 Licencia

MIT License - Puedes usar este código libremente para tus proyectos.

---

¡Tu tienda está lista! 🎉 

Visita `tu-sitio.netlify.app` para ver la tienda y `tu-sitio.netlify.app/admin` para gestionar productos.
