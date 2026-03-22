import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-content py-20 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-8xl font-bold text-primary-blue mb-4">404</h1>
        <h2 className="text-2xl font-bold text-neutral-dark mb-4">
          Página Não Encontrada
        </h2>
        <p className="text-neutral-dark/70 mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi removida.
          Verifique o endereço ou volte para a página inicial.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            ← Voltar ao Início
          </Link>
          <Link href="/artigos" className="btn-secondary">
            Ver Artigos
          </Link>
        </div>
      </div>
    </section>
  );
}
