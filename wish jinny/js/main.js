document.addEventListener('DOMContentLoaded', () => {
    const magicLamp = document.getElementById('magicLamp');
    const smokeBurst = document.getElementById('smokeBurst');
    const offerCard = document.getElementById('offerCard');

    let rubCount = 0;

    magicLamp.addEventListener('click', () => {
        rubCount++;

        magicLamp.style.transform = `rotate(${rubCount % 2 === 0 ? 8 : -8}deg) scale(1.1)`;
        setTimeout(() => {
            magicLamp.style.transform = 'rotate(0deg) scale(1)';
        }, 150);

        smokeBurst.classList.add('active');
        
        setTimeout(() => {
            offerCard.classList.add('show');
        }, 300);
    });
});