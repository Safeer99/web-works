import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Navigation } from "./_components/navigation";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <Navigation />
      {children}
    </ClerkProvider>
  );
};

export default SiteLayout;
