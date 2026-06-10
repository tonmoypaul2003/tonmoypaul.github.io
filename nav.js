/* nav.js — injects cursor + sidenav + noise, highlights active page */
(function () {
  /* ── cursor ── */
  const cur  = document.createElement('div'); cur.id  = 'cursor';
  const ring = document.createElement('div'); ring.id = 'cursor-ring';
  const noise= document.createElement('div'); noise.id= 'noise';
  document.body.prepend(noise, cur, ring);

  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx+'px'; cur.style.top = my+'px';
  });
  (function animRing(){
    rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(animRing);
  })();

  /* ── sidenav ── */
  const pages = [
    { label:'Home',         num:'01', href:'index.html'        },
    { label:'Publications', num:'02', href:'publications.html'  },
    { label:'Datasets',     num:'03', href:'datasets.html'      },
    { label:'Ongoing',      num:'04', href:'ongoing.html'       },
    { label:'CV',           num:'05', href:'cv.html'            },
  ];

  const nav = document.createElement('nav');
  nav.id = 'sidenav';
  nav.innerHTML = `<div class="nav-logo">Pages</div>` +
    `<div class="nav-items">` +
    pages.map(p => `
      <a href="${p.href}" class="nav-dot${location.pathname.endsWith(p.href)||
        (p.href==='index.html'&&(location.pathname.endsWith('/')||location.pathname.endsWith('index.html')))
        ?' active':''}">
        <span class="nav-num">${p.num}</span>
        <span class="nav-label">${p.label}</span>
      </a>`).join('') +
    `</div><div class="nav-footer">01—05</div>`;
  document.body.insertBefore(nav, document.getElementById('app'));
})();
