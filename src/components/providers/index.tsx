"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { Toaster } from "@/components/ui/sonner";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="web-works-theme"
    >
      <ModalProvider />
      <Toaster />
      <ConfettiProvider />
      {children}
    </ThemeProvider>
  );
};
