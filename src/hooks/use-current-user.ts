import { useEffect } from "react";
import { create } from "zustand";
import { Role, User } from "@prisma/client";
import { getAssociatedAccount } from "@/lib/auth-service";

interface UserContextType {
  user: User;
  role: Role;
  setUser: (user: User) => void;
  setRole: (role: Role) => void;
}

const useUserContext = create<UserContextType>((set) => ({
  user: {
    id: "",
    name: "",
    email: "",
    imageUrl: "",
    externalUserId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  role: Role.AGENCY_USER,
  setUser: (user: User) => set({ user }),
  setRole: (role: Role) => set({ role }),
}));

export const useCurrentUser = (agencyId: string) => {
  const { role, setRole, setUser, user } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAssociatedAccount(agencyId);
      if (res) {
        setRole(res.role);
        setUser(res.user);
      }
    };
    if (agencyId && !user.id) {
      fetchData();
    }
  }, [agencyId, user, setRole, setUser]);

  return { user, role };
};
