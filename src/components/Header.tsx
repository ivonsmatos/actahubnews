import Link from "next/link";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-40 bg-bg-white/95 backdrop-blur-sm border-b border-neutral-light"
      role="banner"
    >
      <nav
        className="container-wide flex items-center justify-between h-16"
        role="navigation"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Actahub - Página Inicial"
        >
          <span className="text-2xl font-bold text-primary-blue group-hover:text-accent-yellow transition-colors duration-200">
            Acta<span className="text-accent-orange">hub</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          <li>
            <Link
              href="/"
              className="text-sm font-medium text-neutral-dark hover:text-primary-blue transition-colors duration-200"
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              href="/artigos"
              className="text-sm font-medium text-neutral-dark hover:text-primary-blue transition-colors duration-200"
            >
              Artigos
            </Link>
          </li>
          <li>
            <Link
              href="/sobre"
              className="text-sm font-medium text-neutral-dark hover:text-primary-blue transition-colors duration-200"
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              href="/contato"
              className="text-sm font-medium text-neutral-dark hover:text-primary-blue transition-colors duration-200"
            >
              Contato
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-neutral-dark hover:text-primary-blue transition-colors"
          aria-label="Abrir menu de navegação"
          aria-expanded="false"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}
