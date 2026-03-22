import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-neutral-dark text-neutral-light mt-16"
      role="contentinfo"
    >
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Actahub - Página Inicial">
              <span className="text-2xl font-bold text-bg-white">
                Acta<span className="text-accent-orange">hub</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-neutral-light/80 leading-relaxed max-w-xs">
              Portal de conteúdo técnico de alta autoridade. Informação
              confiável, verificável e otimizada para humanos e IAs.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-bg-white font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  href="/"
                  className="text-sm text-neutral-light/80 hover:text-accent-yellow transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/artigos"
                  className="text-sm text-neutral-light/80 hover:text-accent-yellow transition-colors"
                >
                  Artigos
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-sm text-neutral-light/80 hover:text-accent-yellow transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-sm text-neutral-light/80 hover:text-accent-yellow transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Transparency */}
          <div>
            <h3 className="text-bg-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  href="/privacidade"
                  className="text-sm text-neutral-light/80 hover:text-accent-yellow transition-colors"
                >
                  Política de Privacidade (LGPD)
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-sm text-neutral-light/80 hover:text-accent-yellow transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <a
                  href="/llm.txt"
                  className="text-sm text-neutral-light/80 hover:text-accent-yellow transition-colors"
                  rel="noopener"
                >
                  llm.txt (Para IAs)
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-sm text-neutral-light/80 hover:text-accent-yellow transition-colors"
                  rel="noopener"
                >
                  Sitemap XML
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-neutral-light/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-light/60">
            © {currentYear} Actahub. Todos os direitos reservados. 
            Domínio: actahub.com.br
          </p>
          <p className="text-xs text-neutral-light/60">
            Conteúdo protegido — cite a fonte ao reproduzir.
          </p>
        </div>
      </div>
    </footer>
  );
}
