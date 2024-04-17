"use client";

import { getAssociatedAccount } from "@/lib/auth-service";
import { Role } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";
import { toast } from "sonner";

type UserType = {
  id: string;
  name: string;
  avatar?: string;
  role: Role;
};

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  self: UserType | null;
  others: UserType[];
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  self: null,
  others: [],
});

interface SocketProviderProps {
  children: React.ReactNode;
  agencyId: string;
  roomId: string;
  isLiveMode?: boolean;
}

const SocketProvider = ({
  children,
  agencyId,
  roomId,
  isLiveMode = false,
}: SocketProviderProps) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const [self, setSelf] = useState<UserType | null>(null);
  const [others, setOthers] = useState<UserType[]>([]);

  useEffect(() => {
    if (isLiveMode) return;

    const fetchData = async () => {
      const data = await getAssociatedAccount(agencyId);
      if (!data) return;

      setSelf({
        id: data.userId,
        name: data.user.name,
        avatar: data.user.imageUrl,
        role: data.role,
      });
    };
    fetchData();
  }, [agencyId]);

  useEffect(() => {
    if (isLiveMode || self == null) return;
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      }
    );

    socketInstance.on("connect", () => {
      socketInstance.emit("join-room", roomId, self);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [self, roomId]);

  useEffect(() => {
    if (socket == null || self == null || !isConnected) return;

    socket.on(
      "user-joined",
      ({
        clients,
        username,
        socketId,
      }: {
        clients: UserType[];
        username: string;
        socketId: string;
      }) => {
        if (socketId !== socket.id) {
          toast.success(`${username} join the room.`);
        }
        const filteredUsers = clients.filter(
          (client) => client.id !== self?.id
        );
        setOthers(filteredUsers);
      }
    );

    socket.on("disconnected", (user: UserType) => {
      toast.success(`${user.name} leaves the room.`);
      setOthers((prev) => prev.filter((client) => client.id !== user.id));
    });
  }, [socket, self, isConnected]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, self, others }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  return useContext(SocketContext);
};
