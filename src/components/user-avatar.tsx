"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hint } from "@/components/hint";

interface UserAvatarProps {
  name: string;
  src?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar = ({
  borderColor,
  fallback,
  name,
  src,
}: UserAvatarProps) => {
  return (
    <Hint label={name}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold bg-neutral-300">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};
