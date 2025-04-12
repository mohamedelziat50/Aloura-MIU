document.addEventListener('DOMContentLoaded', () => {
    // Quiz elements
    const sections = document.querySelectorAll('.quiz-section');
    const progressBar = document.querySelector('.progress');
    const ageSlider = document.getElementById('ageSlider');
    const ageValue = document.querySelector('.age-value');
    
    let currentSection = 0;
    const totalSections = sections.length;
    const userAnswers = {};
    let selectedScentCount = 0;

    // Initialize first section and progress
    updateSection(currentSection);
    updateProgress();

    // Handle age slider
    if (ageSlider) {
        ageSlider.addEventListener('input', () => {
            ageValue.textContent = ageSlider.value;
            userAnswers['age'] = ageSlider.value;
            enableNextButton(sections[currentSection]);
        });
    }

    // Handle section transitions
    document.addEventListener('click', (e) => {
        // Arrow down button handling
        if (e.target.closest('.arrow-down')) {
            moveToNextSection();
        }

        // Option selection handling
        if (e.target.closest('.option')) {
            const option = e.target.closest('.option');
            const section = option.closest('.quiz-section');
            
            // Handle scent family special case (max 2 selections)
            if (section.id === 'scentFamily') {
                handleScentFamilySelection(option);
            } else {
                // Single selection for other sections
                section.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                option.classList.add('selected');
                
                // Store answer
                userAnswers[section.id] = option.dataset.value;
                
                // Enable next button or auto-advance
                if (section.querySelector('.next-btn')) {
                    enableNextButton(section);
                } else {
                    setTimeout(moveToNextSection, 500);
                }
            }
        }

        // Next button handling
        if (e.target.classList.contains('next-btn')) {
            moveToNextSection();
        }
    });

    function handleScentFamilySelection(option) {
        if (option.classList.contains('selected')) {
            option.classList.remove('selected');
            selectedScentCount--;
        } else if (selectedScentCount < 2) {
            option.classList.add('selected');
            selectedScentCount++;
        }

        // Store selected scents
        const selectedScents = Array.from(option.closest('.options').querySelectorAll('.selected'))
            .map(opt => opt.dataset.value);
        userAnswers.scentFamily = selectedScents;

        // Enable next button if at least one scent is selected
        if (selectedScentCount > 0) {
            enableNextButton(option.closest('.quiz-section'));
        }
    }

    function moveToNextSection() {
        if (currentSection < totalSections - 1) {
            currentSection++;
            updateSection(currentSection);
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            showResults();
        }
    }

    function updateSection(index) {
        sections.forEach((section, i) => {
            section.classList.remove('active');
            if (i === index) {
                section.classList.add('active');
            }
        });
    }

    function updateProgress() {
        const progress = ((currentSection + 1) / totalSections) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function enableNextButton(section) {
        const nextBtn = section.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.classList.add('active');
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }

    function showResults() {
        // Analyze answers and generate recommendation
        const recommendation = generateRecommendation(userAnswers);
        
        // Update UI with recommendation
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.innerHTML = `
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

    function generateRecommendation(answers) {
        // Map user preferences to fragrance recommendations
        const recommendations = {
            freshElegant: {
                male: {
                    woody: {
                        image: '../img/perfumes-transparent/bleu-de-chanel.png',
                        name: 'Bleu de Chanel',
                        description: 'A fresh and elegant woody fragrance with citrus notes.',
                        price: '€270',
                        link: 'all-fragrances.html'
                    }
                },
                female: {
                    floral: {
                        image: '../img/perfumes-transparent/burberry-her.png',
                        name: 'Burberry Her',
                        description: 'A fresh and vibrant floral fragrance.',
                        price: '€200',
                        link: 'all-fragrances.html'
                    }
                }
            },
            seductiveBold: {
                male: {
                    oriental: {
                        image: '../img/perfumes-transparent/spicebomb-extreme.png',
                        name: 'Spicebomb Extreme',
                        description: 'An intense and seductive oriental fragrance.',
                        price: '€270',
                        link: 'all-fragrances.html'
                    }
                },
                female: {
                    floral: {
                        image: '../img/perfumes-transparent/flower-bomb.png',
                        name: 'Flower Bomb',
                        description: 'A seductive and bold floral fragrance.',
                        price: '€200',
                        link: 'all-fragrances.html'
                    }
                }
            }
        };

        // Default recommendation
        let recommendation = {
            image: '../img/perfumes-transparent/bleu-de-chanel.png',
            name: 'Bleu de Chanel',
            description: 'A versatile and sophisticated fragrance suitable for any occasion.',
            price: '€270',
            link: 'fragrances-page'
        };

        // Logic to choose recommendation based on answers
        const style = answers.desiredFeeling === 'fresh' ? 'freshElegant' : 'seductiveBold';
        const gender = answers.gender || 'neutral';
        const scent = answers.scentFamily ? answers.scentFamily[0] : 'woody';

        try {
            if (recommendations[style][gender][scent]) {
                recommendation = recommendations[style][gender][scent];
            }
        } catch (e) {
            // Use default recommendation if specific combination not found
        }

        return recommendation;
    }
});