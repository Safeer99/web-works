import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/lib/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const userSocketMap: Record<string, any> = {};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    });

    res.socket.server.io = io;

    const getAllConnectedClients = (roomId: string) => {
      return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
          return userSocketMap[socketId];
        }
      );
    };

    io.on("connection", (socket) => {
      socket.on("join-room", (roomId, data) => {
        userSocketMap[socket.id] = data;
        socket.join(roomId);

        const clients = getAllConnectedClients(roomId);
        io.in(roomId).emit("user-joined", {
          clients,
          username: data.name,
          socketId: socket.id,
        });
      });

      socket.on("sync-code", (socketId, data, history) => {
        socket.to(socketId).emit("sync-code", data, history);
      });

      socket.on("undo", (roomId) => {
        socket.to(roomId).emit("undo");
      });

      socket.on("redo", (roomId) => {
        socket.to(roomId).emit("redo");
      });

      socket.on("send-changes", (roomId, data) => {
        socket.to(roomId).emit("receive-changes", data);
      });

      socket.on("delete-element", (roomId, data) => {
        socket.to(roomId).emit("delete-element", data);
      });

      socket.on("disconnecting", () => {
        const rooms = socket.rooms;
        rooms.forEach((roomId) => {
          socket.in(roomId).emit("disconnected", userSocketMap[socket.id]);
          socket.leave(roomId);
        });
        delete userSocketMap[socket.id];
      });
    });
  }

  res.end();
};

export default ioHandler;
