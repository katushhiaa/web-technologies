document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.getElementById('dots');

    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoplayInterval = null;

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => moveToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('span');
    updateDots();

    function moveToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function moveNext() {
        moveToSlide(currentIndex + 1);
    }

    function movePrev() {
        moveToSlide(currentIndex - 1);
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function startAutoplay() {
        autoplayInterval = setInterval(moveNext, 3000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    prevBtn.addEventListener('click', movePrev);
    nextBtn.addEventListener('click', moveNext);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') moveNext();
        if (e.key === 'ArrowLeft') movePrev();
    });

    document.getElementById('slider').addEventListener('mouseenter', stopAutoplay);
    document.getElementById('slider').addEventListener('mouseleave', startAutoplay);

    startAutoplay();
});
