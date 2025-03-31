const papers = document.querySelectorAll('.paper');

papers.forEach(paper => {
    paper.addEventListener('mousedown', startDrag);
    paper.addEventListener('touchstart', startDrag, { passive: false });
});

document.addEventListener('mousemove', onDrag);
document.addEventListener('mouseup', stopDrag);

document.addEventListener('touchmove', onDrag, { passive: false });
document.addEventListener('touchend', stopDrag);

let activePaper = null;
let offsetX = 0, offsetY = 0;

function startDrag(event) {
    event.preventDefault();
    
    activePaper = event.target.closest('.paper');
    if (!activePaper) return;
    
    const isTouch = event.type.startsWith('touch');
    const clientX = isTouch ? event.touches[0].clientX : event.clientX;
    const clientY = isTouch ? event.touches[0].clientY : event.clientY;
    
    offsetX = clientX - activePaper.getBoundingClientRect().left;
    offsetY = clientY - activePaper.getBoundingClientRect().top;
}

function onDrag(event) {
    if (!activePaper) return;
    event.preventDefault();
    
    const isTouch = event.type.startsWith('touch');
    const clientX = isTouch ? event.touches[0].clientX : event.clientX;
    const clientY = isTouch ? event.touches[0].clientY : event.clientY;
    
    activePaper.style.left = `${clientX - offsetX}px`;
    activePaper.style.top = `${clientY - offsetY}px`;
    activePaper.style.position = 'absolute';
}

function stopDrag() {
    activePaper = null;
}
