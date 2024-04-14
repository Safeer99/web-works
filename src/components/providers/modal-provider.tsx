"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/hooks/use-modals";

export const ModalProvider = () => {
  const modal = useModal((state) => state.modal);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{modal}</>;
};
