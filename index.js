const path     = require("path");
const express  = require("express");
const app      = express();
const readline = require('readline');
const rl       = readline.createInterface({
                  input: process.stdin,
                  output: process.stdout
                });

const usuario  = {
                   nombre:"",
                   mensaje:""
                  };

app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname,"public")));

const server = app.listen(app.get("port"),() => {
  
})

const socketIO  = require("socket.io");
const io        = socketIO(server);

//Uso de Socket.io para el intercambio de info
io.on("connection", (socket) =>{
  socket.on("chat", (info) => {
    io.sockets.emit("chat", info);
    console.log(`${info.userName} : ${info.message}`);
  })
})

//Uso de ReadLine para recibir datos desde terminal
rl.question('Usuario: ', (respuesta) => {
  console.log(`Bienvenido ${respuesta}`);
    usuario.nombre = respuesta;
    rl.setPrompt(`Escribe tu mensaje ó salir para salir\n`);
    rl.prompt();
    rl.on("line", (mensaje) =>{
      if(mensaje !== "salir"){
        console.log(`${usuario.nombre} : ${mensaje}`);
        io.sockets.emit("chat", {userName:usuario.nombre,message:mensaje});
        rl.setPrompt(`Escribe tu mensaje ó salir para salir\n`);
        rl.prompt();
      }else{
        console.log(`Adiós ${respuesta}`);
        rl.close();
      }
    })
});
