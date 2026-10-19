'use client';

import { useEffect, useRef, useState } from 'react';

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------
   Motion — 리빌 · 카운터 · 패럴랙스 · sticky 진행도 · 워드마크 · Lenis
   페이지 전체에 한 번만 마운트된다.
------------------------------------------------------------------- */
export function Motion() {
  useEffect(() => {
    document.documentElement.classList.remove('no-js');
    const rm = reduced();

    // 1) 진입 리빌 + 카운터
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          el.classList.add('is-in');
          if (el.dataset.count !== undefined && !rm) countUp(el);
          io.unobserve(el);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.rv, .rb, .bars, .db, .wm, [data-count]').forEach((el) => io.observe(el));

    // 2) 스크롤 연동 (패럴랙스 · sticky 카드 · 헤더 퇴장)
    const drifts = [...document.querySelectorAll('[data-drift]')];
    const stickies = [...document.querySelectorAll('.stk--on')];
    const spacer = document.querySelector('.footer-spacer');
    const header = document.querySelector('.header');
    const marquee = document.querySelector('.marquee');

    const onScroll = () => {
      const vh = window.innerHeight;
      if (!rm) {
        drifts.forEach((el) => {
          const r = el.getBoundingClientRect();
          const c = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
          el.style.transform = `translate3d(0, ${(-c * parseFloat(el.dataset.drift || 40)).toFixed(1)}px, 0)`;
        });
      }
      stickies.forEach((sec) => {
        const r = sec.getBoundingClientRect();
        const total = sec.offsetHeight - vh;
        const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
        const cards = sec.querySelectorAll('.card:not(.card--plan)');
        const n = sec.querySelectorAll('.card').length;
        cards.forEach((card, i) => {
          const f = Math.min(1, Math.max(0, p * n * 1.15 - i));
          card.style.setProperty('--f', f.toFixed(3));
          card.classList.toggle('is-on', f > 0.55);
        });
      });
      if (spacer && header) {
        const sr = spacer.getBoundingClientRect();
        header.classList.toggle('is-away', sr.top < vh * 0.6);
        document.documentElement.classList.toggle('has-footer', sr.top < vh * 0.6);
      }
      if (marquee) {
        const mr = marquee.getBoundingClientRect();
        marquee.style.setProperty('--mq', mr.bottom > -200 && mr.top < vh + 200 ? 'running' : 'paused');
      }
    };

    // 3) Lenis 스무스 스크롤 (모션 감소 시 생략)
    let lenis, raf;
    let cancelled = false;
    if (!rm) {
      import('lenis').then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis.on('scroll', onScroll);
        const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
        raf = requestAnimationFrame(loop);
        window.__lenis = lenis;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    // 4) 앵커 이동 (Lenis 사용 시 부드럽게)
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      if (window.__lenis) window.__lenis.scrollTo(target, { offset: 0 });
      else target.scrollIntoView({ behavior: rm ? 'auto' : 'smooth' });
      history.replaceState(null, '', id ? `#${id}` : location.pathname);
    };
    document.addEventListener('click', onClick);

    // 5) 워드마크 폭 맞춤
    // 큰 숫자가 칸보다 넓으면 글자 크기를 줄여 한 줄에 맞춘다(잘림 방지).
    const fitNums = () => {
      document.querySelectorAll('.stat__v, .funnel__v, .vs__v, .mega__to, .cc__stat b, .hero__metric-v').forEach((el) => {
        el.style.fontSize = '';
        const avail = el.clientWidth;
        const need = el.scrollWidth;
        if (avail && need > avail + 1) {
          const fs = parseFloat(getComputedStyle(el).fontSize);
          el.style.fontSize = `${Math.floor(fs * (avail / need) * 0.98)}px`;
        }
      });
    };
    fitNums();
    document.fonts?.ready.then(fitNums);
    document.fonts?.addEventListener?.('loadingdone', fitNums);
    const fitTimers = [400, 1200, 2500].map((ms) => setTimeout(fitNums, ms));
    window.addEventListener('resize', fitNums);

    // 웹폰트가 늦게 로드되면 글자 폭이 바뀌므로 ResizeObserver로 다시 맞춘다.
    const wmText = document.querySelector('.wm__text');
    const fitWordmark = () => {
      const t = wmText;
      if (!t) return;
      const cs = getComputedStyle(t.parentElement);
      const avail = t.parentElement.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const cur = parseFloat(getComputedStyle(t).fontSize);
      const width = t.getBoundingClientRect().width;
      if (!width) return;
      const next = Math.floor((cur * avail * 0.98) / width);
      if (Math.abs(next - cur) > 1) t.style.fontSize = `${next}px`;
    };
    const ro = wmText ? new ResizeObserver(fitWordmark) : null;
    ro?.observe(wmText);
    fitWordmark();
    document.fonts?.ready.then(fitWordmark);
    document.fonts?.addEventListener?.('loadingdone', fitWordmark);
    window.addEventListener('load', fitWordmark);
    window.addEventListener('resize', fitWordmark);

    return () => {
      cancelled = true;
      io.disconnect();
      ro?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('resize', fitWordmark);
      window.removeEventListener('resize', fitNums);
      document.fonts?.removeEventListener?.('loadingdone', fitNums);
      fitTimers.forEach(clearTimeout);
      window.removeEventListener('load', fitWordmark);
      document.fonts?.removeEventListener?.('loadingdone', fitWordmark);
      document.removeEventListener('click', onClick);
      if (raf) cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return null;
}

/** "88.7%" "3,880회" "+15.5%p" 처럼 숫자 하나만 든 값만 카운트업한다. 최종값은 이미 DOM에 있다. */
function countUp(el) {
  const target = el.querySelector('[data-num]') || el;
  const text = target.textContent;
  const m = text.match(/^([^\d]*?)([\d,]+(?:\.\d+)?)([^\d]*)$/);
  if (!m) return;
  const [, pre, numStr, post] = m;
  const end = parseFloat(numStr.replace(/,/g, ''));
  const from = el.dataset.from ? parseFloat(el.dataset.from) : 0;
  const dec = (numStr.split('.')[1] || '').length;
  const comma = numStr.includes(',');
  const dur = parseInt(el.dataset.dur || '1400', 10);
  const t0 = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 4);
  const fmt = (v) => {
    let s = v.toFixed(dec);
    if (comma) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    return pre + s + post;
  };
  const step = (now) => {
    const t = Math.min(1, (now - t0) / dur);
    target.textContent = fmt(from + (end - from) * ease(t));
    if (t < 1) requestAnimationFrame(step);
    else target.textContent = text;
  };
  requestAnimationFrame(step);
}

/* ------------------------------------------------------------------
   Header — 활성 섹션 표시 · 모바일 메뉴 · 테마 토글
------------------------------------------------------------------- */
export function Header({ brand, items, cta }) {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const delay = document.querySelector('.intro') ? 2300 : 200;
    const t = setTimeout(() => setReady(true), delay);
    const ids = items.map((i) => i.id);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { clearTimeout(t); io.disconnect(); };
  }, [items]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) window.__lenis?.stop(); else window.__lenis?.start();
  }, [open]);

  return (
    <>
      <header className={`header ${ready ? 'is-ready' : ''}`}>
        <div className="frame grid header__inner">
          <a href="#hero" className="header__brand">{brand}</a>
          <nav className="header__nav" aria-label="섹션 이동">
            {items.map((it) => (
              <a key={it.id} href={`#${it.id}`} className={`nav-link ${active === it.id ? 'is-active' : ''}`}
                 aria-current={active === it.id ? 'true' : undefined}>
                <i className="nav-link__dot" aria-hidden="true" />
                <span className="nav-link__w"><span className="nav-link__t" data-t={it.label}>{it.label}</span></span>
              </a>
            ))}
            <a href={cta.href} className="nav-link nav-link--cta">
              <span className="nav-link__w"><span className="nav-link__t" data-t={cta.label}>{cta.label}</span></span>
            </a>
            <button className="header__menu-btn" aria-expanded={open} aria-controls="mmenu" onClick={() => setOpen(true)}>MENU</button>
          </nav>
        </div>
      </header>
      <ThemeToggle />
      <div id="mmenu" className={`mmenu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <button className="mmenu__close" onClick={() => setOpen(false)} aria-label="메뉴 닫기">CLOSE</button>
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{it.label}</a>
        ))}
        <a href={cta.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{cta.label} →</a>
      </div>
    </>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.siteTheme === 'light' ? 'dark' : 'light';
    root.dataset.siteTheme = next;
    try { localStorage.setItem('site-theme', next); } catch {}
  };
  return <button className="theme-toggle" onClick={toggle} aria-label="라이트/다크 테마 전환" />;
}

/* ------------------------------------------------------------------
   Intro — 세션당 1회, 56.7 → 88.7 카운터
------------------------------------------------------------------- */
export function Intro({ from, to, label }) {
  const [state, setState] = useState('hidden'); // hidden | show | out
  const numRef = useRef(null);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('intro-seen') === '1'; } catch {}
    const small = window.matchMedia('(max-width: 959px)').matches;
    if (seen || small || reduced()) return;
    setState('show');
    try { sessionStorage.setItem('intro-seen', '1'); } catch {}
    window.__lenis?.stop();
    const t0 = performance.now() + 300;
    let raf;
    const step = (now) => {
      const t = Math.min(1, Math.max(0, (now - t0) / 1400));
      const e = 1 - Math.pow(1 - t, 3);
      if (numRef.current) numRef.current.textContent = (from + (to - from) * e).toFixed(1);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const t1 = setTimeout(() => setState('out'), 2000);
    const t2 = setTimeout(() => { setState('hidden'); window.__lenis?.start(); }, 2900);
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); };
  }, [from, to]);

  if (state === 'hidden') return null;
  return (
    <div className={`intro ${state === 'out' ? 'is-out' : ''}`} aria-hidden="true">
      <p className="intro__lbl">
        {label.replace(/\s*\.$/, '')}{' '}
        <span className="intro__dots"><span>.</span><span>.</span><span>.</span></span>
      </p>
      <p className="intro__num" ref={numRef}>{from.toFixed(1)}</p>
    </div>
  );
}

/* ------------------------------------------------------------------
   Cursor — 십자선 + 도트, 사례 카드 위에서는 마퀴 필
------------------------------------------------------------------- */
export function Cursor() {
  const ref = useRef(null);
  const [label, setLabel] = useState('');
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || reduced()) return;
    document.documentElement.classList.add('has-cursor');
    const el = ref.current;
    const move = (e) => {
      el.style.setProperty('--x', `${e.clientX}px`);
      el.style.setProperty('--y', `${e.clientY}px`);
      el.classList.add('is-on');
      const pill = e.target.closest('[data-cursor]');
      const link = e.target.closest('a, button, summary');
      el.classList.toggle('is-pill', !!pill);
      el.classList.toggle('is-link', !pill && !!link);
      setLabel(pill ? pill.dataset.cursor : '');
    };
    const leave = () => el.classList.remove('is-on');
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);
  const text = label ? `${label} · ` : '';
  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <i className="cursor__h" />
      <i className="cursor__v" />
      <i className="cursor__dot">
        <span className="cursor__mq">{text.repeat(6)}</span>
      </i>
    </div>
  );
}

/* ------------------------------------------------------------------
   인터랙션 아일랜드
------------------------------------------------------------------- */
export function Quiz({ items, prompt, reveal }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`quiz ${open ? 'is-open' : ''}`}>
      <p className="small-label">{prompt}</p>
      {items.map((it, i) => {
        const [a, b] = it.q.split(/_{3,}/);
        return (
          <p key={i} className="quiz__q rb" style={{ '--i': i }}>
            {a}
            <span className="quiz__blank" aria-label={open ? it.a : '빈칸'}>
              <span className="quiz__ans" aria-hidden={!open}>{it.a}</span>
            </span>
            {b}
          </p>
        );
      })}
      <button className="cta quiz__btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="cta__l">{open ? '정답 가리기' : reveal}</span>
        <span className="cta__a" aria-hidden="true">→</span>
      </button>
    </div>
  );
}

export function BlindQuiz({ prompt, options, answer, revealText }) {
  const [picked, setPicked] = useState(null);
  const open = picked !== null;
  return (
    <>
      <p className="small-label">{prompt}</p>
      <div className={`bq ${open ? 'is-open' : ''}`} role="group" aria-label={prompt}>
        {options.map((o) => (
          <button key={o.id} type="button"
                  className={`bq__opt ${o.id === answer ? 'bq__opt--ans' : ''}`}
                  aria-pressed={picked === o.id}
                  onClick={() => setPicked(o.id)}>
            <span className="bq__id">{o.id}{picked === o.id ? ' ●' : ''}</span>
            <span className="bq__txt">{o.text}</span>
            <span className="bq__tag">{o.value}{o.id === answer ? ' · 1위' : ''}</span>
          </button>
        ))}
      </div>
      <p className="bq__reveal" aria-live="polite">{open ? revealText : ''}</p>
    </>
  );
}

export function Tabs({ tabs }) {
  const [cur, setCur] = useState(0);
  return (
    <div>
      <div className="tabs" role="tablist">
        {tabs.map((t, i) => (
          <button key={t.label} role="tab" id={`tab-${i}`} aria-controls={`panel-${i}`}
                  aria-selected={cur === i} onClick={() => setCur(i)}>{t.label}</button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.label} id={`panel-${i}`} role="tabpanel" aria-labelledby={`tab-${i}`}
             className="tabpanel" hidden={cur !== i}>
          {t.content}
        </div>
      ))}
    </div>
  );
}

export function VideoFacade({ title, caption, embed, poster }) {
  const [play, setPlay] = useState(false);
  return (
    <figure>
      <div className="video" data-cursor={play ? undefined : 'PLAY · HIGHLIGHT'}>
        {play ? (
          <iframe src={`${embed}?autoplay=1&rel=0`} title={title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <button className="video__btn" onClick={() => setPlay(true)} aria-label={`${title} 영상 재생`}>
            <img src={poster} alt="" loading="lazy" decoding="async" />
            <span className="video__play">
              <span className="video__ring"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4l14 8-14 8z" /></svg></span>
              <span className="video__lbl">(Play) {title}</span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="video__meta">
        <span>{title}</span>
        <span className="note">{caption}</span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------
   BGM — 클릭하면 WR BGM(YouTube)을 작은 플레이어로 재생.
   브라우저 정책상 소리 있는 자동 재생은 막혀 있어 첫 재생은 클릭으로 시작한다.
   (YouTube 약관상 플레이어를 숨기지 않고 작게 노출한다)
------------------------------------------------------------------- */
export function BgmPlayer({ id, label = 'WR BGM' }) {
  const [on, setOn] = useState(false);
  return (
    <div className={`bgm ${on ? 'is-on' : ''}`}>
      {on && (
        <div className="bgm__panel">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&rel=0&modestbranding=1`}
            title={`${label} 재생 중`}
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        </div>
      )}
      <button className="bgm__btn" onClick={() => setOn((v) => !v)} aria-pressed={on}
              aria-label={on ? `${label} 끄기` : `${label} 듣기`}>
        <span className="bgm__eq" aria-hidden="true"><i /><i /><i /></span>
        {on ? `${label} 끄기` : `♪ ${label} 듣기`}
      </button>
    </div>
  );
}
