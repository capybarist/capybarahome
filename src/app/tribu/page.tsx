"use client";
import { useI18n } from "@/lib/i18n";
import {
  ArrowUpRight, MapPin, HeartPulse, Apple, Users, PawPrint, Trophy, Gift, Home, QrCode,
} from "lucide-react";

// Tribu lives on its own domain; this page is the summary inside the
// Capybara Labs site, and every call to action sends people to tribu.pet.
const SITE = "https://tribu.pet";

const ORANGE = "#e0752d";

export default function TribuPage() {
  const { lang } = useI18n();
  const en = lang === "en";

  const features = [
    { Icon: MapPin,
      title: en ? "If they get lost, the whole block knows" : "Si se pierde, se entera todo el barrio",
      body: en
        ? "Mark where your pet was last seen and every neighbour within 20 km gets an alert."
        : "Marca dónde se vio a tu mascota por última vez y todos los vecinos en 20 km reciben un aviso." },
    { Icon: QrCode,
      title: en ? "A QR tag on the collar" : "Una chapa con QR en el collar",
      body: en
        ? "Whoever finds them can message you straight away, without ever seeing your phone number."
        : "Quien la encuentre puede escribirte al momento, sin llegar a ver tu teléfono." },
    { Icon: HeartPulse,
      title: en ? "Their health, sorted" : "Su salud, en orden",
      body: en
        ? "Weight, vaccines, walks, symptoms and medication in one place, with vaccine reminders and heat warnings."
        : "Peso, vacunas, paseos, síntomas y medicación en un sitio, con recordatorios de vacunas y avisos de calor." },
    { Icon: Apple,
      title: en ? "Can they eat this?" : "¿Puede comer esto?",
      body: en
        ? "Look up any food before sharing it and know whether it is safe for your pet."
        : "Consulta cualquier alimento antes de compartirlo y sabrás si es seguro para tu mascota." },
    { Icon: Users,
      title: en ? "A social network made for them" : "Una red social hecha para ellos",
      body: en
        ? "Their own profile and photos, walking buddies nearby, paws, comments and messages."
        : "Su propio perfil y sus fotos, compañeros de paseo cerca, patitas, comentarios y mensajes." },
    { Icon: Home,
      title: en ? "Adopt from local shelters" : "Adopta en protectoras de tu ciudad",
      body: en
        ? "Shelters publish the animals looking for a home, so your next companion is a few taps away."
        : "Las protectoras publican los animales que buscan hogar, y tu próximo compañero está a unos toques." },
    { Icon: Trophy,
      title: en ? "A new challenge every week" : "Un reto nuevo cada semana",
      body: en
        ? "Every Monday a new photo challenge, and awards like nap of the year."
        : "Cada lunes un reto de fotos nuevo, y premios como la siesta del año." },
    { Icon: Gift,
      title: en ? "Their year, in stories" : "Su año, en historias",
      body: en
        ? "An annual recap of everything they did, ready to share."
        : "Un resumen anual de todo lo que hizo, listo para compartir." },
  ];

  const species = en
    ? ["Dogs", "Cats", "Rabbits", "Birds", "Rodents", "Reptiles", "Fish", "Horses", "Others"]
    : ["Perros", "Gatos", "Conejos", "Aves", "Roedores", "Reptiles", "Peces", "Caballos", "Otros"];

  return (
    // Tribu keeps its own warm orange for the italic accents instead of the studio plum.
    <div style={{ "--plum": "#c8601f" } as React.CSSProperties}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden bg-[#16130f]">
        <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: ORANGE }} aria-hidden />
        <div className="absolute -bottom-48 -left-32 w-[420px] h-[420px] rounded-full bg-rose-500/20 blur-3xl pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-[#e9dfd0] mb-8">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {en ? "A Capybara Labs product · Live" : "Un producto de Capybara Labs · En producción"}
              </div>
              <h1 className="font-display text-6xl md:text-7xl text-white leading-[0.95] mb-6">
                Tribu
              </h1>
              <p className="font-display text-2xl md:text-3xl text-[#f4e9da] [&_em]:!text-[#f4a76a] leading-tight mb-6 max-w-xl">
                {en ? <>The social network where <em>your pet is the star.</em></> : <>La red social donde <em>tu mascota es la estrella.</em></>}
              </p>
              <p className="text-lg text-[#b9b0a1] leading-relaxed max-w-xl mb-10">
                {en
                  ? "Give your pet a profile of their own, show off their best photos, find walking buddies and meet your next companion at a shelter."
                  : "Dale a tu mascota un perfil propio, presume de sus mejores fotos, encuentra compañeros de paseo y conoce a tu próximo compañero en una protectora."}
              </p>
              <div className="flex flex-wrap gap-3 mb-5">
                <a href={SITE} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full text-white font-semibold text-sm px-7 py-3.5 transition-opacity hover:opacity-90"
                  style={{ background: ORANGE }}>
                  {en ? "Go to tribu.pet" : "Ir a tribu.pet"} <ArrowUpRight size={16} />
                </a>
                <a href={`${SITE}/discover`} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 text-[#f4e9da] hover:bg-white/5 font-semibold text-sm px-7 py-3.5 transition-colors">
                  {en ? "Browse pets" : "Ver mascotas"}
                </a>
              </div>
              <p className="text-sm text-[#8f8574]">
                {en ? "Free, ready in a minute, nothing to download." : "Gratis, en un minuto y sin descargar nada."}
              </p>
            </div>

            {/* Profile card mock */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-[2rem] bg-[#faf8f4] p-5 shadow-2xl shadow-black/40 rotate-[1.5deg]">
                <div className="aspect-[4/3] rounded-2xl mb-4 flex items-center justify-center text-7xl"
                  style={{ background: "linear-gradient(135deg,#f7c59f 0%,#e0752d 100%)" }} aria-hidden>🐶</div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-2xl text-[var(--ink)]">Lola</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1 text-white" style={{ background: ORANGE }}>
                    <PawPrint size={12} /> 248
                  </span>
                </div>
                <p className="text-sm text-[var(--muted)] mb-4">
                  {en ? "Mixed breed · 3 years · loves the park" : "Mestiza · 3 años · fan del parque"}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { k: en ? "Photos" : "Fotos", v: "86" },
                    { k: en ? "Buddies" : "Amigos", v: "12" },
                    { k: en ? "Challenges" : "Retos", v: "9" },
                  ].map(({ k, v }) => (
                    <div key={k} className="rounded-xl bg-[var(--bg-subtle)] py-2.5">
                      <div className="font-semibold text-[var(--ink)]">{v}</div>
                      <div className="text-[11px] text-[var(--muted)]">{k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            <p className="eyebrow md:col-span-3 pt-3">{en ? "What it does" : "Qué hace"}</p>
            <h2 className="md:col-span-9 font-display text-3xl md:text-[2.75rem] text-[var(--ink)] leading-[1.08]">
              {en
                ? <>Everything about your pet, <em>and the people who love them too.</em></>
                : <>Todo sobre tu mascota, <em>y sobre la gente que también la quiere.</em></>}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "#fbe7d8" }}>
                  <Icon size={20} style={{ color: ORANGE }} />
                </div>
                <h3 className="font-semibold text-[var(--ink)] leading-snug mb-2">{title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Species ──────────────────────────────────────────────────────── */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">{en ? "Every critter welcome" : "Cabe cualquier bicho"}</p>
            <h2 className="font-display text-3xl text-[var(--ink)] leading-tight">
              {en ? <>Not just dogs and cats. <em>Everyone has a place.</em></> : <>No solo perros y gatos. <em>Todos tienen sitio.</em></>}
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-wrap gap-2">
            {species.map((s) => (
              <span key={s} className="text-sm text-[var(--ink)] bg-[var(--surface)] border border-[var(--border)] rounded-full px-4 py-2">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 md:py-24 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-[1.02] mb-5">
            {en ? <>Your pet deserves <em>its own profile.</em></> : <>Tu mascota merece <em>su propio perfil.</em></>}
          </h2>
          <p className="text-[var(--muted)] mb-8">
            {en ? "Tribu is free and works from the browser on any phone." : "Tribu es gratis y funciona desde el navegador de cualquier móvil."}
          </p>
          <a href={SITE} target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 rounded-full text-white font-semibold text-sm px-7 py-3.5 transition-opacity hover:opacity-90"
            style={{ background: ORANGE }}>
            tribu.pet <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
