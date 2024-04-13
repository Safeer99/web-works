"use client";

import { useOthers, useSelf } from "@@/liveblocks.config";
import { UserAvatar } from "@/components/user-avatar";
import { idToColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 2;

export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();

  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  //TODO: Add a dialog to show additional users

  return (
    <div className="absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {currentUser && (
          <UserAvatar
            src={currentUser.info.avatar}
            name={`${currentUser.info.name} (You)`}
            fallback={currentUser.info.name[0] || "T"}
            borderColor={idToColor(currentUser.connectionId)}
          />
        )}
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              src={info.avatar}
              name={info.name}
              fallback={info.name[0] || "T"}
              borderColor={idToColor(connectionId)}
            />
          );
        })}
        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};
