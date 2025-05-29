const openBtn = document.getElementById('add-btn');
const closeBtn = document.getElementById('add-btn-close');
const popup = document.getElementById('add-popup');

openBtn.addEventListener('click', () => {
    popup.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    popup.classList.remove('open');
});