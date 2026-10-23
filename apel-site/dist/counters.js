(() => {
  'use strict';
  const API = 'https://countapi.mileshilliard.com/api/v1/';
  const PREFIX = 'mgil-star-shays-carpenter-1404868540-20261022-';
  const enabled = location.hostname === 'mgil-star.github.io' && location.pathname.startsWith('/Shays-Carpenter/');
  const states = new Map();
  const formatter = new Intl.NumberFormat('he-IL');
  const eye = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.4"/></svg>';
  const keyFor = (kind, id) => PREFIX + kind + '-' + id;
  function stateFor(kind, id) {
    const key = keyFor(kind, id);
    if (!states.has(key)) states.set(key, {key, kind, value: null, revision: 0, reading: null, queue: Promise.resolve(), elements: new Set()});
    return states.get(key);
  }
  function paint(state) {
    const label = state.kind === 'photo' ? 'פתיחות' : state.kind === 'video' ? 'צפיות' : 'ביקורים באתר';
    const value = state.value === null ? '—' : formatter.format(state.value);
    for (const element of state.elements) {
      if (!element.isConnected) { state.elements.delete(element); continue; }
      element.querySelector('.counter-value').textContent = value + ' ' + label;
    }
  }
  async function request(operation, key) {
    const response = await fetch(API + operation + '/' + encodeURIComponent(key), {
      credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store', signal: AbortSignal.timeout(8000)
    });
    if (operation === 'get' && response.status === 404) return 0;
    if (!response.ok) throw new Error('Counter service unavailable');
    const data = await response.json();
    const value = Number(data.value);
    if (!Number.isSafeInteger(value) || value < 0) throw new Error('Invalid counter value');
    return value;
  }
  function read(state) {
    if (!enabled || state.value !== null || state.reading) return;
    const revision = state.revision;
    state.reading = request('get', state.key).then(value => {
      if (revision === state.revision) { state.value = value; paint(state); }
    }).catch(() => {}).finally(() => { state.reading = null; });
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    observer.unobserve(entry.target);
    read(states.get(entry.target.dataset.counterKey));
  }), {rootMargin: '100px'});
  function create(kind, id) {
    const state = stateFor(kind, id);
    const element = document.createElement('small');
    element.className = kind === 'site' ? 'site-stat' : 'media-stat';
    element.dataset.counterKey = state.key;
    element.title = kind === 'site' ? 'ביקורים מאז הפעלת המונה; לא מספר אנשים ייחודיים' : 'פתיחות וצפיות שנמדדו בפועל מאז הפעלת המונה';
    element.innerHTML = eye + '<span class="counter-value">—</span>';
    state.elements.add(element);
    queueMicrotask(() => { paint(state); observer.observe(element); });
    return element;
  }
  function hit(kind, id) {
    if (!enabled || document.hidden) return Promise.resolve();
    const state = stateFor(kind, id);
    state.revision++;
    state.queue = state.queue.catch(() => {}).then(() => request('hit', state.key)).then(value => {
      state.value = value; paint(state);
    }).catch(() => {});
    return state.queue;
  }
  function sessionHas(key) { try { return sessionStorage.getItem(key) === '1'; } catch { return false; } }
  function sessionMark(key) { try { sessionStorage.setItem(key, '1'); } catch {} }
  function init() {
    const visibility = new WeakMap();
    const videoObserver = new IntersectionObserver(entries => entries.forEach(entry => visibility.set(entry.target, entry.isIntersecting)), {threshold: .25});
    document.querySelectorAll('.video-gallery video').forEach(video => {
      const source = video.querySelector('source').getAttribute('src');
      const id = source.split('/').pop().replace(/\.mp4$/i, '');
      video.closest('figure').querySelector('figcaption').append(create('video', id));
      const sessionKey = PREFIX + 'video-session-' + id;
      let counted = sessionHas(sessionKey);
      let watched = 0;
      let lastTime = null;
      video.addEventListener('timeupdate', () => {
        const time = video.currentTime;
        if (lastTime !== null && visibility.get(video) && !video.paused && !document.hidden) {
          const delta = time - lastTime;
          if (delta > 0 && delta < 1.5) watched += delta;
        }
        lastTime = time;
        if (!counted && watched >= 3) { counted = true; sessionMark(sessionKey); hit('video', id); }
      });
      video.addEventListener('pause', () => { lastTime = null; });
      videoObserver.observe(video);
    });
  }
  window.SiteCounters = {create, hit, init};
})();
