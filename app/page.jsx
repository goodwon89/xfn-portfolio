import { getSite, getSections, getSources } from '@/lib/content';
import { Hero, Closing, SECTION_COMPONENTS } from '@/components/sections';
import { Footer } from '@/components/footer';
import { Header, Motion, Intro, Cursor, BgmPlayer } from '@/components/client';

export default function Page() {
  const site = getSite();
  const sections = getSections();
  const srcMap = getSources();

  const max = site.nav?.max_items || 6;
  const navItems = sections.filter((s) => s.nav).slice(0, max).map((s) => ({ id: s.id, label: s.nav }));
  const intro = site.design?.intro;

  return (
    <>
      <a href="#glance" className="sr-only">본문 바로가기</a>
      {intro?.enabled && <Intro from={intro.counter_from} to={intro.counter_to} label={intro.label} />}
      <Header brand={site.nav.brand} items={navItems} cta={site.nav.cta} />
      <main id="main">
        {sections.map((s) => {
          if (s.id === 'hero') return <Hero key={s.id} s={s} />;
          if (s.id === 'closing') return <Closing key={s.id} s={s} site={site} />;
          const C = SECTION_COMPONENTS[s.id];
          if (!C) {
            console.warn(`[content] 매핑되지 않은 섹션: ${s.id} (${s.file})`);
            return null;
          }
          return <C key={s.id} s={s} srcMap={srcMap} />;
        })}
      </main>
      <Footer site={site} sections={sections} />
      {site.design?.bgm && <BgmPlayer id={site.design.bgm.youtube_id} label={site.design.bgm.label} />}
      {site.design?.cursor && <Cursor />}
      <Motion />
    </>
  );
}
