import type { Metadata } from "next";
import { LegalPage, SUPPORT_EMAIL } from "../LegalPage";

export const metadata: Metadata = {
  title: "Lumen Rise — Política de privacidad / Privacy Policy",
  description: "Política de privacidad del juego Lumen Rise, de Capybara Labs.",
};

const mail = <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>;

export default function LumenRisePrivacy() {
  return (
    <LegalPage>
      <h1>Política de privacidad — Lumen Rise</h1>
      <p><em>Última actualización: 11 de noviembre de 2026.</em></p>
      <p><strong>Responsable:</strong> Capybara Labs LLC (30 N Gould St, Ste N, Sheridan, WY 82801, EE. UU.) · Contacto: {mail}</p>

      <h2>1. Qué datos trata la app</h2>
      <p>
        Lumen Rise <strong>no pide registro ni cuenta</strong> y no recoge nombre, correo ni contactos.
        Todo el progreso del juego (niveles, perlas, ajustes) se guarda <strong>solo en tu dispositivo</strong>.
      </p>
      <p>La app usa servicios de terceros que pueden tratar datos técnicos:</p>
      <ul>
        <li>
          <strong>Google AdMob (anuncios).</strong> Puede tratar identificadores de publicidad, dirección IP
          aproximada y datos del dispositivo para mostrar anuncios y medir su rendimiento. En la UE, el Reino
          Unido y los estados de EE. UU. que lo exigen se muestra un formulario de consentimiento (Google UMP) y
          puedes cambiar tu elección en Ajustes › Opciones de privacidad. En iOS la app solicita permiso de
          seguimiento (ATT); si lo rechazas, los anuncios no se personalizan con ese identificador.
          Política de Google: <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>
        </li>
        <li>
          <strong>App Store / Google Play (compras dentro de la app).</strong> Los pagos los procesa la tienda;
          la app no ve tu tarjeta ni tus datos de pago.
        </li>
        <li>
          <strong>Game Center / Google Play Juegos (opcional).</strong> Si inicias sesión, tus puntuaciones y
          logros se envían a Apple o Google según sus propias políticas.
        </li>
      </ul>

      <h2>2. Notificaciones</h2>
      <p>
        La app puede enviar avisos locales (energía recargada, recompensa diaria). Se programan en tu
        dispositivo, sin servidor, y puedes desactivarlos en los ajustes del sistema.
      </p>

      <h2>3. Menores</h2>
      <p>
        El juego no está dirigido a menores de 13 años y no recoge conscientemente datos de menores.
      </p>

      <h2>4. Conservación y eliminación</h2>
      <p>
        Los datos locales se eliminan al desinstalar la app o desde Ajustes › Reiniciar progreso. Los datos
        tratados por terceros se rigen por sus políticas.
      </p>

      <h2>5. Tus derechos</h2>
      <p>
        Puedes ejercer los derechos de acceso, rectificación, supresión, oposición y portabilidad escribiendo
        a {mail}. También puedes reclamar ante la autoridad de protección de datos de tu país.
      </p>

      <h2>6. Cambios</h2>
      <p>Si esta política cambia, se actualizará la fecha de esta página.</p>

      <hr />

      <h1>Privacy Policy — Lumen Rise</h1>
      <p><em>Last updated: November 11, 2026.</em></p>
      <p><strong>Controller:</strong> Capybara Labs LLC (30 N Gould St, Ste N, Sheridan, WY 82801, USA) · Contact: {mail}</p>

      <h2>What we collect</h2>
      <p>
        Lumen Rise requires no account and does not collect your name, e-mail or contacts. Game progress is
        stored only on your device.
      </p>

      <h2>Third-party services</h2>
      <ul>
        <li>
          <strong>Google AdMob (ads)</strong> may process advertising identifiers, approximate IP address and
          device data to serve and measure ads. In the EU, the UK and the US states that require it, a consent
          form (Google UMP) is shown and you can change your choice in Settings › Privacy options. On iOS the
          app asks for tracking permission (ATT). Google&apos;s policy:{" "}
          <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>
        </li>
        <li>
          <strong>In-app purchases</strong> are processed by the App Store / Google Play; the app never sees
          your payment details.
        </li>
        <li>
          <strong>Game Center / Google Play Games (optional):</strong> if you sign in, scores and achievements
          are sent to Apple or Google under their own policies.
        </li>
      </ul>

      <h2>Notifications</h2>
      <p>
        Local reminders (energy refilled, daily reward) are scheduled on your device without any server and
        can be disabled in system settings.
      </p>

      <h2>Children</h2>
      <p>The game is not directed at children under 13 and does not knowingly collect their data.</p>

      <h2>Deletion and your rights</h2>
      <p>
        Uninstall the app or use Settings › Reset progress. Write to {mail} to access, correct or delete data.
      </p>
    </LegalPage>
  );
}
