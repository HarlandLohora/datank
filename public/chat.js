const socket = io();
let mensaje  = document.getElementById("mensajes");
let usuario  = document.getElementById("usuario");
let btn      = document.getElementById("enviar");
let ventana   = document.getElementById("ventana");

//Listener del boton de enviar
btn.addEventListener("click", () => {
  if(mensaje.value !== "" && usuario.value !==""){
    socket.emit("chat", {
      message: mensaje.value,
      userName: usuario.value
    })
    mensaje.value="";
  }
})


socket.on("chat", (info) => {
  ventana.innerHTML += `<p><strong>${info.userName}</strong>:${info.message}</p>`
  message.innerHTML = "";
});
