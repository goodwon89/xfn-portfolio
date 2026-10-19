import './globals.css';
import { getSite } from '@/lib/content';

const site = getSite();
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

export const metadata = {
  title: site.title,
  description: site.description,
  authors: [{ name: site.author }],
  keywords: site.keywords,
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  openGraph: {
    title: site.og.title,
    description: site.og.description,
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: `${base}${site.og.image}`, width: 1200, height: 630 }],
  },
  icons: { icon: `${base}/favicon.svg` },
};

export const viewport = { themeColor: '#111111', width: 'device-width', initialScale: 1 };

/** 첫 페인트 전에 테마를 정해 깜빡임을 막는다. 기본은 다크. */
const themeScript = `(function(){try{var t=localStorage.getItem('site-theme');}catch(e){}document.documentElement.dataset.siteTheme=t==='light'?'light':'${site.design?.theme_default || 'dark'}';})();`;

export default function RootLayout({ children }) {
  return (
    <html lang={site.lang || 'ko'} data-site-theme="dark" className="no-js" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
