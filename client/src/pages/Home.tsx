import { MapView } from "@/components/Map";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  MoveUpRight,
  Play,
  Sparkles,
  Ticket,
  Users,
  X,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

const SYMPLA_URL = "https://bit.ly/brandexperiencecdl";
const INSTAGRAM_URL = "https://www.instagram.com/brandexperiencecdl/";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Faculdade+CDL%2C+Rua+Vinte+e+Cinco+de+Mar%C3%A7o%2C+882%2C+Fortaleza%2C+CE";

const speakers = [
  {
    name: "Albanir Américo",
    role: "Gerente de Marketing — Centro Fashion Fortaleza",
    image: "/images/albanir.jpg",
    tag: "Varejo & força de mercado",
    bio: "Profissional com 21 anos de experiência em marketing, branding e crescimento de negócios. Foi eleito Melhor Profissional de Marketing em 2017 pelo GP Verdes Mares.",
    topic: "Branding, posicionamento e força de mercado no varejo.",
  },
  {
    name: "Alexandre Magno",
    role: "CEO e Fundador — DLT",
    image: "/images/alexandre.jpg",
    tag: "Construção de marca",
    bio: "Empreendedor cearense, está há mais de 20 anos à frente da DLT. A empresa evoluiu de um investimento inicial de R$ 100 para uma marca de moda masculina com presença nacional.",
    topic: "Por trás da marca: experiências, decisões e aprendizados na construção da DLT.",
  },
  {
    name: "Natália Lima",
    role: "Gerente de Marketing e Comunicação — Hotel Gran Marquise",
    image: "/images/natalia.jpg",
    tag: "Hospitalidade & experiência",
    bio: "Profissional com 20 anos de atuação na liderança de estratégias de marca, relacionamento com a imprensa e experiências gastronômicas. Possui MBA em Marketing pela UNIFOR.",
    topic: "Hospitalidade e experiência do cliente.",
  },
];

const schedule = [
  ["08h00", "Abertura oficial", "Boas-vindas e início da manhã de experiências."],
  ["08h30", "Palestra — Albanir Américo", "Branding, posicionamento e força de mercado no varejo."],
  ["09h10", "Palestra — Alexandre Magno", "Por trás da marca: experiências, decisões e aprendizados na construção da DLT."],
  ["09h50", "Palestra — Natália Lima", "Hospitalidade e experiência do cliente."],
  ["10h40", "Mesa-redonda + perguntas", "Uma conversa com os três palestrantes sobre branding, posicionamento, experiência e geração de valor."],
  ["11h00", "Encerramento + foto oficial", "Agradecimentos e orientações sobre os certificados digitais."],
];

const audience = [
  "Estudantes",
  "Profissionais de marketing",
  "Profissionais de comunicação",
  "Empreendedores",
  "Empresários",
  "Gestores",
  "Profissionais de vendas",
  "Apaixonados por branding",
  "Interessados em experiência do consumidor",
];

const experiences = [
  { number: "01", title: "Espaço instagramável", text: "Um cenário temático para transformar a identidade do evento em registros e compartilhamentos espontâneos." },
  { number: "02", title: "Mural das marcas", text: "Um painel interativo que reúne organizadores, apoiadores, patrocinadores e instituições parceiras." },
  { number: "03", title: "Credenciamento", text: "Uma recepção organizada e visualmente marcante para começar a experiência do jeito certo." },
  { number: "04", title: "Mesa-redonda", text: "O momento de aproximar os palestrantes do público e colocar as ideias em movimento." },
];

type MediaAssets = {
  logo: string;
  albanir: string;
  alexandre: string;
  natalia: string;
  board: string;
};

const defaultAssets: MediaAssets = {
  logo: "",
  albanir: "/images/albanir.jpg",
  alexandre: "/images/alexandre.jpg",
  natalia: "/images/natalia.jpg",
  board: "/images/painel-aplicacoes.png",
};

function BrandMark({ light = false, logo = "" }: { light?: boolean; logo?: string }) {
  if (logo) return <img className="brand-custom-logo" src={logo} alt="Logomarca Brand Experience" />;
  return (
    <div className={`brand-lockup ${light ? "brand-lockup--light" : ""}`} aria-label="Brand Experience">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span className="brand-lockup__name">Brand<br /><b>Experience</b></span>
    </div>
  );
}

function CircleField({ className = "" }: { className?: string }) {
  return <div className={`circle-field ${className}`} aria-hidden="true"><span /><span /><span /><span /></div>;
}

function SectionKicker({ children, light = false }: { children: string; light?: boolean }) {
  return <div className={`section-kicker ${light ? "section-kicker--light" : ""}`}><span />{children}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("editar") === "1");
  const [assets, setAssets] = useState<MediaAssets>(() => {
    if (typeof window === "undefined") return defaultAssets;
    try { return { ...defaultAssets, ...JSON.parse(window.localStorage.getItem("brand-experience-assets") || "{}") }; } catch { return defaultAssets; }
  });

  useEffect(() => {
    window.localStorage.setItem("brand-experience-assets", JSON.stringify(assets));
  }, [assets]);

  const handleUpload = (key: keyof MediaAssets) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAssets((current) => ({ ...current, [key]: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const resetAssets = () => {
    setAssets(defaultAssets);
    window.localStorage.removeItem("brand-experience-assets");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="site-header__brand" href="#top" onClick={closeMenu}><BrandMark logo={assets.logo} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label="Navegação principal">
          <a href="#evento" onClick={closeMenu}>O evento</a>
          <a href="#palestrantes" onClick={closeMenu}>Palestrantes</a>
          <a href="#programacao" onClick={closeMenu}>Programação</a>
          <a href="#local" onClick={closeMenu}>Local</a>
          <button className="nav-editor" type="button" onClick={() => { setEditorOpen(true); closeMenu(); }}>Editar mídia</button>
          <a className="nav-cta" href={SYMPLA_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>Inscreva-se <ArrowRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <CircleField className="hero__circles" />
          <div className="hero__grain" aria-hidden="true" />
          <div className="hero__content container reveal">
            <div className="hero__topline"><span>Faculdade CDL apresenta</span><span>27 / 10 / 26</span></div>
            <p className="hero__eyebrow">Brand Experience 2026</p>
            <h1 id="hero-title">Marcas que se constroem <em>na experiência.</em></h1>
            <p className="hero__lede">Uma manhã para entender o que faz uma marca ser escolhida — e como transformar presença em valor.</p>
            <div className="hero__actions">
              <a className="button button--primary" href={SYMPLA_URL} target="_blank" rel="noreferrer">Garanta sua inscrição <MoveUpRight size={17} /></a>
              <a className="button button--ghost" href="#evento">Conheça o evento <ArrowDown size={17} /></a>
            </div>
            <div className="hero__meta">
              <span><CalendarDays size={16} /> 27 outubro 2026</span>
              <span><Clock3 size={16} /> 08h às 11h30</span>
              <span><MapPin size={16} /> Auditório da Faculdade CDL</span>
            </div>
          </div>
          <div className="hero__side-note"><span>01</span><span>Experiência<br />em movimento</span></div>
          <div className="hero__scroll"><span>Scroll para explorar</span><span className="hero__scroll-line" /></div>
        </section>

        <section className="statement-band" aria-label="Frase conceito">
          <div className="container statement-band__inner"><span>O que faz uma marca</span><strong>ser escolhida?</strong><span className="statement-band__arrow">↘</span></div>
        </section>

        <section id="evento" className="section section--manifesto">
          <div className="container manifesto-grid">
            <div className="manifesto-grid__intro reveal">
              <SectionKicker>O evento</SectionKicker>
              <h2>Branding não é só o que uma marca <i>diz.</i></h2>
              <a className="text-link" href="#palestrantes">Conheça quem sobe ao palco <ArrowRight size={16} /></a>
            </div>
            <div className="manifesto-grid__copy reveal reveal--delay-1">
              <p className="lead-copy">É o que ela faz as pessoas sentirem, lembrarem e escolherem.</p>
              <p>O Brand Experience aproxima o conhecimento acadêmico da prática do mercado em uma conversa sobre posicionamento, comunicação, varejo, experiência do cliente e construção de valor.</p>
              <p>Um encontro para estudantes, profissionais, empreendedores e empresas trocarem repertório, histórias reais e novas possibilidades de conexão.</p>
            </div>
            <div className="manifesto-grid__principles">
              {[{ icon: "✦", title: "Conhecimento prático", text: "Trajetórias e cases reais." }, { icon: "↗", title: "Networking", text: "Conexões profissionais e novas possibilidades." }, { icon: "◌", title: "Experiência", text: "Discussões sobre marcas e relacionamento." }, { icon: "+", title: "Ensino + mercado", text: "Formação acadêmica e prática profissional." }].map((item, index) => (
                <div className="principle reveal" key={item.title} style={{ animationDelay: `${index * 70}ms` }}><span className="principle__icon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        <section id="palestrantes" className="section section--speakers">
          <div className="container">
            <div className="section-heading section-heading--split reveal"><div><SectionKicker light>Quem sobe ao palco</SectionKicker><h2>Ideias que vêm<br /><i>de dentro do mercado.</i></h2></div><p>Três trajetórias. Três olhares. Uma conversa sobre como marcas ganham força quando a experiência vira estratégia.</p></div>
            <div className="speaker-grid">
              {speakers.map((speaker, index) => (
                <article className="speaker-card reveal" key={speaker.name} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="speaker-card__image"><img src={assets[index === 0 ? "albanir" : index === 1 ? "alexandre" : "natalia"] || speaker.image} alt={`Retrato editorial de referência para ${speaker.name}`} /><span className="speaker-card__number">0{index + 1}</span><span className="speaker-card__tag">{speaker.tag}</span></div>
                  <div className="speaker-card__body"><p className="speaker-card__role">{speaker.role}</p><h3>{speaker.name}</h3><p className="speaker-card__bio">{speaker.bio}</p><div className="speaker-card__topic"><span>Tema</span><strong>{speaker.topic}</strong></div></div>
                </article>
              ))}
            </div>
            <p className="speaker-note"><Sparkles size={15} /> Fotos oficiais dos palestrantes serão atualizadas pela organização.</p>
          </div>
        </section>

        <section id="programacao" className="section section--schedule">
          <div className="container schedule-grid">
            <div className="schedule-intro reveal"><SectionKicker>Programação</SectionKicker><h2>Uma manhã para<br /><i>mover ideias.</i></h2><p>Conteúdo, conversa e conexão em um ritmo pensado para fazer cada minuto valer.</p><div className="schedule-time"><span>08—11:30</span><small>Outubro<br />2026</small></div></div>
            <div className="timeline">
              {schedule.map(([time, title, text], index) => <div className="timeline__item reveal" key={time} style={{ animationDelay: `${index * 70}ms` }}><div className="timeline__time">{time}</div><div className="timeline__dot" /><div className="timeline__content"><h3>{title}</h3><p>{text}</p></div></div>)}
            </div>
          </div>
        </section>

        <section className="section section--experiences">
          <div className="container">
            <div className="section-heading reveal"><SectionKicker>Além do palco</SectionKicker><h2>A experiência acontece<br /><i>em todos os pontos de contato.</i></h2></div>
            <div className="experience-layout">
              <div className="experience-visual reveal"><img src={assets.board} alt="Painel visual com aplicações da marca Brand Experience" /><div className="experience-visual__overlay"><span>Brand<br /><b>Experience</b></span><span>01—15</span></div></div>
              <div className="experience-list">{experiences.map((item, index) => <article className="experience-item reveal" key={item.number} style={{ animationDelay: `${index * 70}ms` }}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ChevronRight size={20} /></article>)}</div>
            </div>
          </div>
        </section>

        <section className="section section--audience">
          <CircleField className="audience__circles" />
          <div className="container audience-grid"><div className="reveal"><SectionKicker light>Para quem é</SectionKicker><h2>Se você acredita que marcas são feitas de <i>relação,</i> esse encontro é seu.</h2></div><div className="audience-list reveal reveal--delay-1">{audience.map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>)}</div></div>
        </section>

        <section className="section section--why">
          <div className="container"><div className="section-heading section-heading--center reveal"><SectionKicker>Por que participar?</SectionKicker><h2>O que você leva<br /><i>da experiência.</i></h2></div><div className="why-grid">{[{ icon: "01", title: "Aprender", text: "Conheça experiências e práticas de profissionais atuantes no mercado." }, { icon: "02", title: "Conectar", text: "Amplie sua rede de contatos e possibilidades profissionais." }, { icon: "03", title: "Inspirar", text: "Conheça histórias, estratégias e experiências reais de construção de marcas." }, { icon: "04", title: "Experienciar", text: "Participe de uma experiência que conecta conhecimento, pessoas e marcas." }].map((item, index) => <article className="why-card reveal" key={item.title} style={{ animationDelay: `${index * 70}ms` }}><span>{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p><ArrowRight size={17} /></article>)}</div></div>
        </section>

        <section id="local" className="section section--location">
          <div className="container location-grid"><div className="location-copy reveal"><SectionKicker>Onde acontece</SectionKicker><h2>Auditório da<br /><i>Faculdade CDL.</i></h2><p className="location-address"><MapPin size={18} /> Rua Vinte e Cinco de Março, 882<br />Centro — Fortaleza/CE<br />CEP 60060-120</p><a className="button button--dark" href={MAPS_URL} target="_blank" rel="noreferrer">Como chegar <MoveUpRight size={17} /></a><div className="location-detail"><span>Presencial</span><span>Aberto ao público</span><span>200+ participantes</span></div></div><div className="map-frame reveal reveal--delay-1"><MapView initialCenter={{ lat: -3.7275, lng: -38.5267 }} initialZoom={16} onMapReady={(map) => { map.setCenter({ lat: -3.7275, lng: -38.5267 }); }} /><div className="map-frame__label"><span className="map-pin-dot" /><span>Faculdade CDL</span><small>Centro · Fortaleza</small></div></div></div>
        </section>

        <section id="inscricao" className="section section--register">
          <CircleField className="register__circles" />
          <div className="container register__inner reveal"><SectionKicker light>Inscrições abertas</SectionKicker><h2>Sua experiência<br /><i>começa aqui.</i></h2><p>Participe de uma manhã de conhecimento, conexão e experiências sobre construção de marcas.</p><a className="button button--light" href={SYMPLA_URL} target="_blank" rel="noreferrer"><Ticket size={17} /> Garantir minha inscrição <MoveUpRight size={17} /></a><div className="donation-note"><Check size={17} /><span>Participação solidária mediante a entrega de <strong>1 kg de alimento</strong> no credenciamento. Os alimentos serão distribuídos para o <strong>Projeto Amar Amando</strong> e a <strong>ONG Casa do Menino Jesus</strong>.</span></div></div>
        </section>

        <section className="section section--beneficiaries">
          <div className="container beneficiaries-grid"><div className="beneficiaries-intro reveal"><SectionKicker>Uma experiência que também cuida</SectionKicker><h2>Conheça quem recebe esse gesto.</h2><p>A entrega de alimentos no credenciamento fortalece duas iniciativas que transformam acolhimento em ação no Ceará.</p></div><div className="beneficiary-cards"><article className="beneficiary-card reveal"><span className="beneficiary-card__number">01</span><h3>Amar Amando</h3><p>Fundado em 2020, o Amar Amando surgiu de um desejo genuíno de transformar o entorno com ações concretas e cheias de afeto. Nascemos de conversas, de mãos estendidas, de olhares que não desviam de quem precisa.</p><p>Ao longo desses anos, construímos pontes entre pessoas, famílias e comunidades — acreditando que o acolhimento é o primeiro passo para qualquer transformação real.</p></article><article className="beneficiary-card reveal reveal--delay-1"><span className="beneficiary-card__number">02</span><h3>Casa do Menino Jesus</h3><p>A ONG acolhe familiares de crianças com diversas patologias que vêm a Fortaleza em busca de tratamento e não têm condições de arcar com os custos de estadia e alimentação.</p><p>É uma rede de apoio para que o cuidado com a saúde possa acontecer com mais dignidade, presença e acolhimento.</p></article></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-top"><div><BrandMark light logo={assets.logo} /><p>Marcas que se constroem<br />na experiência.</p></div><div className="footer-links"><a href="#evento">O evento</a><a href="#palestrantes">Palestrantes</a><a href="#programacao">Programação</a><a href="#local">Local</a></div><div className="footer-social"><span>Siga o evento</span><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={18} /> @brandexperiencecdl</a></div></div><div className="container footer-credits"><div className="footer-credit"><span>Realização</span><img className="footer-credit__faculdade" src="/images/faculdade-cdl-fundo-escuro-transparente.png" alt="Faculdade CDL" /></div><div className="footer-credit footer-credit--partners"><span>Parceria</span><div className="footer-partner-logos"><img className="footer-credit__evelyn" src="/images/evelyn-g-fundo-escuro-transparente.png" alt="Evelyn G. Marketing Digital" /><b aria-hidden="true">&amp;</b><img className="footer-credit__fonte" src="/images/fonte-agencia-fundo-escuro-transparente.png" alt="Fonte agência" /></div></div></div><div className="container footer-bottom"><span>Brand Experience 2026 · Faculdade CDL</span><span>27 / 10 / 2026 · Fortaleza/CE</span><a href={SYMPLA_URL} target="_blank" rel="noreferrer">Inscreva-se <ArrowRight size={14} /></a></div></footer>

      {editorOpen && <div className="media-editor-backdrop" role="presentation" onClick={() => setEditorOpen(false)}><aside className="media-editor" role="dialog" aria-modal="true" aria-labelledby="media-editor-title" onClick={(event) => event.stopPropagation()}><div className="media-editor__head"><div><SectionKicker>Personalização</SectionKicker><h2 id="media-editor-title">Editar mídia</h2></div><button type="button" aria-label="Fechar editor" onClick={() => setEditorOpen(false)}><X size={20} /></button></div><p className="media-editor__intro"><strong>Selecione uma área abaixo para trocar a imagem.</strong><br />Use este painel para substituir diretamente a logomarca do topo/rodapé e as fotos dos três palestrantes. Depois de escolher o arquivo, a imagem muda na hora e fica salva neste navegador.</p><div className="media-editor__fields">{([{ key: "logo", label: "Logomarca do evento", hint: "Topo e rodapé — PNG, SVG ou JPG", accept: "image/png,image/svg+xml,image/jpeg" }, { key: "albanir", label: "Foto — Albanir Américo", hint: "Área da foto no card do palestrante", accept: "image/*" }, { key: "alexandre", label: "Foto — Alexandre Magno", hint: "Área da foto no card do palestrante", accept: "image/*" }, { key: "natalia", label: "Foto — Natália Lima", hint: "Área da foto no card do palestrante", accept: "image/*" }, { key: "board", label: "Painel de aplicações", hint: "Imagem da seção Além do palco", accept: "image/*" }] as { key: keyof MediaAssets; label: string; hint: string; accept: string }[]).map((field) => <label className="media-upload" key={field.key}><span className="media-upload__preview">{assets[field.key] ? <img src={assets[field.key]} alt="" /> : <span>+</span>}</span><span className="media-upload__copy"><strong>{field.label}</strong><small>{field.hint}</small><em>Trocar imagem</em></span><input type="file" accept={field.accept} onChange={handleUpload(field.key)} /></label>)}</div><div className="media-editor__foot"><button className="media-reset" type="button" onClick={resetAssets}>Restaurar imagens padrão</button><button className="button button--dark" type="button" onClick={() => setEditorOpen(false)}>Concluir <Check size={16} /></button></div></aside></div>}
    </div>
  );
}
