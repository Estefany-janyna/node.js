
//var http = require('http');
//var fs = require('fs'); // Corregir el require, debe ser 'fs', no ''
//var servidor = http.createServer(function(solicitud, respuesta) {
  // Leer el archivo HTML
//  fs.readFile('./HTML/index.html', 'utf-8', function(error, html) {
 //   if (error) {
      // Manejar errores, por ejemplo, si el archivo no existe
 //     respuesta.writeHead(404);
 //     respuesta.end('Archivo no encontrado');
 //   } else {
      // Si se lee el archivo correctamente, responder con el contenido HTML
 //     respuesta.writeHead(200, {'Content-Type': 'text/html'});
 //     respuesta.write(html);
 //     respuesta.end();
 //   }
//  });
//}).listen(8080);


//var http = require('http');
//var fs = require('fs');//

//http.createServer(function(solicitud, respuesta){
//    if(solicitud){
//        fs.createServer('./HTML/index.html',function(error,html){
//            respuesta.write(html);
//            respuesta.end();
 //       
 //       });
//    }else{
//        fs.createServer('./HTML/index.html',function(error,html){
  //          respuesta.write(html);
    //        respuesta.end();
//   }
//    
//}).listen(8080);



var http = require('http');
var fs = require('fs');
var url = require('url'); // Importar el módulo 'url' para gestionar las rutas

http.createServer(function(solicitud, respuesta) {
  var pagina;
  var paginaSolicitada = url.parse(solicitud.url).pathname; // Obtener la ruta de la solicitud

  // Determinar qué página se solicita y asignar el nombre del archivo correspondiente
  if (paginaSolicitada === '/' || paginaSolicitada === '/inicio') {
    pagina = './HTML/index.html';
  } else if (paginaSolicitada === '/nosotros') {
    pagina = './HTML/nosotros.html';
  } else if (paginaSolicitada === '/contactanos') {
    pagina = './HTML/contactanos.html';
  } else {
    // Si la página solicitada no se encuentra, responder con un error 404
    respuesta.writeHead(404);
    respuesta.end('Página no encontrada');
    return;
  }

  // Leer el archivo HTML correspondiente y responder
  fs.readFile(pagina, 'utf-8', function(error, html) {
    if (error) {
      respuesta.writeHead(500); // Error interno del servidor
      respuesta.end('Error interno del servidor');
    } else {
      respuesta.writeHead(200, { 'Content-Type': 'text/html' });
      respuesta.write(html);
      respuesta.end();
    }
  });
}).listen(8080);

console.log('Servidor escuchando en http://localhost:8080');
