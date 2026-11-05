(() => {
  const svg = document.querySelector('[data-living-constellation]');
  if (!svg) return;
  const ns = 'http://www.w3.org/2000/svg';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const random = (a, b) => a + Math.random() * (b - a);
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  // Preserve the original asymmetric constellations and their free-ended limbs.
  const shapes = [
    {offsets: [[-58, -12], [-16, -30], [10, 6], [51, -12], [-8, 36]],
      edges: [[0, 1], [1, 2], [2, 3], [1, 4], [4, 2]]},
    {offsets: [[-55, 4], [-10, 24], [29, -10], [55, 12], [13, 52], [43, -37]],
      edges: [[0, 1], [1, 2], [2, 3], [1, 4], [2, 5]]}
  ];
  let width, height, obstacles = [], previous = 0, frame;
  const creatures = [];
  function element(tag, attrs, parent) {
    const el = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    parent.appendChild(el);
    return el;
  }
  svg.replaceChildren();
  for (let i = 0; i < 2; i++) {
    const {offsets, edges} = shapes[i % shapes.length];
    const group = element('g', {}, svg);
    const paths = edges.map(() => element('path', {
      fill: 'none', stroke: '#e39360', 'stroke-width': 0.85, opacity: 0.42
    }, group));
    const nodes = offsets.map(([x, y], j) => ({
      x, y, vx: 0, vy: 0, phase: random(0, Math.PI * 2),
      el: element('circle', {r: j === 1 ? 3.1 : random(1.8, 2.7), fill: j === 1 ? '#bb470b' : '#e39360'}, group)
    }));
    creatures.push({group, paths, nodes, offsets, edges, x: 0, y: 0, vx: random(-10, 10), vy: random(-10, 10),
      heading: random(0, Math.PI * 2), turn: 0, targetTurn: 0, nextChoice: 0,
      phase: random(0, 100), speed: random(12, 22), speedTarget: random(12, 22),
      turnRate: random(0.35, 0.8), rhythm: random(0.55, 1.25),
      scale: random(1.26, 1.44)});
  }
  function resize() {
    width = svg.clientWidth || innerWidth;
    height = svg.clientHeight || innerHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    creatures.forEach((c, i) => {
      c.x = clamp(c.x || random(80, Math.max(80, width - 80)), 70, Math.max(70, width - 70));
      c.y = clamp(c.y || random(height * 0.45, Math.max(height * 0.45, height - 80)), 80, Math.max(80, height - 70));
    });
    obstacles = [...document.querySelectorAll('.site-header, .animation-preview-copy p, .animation-preview-picker')]
      .map(el => el.getBoundingClientRect());
    render(0);
  }
  function render(time) {
    creatures.forEach(c => {
      c.group.setAttribute('transform', `translate(${c.x} ${c.y}) scale(${c.scale})`);
      c.nodes.forEach(n => { n.el.setAttribute('cx', n.x); n.el.setAttribute('cy', n.y); });
      c.edges.forEach(([a, b], j) => {
        const p = c.nodes[a], q = c.nodes[b];
        c.paths[j].setAttribute('d', `M${p.x} ${p.y} L${q.x} ${q.y}`);
      });
    });
  }
  function tick(now) {
    const dt = Math.min((now - (previous || now)) / 1000, 0.04);
    previous = now;
    const time = now / 1000;
    creatures.forEach((c, index) => {
      // Each entity chooses its own gentle, non-repeating changes of direction.
      if (time > c.nextChoice) {
        c.targetTurn = random(-0.4, 0.4);
        c.speedTarget = random(8, 24);
        c.nextChoice = time + random(2.5, 7);
      }
      c.turn += (c.targetTurn - c.turn) * dt * c.turnRate;
      c.heading += c.turn * dt;
      c.speed += (c.speedTarget - c.speed) * dt * 0.3;
      const speed = c.speed;
      let ax = (Math.cos(c.heading) * speed - c.vx) * 0.45;
      let ay = (Math.sin(c.heading) * speed - c.vy) * 0.45;
      // Soft boundary forces let the creatures turn before they hit an edge.
      ax += Math.max(0, 95 - c.x) * 0.6 - Math.max(0, c.x - width + 95) * 0.6;
      ay += Math.max(0, 105 - c.y) * 0.6 - Math.max(0, c.y - height + 95) * 0.6;
      obstacles.forEach(r => {
        const dx = c.x - clamp(c.x, r.left - 20, r.right + 20);
        const dy = c.y - clamp(c.y, r.top - 20, r.bottom + 20);
        const distance = Math.hypot(dx, dy);
        if (distance > 0 && distance < 90) {
          const force = (90 - distance) * 0.25;
          ax += dx / distance * force;
          ay += dy / distance * force;
        }
      });
      c.vx += ax * dt; c.vy += ay * dt;
      const velocity = Math.hypot(c.vx, c.vy);
      if (velocity > 28) { c.vx *= 28 / velocity; c.vy *= 28 / velocity; }
      c.x = clamp(c.x + c.vx * dt, 55, Math.max(55, width - 55));
      c.y = clamp(c.y + c.vy * dt, 60, Math.max(60, height - 55));
      // Each body has a distinct internal rhythm as well as independent steering.
      const bodyTime = time * c.rhythm;
      c.nodes.forEach((n, j) => {
        const [rx, ry] = c.offsets[j];
        const breath = 1 + 0.1 * Math.sin(bodyTime * 0.8 + c.phase);
        const rotation = Math.sin(bodyTime * 0.12 + c.phase) * 0.5;
        const tx = (rx * Math.cos(rotation) - ry * Math.sin(rotation)) * breath;
        const ty = (rx * Math.sin(rotation) + ry * Math.cos(rotation)) * breath;
        n.vx += ((tx - n.x) * 1.8 + Math.sin(bodyTime * 0.95 + n.phase) * 8 - n.vx * 1.9 - ax * 0.3) * dt;
        n.vy += ((ty - n.y) * 1.8 + Math.cos(bodyTime * 0.72 + n.phase) * 8 - n.vy * 1.9 - ay * 0.3) * dt;
      });
      c.edges.forEach(([a, b]) => {
        const p = c.nodes[a], q = c.nodes[b];
        const dx = q.x - p.x, dy = q.y - p.y, distance = Math.hypot(dx, dy) || 1;
        const rest = Math.hypot(c.offsets[b][0] - c.offsets[a][0], c.offsets[b][1] - c.offsets[a][1]);
        const force = (distance - rest) * 0.6 * dt;
        p.vx += dx / distance * force; p.vy += dy / distance * force;
        q.vx -= dx / distance * force; q.vy -= dy / distance * force;
      });
      c.nodes.forEach(n => { n.x += n.vx * dt; n.y += n.vy * dt; });
    });
    render(time);
    frame = requestAnimationFrame(tick);
  }
  function start() {
    cancelAnimationFrame(frame);
    previous = 0;
    if (!reduced.matches && !document.hidden) frame = requestAnimationFrame(tick);
    else render(0);
  }
  addEventListener('resize', resize);
  addEventListener('scroll', resize, {passive: true});
  document.addEventListener('visibilitychange', start);
  reduced.addEventListener('change', start);
  resize();
  start();
})();
