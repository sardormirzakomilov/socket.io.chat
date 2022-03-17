const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const formatMassage = require("./utils/formatMass");
const { userJoin, getCarentUser, leaveUser ,joinRoom } = require("./utils/users");

const bot = "Chat bot";

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room); //   join - yangi hona yaratiw//userni kirgan honasi

    const users = joinRoom(user.room)

    socket.emit('roomUsers' , users)

    socket.emit("message", formatMassage(bot, " welcome to group")); //// emit() tarqatiw bitta userga(grupaga hush kelibsiz)

    socket.broadcast
      .to(user.room)
      .emit("message", formatMassage(bot, `${user.username} joined the group`));
    ////hammaga  tarqatadi userdan bowqa(user grupaga qoshildi)
  });

  socket.on("chat-message", (msg) => {
    // console.log(msg);

    const user = getCarentUser(socket.id);
    // console.log(user);
    io.to(user.room).emit("message", formatMassage(user.username, msg)); // user valuesidagi habarni obrobotka qilib yana userga "hodisa" hodisasi bn jonatiw
  });

  //   io.emit('msg' ,'salom hamma')
  socket.on("disconnect", () => {
    const user = leaveUser(socket.id);

    // console.log('Left user =>', user);
    io.to(user.room).emit("message",formatMassage(bot, `${user.username} left the chat`)
    );
  });
});

const port = normalizePort(process.env.PORT || '3000')
app.set("port", port);

server.listen(port, () => {
  console.log("server >>>", port, "() ()");
  console.log("server >>>", port, "(^.^)");
  console.log("server >>>", port, "(> <)");
  console.log("server >>>", port, " U U");
});

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
      // named pipe
      return val;
  }

  if (port >= 0) {
      // port number
      return port;
  }

  return false;
}


