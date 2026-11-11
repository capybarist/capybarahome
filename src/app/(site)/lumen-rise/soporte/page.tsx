import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, SUPPORT_EMAIL } from "../LegalPage";

export const metadata: Metadata = {
  title: "Lumen Rise — Soporte / Support",
  description: "Ayuda y contacto para el juego Lumen Rise, de Capybara Labs.",
};

const mail = <a href={`mailto:${SUPPORT_EMAIL}?subject=Lumen%20Rise`}>{SUPPORT_EMAIL}</a>;

export default function LumenRiseSupport() {
  return (
    <LegalPage>
      <h1>Soporte — Lumen Rise</h1>
      <p>¿Algún problema o sugerencia? Escríbenos a {mail} y te responderemos lo antes posible.</p>

      <h2>Preguntas frecuentes</h2>
      <ul>
        <li>
          <strong>He comprado algo y no aparece.</strong> Ve a Ajustes › Restaurar compras. Si sigue sin
          aparecer, escríbenos con la fecha de la compra.
        </li>
        <li>
          <strong>Quiero quitar los anuncios.</strong> Compra «Sin anuncios» en la tienda del juego; se
          conserva al reinstalar con Restaurar compras.
        </li>
        <li>
          <strong>Cambiar mis opciones de privacidad.</strong> Ajustes › Opciones de privacidad.
        </li>
        <li>
          <strong>Reembolsos.</strong> Los gestiona la tienda: Apple (reportaproblem.apple.com) o Google Play
          (play.google.com › Historial de pedidos).
        </li>
      </ul>
      <p><Link href="/lumen-rise/privacidad">Política de privacidad</Link></p>

      <hr />

      <h1>Support — Lumen Rise</h1>
      <p>Any problem or suggestion? Write to {mail} and we&apos;ll get back to you as soon as we can.</p>
      <ul>
        <li><strong>A purchase is missing:</strong> Settings › Restore purchases, or e-mail us with the date.</li>
        <li><strong>Privacy choices:</strong> Settings › Privacy options.</li>
        <li><strong>Refunds</strong> are handled by Apple (reportaproblem.apple.com) or Google Play.</li>
      </ul>
      <p><Link href="/lumen-rise/privacidad">Privacy Policy</Link></p>
    </LegalPage>
  );
}
