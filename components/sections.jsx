import { Lines, Html, Inline, SecHead, Body, Sources, Stat, Stats, Bars, Dumbbell, DbLegend, Media, assetDesc } from './ui';
import { Quiz, BlindQuiz, Tabs, VideoFacade, BgmTrigger, BgmCta } from './client';

const ext = (href) => (/^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {});

/** 외부 링크 CTA (가이드 · YouTube 등) */
function LinkCta({ href, label, className = '' }) {
  if (!href) return null;
  return (
    <a className={`cta cta--sm ${className}`} href={href} {...ext(href)}>
      <span className="cta__l">{label}</span>
      <span className="cta__a" aria-hidden="true">↗</span>
    </a>
  );
}

/* 공통 래퍼 */
function Sec({ s, children, className = '', srcMap, pad = true }) {
  return (
    <section id={s.id} className={`sec sec--${s.layout} ${className}`} aria-label={s.title.replace(/\n/g, ' ')}>
      {pad ? <div className="frame">{children}<Sources keys={s.sources} map={srcMap} /></div> : children}
    </section>
  );
}

function SubHead({ label, title }) {
  return (
    <div className="sub-head">
      <p className="small-label rb">{label}</p>
      {title && <Lines as="h3" text={title} />}
    </div>
  );
}

/* ================= 01 hero-display ================= */
export function Hero({ s }) {
  const d = s.hero_display;
  return (
    <section id={s.id} className="hero sec--hero-display" aria-label={d.aria_label}>
      <h1 className="sr-only">{d.aria_label}</h1>
      <div className="hero__open hero__type hero__par" data-drift="-30" aria-hidden="true">
        {d.opening.map((l, i) => <span key={i} className="rv"><span className="rv__in" style={{ '--i': i }}>{l}</span></span>)}
      </div>
      <div className="hero__metric rb" style={{ '--i': 4 }}>
        <p className="note">{s.hero_metric.label}</p>
        <p className="hero__metric-v" style={{ marginTop: 8 }}>{s.hero_metric.from} → {s.hero_metric.to}</p>
        <span className="hero__badge">{s.hero_metric.badge}</span>
      </div>
      <div className="hero__close">
        <p className="hero__lead rb" style={{ '--i': 3 }}>{s.lead}</p>
        <div className="hero__type hero__par" data-drift="30" aria-hidden="true">
          {d.closing.map((l, i) => <span key={i} className="rv"><span className="rv__in" style={{ '--i': i + 2 }}>{l}</span></span>)}
        </div>
      </div>
      <dl className="hero__meta rb" style={{ '--i': 5 }}>
        {s.meta.map((m) => <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}
      </dl>
      <a href="#glance" className="hero__arrow rb" style={{ '--i': 6 }} aria-label={s.scroll_hint}>
        <svg viewBox="0 0 56 56" aria-hidden="true"><path d="M26 6h4v36.3l11.6-11.6 2.8 2.8L28 49.9 11.6 33.5l2.8-2.8L26 42.3z" /></svg>
      </a>
    </section>
  );
}

/* ================= 02 indent-stats (At a Glance) ================= */
export function Glance({ s, srcMap }) {
  return (
    <Sec s={s} srcMap={srcMap}>
      <div className="grid sec__head">
        <p className="sec__label rb">({s.eyebrow}) <span className="mute">{String(s.order).padStart(2, '0')}</span></p>
        <Lines text={s.title} className="sec__title" />
      </div>
      <div className="grid">
        <p className="indent rb">{s.lead}</p>
      </div>
      <div className="grid sec__block">
        <div className="glance__skills rb">
          <p className="small-label">Skills</p>
          <div className="chips">{s.skills.map((k) => <span key={k} className="chip">{k}</span>)}</div>
          {s.video && (
            <div className="glance__video">
              <VideoFacade title={s.video.title} caption={s.video.caption} embed={s.video.embed} poster={s.video.poster} />
            </div>
          )}
        </div>
        <div className="glance__tldr">
          {s.tldr.map((t, i) => <Inline key={i} as="p" text={t} className="rb" />)}
        </div>
      </div>
      <div className="sec__block"><Stats items={s.stats} /></div>
    </Sec>
  );
}

/* ================= 03 quiz-baseline ================= */
export function Problem({ s, srcMap }) {
  return (
    <Sec s={s} srcMap={srcMap}>
      <SecHead s={s} />
      <Quiz items={s.quiz.items} prompt={s.quiz.prompt} reveal={s.quiz.reveal} />
      <div className="sec__block">
        <div className="grid stats">
          {s.stats.map((st, i) => <Stat key={i} {...st} i={i} />)}
        </div>
        <div className="grid" style={{ marginTop: 32 }}>
          <p className="rb" style={{ gridColumn: '1 / -1', justifySelf: 'end', border: '1px solid var(--line-strong)', padding: '12px 16px' }}>
            <span className="note">{s.goal.label}</span>&nbsp;&nbsp;<b className="bold">{s.goal.value}</b>
          </p>
        </div>
      </div>
      <Body s={s} />
      <div className="sec__block">
        <SubHead label="(Winning Rules)" title={`Mission — ${s.values.mission}`} />
        {s.values.groups.map((g) => (
          <div key={g.value} className="rules__grp">
            <p className="small-label rb">{g.value} <span className="mute">{g.en}</span></p>
            <div className="hl hl--hover">
              {g.rules.map((r) => (
                <div key={r.no} className="hl__row">
                  <span className="c1 mute tnum">{r.no}</span>
                  <span className="c2 bold">{r.key}</span>
                  <span className="c7">{r.text}</span>
                  <span className="c2 right note">{g.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* ================= sticky-cards (04 · 05) ================= */
function StickyCards({ s, cards, after, srcMap }) {
  return (
    <section id={s.id} className="sec sec--sticky-cards stk" aria-label={s.title.replace(/\n/g, ' ')}>
      <div className={`stk__track ${cards.length >= 3 ? 'stk--on' : ''}`}>
      <div className="frame stk__pin">
        <SecHead s={s} />
        <div className={`grid cards ${cards.length === 3 ? 'cards--3' : ''}`}>
          {cards.map((c, i) => (
            <article key={i} className={`card rb ${c.plan ? 'card--plan' : ''}`} style={{ '--i': i }}>
              <i className="card__fill" aria-hidden="true" />
              <div>
                <p className="card__code">{c.code}</p>
                <h3 className="card__key">{c.key}</h3>
                {c.name && <p className="card__name">{c.name}</p>}
              </div>
              <p className="card__body">{c.body}</p>
              <p className="card__foot note">{c.foot}</p>
            </article>
          ))}
        </div>
      </div>
      </div>
      {after && <div className="frame" style={{ paddingBottom: 'var(--section-pad)' }}>{after}<Sources keys={s.sources} map={srcMap} /></div>}
      {!after && <div className="frame" style={{ paddingBottom: 'var(--section-pad)' }}><Sources keys={s.sources} map={srcMap} /></div>}
    </section>
  );
}

export function RootCause({ s, srcMap }) {
  const cards = s.causes.map((c) => ({ code: c.no, key: c.title, body: c.body, foot: `근거 · ${c.evidence}` }));
  const after = (
    <>
      <div className="grid insight"><p className="indent rb">{s.insight}</p></div>
      <Body s={s} />
    </>
  );
  return <StickyCards s={s} cards={cards} after={after} srcMap={srcMap} />;
}

export function Approach({ s, srcMap }) {
  const cards = s.steps.map((c) => ({
    code: `${c.code} · ${c.status}`, key: c.key, name: c.name, body: c.question, foot: c.tools, plan: c.status !== '실행',
  }));
  const after = (
    <>
      <SubHead label="(Principles)" title="설계 원칙 네 가지" />
      <div className="hl hl--hover">
        {s.principles.map((p, i) => (
          <div key={p.title} className="hl__row">
            <span className="c1 mute tnum">{String(i + 1).padStart(2, '0')}</span>
            <span className="c3 bold">{p.title}</span>
            <span className="c8">{p.body}</span>
          </div>
        ))}
      </div>
      <Body s={s} />
    </>
  );
  return <StickyCards s={s} cards={cards} after={after} srcMap={srcMap} />;
}

/* ================= case-cards 공통 ================= */
function CaseCard({ c, s, i, children }) {
  return (
    <article className="cc rb" style={{ '--i': i % 3 }}>
      <div className="cc__media" data-drift="24" data-cursor={`${c.name} · ${c.meta || ''}`}>
        <Media file={c.media} desc={assetDesc(s, c.media)} alt={c.name} />
        {c.hover_copy && (
          <div className="cc__hover" aria-hidden="true">
            <p>{c.hover_copy[0]}<br />{c.hover_copy[1]}</p>
          </div>
        )}
      </div>
      <div className="cc__meta"><span>{c.name}</span><span className="tnum sub">{c.meta}</span></div>
      {c.hover_copy && <p className="sr-only">{c.hover_copy.join(' ')}</p>}
      {children}
      {(c.guide || c.link) && (
        <div className="cc__links">
          {c.guide && <LinkCta href={c.guide} label="활동 가이드 바로가기" />}
          {c.link && <LinkCta href={c.link.href} label={c.link.label} />}
        </div>
      )}
    </article>
  );
}

function MiniStats({ stats }) {
  if (!stats?.length) return null;
  return (
    <div className="cc__stats">
      {stats.map((st, i) => <div key={i} className="cc__stat"><b>{st.value}</b><span>{st.label}</span></div>)}
    </div>
  );
}

/* ================= 06 SEE ================= */
export function See({ s, srcMap }) {
  return (
    <Sec s={s} srcMap={srcMap}>
      <SecHead s={s} />
      <div className="grid ccards">
        {s.cards.map((c, i) => <CaseCard key={c.name} c={c} s={s} i={i} />)}
      </div>

      <SubHead label="(Touchpoints)" title="하루 동안 지나치는 8개의 접점" />
      <ol className="tp-grid">
        {s.touchpoints.map((t, i) => (
          <li key={t} className="rb" style={{ '--i': i % 4 }}>
            {s.touchpoint_images?.[i] && (
              i === s.touchpoints.length - 1 && s.bgm?.youtube ? (
                <BgmTrigger label={t}><span className="tp-img"><Media file={s.touchpoint_images[i]} ratio="16 / 9" alt={t} /></span></BgmTrigger>
              ) : (
                <span className="tp-img"><Media file={s.touchpoint_images[i]} ratio="16 / 9" alt={t} /></span>
              )
            )}
            <span className="tp-txt"><span className="mute tnum">{String(i + 1).padStart(2, '0')}</span>{t}</span>
          </li>
        ))}
      </ol>

      <SubHead label="(WR BGM)" title={s.bgm.title} />
      <div className="grid"><p className="sec__body rb" style={{ gridColumn: '3 / span 7' }}>{s.bgm.body}</p></div>
      <div className="lyrics sec__block">
        {s.bgm.lyric_samples.map((l, i) => (
          <div key={l.value} className="rb" style={{ '--i': i }}>
            <p className="small-label">{l.value}</p>
            {l.lines.map((x) => <p key={x}>{x}</p>)}
          </div>
        ))}
      </div>
      <p className="chorus rb">상상으로 세상을 이롭게 한다 <span className="note">세 곡의 공통 후렴 · Mission · {s.bgm.versions.join(' · ')}</span></p>
      {s.bgm.youtube && <div className="rb" style={{ marginTop: 20 }}><BgmCta /></div>}

      <div className="sec__block"><Stats items={s.stats} /></div>

      <SubHead label="(Constraint → Alternative)" title={s.constraints.title} />
      <div className="hl hl--hover hl--table">
        <div className="hl__row hl__row--head hl__head"><span className="c3">회사</span><span className="c4">제약</span><span className="c5">대안</span></div>
        {s.constraints.rows.map((r) => (
          <div key={r.company} className="hl__row">
            <span className="c3 bold" data-k="회사">{r.company}</span>
            <span className="c4 sub" data-k="제약">{r.constraint}</span>
            <span className="c5" data-k="대안">{r.alternative}</span>
          </div>
        ))}
      </div>
      <div className="grid insight"><p className="indent rb">{s.takeaway}</p></div>
      <Body s={s} />
    </Sec>
  );
}

/* ================= 07 DO ================= */
export function Do({ s, srcMap }) {
  return (
    <Sec s={s} srcMap={srcMap}>
      <SecHead s={s} />
      {s.guide_all && (
        <div className="grid"><div style={{ gridColumn: '3 / span 4' }} className="rb"><LinkCta href={s.guide_all.href} label={s.guide_all.label} /></div></div>
      )}
      <SubHead label="(Routines)" title={s.routines.title} />
      <div className="grid ccards">
        {s.routines.items.map((it, i) => (
          <CaseCard key={it.name} i={i} s={s} c={{ ...it, meta: it.stats?.[0]?.value }}>
            <p className="cc__desc">{it.desc}</p>
            <MiniStats stats={it.stats} />
            {it.note && <p className="note cc__extra">{it.note}</p>}
            {it.variants && (
              <div className="cc__extra">
                <p className="small-label" style={{ marginTop: 24, marginBottom: 0 }}>{it.variants_title}</p>
                <ul className="variants">{it.variants.map((v) => <li key={v.name}><b className="bold">{v.name}</b><span className="sub">{v.desc}</span></li>)}</ul>
              </div>
            )}
          </CaseCard>
        ))}
      </div>

      <SubHead label="(Programs)" title={s.programs.title} />
      <div className="grid ccards">
        {s.programs.items.map((it, i) => (
          <CaseCard key={it.name} i={i} s={s} c={{ ...it, meta: it.period }}>
            <p className="note" style={{ marginTop: 10 }}>{it.rule}</p>
            <p className="cc__desc">{it.desc}</p>
            <MiniStats stats={it.stats} />
            {it.demo && <p className="note cc__extra">{it.demo}</p>}
          </CaseCard>
        ))}
      </div>

      <SubHead label="(Learning)" title={s.learning.title} />
      <div className="grid vs">
        {s.learning.compare.map((c, i) => (
          <div key={c.label} className={`vs__item rb ${i ? 'vs__item--mute' : ''}`} style={{ '--i': i }} data-count="">
            <p className="small-label">{c.label}</p>
            <p className="vs__v" data-num>{c.value}</p>
            <p className="note" style={{ marginTop: 12 }}>{c.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid sec__block">
        <div style={{ gridColumn: '1 / span 6' }} className="rb">
          <p className="small-label">{s.learning.survey.label}</p>
          <Bars rows={s.learning.survey.rows} max={20} />
        </div>
        <p className="rb" style={{ gridColumn: '8 / span 5', alignSelf: 'end' }}>{s.learning.body}</p>
      </div>
      <Body s={s} />
    </Sec>
  );
}

/* ================= 08 SHARE ================= */
export function Share({ s, srcMap }) {
  const bq = s.blind_quiz;
  return (
    <Sec s={s} srcMap={srcMap}>
      <SecHead s={s} />
      <div className="grid ccards">
        <CaseCard c={s.cover_card} s={s} i={0}>
          <p className="note" style={{ marginTop: 10 }}>{s.timeline}</p>
        </CaseCard>
        <div className="rb" style={{ gridColumn: '8 / span 5', alignSelf: 'end' }}>
          <div className="hl">
            {s.process.map((p) => (
              <div key={p.step} className="hl__row"><span className="c4 bold">{p.step}</span><span className="c8 sub">{p.desc}</span></div>
            ))}
          </div>
        </div>
      </div>

      <SubHead label="(Funnel)" title="43건 → 9건 → 146명" />
      <div className="funnel">
        {s.funnel.map((f, i) => (
          <div key={f.stage} className="funnel__s rb" style={{ '--i': i }}>
            <p className="small-label">{f.stage}</p>
            <p className="funnel__v">{f.value}</p>
            <p className="note">{f.breakdown}</p>
          </div>
        ))}
      </div>

      <div className="grid sec__block">
        <div className="rb" style={{ gridColumn: '1 / span 6' }}>
          <p className="small-label">100점 평가 기준</p>
          <Bars rows={s.criteria.map((c) => ({ name: c.name, value: c.points }))} unit="점" max={30} primary="all" />
        </div>
        <div className="rb" style={{ gridColumn: '8 / span 5' }}>
          <p className="small-label">공정성 장치</p>
          <div className="chips">{s.fairness.map((f) => <span key={f} className="chip">{f}</span>)}</div>
        </div>
      </div>

      <SubHead label="(Blind Vote)" title="여러분이라면?" />
      <BlindQuiz prompt={bq.prompt} options={bq.options} answer={bq.answer} revealText={bq.reveal} />

      <div className="grid sec__block">
        <blockquote className="quote" style={{ gridColumn: '1 / -1' }}>
          <Lines as="span" text={`“${s.quote.text}”`} />
          <p className="quote__by note rb">— {s.quote.by}</p>
        </blockquote>
      </div>

      <SubHead label="(Impact)" title={s.impact.title} />
      <div className="grid stats">
        {s.impact.items.map((it, i) => <Stat key={i} value={it.value} sub={it.desc} cls="stat--sm" i={i} />)}
      </div>
      <div className="grid insight"><p className="indent rb" style={{ fontSize: 'var(--fs-card)' }}>{s.reusable}</p></div>
      <Body s={s} />
    </Sec>
  );
}

/* ================= 09 evidence ================= */
export function Results({ s, srcMap }) {
  const [avg, full] = s.headline;
  return (
    <Sec s={s} srcMap={srcMap}>
      <SecHead s={s} />

      <div className="grid mega">
        <div className="mega__from rb">
          <p className="small-label">T0 · 2026.05</p>
          <p className="stat__v">{avg.from}%</p>
        </div>
        <p className="mega__to rb" data-count="" data-from={avg.from} data-dur="1600" aria-label={`${avg.label} ${avg.to}%`}>
          <span data-num>{avg.to}%</span>
        </p>
        <div className="mega__side rb">
          <b>{avg.delta}</b>
          <span className="note">{avg.label} · 목표 {avg.target}%</span>
          <b style={{ marginTop: 16 }}>{full.from}% → {full.to}%</b>
          <span className="note">{full.label} · {full.delta}</span>
        </div>
      </div>

      <SubHead label="(Measurement)" title={s.design.title} />
      <div className="hl hl--table">
        {s.design.rows.map((r) => (
          <div key={r.label} className="hl__row"><span className="c2 bold" data-k="">{r.label}</span><span className="c10" style={{ gridColumn: 'span 10' }}>{r.value}</span></div>
        ))}
      </div>
      <p className="note" style={{ marginTop: 12 }}>* {s.design.note}</p>

      <SubHead label="(Evidence)" title="두 가지 근거가 같은 방향을 가리켰습니다" />
      <div className="grid ev">
        {s.evidence.map((e, i) => (
          <div key={e.title} className="ev__item rb" style={{ '--i': i }}>
            <p className="small-label">{e.title}</p>
            <h3 className="ev__claim">{e.claim}</h3>
            <Bars rows={e.chart.data} unit={e.chart.unit} max={100} />
            <p className="note ev__caveat">{e.caveat}</p>
          </div>
        ))}
      </div>

      <SubHead label="(Breakdown)" title="회사별 · 문항별 변화" />
      <Tabs tabs={[
        {
          label: '회사별',
          content: (
            <>
              <p className="small-label">{s.by_company.title} <span className="note">· {s.by_company.note}</span></p>
              <Dumbbell rows={s.by_company.rows} ref80={80} />
              <DbLegend ref80="목표 80%" />
            </>
          ),
        },
        {
          label: '문항별',
          content: (
            <>
              <p className="small-label">{s.by_item.title}</p>
              <Dumbbell rows={s.by_item.rows} labelKey="key" ref80={80} />
              <DbLegend ref80="80% 기준" />
            </>
          ),
        },
      ]} />

      <SubHead label="(Gap)" title={s.gap.title} />
      <div className="grid">
        <div style={{ gridColumn: '1 / span 8' }}>
          <Dumbbell rows={s.gap.rows.map((r) => ({ name: r.label, t0: r.from, t1: r.to }))} min={1} max={5} unit="" wide />
          <DbLegend />
        </div>
        <p className="rb" style={{ gridColumn: '9 / span 4', alignSelf: 'end' }}>{s.gap.body}</p>
      </div>

      <div className="grid sec__block">
        <div className="rb" style={{ gridColumn: '1 / span 6' }}>
          <p className="small-label">{s.what_worked.title}</p>
          <Bars rows={s.what_worked.rows} max={50} />
        </div>
        <div className="rb" style={{ gridColumn: '8 / span 5' }}>
          <p className="small-label">{s.behavior.title}</p>
          <Bars rows={s.behavior.coding} max={50} primary="all" />
          <p className="note" style={{ marginTop: 12 }}>{s.behavior.note}</p>
        </div>
      </div>
      <div className="quotes3 sec__block">
        {s.behavior.quotes.map((q, i) => <blockquote key={i} className="rb" style={{ '--i': i }}>{q}</blockquote>)}
      </div>

      <SubHead label="(Limits)" title={s.limits.title} />
      <ol className="hl limits">
        {s.limits.items.map((l, i) => (
          <li key={i} className="hl__row"><span className="c1 mute tnum">{String(i + 1).padStart(2, '0')}</span><span className="c11" style={{ gridColumn: 'span 11' }}>{l}</span></li>
        ))}
      </ol>
      <Body s={s} />
    </Sec>
  );
}

/* ================= 10 hairline-table (advantage) ================= */
export function Advantage({ s, srcMap }) {
  const [c1, c2, c3] = s.compare.columns;
  return (
    <Sec s={s} srcMap={srcMap}>
      <SecHead s={s} />
      <div className="hl hl--hover hl--table">
        <div className="hl__row hl__row--head hl__head">
          <span className="c2">구분</span><span className="c3">{c1}</span><span className="c4">{c2}</span><span className="c3">{c3}</span>
        </div>
        {s.compare.rows.map((r) => (
          <div key={r.axis} className="hl__row">
            <span className="c2 bold" data-k="구분">{r.axis}</span>
            <span className="c3 mute" data-k={c1}>{r.common}</span>
            <span className="c4" data-k={c2}>{r.ours}</span>
            <span className="c3 note" data-k={c3}>{r.proof}</span>
          </div>
        ))}
      </div>
      <p className="note" style={{ marginTop: 12 }}>* {s.note}</p>
      <Body s={s} />
    </Sec>
  );
}

/* ================= 11 case-cards (AI) ================= */
export function MadeWithAi({ s, srcMap }) {
  return (
    <Sec s={s} srcMap={srcMap}>
      <SecHead s={s} />
      <div className="grid ccards">
        {s.items.map((it, i) => (
          <CaseCard key={it.name} i={i} s={s} c={{ name: it.name, meta: it.type, hover_copy: it.hover_copy, media: it.asset || `ai-${i}.png`, link: it.link }}>
            <p className="cc__desc">{it.desc}</p>
            <div className="hl" style={{ marginTop: 16 }}>
              <div className="hl__row" style={{ minHeight: 48, padding: '10px 0' }}><span className="c3 note">담당</span><span className="c9">{it.owner}</span></div>
              <div className="hl__row" style={{ minHeight: 48, padding: '10px 0' }}><span className="c3 note">도구</span><span className="c9">{it.stack.join(' · ')}</span></div>
              <div className="hl__row" style={{ minHeight: 48, padding: '10px 0' }}><span className="c3 note">결과</span><span className="c9">{it.result}</span></div>
            </div>
          </CaseCard>
        ))}
      </div>
      <div className="sec__block"><Stats items={s.stats} /></div>
      <Body s={s} />
    </Sec>
  );
}

/* ================= 12 hairline-table (timeline · cost) ================= */
export function Timeline({ s, srcMap }) {
  return (
    <Sec s={s} srcMap={srcMap}>
      <SecHead s={s} />
      <div className="phases rb">
        {s.phases.map((p, i) => (
          <div key={p.name} className={`phase ${i ? 'phase--ext' : ''}`}>
            <p className="bold">{p.name}</p>
            <p className="note">{p.range}{p.note ? ` · ${p.note}` : ''}</p>
          </div>
        ))}
      </div>
      <div className="hl hl--hover">
        {s.milestones.map((m) => (
          <div key={m.date + m.label} className="hl__row">
            <span className="c9">{m.label}</span>
            <span className="c3 right tnum">{m.date}</span>
          </div>
        ))}
      </div>

      <SubHead label="(Plan vs Actual)" title="계획한 것과 실제로 한 것" />
      <div className="hl hl--hover hl--table">
        <div className="hl__row hl__row--head hl__head"><span className="c3">항목</span><span className="c4">계획</span><span className="c5">결과</span></div>
        {s.plan_vs_actual.map((r) => (
          <div key={r.item} className="hl__row">
            <span className="c3 bold" data-k="항목">{r.item}</span>
            <span className="c4 mute" data-k="계획">{r.plan}</span>
            <span className="c5" data-k="결과">{r.actual}</span>
          </div>
        ))}
      </div>

      <SubHead label="(Cost)" title="투입 비용" />
      <div className="grid cost">
        <div style={{ gridColumn: '1 / span 5' }}>
          <div className="grid stats" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="stat stat--sm rb" style={{ gridColumn: 'auto' }}><p className="stat__v">{s.cost.per_person}</p><p className="stat__l">구성원 1인당</p></div>
            <div className="stat stat--sm rb" style={{ gridColumn: 'auto', '--i': 1 }}><p className="stat__v mute">{s.cost.total}</p><p className="stat__l">총 투입</p></div>
          </div>
          <p className="note" style={{ marginTop: 16 }}>{s.cost.per_person_basis}</p>
        </div>
        <div className="rb" style={{ gridColumn: '7 / span 6' }}>
          <p className="small-label">항목별 비중</p>
          <Bars rows={s.cost.breakdown.map((b) => ({ name: b.name, value: b.share }))} max={50} primary="all" />
        </div>
      </div>
      <Body s={s} />
    </Sec>
  );
}

/* ================= 13 lessons & next ================= */
export function Lessons({ s, srcMap }) {
  const e = s.embed;
  return (
    <Sec s={s} srcMap={srcMap}>
      <SecHead s={s} />
      <div className="grid stats">
        {s.lessons.map((l, i) => (
          <div key={l.no} className="stat rb" style={{ '--i': i }}>
            <p className="note tnum">{l.no}</p>
            <p className="stat__v" style={{ marginTop: 12 }}>{l.metric}</p>
            <p className="stat__s note">{l.metric_label}</p>
            <p className="blk-title" style={{ margin: '24px 0 10px' }}>{l.title}</p>
            <p className="sub">{l.body}</p>
          </div>
        ))}
      </div>

      <SubHead label="(After)" title={s.after.title} />
      <div className="grid">
        {s.after.columns.map((c, i) => (
          <div key={c.who} className="rb" style={{ gridColumn: i ? '7 / span 6' : '1 / span 6', '--i': i }}>
            <p className="small-label">{c.who}</p>
            <div className="hl">{c.items.map((x) => <div key={x} className="hl__row" style={{ minHeight: 56 }}><span className="c12" style={{ gridColumn: '1 / -1' }}>{x}</span></div>)}</div>
          </div>
        ))}
      </div>
      <div className="grid insight"><p className="indent rb" style={{ fontSize: 'var(--fs-card)' }}>{s.after.highlight}</p></div>

      <SubHead label="(P4 · EMBED)" title={e.title} />
      <div className="grid cards">
        {e.areas.map((a, i) => (
          <article key={a.code} className="card card--plan rb" style={{ '--i': i }}>
            <div><p className="card__code">{a.code}</p><h3 className="card__key">{a.name}</h3></div>
            <p className="card__body">{a.desc}</p>
            <p className="card__foot note">{e.status}</p>
          </article>
        ))}
      </div>
      <ol className="hl" style={{ marginTop: 32 }}>
        {e.path.map((p, i) => (
          <li key={p} className="hl__row" style={{ minHeight: 56 }}><span className="c1 mute tnum">{String(i + 1).padStart(2, '0')}</span><span className="c11" style={{ gridColumn: 'span 11' }}>{p}</span></li>
        ))}
      </ol>
      <Body s={s} />
    </Sec>
  );
}

/* ================= 14 hairline-list (role) ================= */
export function Role({ s, srcMap }) {
  return (
    <Sec s={s} srcMap={srcMap}>
      <SecHead s={s} />
      <div className="grid role">
        <p className="indent rb" style={{ textIndent: 0, gridColumn: '1 / span 7' }}>{s.role.title}<br /><span className="mute">{s.role.scope}</span></p>
        <div className="rb" style={{ gridColumn: '9 / span 4' }}>
          <p>{s.role.org}</p>
          <p className="note" style={{ marginTop: 6 }}>{s.role.team}</p>
        </div>
      </div>
      <div className="acc sec__block">
        {s.contributions.map((c) => (
          <details key={c.area} open>
            <summary><span className="t">{c.area}</span><span className="n">{String(c.items.length).padStart(2, '0')}</span><span className="pm" aria-hidden="true">+</span></summary>
            <ul>{c.items.map((x) => <li key={x}>{x}</li>)}</ul>
          </details>
        ))}
      </div>
      <p className="note" style={{ marginTop: 16 }}>{s.credit}</p>
      <Body s={s} />
    </Sec>
  );
}

/* ================= 15 contact-marquee ================= */
export function Closing({ s, site }) {
  const mq = site.design?.marquee || 'WINNING RULES · ';
  return (
    <section id={s.id} className="contact sec--contact-marquee" aria-label="연락하기">
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">{[0, 1, 2, 3].map((i) => <span key={i}>{mq}</span>)}</div>
      </div>
      <div className="frame">
        <div className="grid">
          <p className="sec__label rb" style={{ gridColumn: '1 / -1', marginBottom: 24 }}>({s.eyebrow})</p>
          <Lines text={s.title} className="contact__title" />
          <div className="contact__sum rb">
            <p className="bold">{s.profile.name} <span className="sub" style={{ fontWeight: 500 }}>· {s.profile.title}</span></p>
            <p className="sub" style={{ marginTop: 10 }}>{s.profile.summary}</p>
            <div className="chips" style={{ marginTop: 16 }}>{s.profile.focus.map((f) => <span key={f} className="chip">{f}</span>)}</div>
          </div>
          <div className="contact__ctas rb">
            {s.contact.map((c) => (
              <a key={c.label} className="cta" href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="cta__l"><span className="note" style={{ display: 'block', marginBottom: 6 }}>{c.label}</span>{c.value}</span>
                <span className="cta__a" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
          <p className="contact__credit note rb"><b className="bold">{s.credits.title}</b> — {s.credits.body}</p>
        </div>
      </div>
    </section>
  );
}

export const SECTION_COMPONENTS = {
  glance: Glance, problem: Problem, 'root-cause': RootCause, approach: Approach,
  see: See, do: Do, share: Share, results: Results, advantage: Advantage,
  'made-with-ai': MadeWithAi, timeline: Timeline, lessons: Lessons, 'my-role': Role,
};
