// Página de texto simple para las fichas de Lumen Rise en las tiendas
// (privacidad y soporte). Sin estado: se renderiza en el servidor.
export function LegalPage({ children }: { children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 leading-relaxed [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1 [&_a]:underline [&_hr]:my-12 [&_hr]:opacity-30">
      {children}
    </article>
  );
}

export const SUPPORT_EMAIL = "info@capybaralabs.tech";
