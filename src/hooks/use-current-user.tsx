import { getAssociatedAccount } from "@/lib/auth-service";
import { Role, User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useCurrentUser = (agencyId: string) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [role, setRole] = useState<Role | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAssociatedAccount(agencyId);
      if (res) {
        setRole(res.role);
        setUser(res.user);
      }
    };
    if (agencyId) {
      fetchData();
    }
  }, [agencyId]);

  return { user, role };
};
