// ══ RESEARCH DISCLAIMER GATE ══
(function() {
  const gate = document.getElementById('disclaimerGate');
  const agreeBtn = document.getElementById('dgAgree');
  const check1 = document.getElementById('dgCheck1');
  const check2 = document.getElementById('dgCheck2');
  if (!gate) return;

  // If already agreed in this session, skip gate
  if (sessionStorage.getItem('formaAgreed')) {
    gate.classList.add('done');
    return;
  }

  function updateBtn() {
    const both = check1?.checked && check2?.checked;
    if (agreeBtn) {
      agreeBtn.disabled = !both;
    }
  }
  check1?.addEventListener('change', updateBtn);
  check2?.addEventListener('change', updateBtn);
})();

function handleDisclaimerAgree() {
  const gate = document.getElementById('disclaimerGate');
  if (gate) {
    sessionStorage.setItem('formaAgreed', '1');
    gate.classList.add('done');
  }
}

// ══ SUPABASE ══
// Replace these with your project values from supabase.com → Settings → API
const SUPABASE_URL      = 'https://qzrzveuimkrvbpigptvb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6cnp2ZXVpbWtydmJwaWdwdHZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NDc0NTUsImV4cCI6MjA5MzIyMzQ1NX0.QtvmKZ-uktZTvWPjbf6ATaG-t_MWSK6EnNvMH4RuhgI';
const _db = typeof supabase !== 'undefined'
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ══ CALENDLY ══
const CALENDLY_URL = 'https://calendly.com/forma-ph/protocol';
function openCalendly() {
  if (typeof fbq !== 'undefined') fbq('track', 'Lead');
  if (typeof ttq !== 'undefined') ttq.track('ClickButton');
  if (typeof gtag !== 'undefined') gtag('event', 'begin_checkout');
  if (typeof Calendly !== 'undefined') {
    Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, '_blank');
  }
}

// ══ CUSTOM CURSOR ══
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursorDot) { cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; }
});
(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) { cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px'; }
  requestAnimationFrame(animateRing);
})();
document.querySelectorAll('a,button,.protocol-card,.transform-card,.study-card,.step').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursorDot) { cursorDot.style.transform = 'translate(-50%,-50%) scale(2.5)'; cursorDot.style.background = '#C8A47E'; }
    if (cursorRing) { cursorRing.style.width = '48px'; cursorRing.style.height = '48px'; cursorRing.style.borderColor = 'rgba(200,164,126,0.6)'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursorDot) { cursorDot.style.transform = 'translate(-50%,-50%) scale(1)'; cursorDot.style.background = ''; }
    if (cursorRing) { cursorRing.style.width = '28px'; cursorRing.style.height = '28px'; cursorRing.style.borderColor = 'rgba(26,20,16,0.35)'; }
  });
});

// ══ SCROLL PROGRESS ══
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  if (progressBar) progressBar.style.transform = `scaleX(${window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)})`;
}, { passive: true });

// ══ ANIMATED STATUE BACKGROUND ══
const statueBgLeft  = document.getElementById('statueBgLeft');
const statueBgRight = document.getElementById('statueBgRight');

// Lerp targets — updated on mousemove, applied smoothly each frame
let statTargDx = 0, statTargDy = 0;
let statCurrDx = 0, statCurrDy = 0;
let statMouseActive = false;

document.addEventListener('mousemove', (e) => {
  const hero = document.getElementById('home');
  if (!hero) return;
  const heroRect = hero.getBoundingClientRect();
  if (e.clientY < heroRect.top || e.clientY > heroRect.bottom) {
    statMouseActive = false;
    return;
  }
  statMouseActive = true;
  statTargDx = (e.clientX / window.innerWidth  - 0.5);
  statTargDy = (e.clientY / window.innerHeight - 0.5);
});

// Lerp animation loop — smooth 6% approach per frame (~0.8s settle)
(function animateStatues() {
  statCurrDx += (statTargDx - statCurrDx) * 0.055;
  statCurrDy += (statTargDy - statCurrDy) * 0.055;
  if (statMouseActive && statueBgLeft) {
    statueBgLeft.style.transform  = `translateX(${-statCurrDx * 16}px) translateY(${statCurrDy * 7}px) scale(1.025)`;
    if (statueBgRight) statueBgRight.style.transform = `translateX(${statCurrDx * 16}px) translateY(${statCurrDy * 7}px) scale(1.025)`;
  }
  requestAnimationFrame(animateStatues);
})();

// Scroll parallax — statues drift upward as you scroll the hero
window.addEventListener('scroll', () => {
  if (statMouseActive) return;
  const hero = document.getElementById('home');
  if (!hero || !statueBgLeft) return;
  const progress = Math.min(window.scrollY / (hero.offsetHeight || 1), 1);
  const moveY = progress * -50;
  statueBgLeft.style.transform  = `translateY(${moveY}px)`;
  if (statueBgRight) statueBgRight.style.transform = `translateY(${moveY}px)`;
}, { passive: true });

// ══ NAV + STICKY ══
const nav = document.getElementById('nav');
const stickyApply = document.getElementById('stickyApply');
const heroSection = document.getElementById('home');
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (nav) nav.classList.toggle('scrolled', sy > 40);
  if (heroSection && stickyApply) {
    stickyApply.classList.toggle('visible', sy > heroSection.offsetTop + heroSection.offsetHeight - 120);
  }
}, { passive: true });

// ══ MOBILE MENU ══
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// ══ SLOT COUNT ══
const SLOT_COUNT = 10;
document.querySelectorAll('#slotCount,#slotCountSticky,#slotCountResults').forEach(el => { el.textContent = SLOT_COUNT; });

// ══ REVEAL ══
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));

// ══ COUNTER ══
function animateCounter(el, target, dur = 1200) {
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target, parseInt(e.target.dataset.target, 10)); counterObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

// ══ NUMBER SCRAMBLE ══
const NUMS = '0123456789';
function scramble(el, final, dur = 700) {
  const start = performance.now();
  const orig = el.textContent;
  const tick = (now) => {
    const t = Math.min((now - start) / dur, 1);
    if (t < 1) {
      el.textContent = orig.replace(/[\d.]/g, c => Math.random() > t ? NUMS[Math.floor(Math.random()*10)] : c);
      requestAnimationFrame(tick);
    } else { el.textContent = final; }
  };
  requestAnimationFrame(tick);
}
const scrambleObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting && e.target.dataset.scramble) { setTimeout(() => scramble(e.target, e.target.dataset.scramble), 200); scrambleObs.unobserve(e.target); } });
}, { threshold: 0.6 });
document.querySelectorAll('.proof-num[data-scramble]').forEach(el => scrambleObs.observe(el));

// ══ MAGNETIC ELEMENTS ══
document.querySelectorAll('.magnetic-btn').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    el.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});
document.querySelectorAll('.magnetic-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ══ STUDY TOGGLES ══
document.querySelectorAll('.study-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.study-toggle').forEach(b => { b.setAttribute('aria-expanded', 'false'); b.nextElementSibling.classList.remove('open'); });
    if (!expanded) { btn.setAttribute('aria-expanded', 'true'); btn.nextElementSibling.classList.add('open'); }
  });
});

// ══ FAQ ══
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-q').forEach(b => { b.setAttribute('aria-expanded', 'false'); b.nextElementSibling.classList.remove('open'); });
    if (!expanded) { btn.setAttribute('aria-expanded', 'true'); btn.nextElementSibling.classList.add('open'); }
  });
});

// ══ CTA SPARK ══
const sparkStyle = document.createElement('style');
sparkStyle.textContent = '@keyframes sparkBurst{0%{transform:translate(-50%,-50%) scale(1);opacity:1}100%{transform:translate(-50%,-50%) scale(10);opacity:0}}';
document.head.appendChild(sparkStyle);
document.querySelectorAll('.btn-dark,.btn-gold').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const s = document.createElement('span');
    s.style.cssText = `position:fixed;width:6px;height:6px;background:rgba(200,164,126,0.6);border-radius:50%;left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;z-index:99999;animation:sparkBurst 0.5s ease forwards;`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 500);
  });
});

// ══ SMOOTH ANCHOR SCROLL ══
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// ══ BATCH 2 WAITLIST ══
async function handleWaitlist() {
  const input   = document.getElementById('waitlistInput');
  const success = document.getElementById('wfSuccess');
  const inner   = document.querySelector('.wf-inner');
  const btn     = document.querySelector('.wf-btn');
  const val     = input?.value.trim();
  if (!val) { input?.focus(); return; }

  if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

  try {
    if (_db) {
      const { error } = await _db.from('waitlist').insert([{ contact: val, source: 'website' }]);
      if (error) throw error;
    }
    if (typeof fbq !== 'undefined') fbq('track', 'CompleteRegistration');
    if (typeof ttq !== 'undefined') ttq.track('Subscribe');
    if (typeof gtag !== 'undefined') gtag('event', 'sign_up', { method: 'waitlist' });
    if (inner)   inner.style.display   = 'none';
    if (success) success.style.display = 'flex';
  } catch (err) {
    console.error('Waitlist error:', err);
    if (btn) { btn.disabled = false; btn.textContent = 'Notify Me →'; }
    if (input) { input.style.borderColor = 'rgba(200,80,80,0.6)'; setTimeout(() => { input.style.borderColor = ''; }, 2000); }
  }
}

// ══ HERO PARTICLE SYSTEM ══
(function initHeroFX() {
  const pCont = document.getElementById('heroParticles');
  const bCont = document.getElementById('heroBeams');
  if (!pCont) return;

  // Floating particles
  for (let i = 0; i < 32; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size = (Math.random() * 4.5 + 1.5).toFixed(1);
    const op   = (Math.random() * 0.38 + 0.08).toFixed(2);
    const dur  = (Math.random() * 10 + 7).toFixed(1);
    const del  = -(Math.random() * 16).toFixed(1);
    const rise = -(Math.random() * 120 + 60).toFixed(0);
    const sway = ((Math.random() - 0.5) * 50).toFixed(0);
    p.style.cssText = `left:${(Math.random()*100).toFixed(1)}%;top:${(Math.random()*100).toFixed(1)}%;width:${size}px;height:${size}px;--op:${op};--dur:${dur}s;--del:${del}s;--rise:${rise}px;--sway:${sway}px`;
    pCont.appendChild(p);
  }

  // Light beams
  if (bCont) {
    for (let i = 0; i < 6; i++) {
      const b = document.createElement('div');
      b.className = 'hero-beam';
      const rot  = ((Math.random() - 0.5) * 28).toFixed(1);
      const bop  = (Math.random() * 0.07 + 0.03).toFixed(3);
      const bdur = (Math.random() * 10 + 9).toFixed(1);
      const bdel = -(Math.random() * 18).toFixed(1);
      const lft  = (Math.random() * 90 + 5).toFixed(1);
      b.style.cssText = `left:${lft}%;--rot:${rot}deg;--bop:${bop};--bdur:${bdur}s;--bdel:${bdel}s`;
      bCont.appendChild(b);
    }
  }
})();

// ══ DISCLAIMER GATE PARTICLE SYSTEM ══
(function initGateFX() {
  const cont = document.getElementById('dgParticles');
  if (!cont) return;

  // Pulsing orbs
  [
    { w: 520, h: 520, l: 18, t: 35, dur: 6, del: 0   },
    { w: 380, h: 380, l: 72, t: 58, dur: 9, del: -3  },
    { w: 260, h: 260, l: 48, t: 12, dur: 7, del: -5  },
    { w: 180, h: 180, l: 82, t: 20, dur: 5, del: -1  },
  ].forEach(o => {
    const el = document.createElement('div');
    el.className = 'dg-orb';
    el.style.cssText = `width:${o.w}px;height:${o.h}px;left:${o.l}%;top:${o.t}%;transform:translate(-50%,-50%);--dur:${o.dur}s;--del:${o.del}s`;
    cont.appendChild(el);
  });

  // Expanding light rings
  [
    { l: 30, t: 50, dur: 5, del: 0   },
    { l: 70, t: 40, dur: 6, del: -2  },
    { l: 50, t: 70, dur: 7, del: -4  },
  ].forEach(r => {
    const el = document.createElement('div');
    el.className = 'dg-light-ring';
    el.style.cssText = `width:300px;height:300px;left:${r.l}%;top:${r.t}%;--dur:${r.dur}s;--del:${r.del}s`;
    cont.appendChild(el);
  });

  // Floating micro particles
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'dg-particle';
    const size = (Math.random() * 3 + 1).toFixed(1);
    const op   = (Math.random() * 0.40 + 0.10).toFixed(2);
    const tx   = ((Math.random() - 0.5) * 70).toFixed(0);
    const ty   = -(Math.random() * 70 + 30).toFixed(0);
    const ty2  = -(Math.random() * 110 + 70).toFixed(0);
    const dur  = (Math.random() * 8 + 9).toFixed(1);
    const del  = -(Math.random() * 16).toFixed(1);
    p.style.cssText = `left:${(Math.random()*100).toFixed(1)}%;top:${(Math.random()*100).toFixed(1)}%;width:${size}px;height:${size}px;--op:${op};--tx:${tx}px;--ty:${ty}px;--ty2:${ty2}px;--dur:${dur}s;--del:${del}s`;
    cont.appendChild(p);
  }
})();

// ══ GREEK PILLAR PARALLAX ══
(function initPillars() {
  const pL = document.getElementById('pillarL');
  const pR = document.getElementById('pillarR');
  if (!pL && !pR) return;
  const hero = document.getElementById('home');

  const tick = () => {
    const sy    = window.scrollY;
    const heroH = hero ? hero.offsetHeight : window.innerHeight;
    const after = Math.max(0, sy - heroH + 280);
    const fade  = Math.min(after / 320, 1);
    const py    = -(after * 0.28);

    if (pL) {
      pL.style.opacity   = (fade * 0.22).toFixed(3);
      pL.style.transform = `translateY(${py.toFixed(1)}px)`;
    }
    if (pR) {
      pR.style.opacity   = (fade * 0.16).toFixed(3);
      pR.style.transform = `translateY(${(py * 0.76).toFixed(1)}px)`;
    }
  };

  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();
