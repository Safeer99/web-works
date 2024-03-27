import { getAssociatedAccount, getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { useAuth } from "@clerk/nextjs";
import { Role, User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useCurrentUser = (agencyId: string) => {
  const { userId } = useAuth();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [role, setRole] = useState<Role | undefined>(undefined);

  useEffect(() => {
    const fetchData = async (userId: string) => {
      const res = await getAssociatedAccount(agencyId);
      if (res) {
        setRole(res.role);
        setUser(res.user);
      }
    };
    if (userId && agencyId) {
      fetchData(userId);
    }
  }, [userId, agencyId]);

  return { user, role };
};
