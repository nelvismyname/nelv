const cursor = document.querySelector('.cursor'),
  gridOverlay = document.querySelector('.grid-ol'),
  horizLine = document.querySelector('.gl-horizontal'),
  vertLine = document.querySelector('.gl-vertical'),
  title = document.getElementById('titleText'),
  githubBtn = document.querySelector('.github-btn');

let mouseX = window.innerWidth / 2,
  mouseY = window.innerHeight / 2,
  moving = false,
  idleTimeout;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  const mxp = (mouseX / window.innerWidth) * 100,
    myp = (mouseY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mouse-x', mxp + '%');
  document.documentElement.style.setProperty('--mouse-y', myp + '%');
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  horizLine.style.top = mouseY + 'px';
  vertLine.style.left = mouseX + 'px';
  gridOverlay.style.opacity = '1';
  horizLine.style.transform = 'scaleX(1)';
  vertLine.style.transform = 'scaleY(1)';
  const rect = title.getBoundingClientRect(),
    cx = rect.left + rect.width / 2,
    cy = rect.top + rect.height / 2,
    dx = (mouseX - cx) * 0.015,
    dy = (mouseY - cy) * 0.015,
    rx = (mouseY - cy) * 0.008,
    ry = (mouseX - cx) * 0.008;
  if (!title.matches(':hover')) title.style.transform = `translate(${dx}px,${dy}px) rotateX(${-rx}deg) rotateY(${ry}deg)`;
  if (githubBtn) {
    const ghRect = githubBtn.getBoundingClientRect(),
      ghCx = ghRect.left + ghRect.width / 2,
      ghCy = ghRect.top + ghRect.height / 2,
      ghDx = (mouseX - ghCx) * 0.015,
      ghDy = (mouseY - ghCy) * 0.015,
      ghRx = (mouseY - ghCy) * 0.008,
      ghRy = (mouseX - ghCx) * 0.008;
    if (!githubBtn.matches(':hover')) githubBtn.style.transform = `translate(${ghDx}px,${ghDy}px) rotateX(${-ghRx}deg) rotateY(${ghRy}deg)`;
  }
  moving = true;
  title.classList.remove('idle-animation');
  if (githubBtn) githubBtn.classList.remove('idle-animation');
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    moving = false;
    title.classList.add('idle-animation');
    if (githubBtn) githubBtn.classList.add('idle-animation');
    gridOverlay.style.opacity = '0.3';
    horizLine.style.transform = 'scaleX(0)';
    vertLine.style.transform = 'scaleY(0)';
  }, 3000);
});

setTimeout(() => {
  if (!moving) {
    title.classList.add('idle-animation');
    if (githubBtn) githubBtn.classList.add('idle-animation');
  }
}, 2000);

function hoverFX(el) {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursor.style.background = 'rgba(255,255,255,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'rgba(255,255,255,0.9)';
  });
}

hoverFX(title);
if (githubBtn) hoverFX(githubBtn);

document.querySelectorAll('.tech-card, .contact-card').forEach(hoverFX);