import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Shell of the corporate site (capybaralabs.tech). The games landing lives
// outside this group so it can have its own, more playful branding.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
