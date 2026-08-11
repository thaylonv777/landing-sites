"use client";

import { useEffect, useRef, useState } from "react";

const WHATSAPP =
  "https://wa.me/5551993933653?text=" +
  encodeURIComponent("Olá! Quero um site profissional com SEO para o meu negócio.");

export default function Page() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.16 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <Header scrolled={scrolled} />
      <Hero />
      <Proof />
      <Differentials />
      <VideoBlock />
      <FinalCta />
      <Footer />
      <WaFloat />
    </main>
  );
}

/* ---------------- HEADER ---------------- */
function Header({ scrolled }) {
  return (
    <header className={`hd ${scrolled ? "hd-on" : ""}`}>
      <div className="hd-in">
        <a href="#" className="hd-logo display">
          átrio<span className="accent">.</span>
        </a>
        <nav className="hd-nav">
          <a href="#prova">Resultado</a>
          <a href="#diferenciais">O que entregamos</a>
          <a href="#video">Como funciona</a>
        </nav>
        <a href={WHATSAPP} target="_blank" rel="noopener" className="hd-cta">
          Falar no WhatsApp
        </a>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden />
      <div className="hero-in">
        <div className="eyebrow reveal">
          <span className="eyebrow-dot" /> Criação de sites · SEO profissional
        </div>
        <h1 className="hero-h1 display reveal d1">
          Um site que <span className="chrome">aparece</span> quando
          <br />procuram pelo seu negócio.
        </h1>
        <p className="hero-sub reveal d2">
          A Átrio cria sites rápidos, sob medida e otimizados para os mecanismos de busca.
          Presença orgânica no Google — sem depender só de anúncio.
        </p>

        <SearchDemo />

        <div className="hero-actions reveal d4">
          <a href={WHATSAPP} target="_blank" rel="noopener" className="btn-primary">
            Quero meu site
            <Arrow />
          </a>
          <a href="#prova" className="btn-ghost">Ver um resultado real</a>
        </div>
      </div>
    </section>
  );
}

/* Signature: busca que digita sozinha e revela o site subindo ao topo */
function SearchDemo() {
  const term = "desentupidora em montenegro";
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [rise, setRise] = useState(false);
  const wrapRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          runSequence();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line
  }, []);

  function runSequence() {
    let i = 0;
    const type = () => {
      if (i <= term.length) {
        setTyped(term.slice(0, i));
        i++;
        setTimeout(type, 55 + Math.random() * 50);
      } else {
        setTimeout(() => setShowResults(true), 350);
        setTimeout(() => setRise(true), 1100);
      }
    };
    setTimeout(type, 400);
  }

  return (
    <div className="search-demo reveal d3" ref={wrapRef}>
      <div className="sd-bar">
        <SearchIcon />
        <span className="sd-text">
          {typed}
          <span className="sd-caret" />
        </span>
      </div>
      <div className={`sd-results ${showResults ? "sd-open" : ""}`}>
        <div className={`sd-item sd-winner ${rise ? "sd-rise" : ""}`}>
          <span className="sd-rank">1</span>
          <div className="sd-item-body">
            <div className="sd-item-title">Seu negócio aqui — feito pela Átrio</div>
            <div className="sd-item-url">seunegocio.com.br</div>
          </div>
          <span className="sd-badge">topo</span>
        </div>
        <div className="sd-item sd-ghost"><span className="sd-rank">2</span><div className="sd-line" /></div>
        <div className="sd-item sd-ghost"><span className="sd-rank">3</span><div className="sd-line short" /></div>
      </div>
    </div>
  );
}

/* ---------------- PROVA SOCIAL ---------------- */
function Proof() {
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e.forEach((x) => x.isIntersecting && setGo(true)), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="proof" id="prova" ref={ref}>
      <div className="proof-in">
        <div className="proof-head reveal">
          <div className="eyebrow"><span className="eyebrow-dot" /> Resultado real</div>
          <h2 className="sec-h2 display">
            30 dias no ar. <span className="chrome">1.090 impressões</span> no Google —
            de forma orgânica.
          </h2>
          <p className="sec-lead">
            Um site desenvolvido pela Átrio com SEO profissional, medido direto no Google Search Console.
            Sem anúncio pago para gerar essas buscas.
          </p>
        </div>

        <div className="proof-panel reveal d1">
          <div className="pp-stats">
            <Stat go={go} big="1.090" small="impressões no Google" sub="em 30 dias, orgânicas" />
            <Stat go={go} big="9,4" small="posição média" sub="primeira dobra das buscas" />
            <Stat go={go} big="30" small="dias no ar" sub="do lançamento à medição" />
          </div>
          <Chart go={go} />
          <div className="pp-source">
            <DotGrid /> Fonte: Google Search Console · período personalizado de 30 dias
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ go, big, small, sub }) {
  return (
    <div className={`stat ${go ? "stat-in" : ""}`}>
      <div className="stat-big display chrome">{big}</div>
      <div className="stat-small">{small}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

/* Gráfico de crescimento que se desenha */
function Chart({ go }) {
  const path = "M0,150 L60,120 L120,60 L180,52 L240,70 L300,64 L360,96 L420,44 L480,58 L540,30 L600,40";
  return (
    <div className="chart">
      <svg viewBox="0 0 600 170" preserveAspectRatio="none" className="chart-svg">
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(230,51,41,0.16)" />
            <stop offset="100%" stopColor="rgba(230,51,41,0)" />
          </linearGradient>
          <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8593A0" />
            <stop offset="100%" stopColor="#E63329" />
          </linearGradient>
        </defs>
        <path className={`chart-fill ${go ? "on" : ""}`} d={`${path} L600,170 L0,170 Z`} fill="url(#fill)" />
        <path className={`chart-line ${go ? "on" : ""}`} d={path} fill="none" stroke="url(#stroke)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="chart-base" />
    </div>
  );
}

/* ---------------- DIFERENCIAIS ---------------- */
function Differentials() {
  const items = [
    { t: "Presença orgânica no Google", d: "Site otimizado para os mecanismos de busca, para você aparecer quando o cliente procura pelo que você faz — sem depender só de anúncio." },
    { t: "Rápido e sob medida", d: "Construção com estrutura moderna e leve, no design e na identidade do seu negócio. Carrega rápido no celular e no computador." },
    { t: "SEO profissional aplicado", d: "Estrutura técnica, títulos, descrições e organização pensados para buscas relevantes ao seu negócio — do jeito certo, desde o início." },
    { t: "Credibilidade que converte", d: "Um site bem construído passa seriedade. É o cartão de visita que trabalha por você 24 horas por dia." },
    { t: "Pronto para sua estratégia", d: "Seu site também serve de base para o resto do marketing — inclusive tráfego pago, se você já trabalha com anúncios." },
    { t: "Entrega ágil", d: "Do briefing ao ar em pouco tempo, com acompanhamento direto e sem enrolação." },
  ];
  return (
    <section className="diff" id="diferenciais">
      <div className="diff-in">
        <div className="diff-head reveal">
          <div className="eyebrow"><span className="eyebrow-dot" /> O que entregamos</div>
          <h2 className="sec-h2 display">Não é só um site bonito.<br />É um site que <span className="chrome">trabalha</span>.</h2>
        </div>
        <div className="diff-grid">
          {items.map((it, i) => (
            <article key={i} className={`diff-card reveal d${(i % 4) + 1}`}>
              <div className="diff-num display">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="diff-t display">{it.t}</h3>
              <p className="diff-d">{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- VÍDEO ---------------- */
function VideoBlock() {
  const [sound, setSound] = useState(false);
  const src =
    "https://www.youtube.com/embed/cfoffvzg1Qg?autoplay=1&mute=" +
    (sound ? "0" : "1") +
    "&loop=1&playlist=cfoffvzg1Qg&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0";
  return (
    <section className="video" id="video">
      <div className="video-in">
        <div className="video-head reveal">
          <div className="eyebrow"><span className="eyebrow-dot" /> Como funciona</div>
          <h2 className="sec-h2 display">Veja a Átrio <span className="chrome">em movimento</span>.</h2>
        </div>
        <div className="video-frame reveal d1">
          <div className="vf-phone">
            <iframe
              src={src}
              title="Átrio"
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
            />
            <button className="vf-sound" onClick={() => setSound((s) => !s)} aria-label={sound ? "Desativar som" : "Ativar som"}>
              {sound ? <SoundOn /> : <SoundOff />}
              {sound ? "Som ligado" : "Ativar som"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA FINAL ---------------- */
function FinalCta() {
  return (
    <section className="cta">
      <div className="cta-in reveal">
        <div className="cta-plate display">
          <h2 className="cta-h2 display">
            Seu próximo cliente está<br /><span className="chrome">procurando agora.</span>
          </h2>
          <p className="cta-sub">
            Vamos colocar seu negócio no lugar onde ele procura. Fale com a Átrio e comece hoje.
          </p>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="btn-primary btn-lg">
            Falar no WhatsApp
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="ft">
      <div className="ft-in">
        <div className="ft-top">
          <div className="ft-logo display">átrio<span className="accent">.</span></div>
          <nav className="ft-nav">
            <a href="#prova">Resultado</a>
            <a href="#diferenciais">O que entregamos</a>
            <a href="#video">Como funciona</a>
            <a href={WHATSAPP} target="_blank" rel="noopener">WhatsApp</a>
          </nav>
        </div>
        <p className="ft-disclaimer">
          Os resultados variam conforme segmento, concorrência, histórico do domínio e outros fatores.
          A Átrio entrega desenvolvimento de sites com SEO profissional, sem garantia de posições específicas
          nos mecanismos de busca.
        </p>
        <div className="ft-bottom">
          <span>© 2026 Átrio Marketing</span>
          <span>Sites com SEO profissional · Novo Hamburgo · RS</span>
        </div>
      </div>
    </footer>
  );
}

function WaFloat() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noopener" className="wa" aria-label="Falar no WhatsApp">
      <WaIcon />
      <span className="wa-txt">Falar no WhatsApp</span>
    </a>
  );
}

/* ---------------- ICONS ---------------- */
function Arrow() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>; }
function SearchIcon() { return <svg className="sd-ic" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>; }
function WaIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 1.8a8.2 8.2 0 016.9 12.6l-.2.3.8 2.8-2.9-.8-.3.2A8.2 8.2 0 1112 3.8zm4.5 10.6c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.6.1l-.9 1.1c-.2.2-.3.2-.6.1-1.4-.6-2.9-1.9-3.9-3.5-.2-.3 0-.5.1-.6l.5-.6c.1-.2 0-.4 0-.5l-.9-2c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.8.8-1 1.9-1 2.4s.5 1.8 1.2 2.9c1.3 2 3.1 3.4 5 4 .7.3 1.3.3 1.8.2.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.1-1.4z" /></svg>; }
function SoundOff() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>; }
function SoundOn() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" /></svg>; }
function DotGrid() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" style={{ opacity: 0.5 }}><circle cx="2" cy="2" r="1.3" /><circle cx="7" cy="2" r="1.3" /><circle cx="12" cy="2" r="1.3" /><circle cx="2" cy="7" r="1.3" /><circle cx="7" cy="7" r="1.3" /><circle cx="12" cy="7" r="1.3" /></svg>; }
