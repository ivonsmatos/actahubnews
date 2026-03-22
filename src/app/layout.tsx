import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
  variable: "--font-merriweather",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://actahub.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Actahub — Portal de Conteúdo Técnico de Alta Autoridade",
    template: "%s | Actahub",
  },
  description:
    "Portal de conteúdo técnico de alta autoridade. Artigos verificáveis, otimizados para humanos e IAs generativas.",
  keywords: ["conteúdo técnico", "artigos", "tecnologia", "SEO", "GEO"],
  authors: [{ name: "Actahub", url: SITE_URL }],
  creator: "Actahub",
  publisher: "Actahub",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Actahub",
    title: "Actahub — Portal de Conteúdo Técnico de Alta Autoridade",
    description:
      "Portal de conteúdo técnico de alta autoridade. Artigos verificáveis, otimizados para humanos e IAs generativas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Actahub",
    description:
      "Portal de conteúdo técnico de alta autoridade.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "pt-BR": SITE_URL,
    },
  },
};

// Organization JSON-LD (sameAs for social profiles)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Actahub",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Portal de conteúdo técnico de alta autoridade. Informação confiável, verificável e otimizada para humanos e IAs.",
  sameAs: [
    // Add your social profile URLs here
    // "https://twitter.com/actahub",
    // "https://linkedin.com/company/actahub",
    // "https://github.com/actahub",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
};

// WebSite JSON-LD with SearchAction
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Actahub",
  url: SITE_URL,
  inLanguage: "pt-BR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/busca?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        {/* hreflang for international SEO */}
        <link rel="alternate" hrefLang="pt-BR" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        {/* WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        {/* Google Tag Manager (head) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PHTCZT9N');`,
          }}
        />

        {/* GA4 with Consent Mode v2 (LGPD: denied by default) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1TR1V82PZT" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Default: deny all until user consents (LGPD)
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
              });

              gtag('js', new Date());
              gtag('config', 'G-1TR1V82PZT', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PHTCZT9N"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>

        {/* Skip to content link (a11y) */}
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo
        </a>

        <Header />

        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>

        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
