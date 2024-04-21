"use client";

import { getAssociatedAccount } from "@/lib/auth-service";
import { Role } from "@prisma/client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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
  agencyId: string;
  roomId: string;
  self: UserType | null;
  others: UserType[];
  setOthers: Dispatch<SetStateAction<UserType[]>>;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  agencyId: "",
  roomId: "",
  self: null,
  others: [],
  setOthers: () => undefined,
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
  }, [agencyId, isLiveMode]);

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
  }, [self, roomId, isLiveMode]);

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, agencyId, roomId, self, others, setOthers }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  return useContext(SocketContext);
};
