import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("message", (msg: string) => {
    console.log("Message:", msg);
    socket.emit("message", `Echo: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

console.log("Socket.IO server running on http://localhost:3001");
