import { inline, imageUrl } from '@/lib/content';

/** 줄 단위 리빌 타이틀. "\n"으로 줄을 나눈다. */
export function Lines({ text = '', as: Tag = 'h2', className = '', start = 0 }) {
  const lines = String(text).split('\n');
  return (
    <Tag className={className} aria-label={lines.join(' ')}>
      {lines.map((l, i) => (
        <span key={i} className="rv" aria-hidden="true">
          <span className="rv__in" style={{ '--i': i + start }}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Html({ html, className = '', as: Tag = 'div' }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Inline({ text, as: Tag = 'span', className = '' }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: inline(text) }} />;
}

export function SecHead({ s, titleClass = 'sec__title' }) {
  const num = String(s.order).padStart(2, '0');
  return (
    <div className="grid sec__head">
      <p className="sec__label rb">({s.eyebrow}) <span className="mute">{num}</span></p>
      <Lines text={s.title} className={titleClass} />
      {s.lead && <p className="sec__lead rb" style={{ '--i': 2 }}>{s.lead}</p>}
    </div>
  );
}

export function Body({ s }) {
  if (!s.html) return null;
  return (
    <div className="grid sec__block">
      <Html html={s.html} className="sec__body rb" />
    </div>
  );
}

export function Sources({ keys = [], map }) {
  if (!keys?.length) return null;
  return (
    <div className="grid sources">
      <p className="note">
        <b className="bold">출처 — </b>
        {keys.map((k) => <span key={k}>{map[k] || k}</span>)}
      </p>
    </div>
  );
}

/** 숫자만 든 값이면 카운트업 대상으로 표시 */
const countable = (v) => /^[^\d]*?[\d,]+(?:\.\d+)?[^\d]*$/.test(String(v));

export function Stat({ value, label, sub, cls = '', i = 0, from }) {
  const c = countable(value);
  return (
    <div className={`stat rb ${cls}`} style={{ '--i': i }} {...(c ? { 'data-count': '', 'data-from': from } : {})}>
      <p className="stat__v" data-num>{value}</p>
      {label && <p className="stat__l">{label}</p>}
      {sub && <p className="stat__s note">{sub}</p>}
    </div>
  );
}

export function Stats({ items = [], cls = '' }) {
  return (
    <div className="grid stats">
      {items.map((st, i) => <Stat key={i} {...st} cls={cls} i={i} />)}
    </div>
  );
}

/** 2px 가로 막대. 주 계열 = 흰 실선, 비교 계열 = 42% 반투명 */
export function Bars({ rows, unit = '%', max, primary = 0 }) {
  const top = max ?? Math.max(...rows.map((r) => r.value));
  return (
    <div className="bars" role="img" aria-label={rows.map((r) => `${r.name} ${r.value}${unit}`).join(', ')}>
      {rows.map((r, i) => {
        const isPrimary = primary === 'all' || i === primary || r.primary;
        return (
          <div key={r.name} className={`bar ${isPrimary ? '' : 'bar--mute'}`} aria-hidden="true">
            <div className="bar__top">
              <span>{r.name}</span>
              <span className="bar__val">{r.value}{unit}</span>
            </div>
            <div className="bar__track">
              <i className="bar__fill" style={{ '--w': Math.max(0.01, r.value / top), '--i': i }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 덤벨 차트 — T0(빈 원) → T1(채운 원). 라벨 겹침 없이 변화폭을 보여준다. */
export function Dumbbell({ rows, min = 0, max = 100, ref80, unit = '%', fromKey = 't0', toKey = 't1', labelKey = 'name', deltaKey = 'delta', wide = false }) {
  const pos = (v) => `${((v - min) / (max - min)) * 100}%`;
  return (
    <div className={`db ${wide ? 'db--wide' : ''}`}>
      <table className="sr-only">
        <thead><tr><th>항목</th><th>이전</th><th>이후</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r[labelKey]}><td>{r[labelKey]}</td><td>{r[fromKey]}</td><td>{r[toKey]}</td></tr>)}</tbody>
      </table>
      {rows.map((r, i) => {
        const a = r[fromKey], b = r[toKey];
        return (
          <div key={r[labelKey]} className={`db__row ${r.highlight ? 'db__row--hl' : ''}`} aria-hidden="true">
            <span className="db__name">{r[labelKey]}</span>
            <span className="db__track">
              <i className="db__axis" />
              {ref80 != null && <i className="db__ref" style={{ left: pos(ref80) }} />}
              <i className="db__seg" style={{ left: pos(Math.min(a, b)), width: `calc(${pos(Math.max(a, b))} - ${pos(Math.min(a, b))})`, '--i': i }} />
              <i className="db__dot db__dot--a" style={{ left: pos(a) }} />
              <i className="db__dot db__dot--b" style={{ left: pos(b) }} />
            </span>
            <span className="db__val">
              <span className="mute">{a}{unit} →</span>{b}{unit}
              {r[deltaKey] && <span className="note"> {r[deltaKey]}</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function DbLegend({ a = 'T0', b = 'T1', ref80 }) {
  return (
    <p className="db__legend note" aria-hidden="true">
      <span><i className="db__dot--a" style={{ border: '1px solid var(--text-mute)' }} />{a}</span>
      <span><i style={{ background: 'var(--c-fg)' }} />{b}</span>
      {ref80 && <span><i style={{ width: 0, height: 12, borderLeft: '1px dashed var(--line-strong)', borderRadius: 0 }} />{ref80}</span>}
    </p>
  );
}

/** 이미지 — public/images에 파일이 있으면 그레이스케일 이미지, 없으면 자리표시자 */
export function Media({ file, desc, ratio = '8 / 9', alt }) {
  const src = imageUrl(file);
  return (
    <div className="media" style={{ aspectRatio: ratio }}>
      {src && /\.(mp4|webm)$/i.test(file) ? (
        <video muted loop autoPlay playsInline preload="metadata" aria-label={alt || desc || ''}
               poster={imageUrl(file.replace(/\.(mp4|webm)$/i, '.poster.webp')) || undefined}>
          {imageUrl(file.replace(/\.(mp4|webm)$/i, '.webm')) && <source src={imageUrl(file.replace(/\.(mp4|webm)$/i, '.webm'))} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      ) : src ? (
        <img src={src} alt={alt || desc || ''} loading="lazy" decoding="async" />
      ) : (
        <div className="media__ph" role="img" aria-label={`이미지 자리: ${desc || file}`}>
          <i className="media__ph-x" />
          <span className="note bold">(Image)</span>
          <span className="note">{file}{desc ? ` — ${desc}` : ''}</span>
        </div>
      )}
    </div>
  );
}

export const assetDesc = (s, file) => s.assets?.find((a) => a.file === file)?.desc;
