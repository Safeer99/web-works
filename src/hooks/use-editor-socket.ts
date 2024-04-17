import { useSocket } from "@/components/providers/socket-provider";
import { UserType, useUsers } from "@/components/providers/users-provider";
import { useEffect } from "react";
import { toast } from "sonner";

export const useEditorSocket = (roomId: string, str: string) => {
  const { isConnected, socket } = useSocket();
  const { setOthers, self } = useUsers();

  useEffect(() => {
    if (socket == null || !isConnected || !roomId || self == null) return;
    console.log("use editor socket hook useEffect from ", str);

    // socket.emit("join-room", roomId, self);

    // socket.on(
    //   "user-joined",
    //   ({
    //     clients,
    //     username,
    //     socketId,
    //   }: {
    //     clients: UserType[];
    //     username: string;
    //     socketId: string;
    //   }) => {
    //     if (socketId !== socket.id) {
    //       toast.success(`${username} join the room.`);
    //     }
    //     const filteredUsers = clients.filter((client) => client.id !== self.id);
    //     setOthers(filteredUsers);
    //   }
    // );

    // socket.on("disconnected", (user: UserType) => {
    //   toast.success(`${user.name} leaves the room.`);
    //   setOthers((prev) => prev.filter((client) => client.id !== user.id));
    // });
  }, [socket, isConnected, roomId, self]);
};
