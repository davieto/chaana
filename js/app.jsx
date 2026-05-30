/* fallback enquanto Firebase carrega */
if (!window.__firebase) {
  window.__firebase = { load: async () => null, save: async () => {}, subscribe: () => () => {} };
}
if (!window.__firebaseAuth) {
  window.__firebaseAuth = { signIn: async () => null, getUser: async () => null };
}

/* ============================================================
   DADOS INICIAIS (seed)
   ============================================================ */
const uid = () => Math.random().toString(36).slice(2, 9);

const now = new Date();
const y = now.getFullYear();

const SEED_RATINGS = [
  { id:uid(), title:'O Túmulo dos Vagalumes', type:'filme', rating:5, section:'watched', poster:'assets/posters/tumulo-dos-vagalumes.jpg' },
  { id:uid(), title:'Suzume',                 type:'filme', rating:5, section:'watched', poster:'assets/posters/suzume.jpg' },
  { id:uid(), title:'Mortal Kombat',          type:'filme', rating:3, section:'watched', poster:'' },
  { id:uid(), title:'Mortal Kombat 2',        type:'filme', rating:4, section:'watched', poster:'' },
  { id:uid(), title:'House of the Dragon',    type:'serie', rating:0, section:'waiting', poster:'' },
  { id:uid(), title:'Bridgerton',             type:'serie', rating:0, section:'waiting', poster:'' },
  { id:uid(), title:'Sissi',                  type:'serie', rating:0, section:'waiting', poster:'' },
  { id:uid(), title:'Jujutsu Kaisen',         type:'serie', rating:0, section:'waiting', poster:'' },
  { id:uid(), title:'Korra (Dublado)',         type:'serie', rating:0, section:'waiting', poster:'' },
  { id:uid(), title:'A Noiva Cadáver',        type:'filme', rating:0, section:'waiting', poster:'' },
  { id:uid(), title:'Coco',                   type:'filme', rating:0, section:'waiting', poster:'' },
  { id:uid(), title:'Koe no Katachi',         type:'filme', rating:0, section:'waiting', poster:'assets/posters/koe-no-katachi.jpg' },
  { id:uid(), title:'Your Name',              type:'filme', rating:0, section:'waiting', poster:'' },
  { id:uid(), title:'Tenki no Ko',            type:'filme', rating:0, section:'waiting', poster:'' },
  { id:uid(), title:'5 Centímetros por Segundo', type:'filme', rating:0, section:'waiting', poster:'' },
  { id:uid(), title:'The Garden of Words',    type:'filme', rating:0, section:'waiting', poster:'' },
  { id:uid(), title:'Children Who Chase Lost Voices', type:'filme', rating:0, section:'waiting', poster:'' },
];

const SEED_DATES = [
  { id:uid(), title:'Match',                        emoji:'💬', date:'2026-04-09', desc:'' },
  { id:uid(), title:'Show The Weeknd',              emoji:'🎵', date:'2026-04-30', desc:'' },
  { id:uid(), title:'Convite para o cinema',        emoji:'🎬', date:'2026-05-13', desc:'' },
  { id:uid(), title:'Primeiro filme juntos (discord)', emoji:'🎬', date:'2026-05-14', desc:'' },
  { id:uid(), title:'Primeiro encontro',            emoji:'☕', date:'2026-05-16', desc:'' },
  { id:uid(), title:'Primeiro beijo',               emoji:'💋', date:'2026-05-16', desc:'' },
  { id:uid(), title:'Primeira olhada',              emoji:'👀', date:'2026-05-16', desc:'' },
  { id:uid(), title:'Primeira mão dada',            emoji:'🤝', date:'2026-05-16', desc:'' },
  { id:uid(), title:'Primeira vez coladinhos',      emoji:'🫂', date:'2026-05-16', desc:'' },
  { id:uid(), title:'Segundo encontro (cafeteira)', emoji:'☕', date:'2026-05-17', desc:'' },
  { id:uid(), title:'Primeira despedida',           emoji:'💌', date:'2026-05-17', desc:'' },
  { id:uid(), title:'Terceiro encontro',            emoji:'🌹', date:'2026-05-23', desc:'' },
  { id:uid(), title:'Segunda despedida',            emoji:'💌', date:'2026-05-24', desc:'' },
  { id:uid(), title:'Primeira ...',                 emoji:'✨', date:'2026-05-28', desc:'' },
];

const SEED_POEMS = [
  { id:uid(), title:'Minha Casa', author:'Davi', readBy:[], stickers:[],
    body:`MINHA CASA\n\nPare de ir a templos, que você construiu\nQue você mesmo destruiu\nPare de ir aos templos, que você acha que é minha\nPare de ir nos templos, que você\nE só você iria\nMinha casa está no alto de uma colina\nNas praias, nas florestas e também no —\nFundo de uma ravina\nMinha casa está onde vivo\nE onde vivo, não é onde é meu bem querer\nMinha casa é no coração de alguém que —\nNem mesmo um dia irá me ver.\nVocê.` },

  { id:uid(), title:'Sinto Tua Falta', author:'Davi', readBy:[], stickers:[],
    body:`De: Davi\nPara: Alguém cujo sinto falta\n\nQue estranho seria o cravo conviver sem a rosa,\nEstranho como eu sem você,\nQue estranho seria o Romeu sem a Juliette,\nEstranho como eu sem você,\nQue estranho seria Llya sem Shane,\nEstranho como eu sem você,\nPor isso começo dizendo, sinto tua falta,\nAté que um dia eu não queira sentir.\n\nSinto tua falta,\nSinto falta do que poderia ter sido,\nDo que quase parece que foi,\nEu queria que tivesse sido.\n\nSinto tua falta hoje,\nAssim como ontem, que foi leve e quase bonito,\nMas o óbvio,\nSenti tua falta.\n\nSinto tua falta,\nDe ser sua escolha,\nTua certeza,\nTua preferência,\nAo menos, eu acreditava que era,\nE ainda espero ser.\n\nSinto tua falta,\nSinto falta doque parecia impossível,\ne agora,\nParece ainda mais impossível.\n\nSinto tua falta,\nSinto falta da tua saudade,\nDo teu jeito carinhoso,\nDo que um dia pareceu ser teu amor.\n\nSinto tua falta,\nE eu queria dizer:\nSinto falta de te pedir ao universo,\nComo se fosse possível te ter para sempre.\nMas ainda peço,\nEm silêncio,\nEntre pensamentos que não se vão\nE, por isso,\nNem sei se chego a sentir falta...\nOu se ainda estou esperando a resposta.\n\nQueria dizer que não sinto tua falta,\nQueria negar esse vazio que cresce,\nQueria mentir para mim mesmo\nMas sei que é inútil.\nPorque essa ausência só se desfaz\nQuando encontra seu motivo.\nE, nesse caso,\nO motivo\nÉ você.` },

  { id:uid(), title:'Amor Que Se Pede', author:'Davi', readBy:[], stickers:[],
    body:`Quando fazemos tudo para que nos amem e não conseguimos, resta-nos um último recurso: não fazer mais nada. Por isso, digo, quando não obtivermos o amor, o afeto ou a ternura que havíamos solicitado, melhor será desistirmos e procurar mais adiante os sentimentos que nos negaram. Não fazer esforços inúteis, pois o amor nasce, ou não, espontaneamente, mas nunca por força de imposição. Às vezes, é inútil esforçar-se demais, nada se consegue; outras vezes, nada damos e o amor se rende aos nossos pés. Os sentimentos são sempre uma surpresa. Nunca foram uma caridade mendigada, uma compaixão ou um favor concedido. Quase sempre amamos a quem nos ama mal, e desprezamos quem melhor nos quer. Assim, repito, quando tivermos feito tudo para conseguir um amor, e falhado, resta-nos um só caminho... o de mais nada fazer.\n\n— Clarice Lispector` },

  { id:uid(), title:'Dois Girassóis', author:'Davi', readBy:[], stickers:[],
    body:`Não é tinta nem tecla que sustenta estes versos,\né o mais profundo sentimento que nasce em mim\ntoda vez que é você.\n\nEsperei pouco, mas esperei inteiro:\num girassol.\nComo quem aguarda um sinal do universo,\nsem saber que, naquele gesto simples,\ncabia um começo.\nHoje, aguardo simples, quase o mínimo:\napenas receber um girassol.\nE ainda assim, nele cabe\ntudo o que eu não sei pedir.\n\nHá encontros que não obedecem números,\nnem se curvam à distância.\nEles acontecem\nporque precisam acontecer.\n\nDjavan disse,\nque ao lado de sua amada,\nnasce um sol azul.\nMas nós não pedimos o impossível,\nse estivermos juntos:\nbasta um pôr do sol acontecer,\ndois girassóis lado a lado,\nensinando o horizonte a permanecer.\n\nEu não tenho medo do escuro,\nmas queria que você fosse o farol\na iluminar minha vida.\nÉ na ausência que mais sinto tua falta,\nporque te imaginar ao meu lado\nme faz desejar coisas inimagináveis,\ninclusive passar o restante da vida\nsegurando a tua mão.\n\nPassar tempo com você\nme lançou em mundos suspensos,\nonde o desejo encontra calma\ne o futuro deixa de assustar.\nPor isso tua falta repentina me desajustou.\nSe em algum instante te assustei,\nfoi o amor tropeçando em si mesmo,\nquerendo apenas\no susto de abrir os olhos\ne te encontrar ao meu lado.` },

  { id:uid(), title:'A Distância', author:'Davi', readBy:[], stickers:[],
    body:`A distância não me tira\na vontade de estar contigo,\napenas me faz imaginar\ncom anseio o dia em que\nfinalmente estivermos juntos.` },

  { id:uid(), title:'Você É', author:'Davi', readBy:[], stickers:[],
    body:`Você é\nA poesia\nMais linda\nQue os\nMeus olhos\nJá leram.\n\n— @almasussurraa` },

  { id:uid(), title:'Acordei com Saudade', author:'Davi', readBy:[], stickers:[],
    body:`Acordei com saudade\nMelhor voltar a dormir,\nLá corro o risco de te encontrar.` },

  { id:uid(), title:'Se Pudesse', author:'Davi', readBy:[], stickers:[],
    body:`SE PUDESSE\n\nAh se pudesse,\nsairia neste segundo para\nlhe ver, lhe ter e lhe morder,\naté sua alma ceder...` },

  { id:uid(), title:'A Sua Companhia', author:'Davi', readBy:[], stickers:[],
    body:`O simples fato de termos nos\nconhecido já é motivo para meu\ncoração sorrir.\nE eu serei feliz, apenas por ter a sua\ncompanhia.\nSejam dez minutos, dez anos ou uma\nvida, cada segundo ao seu lado será\nsempre um presente.` },

  { id:uid(), title:'À Beira do Abismo', author:'Davi', readBy:[], stickers:[],
    body:`foi como caminhar à beira\nde um abismo\ne ainda assim achar\na paisagem\nmais bonita do mundo` },

  { id:uid(), title:'Um Lamento', author:'Davi', readBy:[], stickers:[],
    body:`Eu sinto, no fundo\ndo meu coração que\nnão te esquecerei\ntão cedo\ne isso não é uma\ndeclaração de amor\né um lamento\n\n— Rodrigo Lopes` },

  { id:uid(), title:'Quantos Pedaços', author:'Davi', readBy:[], stickers:[],
    body:`Me fale em quantos pedaços você foi\npartida antes que eu te encontrasse,\nquero saber quantas versões suas terei\npara amar.` },

  { id:uid(), title:'O Grande Amor', author:'Davi', readBy:[], stickers:[],
    body:`o grande amor da sua vida\npode dizer pra você\nque o amor acabou\nenquanto vocês jantam\nnuma quarta-feira. ele te\nolhará com olhos marejados,\npegará nas suas mãos,\npedirá perdão. talvez você\nentenda, daqui uns anos,\nque amor também é esta\nparte incompreendida que\nresta entre duas pessoas.` },

  { id:uid(), title:'Esperar por Você', author:'Davi', readBy:[], stickers:[],
    body:`Tu não tem noção do\nquanto espero para passar alguns\nminutos contigo. E admirar esses\nteus olhos bonitos e esse teu sorriso\nque me faz esquecer de tudo.` },

  { id:uid(), title:'Vista do Mar', author:'Davi', readBy:[], stickers:[],
    body:`Vista do mar\n\nSentar na areia,\nVer que a vida não é feita\nSomente\nDe correria\nE de carreira.\n\nSentar na areia,\nVer que o mar,\nPor vezes,\nBasta.\n\nSentar na areia,\nVer que a vida é feita\nSoberanamente\nDe mergulho\nE de ar.` },

  { id:uid(), title:'O Coração dos Outros', author:'Davi', readBy:[], stickers:[],
    body:`Por muito tempo carreguei\no coração dos outros,\nsem me importar\ncom o meu.\nE quando o\nmeu morreu,\nnão culpei\nos outros.\n— Quem matou\nele foi eu.\n\n— @poeta_biell` },
];

/* ============================================================
   CONTEXTO GLOBAL + FIREBASE
   ============================================================ */
const { createContext, useContext, useState, useEffect, useRef } = React;

const ChaanaContext = createContext(null);

const USERS = {
  Davi:   { name:'Davi',   color:'var(--rose)',  ring:'linear-gradient(135deg,#E9A9BC,#C85A7C)' },
  Vagner: { name:'Vagner', color:'var(--lilac)', ring:'linear-gradient(135deg,#C9B4E6,#9B7BC7)' },
};

const FOOTER_MSGS = [
  'a casa mais bonita é a gente',
  'guardando o que importa',
  '"te quero como se não houvesse amanhã"',
  '"você é o meu lugar favorito"',
  '"você me faz querer ser inteiro"',
  '"onde você estiver, é lá que eu quero estar"',
  '"cada vez que te vejo é como a primeira"',
  '"a gente não se acha, a gente se reconhece"',
  '"o tempo com você sempre passa rápido demais"',
  '"você é a resposta que eu nem sabia que estava procurando"',
  '"a melhor parte do meu dia é quando você aparece"',
  '"eu te escolho hoje, amanhã e em todos os dias que vierem"',
  '"de todas as mãos que já segurei, a sua é a que mais faz sentido"',
];

const STICKERS = ['💛','🌷','✨','💋','🥹','🫶','🌙','☕','🐾','🌹'];

const SEED_STATE = {
  ratings: SEED_RATINGS,
  dates: SEED_DATES,
  poems: SEED_POEMS,
  garden: [],
  clicks: 0,
  bankIdx: { b2:0, b10:0, b50:0, b100:0 },
};

function mergePosters(ratings) {
  try {
    const posters = JSON.parse(localStorage.getItem('chaana_posters') || '{}');
    return ratings.map(r => ({ ...r, poster: posters[r.id] || r.poster || '' }));
  } catch { return ratings; }
}

function ChaanaProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [ratings, setRatings] = useState(SEED_STATE.ratings);
  const [dates, setDates] = useState(SEED_STATE.dates);
  const [poems, setPoems] = useState(SEED_STATE.poems);
  const [garden, setGarden] = useState(SEED_STATE.garden);
  const [clicks, setClicks] = useState(SEED_STATE.clicks);
  const [bankIdx, setBankIdx] = useState(SEED_STATE.bankIdx);
  const [saveStatus, setSaveStatus] = useState('idle');

  useEffect(() => {
    async function init() {
      const fb = window.__firebase;
      const data = await fb.load();
      if (data) {
        setRatings(mergePosters(data.ratings || SEED_STATE.ratings));
        setDates(data.dates || SEED_STATE.dates);
        setPoems(data.poems || SEED_STATE.poems);
        setGarden(data.garden || []);
        setClicks(data.clicks || 0);
        setBankIdx(data.bankIdx || SEED_STATE.bankIdx);
      } else {
        await fb.save(SEED_STATE);
      }
      setLoading(false);
    }
    if (window.__firebaseReady) { init(); }
    else { window.addEventListener('firebase-ready', init, { once: true }); }
  }, []);

  useEffect(() => {
    const unsub = window.__firebase.subscribe((data) => {
      if (!data) return;
      setRatings(prev => mergePosters(data.ratings || prev));
      setDates(data.dates || SEED_STATE.dates);
      setPoems(data.poems || SEED_STATE.poems);
      setGarden(data.garden || []);
      setClicks(data.clicks || 0);
      setBankIdx(data.bankIdx || SEED_STATE.bankIdx);
    });
    return () => typeof unsub === 'function' && unsub();
  }, []);

  const saveTimer = useRef(null);
  useEffect(() => {
    if (loading) return;
    setSaveStatus('saving');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.__firebase.save({ ratings, dates, poems, garden, clicks, bankIdx });
        setSaveStatus('saved');
      } catch { setSaveStatus('idle'); }
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
    return () => clearTimeout(saveTimer.current);
  }, [ratings, dates, poems, garden, clicks, bankIdx, loading]);

  if (loading) {
    return (
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
        background:'var(--wine-deep)',flexDirection:'column',gap:'1rem'}}>
        <div style={{fontFamily:'Cormorant Garamond, serif',fontStyle:'italic',fontSize:'3rem',color:'#FBE7EE'}}>Chaana</div>
        <div style={{color:'rgba(255,214,224,.6)',fontSize:'.8rem',letterSpacing:'.3em',textTransform:'uppercase'}}>carregando…</div>
      </div>
    );
  }

  const value = {
    user, setUser,
    ratings, setRatings,
    dates, setDates,
    poems, setPoems,
    garden, setGarden,
    clicks, setClicks,
    bankIdx, setBankIdx,
    saveStatus,
    USERS, FOOTER_MSGS, STICKERS, uid,
  };
  return <ChaanaContext.Provider value={value}>{children}</ChaanaContext.Provider>;
}

const useChaana = () => useContext(ChaanaContext);

function SaveBadge() {
  const { saveStatus } = useChaana();
  if (saveStatus === 'idle') return null;
  return (
    <span style={{fontSize:'.7rem',fontWeight:600,letterSpacing:'.04em',color:saveStatus==='saved'?'var(--green)':'var(--ink-soft)',transition:'color .3s ease',whiteSpace:'nowrap'}}>
      {saveStatus==='saving'?'salvando…':'salvo ✓'}
    </span>
  );
}

/* ============================================================
   ÍCONES
   ============================================================ */
function Icon({ name, size=22, stroke=1.7, fill='none' }) {
  const p = { width:size, height:size, viewBox:'0 0 24 24', fill, stroke:'currentColor',
              strokeWidth:stroke, strokeLinecap:'round', strokeLinejoin:'round' };
  const paths = {
    heart:  <path d="M12 20s-7-4.6-9.2-9C1.3 7.6 3 4.5 6.2 4.5c1.9 0 3.1 1.1 3.8 2.2.7-1.1 1.9-2.2 3.8-2.2 3.2 0 4.9 3.1 3.4 6.5C19 15.4 12 20 12 20z"/>,
    star:   <path d="M12 3.5l2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.9 6.9 19.2 8 13.5 3.7 9.5l5.8-.7L12 3.5z"/>,
    flower: <g><circle cx="12" cy="12" r="2.4"/><path d="M12 9.6c0-2.2-1-3.6-2.5-3.6S7 7.4 8.6 9.4M12 9.6c0-2.2 1-3.6 2.5-3.6S17 7.4 15.4 9.4M9.6 12c-2.2 0-3.6 1-3.6 2.5S7.4 17 9.4 15.4M14.4 12c2.2 0 3.6 1 3.6 2.5S16.6 17 14.6 15.4"/></g>,
    calendar:<g><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3"/></g>,
    quote:  <path d="M9 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2M19 7h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2"/>,
    plus:   <path d="M12 5v14M5 12h14"/>,
    edit:   <path d="M14 4l6 6M4 20l1-4L16 5l3 3L8 19l-4 1z"/>,
    trash:  <g><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13"/></g>,
    close:  <path d="M6 6l12 12M18 6L6 18"/>,
    left:   <path d="M15 5l-7 7 7 7"/>,
    right:  <path d="M9 5l7 7-7 7"/>,
    check:  <path d="M5 12.5l4.5 4.5L19 7"/>,
    back:   <path d="M15 5l-7 7 7 7"/>,
  };
  return <svg {...p}>{paths[name] || null}</svg>;
}

/* ============================================================
   COMPONENTES COMPARTILHADOS
   ============================================================ */
function Decor() {
  const items = useRef(null);
  if (!items.current) {
    const kinds = ['heart','dot','flower'];
    items.current = Array.from({length:14}, (_,i)=>({
      left: Math.random()*100,
      size: 8 + Math.random()*14,
      dur: 16 + Math.random()*16,
      delay: -Math.random()*22,
      kind: kinds[i%3],
      hue: ['var(--rose-soft)','var(--lilac-soft)','var(--green-soft)'][i%3],
    }));
  }
  return (
    <div className="decor" aria-hidden="true">
      {items.current.map((it,i)=>(
        <div key={i} className="float" style={{left:`${it.left}%`, bottom:'-40px', animationDuration:`${it.dur}s`, animationDelay:`${it.delay}s`}}>
          {it.kind==='dot'
            ? <div className="heart-dot" style={{background:it.hue, width:it.size/1.6, height:it.size/1.6}}/>
            : <Icon name={it.kind} size={it.size} fill={it.hue} stroke={0} />}
        </div>
      ))}
    </div>
  );
}

function Afetivo() {
  const { user, FOOTER_MSGS } = useChaana();
  const [i, setI] = useState(0);
  useEffect(()=>{
    const t = setInterval(()=> setI(v => (v+1)%FOOTER_MSGS.length), 4200);
    return ()=>clearInterval(t);
  },[]);
  const other = user==='Davi' ? 'Vagner' : user==='Vagner' ? 'Davi' : '';
  return (
    <div className="afetivo">
      <span className="dot"/>
      <span className="msg" key={i}>{FOOTER_MSGS[i]}</span>
      {other && <span className="muted" style={{fontSize:'.78rem'}}>· {user} &amp; {other}</span>}
      <span className="dot"/>
    </div>
  );
}

const NAV = [
  { key:'avaliacoes', icon:'star',     label:'Avaliações' },
  { key:'plantacao',  icon:'flower',   label:'Plantação'  },
  { key:'datas',      icon:'calendar', label:'Datas'      },
  { key:'poemas',     icon:'quote',    label:'Poemas'     },
];

function TopBar({ go, active, home }) {
  const { user, USERS } = useChaana();
  const u = USERS[user];
  return (
    <div className="topbar">
      <button className="brand brand-btn" onClick={()=>go && go('home')}>
        Chaana<small>{home?'davi & vagner':'início'}</small>
      </button>
      {!home && (
        <nav className="modnav">
          {NAV.map(n=>(
            <button key={n.key} className={`modnav-item ${active===n.key?'on':''}`}
              onClick={()=>go(n.key)} title={n.label}>
              <Icon name={n.icon} size={18}/><span>{n.label}</span>
            </button>
          ))}
        </nav>
      )}
      <div style={{display:'flex',alignItems:'center',gap:'.9rem',flexShrink:0}}>
        <SaveBadge/>
        <div className="user-chip">
          {u && <span className="ava" style={{background:u.ring}}>{user[0]}</span>}
          <span className="uname">{user}</span>
        </div>
      </div>
    </div>
  );
}

function Modal({ children, onClose, wide, className='' }) {
  useEffect(()=>{
    const h = e => { if(e.key==='Escape') onClose && onClose(); };
    window.addEventListener('keydown', h);
    return ()=>window.removeEventListener('keydown', h);
  },[]);
  return (
    <div className="modal-scrim" onMouseDown={e=>{ if(e.target===e.currentTarget) onClose && onClose(); }}>
      <div className={`modal ${wide?'wide':''} ${className}`}>
        {onClose && <button className="close iconbtn" onClick={onClose}><Icon name="close" size={20}/></button>}
        {children}
      </div>
    </div>
  );
}

function Stars({ value=0, max=5, big, onPick }) {
  const [hover, setHover] = useState(0);
  return (
    <div className={`stars ${big?'big':''}`}>
      {Array.from({length:max},(_,i)=>{
        const on = (hover||value) > i;
        return (
          <span key={i}
            onMouseEnter={onPick?()=>setHover(i+1):undefined}
            onMouseLeave={onPick?()=>setHover(0):undefined}
            onClick={onPick?()=>onPick(i+1):undefined}>
            <Icon name="star" fill={on?'var(--gold)':'none'} stroke={on?0:1.6} size={big?30:18} />
          </span>
        );
      })}
    </div>
  );
}

function Poster({ label, style }) {
  return (
    <div className="poster" style={style}>
      <span className="plabel">{label}</span>
    </div>
  );
}

function Fab({ onClick, label='Adicionar' }) {
  return <button className="fab" onClick={onClick} title={label} aria-label={label}><Icon name="plus" size={26}/></button>;
}

/* ============================================================
   SPLASH
   ============================================================ */
const SP_VIEW_W = 1000, SP_VIEW_H = 340;
function wireY(t){ return 78 + 30*Math.sin(t*Math.PI*2*1.15 + 0.5) + 14*Math.sin(t*Math.PI*5); }
const BULB_COLORS = ['pink','rosy','lilac'];
const BULBS = Array.from({length:8},(_,i)=>{
  const t = (i+0.5)/8;
  return { t, x:t*100, y:(wireY(t)/SP_VIEW_H)*100, color:BULB_COLORS[i%3], cord:12+(i%3)*4 };
});
function buildWirePath(){
  let d = '';
  for(let i=0;i<=60;i++){ const t=i/60; const x=t*SP_VIEW_W; const yy=wireY(t);
    d += (i===0?`M${x.toFixed(1)},${yy.toFixed(1)}`:` L${x.toFixed(1)},${yy.toFixed(1)}`); }
  return d;
}

function Splash({ go }) {
  const [lit, setLit]     = useState(false);
  const [shown, setShown] = useState(-1);
  const [ready, setReady] = useState(false);
  const [sparks, setSparks] = useState([]);
  const timers = useRef([]);

  const ignite = () => {
    if (lit) return;
    setLit(true);
    BULBS.forEach((b,i)=>{
      const t = setTimeout(()=>{
        setShown(i);
        const newSparks = Array.from({length:5},()=>({
          id: Math.random(),
          x: b.x + (Math.random()*4-2),
          y: b.y + 4 + (b.cord/SP_VIEW_H*100),
          color: b.color==='pink'?'#FF8FAB':b.color==='rosy'?'#FFD6E0':'#C77DFF',
          dx: (Math.random()*30-15),
          dur: 1.4 + Math.random()*1.2,
        }));
        setSparks(s=>[...s, ...newSparks]);
      }, 380 + i*150);
      timers.current.push(t);
    });
    const tr = setTimeout(()=>setReady(true), 380 + BULBS.length*150 + 600);
    timers.current.push(tr);
  };

  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
  useEffect(()=>{
    if(!sparks.length) return;
    const t = setTimeout(()=>setSparks([]), 3000);
    return ()=>clearTimeout(t);
  },[sparks.length]);

  return (
    <div className={`splash ${lit?'lit':''}`}>
      <div className="wire-wrap">
        <svg viewBox={`0 0 ${SP_VIEW_W} ${SP_VIEW_H}`} preserveAspectRatio="none">
          <path className="wire-path" d={buildWirePath()} />
        </svg>
        {BULBS.map((b,i)=>(
          <div key={i}
            className={`bulb ${b.color} ${i<=shown?'shown':''} ${i<=shown&&lit?'lit':''}`}
            style={{ left:`${b.x}%`, top:`${b.y}%`, display:'flex', flexDirection:'column', alignItems:'center' }}>
            <div className="cord" style={{ position:'static', height:b.cord, top:'auto' }}/>
            <div style={{ position:'relative' }}>
              <div className="cap" style={{ top:-4 }}/>
              <div className="glass" style={{ position:'static' }}/>
            </div>
          </div>
        ))}
        {sparks.map(s=>(
          <div key={s.id} className="spark" style={{
            left:`${s.x}%`, top:`${s.y}%`, background:s.color,
            boxShadow:`0 0 8px ${s.color}`,
            ['--dx']:`${s.dx}px`,
            animation:`rise ${s.dur}s ease-out forwards`,
          }}/>
        ))}
      </div>

      <div className="splash-center">
        <div className="splash-title">Chaana</div>
        <div className="splash-sub">davi &amp; vagner</div>
        <button className={`splash-btn ${lit?'gone':''}`} onClick={ignite}>acender as luzes</button>
        <button className={`splash-btn enter-btn ${ready?'ready':''}`} onClick={()=>go('login')}
          style={{borderColor:'rgba(255,214,224,.8)', color:'#fff', background:'rgba(255,255,255,.08)'}}>
          entrar
        </button>
      </div>

      <div className="floor-glow"/>
      <div className="vignette"/>
    </div>
  );
}

/* ============================================================
   LOGIN
   ============================================================ */
function Login({ go }) {
  const { setUser, USERS } = useChaana();
  const pick = (name) => { setUser(name); go('home'); };
  return (
    <div className="app-bg">
      <Decor/>
      <div className="login fade-in">
        <div className="eyebrow">bem-vindos de volta</div>
        <h1>Quem está chegando?</h1>
        <p className="muted" style={{maxWidth:'24rem'}}>
          Escolha o seu nome. Ele assina os nossos poemas e enche o rodapé de carinho.
        </p>
        <div className="users">
          {Object.values(USERS).map(u=>(
            <button key={u.name} className="user-card" onClick={()=>pick(u.name)}>
              <div className="ring" style={{background:u.ring}}>{u.name[0]}</div>
              <div className="nm">{u.name}</div>
              <div className="role">entrar como {u.name.toLowerCase()}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HOME
   ============================================================ */
const HOME_MODS = [
  { key:'avaliacoes', icon:'star',     title:'Avaliações', desc:'Filmes e séries que amamos, e os que ainda vamos ver juntos.', tint:'var(--rose)',      bg:'var(--rose-wash)' },
  { key:'plantacao',  icon:'flower',   title:'Plantação',  desc:'Clique para plantar. Cada flor é um carinho que fica.',        tint:'var(--green)',     bg:'var(--green-soft)' },
  { key:'datas',      icon:'calendar', title:'Datas',      desc:'A linha do tempo da gente, mês a mês, beijo a beijo.',         tint:'var(--lilac)',     bg:'var(--lilac-soft)' },
  { key:'poemas',     icon:'quote',    title:'Poemas',     desc:'Versos escritos a dois, guardados num só lugar.',              tint:'var(--rose-deep)', bg:'var(--rose-wash)' },
];

function Home({ go }) {
  const { user } = useChaana();
  return (
    <div className="app-bg">
      <Decor/>
      <TopBar go={go} home/>
      <div className="page fade-in">
        <div className="page-head">
          <div className="eyebrow">olá, {user}</div>
          <h1>Nosso cantinho</h1>
          <p>Um espaço somente de nós dois. Por onde começamos hoje?</p>
        </div>
        <div className="home-grid">
          {HOME_MODS.map(m=>(
            <button key={m.key} className="mod-card" onClick={()=>go(m.key)}>
              <div className="corner" style={{background:m.tint}}/>
              <div className="glyph" style={{background:m.bg, color:m.tint}}>
                <Icon name={m.icon} size={28}/>
              </div>
              <div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Afetivo/>
    </div>
  );
}

/* ============================================================
   AVALIAÇÕES
   ============================================================ */
function TitleCard({ item, onRate, onEdit, onDelete }) {
  return (
    <div className="card title-card">
      {item.poster
        ? <div className="poster has-img" style={{height:150, backgroundImage:`url(${item.poster})`}}/>
        : <Poster label={item.type} style={{height:150}}/>}
      <div className="body">
        <div className="tp">{item.type}</div>
        <div className="tt">{item.title}</div>
        <div className="row">
          {item.section==='watched'
            ? <Stars value={item.rating}/>
            : <button className="btn btn-soft btn-sm" onClick={onRate}>avaliar</button>}
          <div className="acts">
            <button className="iconbtn" onClick={onEdit} title="Editar"><Icon name="edit" size={17}/></button>
            <button className="iconbtn" onClick={onDelete} title="Excluir"><Icon name="trash" size={17}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditTitleModal({ item, onSave, onClose }) {
  const [title, setTitle] = useState(item.title||'');
  const [type, setType]   = useState(item.type||'filme');
  const [section, setSection] = useState(item.section||'waiting');
  const [poster, setPoster] = useState(item.poster||'');
  const isNew = !item.id;
  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = () => setPoster(r.result);
    r.readAsDataURL(f);
  };
  return (
    <Modal onClose={onClose}>
      <h3>{isNew?'Novo título':'Editar título'}</h3>
      <div className="field">
        <label>Título</label>
        <input value={title} autoFocus placeholder="Ex.: Cinema Paradiso"
          onChange={e=>setTitle(e.target.value)}/>
      </div>
      <div className="field">
        <label>Foto do filme</label>
        <div className="poster-upload">
          {poster
            ? <div className="poster-prev" style={{backgroundImage:`url(${poster})`}}/>
            : <div className="poster-prev empty"><Icon name="star" size={20}/></div>}
          <div className="poster-upload-actions">
            <label className="btn btn-soft btn-sm pick-img">
              {poster?'trocar imagem':'do dispositivo'}
              <input type="file" accept="image/*" onChange={onFile} style={{display:'none'}}/>
            </label>
            {poster && <button className="btn btn-ghost btn-sm" onClick={()=>setPoster('')}>remover</button>}
          </div>
        </div>
        <input
          value={poster.startsWith('data:') ? '' : poster}
          placeholder="assets/posters/nome-do-filme.jpg"
          onChange={e => setPoster(e.target.value)}
          style={{marginTop:'.5rem'}}
        />
        <p className="muted" style={{fontSize:'.72rem',margin:'.3rem 0 0'}}>cole o caminho da pasta <b>assets/posters/</b> ou uma URL</p>
      </div>
      <div className="field">
        <label>Tipo</label>
        <div className="seg">
          <button className={type==='filme'?'on':''} onClick={()=>setType('filme')}>filme</button>
          <button className={type==='serie'?'on':''} onClick={()=>setType('serie')}>série</button>
        </div>
      </div>
      <div className="field">
        <label>Onde guardar</label>
        <div className="seg">
          <button className={section==='waiting'?'on':''} onClick={()=>setSection('waiting')}>lista de espera</button>
          <button className={section==='watched'?'on':''} onClick={()=>setSection('watched')}>já assistimos</button>
        </div>
      </div>
      <div className="modal-actions">
        <button className="btn btn-ghost" onClick={onClose}>cancelar</button>
        <button className="btn btn-primary" disabled={!title.trim()}
          onClick={()=>onSave({ id:item.id, title:title.trim(), type, section, poster })}>salvar</button>
      </div>
    </Modal>
  );
}

function Avaliacoes({ go }) {
  const { ratings, setRatings, uid } = useChaana();
  const [editing, setEditing] = useState(null);
  const [rating, setRating]   = useState(null);
  const [confirm, setConfirm] = useState(null);

  const watched = ratings.filter(r=>r.section==='watched').sort((a,b)=>b.rating-a.rating);
  const waiting = ratings.filter(r=>r.section==='waiting');

  const save = (data) => {
    if (data.id) setRatings(rs => rs.map(r=> r.id===data.id ? {...r,...data} : r));
    else setRatings(rs => [...rs, { id:uid(), rating:0, poster:'', ...data }]);
    setEditing(null);
  };
  const applyRating = (n) => {
    setRatings(rs => rs.map(r=> r.id===rating.id ? {...r, rating:n, section:'watched'} : r));
    setRating(null);
  };
  const del = () => { setRatings(rs => rs.filter(r=>r.id!==confirm.id)); setConfirm(null); };

  return (
    <div className="app-bg">
      <Decor/>
      <TopBar go={go} active="avaliacoes"/>
      <div className="page fade-in">
        <div className="page-head">
          <div className="eyebrow">o que assistimos</div>
          <h1>Nossa sessão</h1>
          <p>Tudo que vimos e o que ainda vamos ver, abraçados em qualquer lugar.</p>
        </div>

        <div className="sec-title">
          <h2>Já assistimos</h2><span className="count">{watched.length}</span><span className="line"/>
        </div>
        {watched.length ? (
          <div className="rate-grid">
            {watched.map(it=>(
              <TitleCard key={it.id} item={it}
                onEdit={()=>setEditing(it)} onDelete={()=>setConfirm(it)}/>
            ))}
          </div>
        ) : <div className="empty-note">ainda nada avaliado por aqui</div>}

        <div className="sec-title">
          <h2>Lista de espera</h2><span className="count">{waiting.length}</span><span className="line"/>
        </div>
        {waiting.length ? (
          <div className="rate-grid">
            {waiting.map(it=>(
              <TitleCard key={it.id} item={it}
                onRate={()=>setRating(it)} onEdit={()=>setEditing(it)} onDelete={()=>setConfirm(it)}/>
            ))}
          </div>
        ) : <div className="empty-note">a fila está vazia. bora adicionar?</div>}
      </div>

      <Fab onClick={()=>setEditing({ section:'waiting', type:'filme', title:'', poster:'' })} label="Adicionar título"/>

      {editing && <EditTitleModal item={editing} onSave={save} onClose={()=>setEditing(null)}/>}
      {rating && (
        <Modal onClose={()=>setRating(null)}>
          <h3>Que nota merece?</h3>
          <p className="muted" style={{marginTop:'-.6rem'}}>{rating.title}</p>
          <div className="center" style={{margin:'1.6rem 0'}}>
            <Stars value={0} big onPick={applyRating}/>
          </div>
          <p className="muted center" style={{fontSize:'.82rem'}}>toque numa estrela para confirmar</p>
        </Modal>
      )}
      {confirm && (
        <Modal onClose={()=>setConfirm(null)}>
          <h3>Excluir mesmo?</h3>
          <p className="muted">"{confirm.title}" vai sumir da lista. Sem volta.</p>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={()=>setConfirm(null)}>cancelar</button>
            <button className="btn btn-primary" onClick={del}>excluir</button>
          </div>
        </Modal>
      )}
      <Afetivo/>
    </div>
  );
}

/* ============================================================
   PLANTAÇÃO
   ============================================================ */
/* ============================================================
   BANKS DE RECOMPENSAS — PLANTAÇÃO
   ============================================================ */
const BANK_2 = [
  'guardando o que importa, neste caso você',
  'você é o meu lugar favorito',
  'onde você estiver, é lá que eu quero estar',
  'cada vez que te vejo é como a primeira',
  'você é a resposta que eu nem sabia que estava procurando',
  'a melhor parte do meu dia é quando você aparece',
  'eu te escolho hoje, amanhã e em todos os dias que vierem',
  'de todas as mãos que já segurei, a sua é a que mais faz sentido',
];

const BANK_10 = [
  'quando você está longe eu te acho em tudo\n\nno cheiro do café e na música\nque passa sem avisar',
  'a saudade não dói ela só lembra baixinho\n\nque tem alguém do outro lado\nque vale cada hora de espera',
  'você mora em mim mesmo quando não está\n\nocupo o silêncio com tudo\nque ainda quero te contar',
  'a distância mente quando finge que te afasta\n\nmas você aparece em tudo\nem cada coisa que faço pensando em te contar',
  'não precisa de muito só a sua voz\n\numa xícara no meio da tarde\ne o tempo todo pra ficar',
  'é nos detalhes que eu te encontro\n\nna forma que você ri e no silêncio que não pesa\nno seu jeito de simplesmente estar',
  'guardo você nos momentos pequenos\nos que ninguém mais veria\nos que só fazem sentido porque foram vividos com você',
  'não foi um grande gesto foi o seu nome\n\naparecendo na minha cabeça\ntoda hora sem ser chamado',
  'você é o tipo de coisa que acontece devagar\n\ne a gente só percebe\nquando já não imagina mais como era sem',
  'se eu pudesse escolher qualquer lugar do mundo\n\nescolhia o lugar\nonde você também estivesse',
];

const BANK_50 = [
  'KS_TrJOQB-g',
  'MdSB_PcBW3k',
  'qBBwXuEV4jA',
  '4QiuEe43YJw',
  '2kqdlAYNEzk',
  'Ubfc7gTH7vo',
  'boSVJTM1JKc',
  '9Jz58s3sEyc',
  '-QdZ2VtOkhc',
  '9Sk7RQtSl5g',
];

const BANK_100 = [
  `eu vou ficar te olhando\ncom uma cara boba\n\ne quando você perguntar "o que é?"\neu vou falar que não é nada.\n\nmentira minha:\né tudo.`,
  `Amei tudo em você,\ntalvez demais,\nmas como não amar?\n\nAquele sorriso,\naquele riso,\naqueles olhos,\nseu humor, sua paixão...\n\nComo eu não poderia te amar,\nse você era tudo\nque eu já quis?`,
  `Se os olhos capturassem o instante,\neu teria, nos olhos, um álbum sagrado,\nguardando o teu riso, tão leve e radiante,\nonde o tempo não passa, em silêncio, parado.\n\nAh, se as memórias tomassem forma e cor,\neu reviveria aquele dia,\ntão perfeito, só para te ver dançando\ncom tanto amor, com teus gestos serenos.\n\nE o teu cabelo, numa dança distraída,\nvolta atrás da orelha, como em um ritual,\nenquanto espalha teu riso pela vida,\ncom uma graça que faz o simples ser real.\n\nSe eu pudesse, oh, se eu pudesse te olhar\npor horas infinitas, sem jamais cansar,\neu viveria num eterno admirar,\npreso no brilho que só seus olhos sabem dar.\n\n— poesiacomperes`,
  `Seu sorriso, obra de arte divina,\nem seus lábios, a doçura de Iracema.\nOlhos que refletem a alma como Capitu,\nRefletem mistérios que jamais\ncessarão de encantar.\n\nSua boca, suave como pétala de flor,\nconvidam ao doce sabor da paixão,\ncomo as águas do mar de onde Iracema saiu,\nseus lábios desenham a mais bela canção.\nCada riso, uma nova emoção,\nque desperta em mim as mais doces sensações.\n\nSeus olhos, profundos como abismo sem fim,\nguardam segredos de um universo interior,\ncomo os olhos que Machado eternizou,\nem cada olhar, um convite ao amor.\n\nE o jeito doce de me olhar\né como um bálsamo para minha alma cansada,\né a perfeição em forma de pessoa,\num ser de luz em meio à estrada.\n\n— poesiacomperes`,
  `o grande amor da sua vida\npode dizer pra você\nque o amor acabou\nenquanto vocês jantam\nnuma quarta-feira. ele te\nolhará com olhos marejados,\npegará nas suas mãos,\npedirá perdão. talvez você\nentenda, daqui uns anos,\nque amor também é esta\nparte incompreendida que\nresta entre duas pessoas.`,
  `Eu queria que fosse você\n\nEu queria que fosse você, sabe? Aquele que apareceria ao fim de cada dia para dividir os silêncios e as risadas, para acolher minhas confusões e compartilhar meus sonhos.\n\nEu queria que fosse você, quem seguraria minha mão nas noites difíceis, quem conheceria os meus segredos e ainda assim escolheria ficar.\n\nQue fosse você a presença tranquila que acalma, a voz que traz paz, o abraço que cura.\n\nAinda assim, mesmo com tudo, no fundo do meu coração, eu queria que fosse você...\nsempre.`,
  `Encontrei\n\n"Qual seu tipo?"\nNunca soube direito como responder essa pergunta.\nTem algumas coisas específicas que me atraem?\nSim.\nMas posso encontrar alguém com todas elas\ne mesmo assim não me apaixonar.\n\nPorque o meu tipo não é óbvio.\nEle não é carnal.\nO meu tipo é aquele que eu olho\ne tudo em mim grita\n"Encontrei."`,
  `Se quer saber\nem quais olhos\nhabita o amor\n\né só olhar\npara os meus\nquando eu\nte ver\n\n— Joab Brandão`,
];

const BANK_EMOJI = { b2:'✨', b10:'🌙', b50:'🎵', b100:'💌' };
const BANK_LABEL = { b2:'um pensamento', b10:'um verso', b50:'uma música', b100:'um poema' };

function getTriggeredBanks(n, bi) {
  const t = [];
  if (n <= 100) {
    if (n === 2   && bi.b2   < BANK_2.length)   t.push('b2');
    if (n === 10  && bi.b10  < BANK_10.length)  t.push('b10');
    if (n === 50)                                t.push('b50');
    if (n === 100 && bi.b100 < BANK_100.length) t.push('b100');
  } else {
    if (n % 10 === 1                              && bi.b2   < BANK_2.length)   t.push('b2');
    if (n % 10 === 0 && n % 100 !== 0            && bi.b10  < BANK_10.length)  t.push('b10');
    if ((n - 100) % 33 === 0)                                                  t.push('b50');
    if (((n - 100) % 44 === 0 || n % 100 === 0) && bi.b100 < BANK_100.length) t.push('b100');
  }
  return t;
}

function pickRewards(triggered) {
  const text = triggered.filter(b => b !== 'b50').sort((a,b) => parseInt(b.slice(1)) - parseInt(a.slice(1)));
  return { textBank: text[0] || null, musicBank: triggered.includes('b50') ? 'b50' : null };
}

function getNextRewardClick(n, bi) {
  for (let c = n + 1; c <= n + 500; c++) {
    if (getTriggeredBanks(c, bi).length > 0) return c;
  }
  return null;
}

function PlantProgress({ clicks, bankIdx }) {
  const next = getNextRewardClick(clicks, bankIdx);
  if (!next) return null;

  let prev = 0;
  for (let c = clicks; c >= Math.max(1, clicks - 300); c--) {
    if (getTriggeredBanks(c, bankIdx).length > 0) { prev = c; break; }
  }

  const pct = next === prev ? 100 : Math.min(100, ((clicks - prev) / (next - prev)) * 100);
  const rem = next - clicks;
  const bank = pickRewards(getTriggeredBanks(next, bankIdx)).musicBank || pickRewards(getTriggeredBanks(next, bankIdx)).textBank;

  return (
    <div style={{width:'100%',marginTop:'.35rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'.28rem'}}>
        <span style={{fontSize:'.65rem',color:'var(--ink-soft)',letterSpacing:'.02em'}}>
          {BANK_EMOJI[bank]} em <b style={{color:'var(--rose-deep)'}}>{rem}</b> flor{rem!==1?'es':''}
        </span>
        <span style={{fontSize:'.6rem',color:'var(--ink-soft)',opacity:.55}}>{BANK_LABEL[bank]}</span>
      </div>
      <div style={{width:'100%',height:3,background:'var(--cream-3)',borderRadius:999,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${pct}%`,background:'linear-gradient(to right,var(--rose-soft),var(--lilac))',borderRadius:999,transition:'width .5s ease'}}/>
      </div>
    </div>
  );
}

function Plantacao({ go }) {
  const { clicks, setClicks, bankIdx, setBankIdx } = useChaana();
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, clicked: false, vanishCanvas: false });
  const [textReward, setTextReward] = useState(null);
  const [musicReward, setMusicReward] = useState(null);
  const [clearConfirm, setClearConfirm] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.THREE) return;
    const THREE = window.THREE;
    const pointer = pointerRef.current;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const sceneShader = new THREE.Scene();
    const sceneBasic = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    const clock = new THREE.Clock();
    let renderTargets = [
      new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight),
      new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight),
    ];

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_stop_time:       { type: 'f',  value: 0 },
        u_stop_randomizer: { type: 'v2', value: new THREE.Vector2(Math.random(), Math.random()) },
        u_cursor:          { type: 'v2', value: new THREE.Vector2(0.5, 0.5) },
        u_ratio:           { type: 'f',  value: window.innerWidth / window.innerHeight },
        u_texture:         { type: 't',  value: null },
        u_clean:           { type: 'f',  value: 1 },
      },
      vertexShader:   document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent,
    });
    const basicMaterial = new THREE.MeshBasicMaterial();
    const geo = new THREE.PlaneGeometry(2, 2);
    sceneBasic.add(new THREE.Mesh(geo, basicMaterial));
    sceneShader.add(new THREE.Mesh(geo, shaderMaterial));

    const updateSize = () => {
      shaderMaterial.uniforms.u_ratio.value = window.innerWidth / window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderTargets[0].setSize(window.innerWidth, window.innerHeight);
      renderTargets[1].setSize(window.innerWidth, window.innerHeight);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    let animId;
    const animate = () => {
      shaderMaterial.uniforms.u_clean.value = pointer.vanishCanvas ? 0 : 1;
      shaderMaterial.uniforms.u_texture.value = renderTargets[0].texture;
      if (pointer.clicked) {
        shaderMaterial.uniforms.u_cursor.value = new THREE.Vector2(pointer.x, 1 - pointer.y);
        shaderMaterial.uniforms.u_stop_randomizer.value = new THREE.Vector2(Math.random(), Math.random());
        shaderMaterial.uniforms.u_stop_time.value = 0;
        pointer.clicked = false;
      }
      shaderMaterial.uniforms.u_stop_time.value += clock.getDelta();
      renderer.setRenderTarget(renderTargets[1]);
      renderer.render(sceneShader, camera);
      basicMaterial.map = renderTargets[1].texture;
      renderer.setRenderTarget(null);
      renderer.render(sceneBasic, camera);
      let tmp = renderTargets[0]; renderTargets[0] = renderTargets[1]; renderTargets[1] = tmp;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
      renderer.dispose();
      renderTargets[0].dispose();
      renderTargets[1].dispose();
    };
  }, []);

  const addFlower = (clientX, clientY) => {
    pointerRef.current.x = clientX / window.innerWidth;
    pointerRef.current.y = clientY / window.innerHeight;
    pointerRef.current.clicked = true;

    const next = clicks + 1;
    setClicks(next);

    const triggered = getTriggeredBanks(next, bankIdx);
    const { textBank, musicBank } = pickRewards(triggered);

    if (textBank) {
      const data = { b2: BANK_2, b10: BANK_10, b100: BANK_100 }[textBank];
      const text = data[bankIdx[textBank]];
      setBankIdx(bi => ({ ...bi, [textBank]: bi[textBank] + 1 }));
      setTimeout(() => setTextReward({ bank: textBank, text }), 350);
    }
    if (musicBank) {
      const isFirst = bankIdx.b50 === 0;
      const videoId = isFirst
        ? BANK_50[0]
        : BANK_50[1 + Math.floor(Math.random() * (BANK_50.length - 1))];
      if (isFirst) setBankIdx(bi => ({ ...bi, b50: 1 }));
      setTimeout(() => setMusicReward({ videoId }), textBank ? 900 : 350);
    }
  };

  const clearGarden = () => {
    pointerRef.current.vanishCanvas = true;
    setTimeout(() => { pointerRef.current.vanishCanvas = false; }, 50);
    setClearConfirm(false);
  };

  return (
    <div style={{position:'fixed',inset:0,background:'#3B0A1F'}}>
      <canvas
        ref={canvasRef}
        style={{position:'absolute',top:0,left:0,display:'block',cursor:'crosshair'}}
        onClick={e => addFlower(e.clientX, e.clientY)}
        onTouchStart={e => { e.preventDefault(); addFlower(e.touches[0].clientX, e.touches[0].clientY); }}
      />
      {clicks === 0 && (
        <div className="garden-hint" style={{pointerEvents:'none'}}>
          <h2 style={{color:'rgba(255,214,224,.75)'}}>Plante</h2>
          <p style={{color:'rgba(255,214,224,.45)'}}>clique em qualquer lugar da tela</p>
        </div>
      )}
      <TopBar go={go} active="plantacao"/>

      <div className="counter-pill" style={{flexDirection:'column',alignItems:'stretch',gap:0,paddingTop:'.7rem',paddingBottom:'.8rem',borderRadius:18,minWidth:220}}>
        <div style={{display:'flex',alignItems:'center',gap:'.6rem',fontSize:'.86rem',color:'var(--ink-soft)',fontWeight:600}}>
          <Icon name="flower" size={18}/>
          <b style={{fontFamily:'var(--serif)',fontStyle:'italic',color:'var(--rose-deep)',fontSize:'1.3rem',fontWeight:600}}>{clicks}</b>
          flores plantadas
          {clicks > 0 && (
            <button className="btn btn-ghost btn-sm" style={{marginLeft:'auto',padding:'.3rem .7rem',fontSize:'.68rem',borderColor:'rgba(168,69,106,.15)'}} onClick={e=>{e.stopPropagation();setClearConfirm(true);}}>limpar</button>
          )}
        </div>
        <PlantProgress clicks={clicks} bankIdx={bankIdx}/>
      </div>

      {textReward && (
        <Modal onClose={()=>setTextReward(null)} className="reward-modal">
          <div className="heartbig">{BANK_EMOJI[textReward.bank]}</div>
          <div className="reward-kind">{BANK_LABEL[textReward.bank]}</div>
          <div className="reward-body">{textReward.text}</div>
          <div className="modal-actions" style={{justifyContent:'center',marginTop:'1.6rem'}}>
            <button className="btn btn-soft" onClick={()=>setTextReward(null)}>continuar plantando</button>
          </div>
        </Modal>
      )}

      {musicReward && (
        <div style={{position:'fixed',bottom:90,right:20,zIndex:65,background:'var(--cream)',borderRadius:20,boxShadow:'var(--shadow-lg)',padding:'1rem 1rem .9rem',width:290,animation:'popIn .3s cubic-bezier(.2,.8,.3,1.2)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'.65rem'}}>
            <span style={{fontSize:'.68rem',letterSpacing:'.22em',textTransform:'uppercase',color:'var(--rose)',fontWeight:700}}>🎵 uma música</span>
            <button className="iconbtn" style={{width:28,height:28}} onClick={()=>setMusicReward(null)}><Icon name="close" size={16}/></button>
          </div>
          <div style={{position:'relative',paddingBottom:'56.25%',height:0,overflow:'hidden',borderRadius:12}}>
            <iframe
              src={`https://www.youtube.com/embed/${musicReward.videoId}?autoplay=1`}
              style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none',borderRadius:12}}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {clearConfirm && (
        <Modal onClose={()=>setClearConfirm(false)}>
          <h3>Limpar o jardim?</h3>
          <p className="muted">Todas as flores serão removidas da tela. O contador é mantido.</p>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={()=>setClearConfirm(false)}>cancelar</button>
            <button className="btn btn-primary" onClick={clearGarden}>limpar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============================================================
   DATAS
   ============================================================ */
const MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const EMOJIS = ['💋','🌹','☕','✈️','🎂','🐾','💍','🎬','🌙','🍷','🏠','💌'];

function fmtDay(iso){ const d=new Date(iso+'T00:00:00'); return String(d.getDate()).padStart(2,'0'); }

function EditDateModal({ item, onSave, onClose }) {
  const [title,setTitle]=useState(item.title||'');
  const [date,setDate]=useState(item.date||'');
  const [emoji,setEmoji]=useState(item.emoji||'💛');
  const [desc,setDesc]=useState(item.desc||'');
  return (
    <Modal onClose={onClose}>
      <h3>{item.id?'Editar memória':'Nova memória'}</h3>
      <div className="field">
        <label>Título</label>
        <input value={title} autoFocus placeholder="Ex.: Primeiro 'eu te amo'" onChange={e=>setTitle(e.target.value)}/>
      </div>
      <div className="field">
        <label>Data</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)}/>
      </div>
      <div className="field">
        <label>Emoji</label>
        <div className="sticker-pick">
          {EMOJIS.map(em=>(
            <button key={em} style={emoji===em?{background:'var(--rose-wash)'}:null} onClick={()=>setEmoji(em)}>{em}</button>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Descrição</label>
        <textarea value={desc} placeholder="Conte como foi…" style={{minHeight:90}} onChange={e=>setDesc(e.target.value)}/>
      </div>
      <div className="modal-actions">
        <button className="btn btn-ghost" onClick={onClose}>cancelar</button>
        <button className="btn btn-primary" disabled={!title.trim()||!date}
          onClick={()=>onSave({ id:item.id, title:title.trim(), date, emoji, desc:desc.trim() })}>salvar</button>
      </div>
    </Modal>
  );
}

function Datas({ go }) {
  const today = new Date();
  const { dates, setDates, uid } = useChaana();
  const [ym, setYm] = useState({ y:today.getFullYear(), m:today.getMonth() });
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [open, setOpen] = useState({});

  const move = (d) => setYm(s=>{
    let m=s.m+d, y=s.y;
    if(m<0){m=11;y--;} if(m>11){m=0;y++;}
    return {y,m};
  });

  const monthEvents = dates
    .filter(e=>{ const d=new Date(e.date+'T00:00:00'); return d.getFullYear()===ym.y && d.getMonth()===ym.m; })
    .sort((a,b)=>a.date.localeCompare(b.date));

  const save = (data) => {
    if(data.id) setDates(ds=>ds.map(e=>e.id===data.id?{...e,...data}:e));
    else setDates(ds=>[...ds,{id:uid(),...data}]);
    setEditing(null);
  };
  const del = () => { setDates(ds=>ds.filter(e=>e.id!==confirm.id)); setConfirm(null); };

  const isToday = (iso) => { const d=new Date(iso+'T00:00:00'); const t=new Date();
    return d.getDate()===t.getDate()&&d.getMonth()===t.getMonth()&&d.getFullYear()===t.getFullYear(); };

  return (
    <div className="app-bg">
      <Decor/>
      <TopBar go={go} active="datas"/>
      <div className="page fade-in">
        <div className="page-head">
          <div className="eyebrow">linha do tempo</div>
          <h1>A nossa história</h1>
          <p>Cada data aqui é um capítulo. Navegue pelos meses e relembre.</p>
        </div>

        <div className="month-nav">
          <button className="iconbtn" onClick={()=>move(-1)}><Icon name="left"/></button>
          <div>
            <div className="m">{MESES[ym.m]}</div>
            <div className="y center">{ym.y}</div>
          </div>
          <button className="iconbtn" onClick={()=>move(1)}><Icon name="right"/></button>
        </div>

        {monthEvents.length ? (
          <div className="timeline">
            {monthEvents.map(e=>(
              <div key={e.id} className="tl-event">
                <div className="node" style={isToday(e.date)?{borderColor:'var(--rose)',boxShadow:'0 0 0 4px var(--rose-wash)'}:null}>{e.emoji}</div>
                <div className="ev" onClick={()=>setOpen(o=>({...o,[e.id]:!o[e.id]}))}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'.6rem'}}>
                    <div>
                      <div className="d">{fmtDay(e.date)} de {MESES[ym.m]}{isToday(e.date)?' · hoje':''}</div>
                      <div className="t">{e.title}</div>
                    </div>
                    <div className="acts" style={{display:'flex',gap:'.2rem'}} onClick={ev=>ev.stopPropagation()}>
                      <button className="iconbtn" onClick={()=>setEditing(e)}><Icon name="edit" size={16}/></button>
                      <button className="iconbtn" onClick={()=>setConfirm(e)}><Icon name="trash" size={16}/></button>
                    </div>
                  </div>
                  {e.desc && <div className="desc" style={{maxHeight: open[e.id]?'200px':'0', marginTop:open[e.id]?'.5rem':0}}>{e.desc}</div>}
                </div>
              </div>
            ))}
          </div>
        ) : <div className="tl-empty">nenhuma memória em {MESES[ym.m]} ainda…<br/>que tal criar uma?</div>}
      </div>

      <Fab onClick={()=>setEditing({ emoji:'💛', date:`${ym.y}-${String(ym.m+1).padStart(2,'0')}-15`, title:'', desc:'' })} label="Adicionar data"/>

      {editing && <EditDateModal item={editing} onSave={save} onClose={()=>setEditing(null)}/>}
      {confirm && (
        <Modal onClose={()=>setConfirm(null)}>
          <h3>Apagar memória?</h3>
          <p className="muted">"{confirm.title}" será removida da linha do tempo.</p>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={()=>setConfirm(null)}>cancelar</button>
            <button className="btn btn-primary" onClick={del}>apagar</button>
          </div>
        </Modal>
      )}
      <Afetivo/>
    </div>
  );
}

/* ============================================================
   POEMAS
   ============================================================ */
function excerptOf(body){ return body.split('\n').slice(0,3).join('\n'); }

function EditPoemModal({ item, user, onSave, onClose }) {
  const [title,setTitle]=useState(item.title||'');
  const [body,setBody]=useState(item.body||'');
  const [author,setAuthor]=useState(item.author||user);
  return (
    <Modal onClose={onClose} wide>
      <h3>{item.id?'Editar poema':'Novo poema'}</h3>
      <div className="field">
        <label>Título</label>
        <input value={title} autoFocus placeholder="Dê um nome ao verso" onChange={e=>setTitle(e.target.value)}/>
      </div>
      <div className="field">
        <label>Autor</label>
        <input value={author} placeholder="quem escreveu?" onChange={e=>setAuthor(e.target.value)}/>
      </div>
      <div className="field">
        <label>Poema</label>
        <textarea value={body} placeholder={'Escreva aqui…\nas quebras de linha são preservadas.'} style={{minHeight:200,fontFamily:'var(--serif)',fontStyle:'italic',fontSize:'1.1rem',lineHeight:1.6}} onChange={e=>setBody(e.target.value)}/>
      </div>
      <div className="modal-actions">
        <button className="btn btn-ghost" onClick={onClose}>cancelar</button>
        <button className="btn btn-primary" disabled={!title.trim()||!body.trim()||!author.trim()}
          onClick={()=>onSave({ id:item.id, title:title.trim(), body, author:author.trim() })}>salvar</button>
      </div>
    </Modal>
  );
}

function Poemas({ go }) {
  const { poems, setPoems, user, uid, STICKERS } = useChaana();
  const [open, setOpen]       = useState(null);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [fAuthor, setFAuthor] = useState('todos');
  const [fRead, setFRead]     = useState('todos');

  const filtered = poems.filter(p=>{
    if(fAuthor!=='todos' && p.author!==fAuthor) return false;
    const read = p.readBy.includes(user);
    if(fRead==='lidos' && !read) return false;
    if(fRead==='nlidos' && read) return false;
    return true;
  });

  const current = poems.find(p=>p.id===open);

  const toggleRead = (p) => setPoems(ps=>ps.map(x=>x.id===p.id
    ? {...x, readBy: x.readBy.includes(user) ? x.readBy.filter(u=>u!==user) : [...x.readBy,user]}
    : x));
  const addSticker = (p, em) => setPoems(ps=>ps.map(x=>x.id===p.id ? {...x, stickers:[...x.stickers, em]} : x));
  const save = (data) => {
    if(data.id) setPoems(ps=>ps.map(p=>p.id===data.id?{...p,...data}:p));
    else setPoems(ps=>[...ps,{ id:uid(), readBy:[], stickers:[], ...data }]);
    setEditing(null);
  };
  const del = () => { setPoems(ps=>ps.filter(p=>p.id!==confirm.id)); setConfirm(null); setOpen(null); };

  return (
    <div className="app-bg">
      <Decor/>
      <TopBar go={go} active="poemas"/>
      <div className="page fade-in">
        <div className="page-head">
          <div className="eyebrow">versos da gente</div>
          <h1>O que escrevemos</h1>
          <p>Poemas de Davi e Vagner, guardados com carinho. Marque o que já leu.</p>
        </div>

        <div className="filters">
          {['todos','Davi','Vagner'].map(a=>(
            <button key={a} className={`chip ${fAuthor===a?'on':''}`} onClick={()=>setFAuthor(a)}>{a==='todos'?'todos os autores':a}</button>
          ))}
          <span style={{width:1,background:'var(--cream-3)',margin:'0 .3rem'}}/>
          {[['todos','todos'],['lidos','lidos'],['nlidos','não lidos']].map(([k,l])=>(
            <button key={k} className={`chip ${fRead===k?'on':''}`} onClick={()=>setFRead(k)}>{l}</button>
          ))}
        </div>

        {filtered.length ? (
          <div className="poem-grid">
            {filtered.map(p=>{
              const read = p.readBy.includes(user);
              return (
                <div key={p.id} className="poem-card" onClick={()=>setOpen(p.id)}>
                  <div className="by">por {p.author}</div>
                  <h3>{p.title}</h3>
                  <div className="excerpt">{excerptOf(p.body)}…</div>
                  <div className="ind">
                    <span className={`read ${read?'is-read':''}`}><Icon name="check" size={15}/> {read?'lido':'não lido'}</span>
                    {p.stickers.length>0 && <span className="sticker-row">{p.stickers.slice(0,4).map((s,i)=><span key={i}>{s}</span>)}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : <div className="empty-note">nenhum poema com esse filtro</div>}
      </div>

      <Fab onClick={()=>setEditing({ title:'', body:'', author:user })} label="Escrever poema"/>

      {current && (
        <Modal onClose={()=>setOpen(null)} wide>
          <div className="by" style={{color:'var(--lilac)',fontSize:'.7rem',letterSpacing:'.18em',textTransform:'uppercase',fontWeight:700}}>por {current.author}</div>
          <h3 style={{marginTop:'.3rem'}}>{current.title}</h3>
          <div className="poem-full">{current.body}</div>
          <div className="poem-actions">
            <button className={`btn ${current.readBy.includes(user)?'btn-soft':'btn-ghost'}`} onClick={()=>toggleRead(current)}>
              <Icon name="check" size={17}/> {current.readBy.includes(user)?'lido por você':'marcar como lido'}
            </button>
            <button className="btn btn-ghost" onClick={()=>{ setEditing(current); setOpen(null); }}><Icon name="edit" size={16}/> editar</button>
            <button className="btn btn-ghost" onClick={()=>setConfirm(current)}><Icon name="trash" size={16}/></button>
            <div style={{flex:1}}/>
            <div className="sticker-row">{current.stickers.map((s,i)=><span key={i} className="sticker">{s}</span>)}</div>
          </div>
          <div className="sticker-pick">
            {STICKERS.map(em=>(
              <button key={em} onClick={()=>addSticker(current, em)}>{em}</button>
            ))}
          </div>
          {current.readBy.length>0 && <p className="muted" style={{fontSize:'.8rem',marginTop:'.8rem'}}>lido por {current.readBy.join(' e ')}</p>}
        </Modal>
      )}

      {editing && <EditPoemModal item={editing} user={user} onSave={save} onClose={()=>setEditing(null)}/>}
      {confirm && (
        <Modal onClose={()=>setConfirm(null)}>
          <h3>Apagar poema?</h3>
          <p className="muted">"{confirm.title}" será removido para sempre.</p>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={()=>setConfirm(null)}>cancelar</button>
            <button className="btn btn-primary" onClick={del}>apagar</button>
          </div>
        </Modal>
      )}
      <Afetivo/>
    </div>
  );
}

/* ============================================================
   ROUTER + APP
   ============================================================ */
function Router() {
  const [screen, setScreen] = useState('splash');
  const go = (s) => { setScreen(s); window.scrollTo(0,0); };

  switch(screen){
    case 'splash':     return <Splash go={go}/>;
    case 'login':      return <Login go={go}/>;
    case 'home':       return <Home go={go}/>;
    case 'avaliacoes': return <Avaliacoes go={go}/>;
    case 'plantacao':  return <Plantacao go={go}/>;
    case 'datas':      return <Datas go={go}/>;
    case 'poemas':     return <Poemas go={go}/>;
    default:           return <Splash go={go}/>;
  }
}

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      const user = await window.__firebaseAuth.getUser();
      if (!user) await window.__firebaseAuth.signIn();
      setReady(true);
    }
    if (window.__firebaseReady) init();
    else window.addEventListener('firebase-ready', init, { once: true });
  }, []);

  if (!ready) {
    return (
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--wine-deep)'}}>
        <div style={{fontFamily:'Cormorant Garamond, serif',fontStyle:'italic',fontSize:'3rem',color:'#FBE7EE'}}>Chaana</div>
      </div>
    );
  }

  return (
    <ChaanaProvider>
      <Router/>
    </ChaanaProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
