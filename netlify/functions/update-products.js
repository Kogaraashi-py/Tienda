// netlify/functions/update-products.js
const { Octokit } = require('@octokit/rest');

exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  // Manejar preflight request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
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
      throw new Error('Configuración de GitHub incompleta');
    }

    // Parsear datos del request
    const { productos } = JSON.parse(event.body);
    
    if (!productos) {
      throw new Error('Datos de productos faltantes');
    }

    // Inicializar Octokit
    const octokit = new Octokit({
      auth: githubToken
    });

    const [owner, repo] = githubRepo.split('/');
    const filePath = 'data/products.json';

    // Obtener el SHA actual del archivo (si existe)
    let sha = null;
    try {
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: filePath
      });
      sha = fileData.sha;
    } catch (error) {
      // El archivo no existe aún, sha permanece null
      console.log('Archivo no existe, se creará uno nuevo');
    }

    // Preparar el contenido JSON
    const content = JSON.stringify({
      productos: productos,
      ultimaActualizacion: new Date().toISOString()
    }, null, 2);

    // Codificar en base64
    const contentEncoded = Buffer.from(content).toString('base64');

    // Actualizar o crear el archivo
    const commitData = {
      owner,
      repo,
      path: filePath,
      message: `Actualizar productos - ${new Date().toISOString()}`,
      content: contentEncoded,
      committer: {
        name: 'Mi Tienda Admin',
        email: 'admin@mitienda.com'
      }
    };

    if (sha) {
      commitData.sha = sha;
    }

    await octokit.rest.repos.createOrUpdateFileContents(commitData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Productos actualizados correctamente',
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error en update-products:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error interno del servidor',
        details: error.message
      })
    };
  }
};
