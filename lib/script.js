const c = document.querySelector('.cursor');
const go = document.querySelector('.grid-overlay');
const hl = document.querySelector('.gl-horizontal');
const vl = document.querySelector('.gl-vertical');
const nt = document.getElementById('titleText');
const gh = document.querySelector('.github-btn');
let mx = innerWidth / 2, my = innerHeight / 2, mov = false, to;

document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    const mpx = (mx / innerWidth) * 100;
    const mpy = (my / innerHeight) * 100;
    
    document.documentElement.style.setProperty('--mouse-x', mpx + '%');
    document.documentElement.style.setProperty('--mouse-y', mpy + '%');
    
    c.style.left = mx + 'px';
    c.style.top = my + 'px';
    
    hl.style.top = my + 'px';
    vl.style.left = mx + 'px';
    
    go.style.opacity = '1';
    hl.style.transform = 'scaleX(1)';
    vl.style.transform = 'scaleY(1)';
    
    const rectNT = nt.getBoundingClientRect();
    const cxNT = rectNT.left + rectNT.width / 2;
    const cyNT = rectNT.top + rectNT.height / 2;
    const dxNT = (mx - cxNT) * 0.015;
    const dyNT = (my - cyNT) * 0.015;
    const rxNT = (my - cyNT) * 0.008;
    const ryNT = (mx - cxNT) * 0.008;
    
    if (!nt.matches(':hover')) {
        nt.style.transform = `translate(${dxNT}px, ${dyNT}px) rotateX(${-rxNT}deg) rotateY(${ryNT}deg)`;
    }

    if (gh) {
        const rectGH = gh.getBoundingClientRect();
        const cxGH = rectGH.left + rectGH.width / 2;
        const cyGH = rectGH.top + rectGH.height / 2;
        const dxGH = (mx - cxGH) * 0.015;
        const dyGH = (my - cyGH) * 0.015;
        const rxGH = (my - cyGH) * 0.008;
        const ryGH = (mx - cxGH) * 0.008;
        
        if (!gh.matches(':hover')) {
            gh.style.transform = `translate(${dxGH}px, ${dyGH}px) rotateX(${-rxGH}deg) rotateY(${ryGH}deg)`;
        }
    }
    
    mov = true;
    nt.classList.remove('idle-animation');
    if (gh) gh.classList.remove('idle-animation');
    clearTimeout(to);
    to = setTimeout(() => {
        mov = false;
        nt.classList.add('idle-animation');
        if (gh) gh.classList.add('idle-animation');
        go.style.opacity = '0.3';
        hl.style.transform = 'scaleX(0)';
        vl.style.transform = 'scaleY(0)';
    }, 3000);
});

setTimeout(() => {
    if (!mov) {
        nt.classList.add('idle-animation');
        if (gh) gh.classList.add('idle-animation');
    }
}, 2000);

function ch(el) {
    el.addEventListener('mouseenter', () => {
        c.style.transform = 'translate(-50%, -50%) scale(2)';
        c.style.background = 'rgba(255, 255, 255, 0.6)';
    });
    el.addEventListener('mouseleave', () => {
        c.style.transform = 'translate(-50%, -50%) scale(1)';
        c.style.background = 'rgba(255, 255, 255, 0.9)';
    });
}

ch(nt);
if (gh) ch(gh);