const track = document.querySelector(".projects-track");
const cards = document.querySelectorAll(".project-card");
const prevButton = document.querySelector(".prev-arrow");
const nextButton = document.querySelector(".next-arrow");
const positionIndicator = document.querySelector("#carousel-position");

let currentPage = 0;

function getCardsPerPage() {
    return window.innerWidth <= 600 ? 1 : 2;
}

function getTotalPages() {
    return Math.ceil(cards.length / getCardsPerPage());
}

function updateCarousel() {
    const cardsPerPage = getCardsPerPage();
    const totalPages = getTotalPages();

    const cardWidth = cards[0].offsetWidth;
    const gap = window.innerWidth <= 600 ? 0 : 25;

    const moveAmount = currentPage * (cardWidth + gap) * cardsPerPage;

    track.style.transform = `translateX(-${moveAmount}px)`;
    track.style.transition = "transform 0.3s ease";

    positionIndicator.textContent = `${currentPage + 1} / ${totalPages}`;

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
}

nextButton.addEventListener("click", () => {
    const totalPages = getTotalPages();

    if (currentPage < totalPages - 1) {
        currentPage++;
        updateCarousel();
    }
});

prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        updateCarousel();
    }
});

window.addEventListener("resize", () => {
    const totalPages = getTotalPages();

    if (currentPage >= totalPages) {
        currentPage = totalPages - 1;
    }

    updateCarousel();
});

updateCarousel();