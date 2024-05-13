import React from "react";
import { create } from "zustand";

interface AgencyModalProps {
  isOpen: boolean;
  modal: React.ReactNode;
  onOpen: (modal: React.ReactNode) => void;
  onClose: () => void;
}

export const useModal = create<AgencyModalProps>((set) => ({
  isOpen: false,
  modal: null,
  onOpen: (modal: React.ReactNode) => set({ isOpen: true, modal }),
  onClose: () => set({ isOpen: false, modal: null }),
}));
