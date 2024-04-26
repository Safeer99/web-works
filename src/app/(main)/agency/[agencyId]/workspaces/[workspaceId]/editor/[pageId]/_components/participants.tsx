"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { UserAvatar } from "@/components/user-avatar";
import { idToColor } from "@/lib/utils";
import { Wifi, WifiOff } from "lucide-react";

const MAX_SHOWN_USERS = 1;

export const Participants = () => {
  const { self: currentUser, others: otherUsers, isConnected } = useSocket();

  const hasMoreUsers = otherUsers ? otherUsers.length > MAX_SHOWN_USERS : false;

  return (
    <div className="p-3 h-12 flex items-center shadow-md">
      <div className="flex gap-x-2 mr-4">
        {currentUser && (
          <UserAvatar
            src={currentUser.avatar}
            name={`${currentUser.name} (You)`}
            fallback={currentUser.name[0] || "T"}
            borderColor={idToColor(parseInt(currentUser.id))}
          />
        )}
        {otherUsers?.slice(0, MAX_SHOWN_USERS).map((user) => {
          return (
            <UserAvatar
              key={user.id}
              src={user.avatar}
              name={user.name}
              fallback={user.name[0] || "T"}
              borderColor={idToColor(parseInt(user.id))}
            />
          );
        })}
        {otherUsers && hasMoreUsers && (
          <UserAvatar
            name={`${otherUsers.length - MAX_SHOWN_USERS} more`}
            fallback={`+${otherUsers.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
      {isConnected ? (
        <Wifi className="text-emerald-500" />
      ) : (
        <WifiOff className="text-red-600" />
      )}
    </div>
  );
};
