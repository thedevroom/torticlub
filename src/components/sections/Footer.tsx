import { Logo } from "@/components/brand/Logo";
import { Mantra } from "@/components/brand/Mantra";
import { social } from "@/lib/tokens";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/8 px-5 pt-16 pb-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div>
            <Logo size="md" showTagline />
            <p className="mt-6 max-w-xs text-sm text-ink/50 font-medium leading-relaxed">
              Tortillas para compartir.
              <br />
              Barcelona.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-ink/40 mb-4">
                Explorar
              </p>
              <ul className="space-y-2.5 text-sm font-semibold text-ink">
                <li>
                  <a href="#club" className="hover:text-ink/60 transition-colors">
                    Club
                  </a>
                </li>
                <li>
                  <a href="#formatos" className="hover:text-ink/60 transition-colors">
                    Formatos
                  </a>
                </li>
                <li>
                  <a href="#sabores" className="hover:text-ink/60 transition-colors">
                    Sabores
                  </a>
                </li>
                <li>
                  <a href="#pedir" className="hover:text-ink/60 transition-colors">
                    Pedir
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-ink/40 mb-4">
                Contacto
              </p>
              <ul className="space-y-2.5 text-sm font-semibold text-ink">
                <li>
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-ink/60 transition-colors"
                  >
                    <InstagramIcon className="size-3.5" />
                    {social.instagramHandle}
                  </a>
                </li>
                {social.whatsapp ? (
                  <li>
                    <a
                      href={social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ink/60 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </li>
                ) : null}
                <li className="text-ink/50 font-medium">{social.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/8 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Mantra size="sm" case="lower" className="text-ink/40" />
            <p className="text-xs text-ink/35 font-medium">
              © {new Date().getFullYear()} TortiClub
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-ink/[0.07] bg-[#FBF8F1] px-3.5 py-3">
              <p className="text-[0.58rem] uppercase tracking-[0.18em] font-semibold text-ink/30 mb-1">
                Hecho por
              </p>
              <p className="text-xs font-bold tracking-tight text-ink">
                Cristian Querol
              </p>
            </div>
            <a
              href="https://github.com/thedevroom"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-ink/[0.07] bg-[#FBF8F1] px-3.5 py-3 hover:bg-primary/25 transition-colors"
            >
              <p className="text-[0.58rem] uppercase tracking-[0.18em] font-semibold text-ink/30 mb-1">
                GitHub
              </p>
              <p className="text-xs font-bold tracking-tight text-ink">
                thedevroom ↗
              </p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
