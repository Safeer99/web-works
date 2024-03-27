"use client";

import { useEffect, useState } from "react";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
};
