import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/lib/types";
import { UserType } from "@/components/providers/users-provider";

export const config = {
  api: {
    bodyParser: false,
  },
};

const userSocketMap: Record<string, UserType> = {};

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

      socket.on("send-changes", (roomId, data) => {
        socket.to(roomId).emit("receive-changes", data);
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
