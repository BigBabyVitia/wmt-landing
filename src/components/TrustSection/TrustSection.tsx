import './TrustSection.css';

export function TrustSection() {
  return (
    <section className="trust-section section bg-light" id="section-trust">
      <div className="screen">
        <h2 className="h2">Программа собрана из личной практики автора</h2>

        <div className="two-col trust-section__cols mt-large" style={{ alignItems: 'stretch' }}>

          {/* Фото + имя */}
          <div className="trust-section__photo-col">
            <img
              src="/experts/viktor-khomula.png"
              alt="Виктор Хомула — фаундер WMT AI"
              className="trust-section__photo"
            />
            <div className="trust-section__photo-overlay" />
            <div className="trust-section__photo-caption">
              <h3 className="trust-section__name">Виктор Хомула</h3>
              <p className="trust-section__role">Фаундер WMT AI, эксперт по внедрению нейросетей</p>
            </div>
          </div>

          {/* Биография и credibility */}
          <div className="trust-section__bio-col">
            <div>
              <div className="card-meta">Практика, а не теория</div>
              <p className="body-text mt-small">
                Вся программа построена не на пересказе статей из интернета, а на реальном опыте
                внедрения ИИ-агентов в рабочие процессы реального бизнеса. То, что вы получите на
                интенсиве, мы используем в WMT каждый день.
              </p>
            </div>

            <div className="trust-section__facts">

              <div className="trust-section__fact">
                <div className="trust-section__fact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="trust-section__fact-title">Академическое признание</h4>
                  <p className="body-small text-muted">Выдача сертификатов Global Academic Standards (партнерство WMT).</p>
                </div>
              </div>

              <div className="trust-section__fact">
                <div className="trust-section__fact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <h4 className="trust-section__fact-title">Доказанный ROI</h4>
                  <p className="body-small text-muted">Мы перевели на ИИ-операционку сотни сотрудников, сократив затраты на рутину на сотни часов в месяц.</p>
                </div>
              </div>

              <div className="trust-section__fact">
                <div className="trust-section__fact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <h4 className="trust-section__fact-title">Фокус на результатах бизнеса</h4>
                  <p className="body-small text-muted">Никаких «поиграться с нейросетью». Только те инструменты, которые прямо спасают время и деньги компании.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
