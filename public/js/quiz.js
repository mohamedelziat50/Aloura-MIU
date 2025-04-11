document.addEventListener('DOMContentLoaded', () => {
    // Quiz elements
    const slides = document.querySelectorAll('.question-slide');
    const progressBar = document.querySelector('.progress');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const options = document.querySelectorAll('.option');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    const userAnswers = {};

    // Initialize first slide
    showSlide(currentSlide);
    updateProgress();

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
            updateProgress();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1 && isOptionSelected(currentSlide)) {
            currentSlide++;
            showSlide(currentSlide);
            updateProgress();
        } else if (currentSlide === totalSlides - 1 && isOptionSelected(currentSlide)) {
            showResults();
        }
    });

    // Option selection handling
    options.forEach(option => {
        option.addEventListener('click', () => {
            const slide = option.closest('.question-slide');
            const questionNumber = slide.dataset.question;
            
            // Remove selection from other options in the same question
            slide.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Select clicked option
            option.classList.add('selected');
            userAnswers[questionNumber] = option.dataset.value;
            
            // Enable next button if an option is selected
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        });
    });

    // Show specific slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });

        // Update button visibility
        prevBtn.style.display = index === 0 ? 'none' : 'block';
        nextBtn.textContent = index === totalSlides - 1 ? 'Show Results' : 'Next';
    }

    // Update progress bar
    function updateProgress() {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Check if an option is selected for the current slide
    function isOptionSelected(slideIndex) {
        const questionNumber = slides[slideIndex].dataset.question;
        return userAnswers[questionNumber] !== undefined;
    }

    // Show quiz results
    function showResults() {
        // Convert answers to recommendation
        const recommendation = generateRecommendation(userAnswers);
        
        // Clear quiz container
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.innerHTML = `
            <h1>Your Perfect Match</h1>
            <div class="results-container">
                <div class="recommendation-card">
                    <img src="${recommendation.image}" alt="${recommendation.name}">
                    <h2>${recommendation.name}</h2>
                    <p>${recommendation.description}</p>
                    <p class="price">${recommendation.price}</p>
                    <button onclick="window.location.href='${recommendation.link}'" class="shop-now-btn">Shop Now</button>
                </div>
            </div>
        `;
    }

    // Generate fragrance recommendation based on answers
    function generateRecommendation(answers) {
        // Simple recommendation logic based on user answers
        let recommendation = {
            image: '',
            name: '',
            description: '',
            price: '',
            link: ''
        };

        // Example recommendation logic (you can customize this based on your fragrance inventory)
        if (answers['3'] === 'woody' && answers['2'] === 'strong') {
            recommendation = {
                image: '../img/perfumes-transparent/spicebomb-extreme.png',
                name: 'Spicebomb Extreme',
                description: 'A powerful and intense fragrance with woody and spicy notes.',
                price: '€270',
                link: 'fragrances-page.html'
            };
        } else if (answers['3'] === 'floral' && answers['2'] === 'light') {
            recommendation = {
                image: '../img/perfumes-transparent/flower-bomb.png',
                name: 'Flower Bomb',
                description: 'A fresh and floral fragrance perfect for daily wear.',
                price: '€200',
                link: 'fragrances-page.html'
            };
        } else {
            // Default recommendation
            recommendation = {
                image: '../img/perfumes-transparent/bleu-de-chanel.png',
                name: 'Bleu de Chanel',
                description: 'A versatile and sophisticated fragrance suitable for any occasion.',
                price: '€270',
                link: 'fragrances-page.html'
            };
        }

        return recommendation;
    }
});