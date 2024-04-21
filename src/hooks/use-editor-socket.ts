import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Role } from "@prisma/client";

import { useEditor } from "@/components/providers/editor";
import { EditorAction } from "@/components/providers/editor/editor-actions";
import { EditorElement } from "@/components/providers/editor/editor-types";
import { useSocket } from "@/components/providers/socket-provider";

type UserType = {
  id: string;
  name: string;
  avatar?: string;
  role: Role;
};

export const useEditorSocket = () => {
  const { state, dispatch } = useEditor();
  const { socket, isConnected, self, setOthers } = useSocket();

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-changes", (data: string) => {
      const action: Extract<
        EditorAction,
        { type: "ADD_ELEMENT" | "UPDATE_ELEMENT" }
      > = JSON.parse(data);
      if (action.type === "ADD_ELEMENT") {
        dispatch({
          type: action.type,
          payload: {
            containerId: action.payload.containerId,
            elementDetails: action.payload.elementDetails,
          },
        });
      } else if (action.type === "UPDATE_ELEMENT") {
        dispatch({
          type: action.type,
          payload: { elementDetails: action.payload.elementDetails },
        });
      }
    });

    socket.on("delete-element", (data: string) => {
      const element: EditorElement = JSON.parse(data);
      dispatch({
        type: "DELETE_ELEMENT",
        payload: { elementDetails: element },
      });
    });

    return () => {
      socket.off("receive-changes");
      socket.off("delete-element");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket == null) return;

    socket.on("sync-code", (data: string) => {
      setTimeout(() => {
        dispatch({
          type: "LOAD_DATA",
          payload: {
            elements: JSON.parse(data),
            withLive: false,
          },
        });
      }, 3000);
    });

    socket.on("disconnect", () => {
      console.log("DISCONNECT FROM CUSTOM HOOK");
      // console.log("Saving.....", { state });
    });

    socket.on("disconnected", (user: UserType) => {
      toast.success(`${user.name} leaves the room.`);
      setOthers((prev) => prev.filter((client) => client.id !== user.id));
    });

    return () => {
      socket.off("sync-code");
      socket.off("disconnect");
      socket.off("disconnected");
    };
  }, [socket, dispatch, setOthers]);

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
          toast.success(`${username} joines the room.`);
          const data = JSON.stringify(state.editor.elements);
          socket.emit("sync-code", socketId, data);
        }
        const filteredUsers = clients.filter(
          (client) => client.id !== self?.id
        );
        setOthers(filteredUsers);
      }
    );

    return () => {
      socket.off("user-joined");
    };
  }, [socket, self, isConnected, setOthers, state.editor.elements]);
};

export const useUpdateElement = () => {
  const { dispatch } = useEditor();
  const { socket, roomId } = useSocket();

  return useCallback(
    (
      action: Extract<EditorAction, { type: "ADD_ELEMENT" | "UPDATE_ELEMENT" }>
    ) => {
      if (socket == null) return;
      dispatch(action);
      const data = JSON.stringify(action);
      socket.emit("send-changes", roomId, data);
    },
    [socket, roomId, dispatch]
  );
};

export const useDeleteElement = () => {
  const { state, dispatch } = useEditor();
  const { socket, roomId } = useSocket();

  return useCallback(() => {
    if (socket == null) return;
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: state.editor.selectedElement },
    });
    const data = JSON.stringify(state.editor.selectedElement);
    socket.emit("delete-element", roomId, data);
  }, [socket, roomId, dispatch, state.editor.selectedElement]);
};
