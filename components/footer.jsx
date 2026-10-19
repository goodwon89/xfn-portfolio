export function Footer({ site, sections }) {
  const word = (site.design?.wordmark || 'GOODWON').split('');
  const navs = sections.filter((s) => s.nav);
  return (
    <>
      <div className="footer-spacer" aria-hidden="true" />
      <footer className="footer">
        <div className="frame grid footer__cols">
          <div className="footer__col" style={{ gridColumn: '1 / span 3' }}>
            <h4>Sections</h4>
            <ul>{navs.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.nav}</a></li>)}</ul>
          </div>
          <div className="footer__col" style={{ gridColumn: '7 / span 3' }}>
            <h4>Contact</h4>
            <ul>
              {site.footer.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col" style={{ gridColumn: '11 / span 2', justifySelf: 'end' }}>
            <h4>Top</h4>
            <ul><li><a href="#hero">Back to Top ↑</a></li></ul>
          </div>
        </div>
        <div className="wm" aria-label={word.join('')}>
          <p className="wm__text" aria-hidden="true">
            {word.map((c, i) => <span key={i} className="wm__c"><span style={{ '--i': i }}>{c}</span></span>)}
          </p>
        </div>
        <div className="frame">
          <div className="footer__bar">
            <span className="note">{site.footer.copyright}</span>
            <span className="note">{site.footer.disclaimer}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
