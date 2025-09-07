// netlify/functions/get-products.js
const { Octokit } = require('@octokit/rest');

exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json'
  };

  // Manejar preflight request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    // Verificar variables de entorno
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO;
    
    if (!githubToken || !githubRepo) {
      // Si no hay configuración de GitHub, devolver productos de ejemplo
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          productos: getExampleProducts(),
          ultimaActualizacion: new Date().toISOString(),
          source: 'fallback'
        })
      };
    }

    // Inicializar Octokit
    const octokit = new Octokit({
      auth: githubToken
    });

    const [owner, repo] = githubRepo.split('/');
    const filePath = 'data/products.json';

    try {
      // Obtener el contenido del archivo
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: filePath
      });

      // Decodificar el contenido
      const content = Buffer.from(fileData.content, 'base64').toString('utf8');
      const productsData = JSON.parse(content);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(productsData)
      };

    } catch (fileError) {
      // Si el archivo no existe, devolver productos de ejemplo
      console.log('Archivo products.json no encontrado, usando productos de ejemplo');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          productos: getExampleProducts(),
          ultimaActualizacion: new Date().toISOString(),
          source: 'example'
        })
      };
    }

  } catch (error) {
    console.error('Error en get-products:', error);
    
    // En caso de error, devolver productos de ejemplo
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        productos: getExampleProducts(),
        ultimaActualizacion: new Date().toISOString(),
        source: 'error-fallback',
        error: error.message
      })
    };
  }
};

function getExampleProducts() {
  return [
    {
      id: 1,
      titulo: "Camiseta Premium",
      precio: 45000,
      descripcion: "Camiseta de alta calidad, 100% algodón. Perfecta para uso diario con un diseño moderno y cómodo.",
      imagen: "default.jpg",
      activo: true,
      fecha: new Date().toISOString()
    },
    {
      id: 2,
      titulo: "Zapatos Deportivos",
      precio: 120000,
      descripcion: "Zapatos deportivos premium con tecnología de absorción de impacto. Ideales para correr y entrenar.",
      imagen: "default.jpg",
      activo: true,
      fecha: new Date().toISOString()
    },
    {
      id: 3,
      titulo: "Mochila Ejecutiva",
      precio: 80000,
      descripcion: "Mochila perfecta para profesionales. Compartimento para laptop, resistente al agua y diseño elegante.",
      imagen: "default.jpg",
      activo: true,
      fecha: new Date().toISOString()
    },
    {
      id: 4,
      titulo: "Reloj Inteligente",
      precio: 250000,
      descripcion: "Smartwatch con múltiples funciones de salud, GPS integrado y batería de larga duración.",
      imagen: "default.jpg",
      activo: true,
      fecha: new Date().toISOString()
    }
  ];
}
