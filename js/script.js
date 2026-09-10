document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 64) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // Trigger on load in case user is already scrolled
    if (window.scrollY > 64) {
        header.classList.add('scrolled');
    }

    // 3. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link, .mobile-nav__btn');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            mobileNav.classList.toggle('is-open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                mobileNav.classList.remove('is-open');
            });
        });
    }

    // 4. Carousel Logic
    const slidesData = [
        {
            tag: "Anti-Aging",
            title: "Rejuvenecimiento Facial Integral",
            description: "Paciente de 47 años tratada con protocolo combinado de bioestimulación con exosomas, hilos PDO de sustentación y peeling enzimático. En cuatro sesiones se logró un lifting no invasivo visible con recuperación total de luminosidad, firmeza y contorno facial.",
            before: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=520&h=520&fit=crop&auto=format",
            after: "https://images.unsplash.com/photo-1551184451-76b762941ad6?w=520&h=520&fit=crop&auto=format"
        },
        {
            tag: "Despigmentación",
            title: "Homogeneización y Luminosidad del Tono",
            description: "Eliminación de manchas por daño solar y melasma hormonal en paciente de 38 años. Se aplicó protocolo de despigmentación progresiva con ácidos de alta concentración, luz pulsada intensa y factores de crecimiento. Resultado: tono uniforme y piel renovada en 6 sesiones mensuales.",
            before: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=520&h=520&fit=crop&auto=format",
            after: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?w=520&h=520&fit=crop&auto=format"
        },
        {
            tag: "Regenerativa Capilar",
            title: "Regeneración Capilar con Exosomas",
            description: "Tratamiento de alopecia androgénica en paciente de 42 años mediante microinyección de exosomas placentarios y mesoterapia capilar personalizada. Se evidenció recuperación de densidad y detención de caída en el 90% del área tratada tras 8 sesiones quincenales.",
            before: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=520&h=520&fit=crop&auto=format",
            after: "https://images.unsplash.com/photo-1717160675489-7779f2c91999?w=520&h=520&fit=crop&auto=format"
        }
    ];

    const track = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const counter = document.getElementById('carousel-counter');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const carouselSection = document.getElementById('cases-carousel');

    if (track && slidesData.length > 0) {
        let currentSlide = 0;
        let autoplayInterval;
        let isPaused = false;

        // Initialize Carousel DOM
        const initCarousel = () => {
            // Render slides
            track.innerHTML = slidesData.map(slide => `
                <div class="carousel__slide">
                    <div class="carousel__media">
                        <div class="carousel__img-wrap">
                            <img src="${slide.before}" alt="Antes del tratamiento" loading="lazy">
                            <span class="badge badge--dark">Antes</span>
                        </div>
                        <div class="carousel__arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </div>
                        <div class="carousel__img-wrap">
                            <img src="${slide.after}" alt="Después del tratamiento" loading="lazy">
                            <span class="badge badge--blue">Después</span>
                        </div>
                    </div>
                    <div class="carousel__info">
                        <span class="tag">${slide.tag}</span>
                        <h3 class="carousel__title">${slide.title}</h3>
                        <p class="carousel__desc">${slide.description}</p>
                    </div>
                </div>
            `).join('');

            // Render dots
            dotsContainer.innerHTML = slidesData.map((_, index) => 
                `<button class="dot" aria-label="Ir al caso ${index + 1}" data-index="${index}"></button>`
            ).join('');

            // Add events to dots
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    goToSlide(parseInt(e.target.dataset.index));
                });
            });

            updateCarousel();
        };

        const updateCarousel = () => {
            // Move track
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('is-active');
                } else {
                    dot.classList.remove('is-active');
                }
            });

            // Update counter
            const slideNum = String(currentSlide + 1).padStart(2, '0');
            const totalNum = String(slidesData.length).padStart(2, '0');
            counter.textContent = `${slideNum} / ${totalNum}`;
        };

        const goToSlide = (index) => {
            currentSlide = index;
            updateCarousel();
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slidesData.length;
            updateCarousel();
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
            updateCarousel();
        };

        // Autoplay logic
        const startAutoplay = () => {
            autoplayInterval = setInterval(() => {
                if (!isPaused) nextSlide();
            }, 5000);
        };

        const stopAutoplay = () => {
            clearInterval(autoplayInterval);
        };

        const resetTimer = () => {
            stopAutoplay();
            startAutoplay();
        };

        // Event Listeners for arrows
        if (btnNext) btnNext.addEventListener('click', () => { nextSlide(); resetTimer(); });
        if (btnPrev) btnPrev.addEventListener('click', () => { prevSlide(); resetTimer(); });

        // Pause on hover
        if (carouselSection) {
            carouselSection.addEventListener('mouseenter', () => { isPaused = true; });
            carouselSection.addEventListener('mouseleave', () => { isPaused = false; resetTimer(); });
            
            // Swipe logic for mobile
            let touchStartX = 0;
            let touchEndX = 0;

            carouselSection.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
                isPaused = true; // pause while swiping
            }, { passive: true });

            carouselSection.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                isPaused = false;
                handleSwipe();
            }, { passive: true });

            const handleSwipe = () => {
                const minSwipeDistance = 50;
                if (touchEndX < touchStartX - minSwipeDistance) {
                    nextSlide();
                    resetTimer();
                } else if (touchEndX > touchStartX + minSwipeDistance) {
                    prevSlide();
                    resetTimer();
                }
            };
        }

        // Init
        initCarousel();
        startAutoplay();
    }
});
